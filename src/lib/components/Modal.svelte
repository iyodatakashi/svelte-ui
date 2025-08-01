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
	import { announceOpenClose } from '../utils/accessibility';

	let {
		isOpen = $bindable(false),
		closeIfClickOutside = true,
		restoreFocus = false,
		componentType = 'Modal',
		ariaLabel,
		ariaLabelledby,
		ariaDescribedby,
		customClass = '',
		customStyles = '',
		children
	}: {
		isOpen?: boolean;
		closeIfClickOutside?: boolean;
		restoreFocus?: boolean;
		componentType?: string;
		ariaLabel?: string;
		ariaLabelledby?: string;
		ariaDescribedby?: string;
		customClass?: string;
		customStyles?: string;
		children?: Snippet;
	} = $props();

	let dialogRef: HTMLDialogElement;
	let containerRef: HTMLDivElement;
	let previousActiveElement: HTMLElement | null = null;

	// 外側クリックでのクローズ
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

	// ESCキーでのクローズ
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

	// フォーカストラップ
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
				// Shift + Tab
				if (document.activeElement === firstElement) {
					event.preventDefault();
					lastElement?.focus();
				}
			} else {
				// Tab
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

	// 開閉状態の同期
	$effect(() => {
		if (dialogRef) {
			if (isOpen) {
				open();
			} else {
				close();
			}
		}
	});

	export const open = (title?: string): void => {
		if (!dialogRef) return;

		isOpen = true;
		previousActiveElement = document.activeElement as HTMLElement;

		dialogRef.classList.add('fade-in');
		dialogRef.removeEventListener('animationend', closeEnd);
		dialogRef.showModal();

		setTimeout(() => {
			// 最初のフォーカス可能要素にフォーカス
			const firstFocusableElement = dialogRef?.querySelector(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			) as HTMLElement;
			firstFocusableElement?.focus();

			// スクリーンリーダーにモーダルが開いたことをアナウンス
			announceOpenClose(componentType, true, title || ariaLabel || '');
		}, 0);
	};

	export const close = (title?: string): void => {
		if (!dialogRef) return;

		isOpen = false;
		dialogRef.classList.add('fade-out');
		dialogRef.addEventListener('animationend', closeEnd, { once: true });

		// スクリーンリーダーにモーダルが閉じたことをアナウンス
		announceOpenClose(componentType, false, title || ariaLabel || '');
	};

	export const closeEnd = (): void => {
		if (!dialogRef) return;

		dialogRef.close();
		dialogRef.classList.remove('fade-out');

		// オプションが有効な場合のみ元の要素にフォーカスを戻す
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
	aria-modal="true"
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	aria-describedby={ariaDescribedby}
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

	.fade-in,
	.fade-in::backdrop {
		animation: fadeIn var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	.fade-out,
	.fade-out::backdrop {
		animation: fadeOut var(--svelte-ui-transition-duration, 300ms) forwards;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.fade-in,
		.fade-in::backdrop,
		.fade-out,
		.fade-out::backdrop {
			animation-duration: 0.01s;
		}
	}
</style>
