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
	import type { Snippet } from 'svelte';
	import { announceOpenClose } from '$lib/utils/accessibility';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type ModalProps = {
		// Snippet
		children?: Snippet;

		// 基本プロパティ
		componentType?: string;

		// スタイル/レイアウト
		customClass?: string;
		customStyles?: string;

		// 状態/動作
		isOpen?: boolean;
		closeIfClickOutside?: boolean;
		restoreFocus?: boolean;
		focusFirstOnOpen?: boolean;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		ariaLabelledby?: string;
		ariaDescribedby?: string;

		// HTML属性
		id?: string;
	};

	let {
		// Snippet
		children,

		// 基本プロパティ
		componentType = 'Modal',

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

		// HTML属性
		id
	}: ModalProps = $props();

	let dialogRef: HTMLDialogElement;
	let containerRef: HTMLDivElement;
	let previousActiveElement: HTMLElement | null = null;

	// =========================================================================
	// Effects
	// =========================================================================
	$effect(() => {
		if (!dialogRef || !isOpen) return;

		const handleClick = (event: MouseEvent) => {
			if (!closeIfClickOutside) return;
			if (!containerRef || !event.target) return;
			if (!containerRef.contains(event.target as Node)) {
				close();
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
		if (!isOpen || !dialogRef) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				close();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
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
	export const open = (title?: string): void => {
		if (!dialogRef) return;

		isOpen = true;
		previousActiveElement = document.activeElement as HTMLElement;

		dialogRef.classList.add('fade-in');
		dialogRef.removeEventListener('animationend', closeEnd);
		dialogRef.showModal();

		setTimeout(() => {
			if (!focusFirstOnOpen) {
				dialogRef?.focus();
			}
			announceOpenClose(componentType, true, title || ariaLabel || '');
		}, 0);
	};

	export const close = (title?: string): void => {
		if (!dialogRef) return;

		isOpen = false;
		dialogRef.classList.add('fade-out');
		dialogRef.addEventListener('animationend', closeEnd, { once: true });

		announceOpenClose(componentType, false, title || ariaLabel || '');
	};

	export const closeEnd = (): void => {
		if (!dialogRef) return;

		dialogRef.close();
		dialogRef.classList.remove('fade-out');

		if (restoreFocus && previousActiveElement) {
			previousActiveElement.focus();
		}
		previousActiveElement = null;
	};

	export const toggle = (title?: string): void => {
		if (isOpen) {
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
		background-color: var(--svelte-ui-surface-color);
		box-shadow:
			0 11px 15px -7px rgb(0 0 0 / 20%),
			0 24px 38px 3px rgb(0 0 0 / 14%),
			0 9px 46px 8px rgb(0 0 0 / 12%);
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
