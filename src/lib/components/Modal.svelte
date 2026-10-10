<!-- Modal.svelte -->
<script lang="ts">
	/**
	 * 🚨 CRITICAL: DO NOT MANAGE MODAL STATE FROM PARENT COMPONENTS
	 *
	 * This Modal component manages its own open/closed state internally.
	 * Parent components must NEVER create their own Modal state variables.
	 *
	 * ❌ WRONG: let isModalOpen = $state(false)
	 * ✅ RIGHT: Use modalRef.open(), modalRef.close(), modalRef.toggle()
	 * ✅ RIGHT: Use onOpen/onClose callbacks for side effects
	 *
	 * This prevents state synchronization bugs and ensures consistent behavior.
	 */
	import { tick } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { CloseReason } from '$lib/types/propOptions';
	import { announceOpenClose } from '$lib/utils/accessibility';
	import { waitForAnimations } from '$lib/utils/animation';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type ModalProps = {
		// Snippet
		children?: Snippet;

		// 基本プロパティ
		/** Internal label used for accessibility announcements. @default 'Modal' */
		componentType?: string;

		// HTML属性
		id?: string;

		// スタイル/レイアウト
		customClass?: string;
		customStyles?: string;

		// 状態/動作
		/** Use `modalRef.open()` / `.close()` instead of binding this directly. */
		isOpen?: boolean;
		/** Closes when clicking the backdrop. @default true */
		closeIfClickOutside?: boolean;
		/** Returns focus to the trigger element on close. @default false */
		restoreFocus?: boolean;
		/** Focuses the first focusable element on open. @default false */
		focusFirstOnOpen?: boolean;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		ariaLabelledby?: string;
		ariaDescribedby?: string;

		// イベントハンドラー
		onOpen?: () => void;
		/** Called after the close animation completes, with the reason it was closed. */
		onClose?: (reason: CloseReason) => void;
	};

	let {
		// Snippet
		children,

		// 基本プロパティ
		componentType = 'Modal',

		// HTML属性
		id,

		// スタイル/レイアウト
		customClass = '',
		customStyles = '',

		// 状態/動作
		isOpen = $bindable(false),
		closeIfClickOutside = true,
		restoreFocus = false,
		focusFirstOnOpen = false,

		// ARIA/アクセシビリティ
		ariaLabel,
		ariaLabelledby,
		ariaDescribedby,

		// イベントハンドラー
		onOpen = () => {}, // No params for type inference
		onClose = () => {}
	}: ModalProps = $props();

	let dialogRef: HTMLDialogElement;
	let containerRef: HTMLDivElement;
	let previousActiveElement: HTMLElement | null = null;
	// isOpen は bind でも変わるため、実際に開いているかは内部で持つ
	let isVisible = false;
	let pendingCloseReason: CloseReason | null = null;

	// =========================================================================
	// Effects
	// =========================================================================
	$effect(() => {
		if (!dialogRef || !isOpen) return;

		const handleClick = (event: MouseEvent) => {
			if (!closeIfClickOutside) return;
			if (!containerRef || !event.target) return;
			if (!containerRef.contains(event.target as Node)) {
				close(undefined, 'outside');
			}
		};

		dialogRef.addEventListener('click', handleClick);

		return () => {
			if (dialogRef) {
				dialogRef.removeEventListener('click', handleClick);
			}
		};
	});

	$effect(() => {
		if (!dialogRef) return;

		// showModal() した dialog は最前面の1つだけに cancel が配送されるため、
		// Escape で多重の Modal がまとめて閉じることを防げる。ネイティブの即時
		// クローズは抑止し、fade-out アニメーション付きの close() を使う。
		const handleCancel = (event: Event) => {
			event.preventDefault();
			close(undefined, 'escape');
		};

		dialogRef.addEventListener('cancel', handleCancel);

		return () => {
			dialogRef.removeEventListener('cancel', handleCancel);
		};
	});

	$effect(() => {
		if (!isOpen || !dialogRef) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Tab') return;

			const focusableElements = dialogRef.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			);

			if (focusableElements.length === 0) return;

			const firstElement = focusableElements[0] as HTMLElement;
			const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

			if (event.shiftKey) {
				if (document.activeElement === firstElement) {
					event.preventDefault();
					lastElement?.focus();
				}
			} else {
				if (document.activeElement === lastElement) {
					event.preventDefault();
					firstElement?.focus();
				}
			}
		};

		dialogRef.addEventListener('keydown', handleKeyDown);

		return () => {
			if (dialogRef) {
				dialogRef.removeEventListener('keydown', handleKeyDown);
			}
		};
	});

	$effect(() => {
		if (dialogRef) {
			if (isOpen) {
				open();
			} else {
				close();
			}
		}
	});

	// =========================================================================
	// Methods
	// =========================================================================
	/** Opens the modal. */
	export const open = (title?: string): void => {
		if (!dialogRef || isVisible) return;

		isVisible = true;
		isOpen = true;
		previousActiveElement = document.activeElement as HTMLElement;

		// 閉じるアニメーションの途中で開き直した場合は close を取り消す
		pendingCloseReason = null;
		dialogRef.classList.add('fade-in');
		dialogRef.showModal();

		setTimeout(() => {
			if (!focusFirstOnOpen) {
				dialogRef?.focus();
			}
			announceOpenClose(componentType, true, title || ariaLabel || '');
			onOpen?.();
		}, 0);
	};

	/** Closes the modal. */
	export const close = (title?: string, reason: CloseReason = 'explicit'): void => {
		if (!dialogRef || !isVisible) return;

		isVisible = false;
		isOpen = false;
		pendingCloseReason = reason;
		dialogRef.classList.add('fade-out');
		void finishClose();

		announceOpenClose(componentType, false, title || ariaLabel || '');
	};

	/** 閉じるアニメーションの完了を待って後始末する。 */
	const finishClose = async (): Promise<void> => {
		await tick();
		await waitForAnimations(dialogRef);

		// 閉じるアニメーションの途中で開き直した場合は何もしない
		if (pendingCloseReason === null) return;
		closeEnd();
	};

	/** @internal Completes the close animation. Called automatically. */
	export const closeEnd = (): void => {
		if (!dialogRef) return;

		dialogRef.close();
		dialogRef.classList.remove('fade-out');

		if (restoreFocus && previousActiveElement) {
			previousActiveElement.focus();
		}
		previousActiveElement = null;

		// アニメーション完了後に onClose を呼ぶ
		if (pendingCloseReason) {
			const reason = pendingCloseReason;
			pendingCloseReason = null;
			onClose?.(reason);
		}
	};

	/** Toggles between open and closed. */
	export const toggle = (title?: string): void => {
		if (isVisible) {
			close(title);
		} else {
			open(title);
		}
	};
</script>

<dialog
	bind:this={dialogRef}
	class="modal {customClass} {isOpen ? 'fade-in' : 'fade-out'}"
	style={customStyles}
	tabindex="-1"
	aria-modal="true"
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	aria-describedby={ariaDescribedby}
	data-testid="modal"
	{id}
>
	<div class="modal-contents" bind:this={containerRef}>
		{#if children}
			{@render children()}
		{/if}
	</div>
</dialog>

<style lang="scss">
	.modal {
		padding: 0;
		border-width: 0;
		background-color: var(--svelte-ui-surface-elevated-color);
		box-shadow:
			0 11px 15px -7px var(--svelte-ui-shadow-color-strong),
			0 24px 38px 3px var(--svelte-ui-shadow-color),
			0 9px 46px 8px var(--svelte-ui-shadow-color-weak);
	}

	.modal::backdrop {
		position: fixed;
		inset: 0;
		background: rgb(0 0 0 / 40%);
	}

	.modal:focus {
		outline: none;
	}

	/* Modal内の要素のフォーカス枠線をコントロール */
	.modal *:focus {
		outline: none;
	}

	/* キーボードナビゲーション時のみフォーカス枠線を表示 */
	.modal *:focus-visible {
		outline: var(--svelte-ui-focus-outline-outer);
		outline-offset: var(--svelte-ui-focus-outline-offset-outer);
	}

	.modal-contents {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	/* アニメーション */
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	.modal.fade-in:not([class*='drawer-wrapper']) {
		animation: fadeIn var(--svelte-ui-transition-duration, 300ms) forwards;
	}
	.modal.fade-in::backdrop {
		animation: fadeIn var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	.modal.fade-out:not([class*='drawer-wrapper']) {
		animation: fadeOut var(--svelte-ui-transition-duration, 300ms) forwards;
	}
	.modal.fade-out::backdrop {
		animation: fadeOut var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	@media (prefers-reduced-motion: reduce) {
		.modal.fade-in,
		.modal.fade-in::backdrop,
		.modal.fade-out,
		.modal.fade-out::backdrop {
			animation-duration: 0.01s;
		}
	}
</style>
