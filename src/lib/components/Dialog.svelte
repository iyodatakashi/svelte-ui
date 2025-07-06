<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		isOpen = $bindable(false),
		title = '',
		scrollable = false,
		closeIfClickOutside = true,
		width = 320,
		restoreFocus = false,
		ariaDescribedby,
		description,
		header,
		body,
		children,
		footer
	}: {
		isOpen?: boolean;
		title?: string;
		scrollable?: boolean;
		closeIfClickOutside?: boolean;
		width?: number;
		restoreFocus?: boolean;
		ariaDescribedby?: string;
		description?: string;
		header?: Snippet;
		body?: Snippet;
		children?: Snippet;
		footer?: Snippet;
	} = $props();
	let dialogRef: HTMLDialogElement;
	let containerRef: HTMLDivElement;
	let previousActiveElement: HTMLElement | null = null;

	// スクリーンリーダー向けアナウンス
	const announceToScreenReader = (message: string) => {
		const announcement = document.createElement('div');
		announcement.setAttribute('aria-live', 'polite');
		announcement.setAttribute('aria-atomic', 'true');
		announcement.className = 'sr-only';
		announcement.textContent = message;
		document.body.appendChild(announcement);

		// アナウンス後に削除
		setTimeout(() => {
			if (document.body.contains(announcement)) {
				document.body.removeChild(announcement);
			}
		}, 1000);
	};

	// 外側クリックでのクローズ
	$effect(() => {
		if (!dialogRef || !isOpen) return;

		const handleClick = (event: MouseEvent) => {
			try {
				if (!closeIfClickOutside) return;
				if (!containerRef || !event.target) return;
				if (!containerRef.contains(event.target as Node)) {
					close();
				}
			} catch {
				// エラーを無視して続行
			}
		};

		try {
			dialogRef.addEventListener('click', handleClick);
		} catch {
			// エラーを無視して続行
		}

		return () => {
			try {
				if (dialogRef) {
					dialogRef.removeEventListener('click', handleClick);
				}
			} catch {
				// エラーを無視して続行
			}
		};
	});

	// ESCキーでのクローズ
	$effect(() => {
		if (!isOpen || !dialogRef) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			try {
				if (event.key === 'Escape') {
					close();
				}
			} catch {
				// エラーを無視して続行
			}
		};

		try {
			document.addEventListener('keydown', handleKeyDown);
		} catch {
			// エラーを無視して続行
		}

		return () => {
			try {
				document.removeEventListener('keydown', handleKeyDown);
			} catch {
				// エラーを無視して続行
			}
		};
	});

	// フォーカストラップ
	$effect(() => {
		if (!isOpen || !dialogRef) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			try {
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
			} catch {
				// エラーを無視して続行
			}
		};

		try {
			dialogRef.addEventListener('keydown', handleKeyDown);
		} catch {
			// エラーを無視して続行
		}

		return () => {
			try {
				if (dialogRef) {
					dialogRef.removeEventListener('keydown', handleKeyDown);
				}
			} catch {
				// エラーを無視して続行
			}
		};
	});

	$effect(() => {
		if (dialogRef) {
			try {
				if (isOpen) {
					open();
				} else {
					close();
				}
			} catch {
				// エラーを無視して続行
			}
		}
	});
	export const open = (): void => {
		try {
			if (!dialogRef) return;

			isOpen = true;
			previousActiveElement = document.activeElement as HTMLElement;
			dialogRef.classList.add('fade-in');
			dialogRef.removeEventListener('animationend', closeEnd);
			dialogRef.showModal();

			setTimeout(() => {
				try {
					// 最初のフォーカス可能要素にフォーカス
					const firstFocusableElement = dialogRef.querySelector(
						'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
					) as HTMLElement;
					firstFocusableElement?.focus();
				} catch {
					// エラーを無視して続行
				}

				// スクリーンリーダーにダイアログが開いたことをアナウンス
				const titleText = title || 'Dialog';
				announceToScreenReader(`${titleText} opened`);
			}, 0);
		} catch {
			// エラーを無視して続行
		}
	};

	export const close = (): void => {
		try {
			if (!dialogRef) return;

			isOpen = false;
			dialogRef.classList.add('fade-out');
			dialogRef.addEventListener('animationend', closeEnd, { once: true });

			// スクリーンリーダーにダイアログが閉じたことをアナウンス
			const titleText = title || 'Dialog';
			announceToScreenReader(`${titleText} closed`);
		} catch {
			// エラーを無視して続行
		}
	};

	export const closeEnd = (): void => {
		try {
			if (!dialogRef) return;

			dialogRef.close();
			dialogRef.classList.remove('fade-out');

			// オプションが有効な場合のみ元の要素にフォーカスを戻す
			if (restoreFocus && previousActiveElement) {
				try {
					previousActiveElement.focus();
				} catch {
					// エラーを無視して続行
				}
			}
			previousActiveElement = null;
		} catch {
			// エラーを無視して続行
		}
	};
</script>

<dialog
	bind:this={dialogRef}
	class:scrollable
	class={isOpen ? 'fade-in' : 'fade-out'}
	style="width: {width}px"
	aria-modal="true"
	aria-labelledby={title ? 'dialog-title' : undefined}
	aria-describedby={ariaDescribedby || (description ? 'dialog-description' : undefined)}
>
	<div class="dialog-contents" bind:this={containerRef}>
		{#if header || title}
			<div class="header">
				{#if header}
					{@render header()}
				{:else}
					<div class="title-block" id="dialog-title">
						{title || ''}
					</div>
				{/if}
			</div>
		{/if}
		{#if description}
			<div class="description" id="dialog-description">
				{description}
			</div>
		{/if}
		{#if children}
			<div class="body">
				{@render children()}
			</div>
		{/if}
		{#if body}
			<div class="body">
				{@render body()}
			</div>
		{/if}
		{#if footer}
			<div class="footer">
				{@render footer()}
			</div>
		{/if}
	</div>
</dialog>

<style lang="scss">
	dialog {
		padding: 0;
		overflow: hidden;
		border-width: 0;
		border-radius: var(--svelte-ui-dialog-border-radius);
		background-color: var(--svelte-ui-surface-color);
		color: var(--svelte-ui-text-color);
		box-shadow:
			0 11px 15px -7px rgb(0 0 0 / 20%),
			0 24px 38px 3px rgb(0 0 0 / 14%),
			0 9px 46px 8px rgb(0 0 0 / 12%);
	}
	dialog::backdrop {
		position: fixed;
		inset: 0;
		background: rgb(0 0 0 / 40%);
	}
	dialog:focus {
		outline: none;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	dialog.fade-in,
	dialog.fade-in::backdrop {
		animation: fadeIn var(--svelte-ui-transition-duration, 300ms) forwards;
	}
	@keyframes fadeOut {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}
	dialog.fade-out,
	dialog.fade-out::backdrop {
		animation: fadeOut var(--svelte-ui-transition-duration, 300ms) forwards;
	}
	.dialog-contents {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		max-height: calc(100dvh - 2em - 6px);
		overflow: hidden;
	}
	.header {
		display: flex;
		gap: var(--svelte-ui-dialog-gap);
		align-items: center;
		justify-content: stretch;
		min-height: var(--svelte-ui-dialog-header-height);
		padding: var(--svelte-ui-dialog-padding);
		margin-bottom: calc(0px - var(--svelte-ui-dialog-body-padding));
		.title-block {
			flex-grow: 1;
			font-size: var(--svelte-ui-dialog-title-font-size);
			line-height: normal;
			color: var(--svelte-ui-text-color);
		}
	}
	.body {
		flex-shrink: 1;
		position: relative;
		padding: var(--svelte-ui-dialog-body-padding);
	}
	.footer {
		display: flex;
		gap: var(--svelte-ui-dialog-gap-sm);
		justify-content: end;
		padding: var(--svelte-ui-dialog-footer-padding);
	}

	.description {
		color: var(--svelte-ui-text-subtle-color);
		font-size: var(--svelte-ui-dialog-description-font-size);
		line-height: 1.4;
		margin: 0;
		padding: var(--svelte-ui-dialog-description-padding);
		border-bottom: 1px solid var(--svelte-ui-border-weak-color);
	}
	.scrollable {
		.header {
			margin-bottom: 0;
			border-bottom: solid var(--svelte-ui-border-width, 1px) var(--svelte-ui-border-weak-color);
		}
		.body {
			flex-shrink: 1;
			padding: var(--svelte-ui-dialog-body-padding);
			overflow: auto;
		}
		.footer {
			border-top: solid var(--svelte-ui-border-width, 1px) var(--svelte-ui-border-weak-color);
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		dialog.fade-in,
		dialog.fade-in::backdrop,
		dialog.fade-out,
		dialog.fade-out::backdrop {
			animation-duration: 0.01s;
		}
	}

	/* Screen reader only content */
	:global(.sr-only) {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}
</style>
