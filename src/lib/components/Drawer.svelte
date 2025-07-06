<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		isOpen = $bindable(false),
		title = '',
		scrollable = true,
		closeIfClickOutside = true,
		width = 240,
		position = 'left',
		ariaLabel = 'Navigation drawer',
		restoreFocus = false,
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
		position?: 'left' | 'right';
		ariaLabel?: string;
		restoreFocus?: boolean;
		header?: Snippet;
		body?: Snippet;
		children?: Snippet;
		footer?: Snippet;
	} = $props();
	let dialogRef: HTMLDialogElement;
	let containerRef: HTMLDivElement;
	let previousActiveElement: HTMLElement | null = null;

	// 外側クリックでのクローズ
	$effect(() => {
		if (!dialogRef) return;

		const handleClick = (event: MouseEvent) => {
			if (!closeIfClickOutside) return;
			if (!containerRef.contains(event.target as Node)) {
				close();
			}
		};

		dialogRef.addEventListener('click', handleClick);

		return () => {
			dialogRef.removeEventListener('click', handleClick);
		};
	});

	// ESCキーでのクローズ
	$effect(() => {
		if (!isOpen) return;

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
			dialogRef.removeEventListener('keydown', handleKeyDown);
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
	export const open = (): void => {
		isOpen = true;
		previousActiveElement = document.activeElement as HTMLElement;
		dialogRef.classList.add('fade-in');
		dialogRef.removeEventListener('animationend', closeEnd);
		dialogRef.showModal();
		setTimeout(() => {
			// 最初のフォーカス可能要素にフォーカス
			const firstFocusableElement = dialogRef.querySelector(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			) as HTMLElement;
			firstFocusableElement?.focus();
		}, 0);
	};
	export const close = (): void => {
		isOpen = false;
		dialogRef.classList.add('fade-out');
		dialogRef.addEventListener('animationend', closeEnd, { once: true });
	};
	export const closeEnd = (): void => {
		dialogRef.close();
		dialogRef.classList.remove('fade-out');
		// オプションが有効な場合のみ元の要素にフォーカスを戻す
		if (restoreFocus && previousActiveElement) {
			previousActiveElement.focus();
		}
		previousActiveElement = null;
	};
</script>

<dialog
	bind:this={dialogRef}
	class:scrollable
	class="{isOpen ? 'fade-in' : 'fade-out'} {position}"
	style="width: {width}px"
	aria-modal="true"
	aria-label={ariaLabel}
	aria-labelledby={title ? 'drawer-title' : undefined}
>
	<div class="dialog-contents" bind:this={containerRef}>
		{#if header || title}
			<div class="header">
				{#if header}
					{@render header()}
				{:else}
					<div class="title-block" id="drawer-title">
						{title || ''}
					</div>
				{/if}
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
		width: 240px;
		min-height: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
		overflow: hidden;
		border-width: 0;
		box-shadow:
			0 11px 15px -7px rgb(0 0 0 / 20%),
			0 24px 38px 3px rgb(0 0 0 / 14%),
			0 9px 46px 8px rgb(0 0 0 / 12%);
	}
	dialog:-internal-dialog-in-top-layer {
		max-height: none;
	}
	dialog::backdrop {
		position: fixed;
		inset: 0;
		background: rgb(0 0 0 / 40%);
		left: 0;
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
	@keyframes fadeInFromLeft {
		from {
			opacity: 0;
			left: -240px;
		}
		to {
			opacity: 1;
			left: 0;
		}
	}
	@keyframes fadeInFromRight {
		from {
			opacity: 0;
			left: 100%;
		}
		to {
			opacity: 1;
			left: calc(100% - 240px);
		}
	}
	dialog.right.fade-in {
		animation: fadeInFromRight 300ms forwards;
	}
	dialog.right.fade-in::backdrop {
		animation: fadeIn 300ms forwards;
	}
	dialog.fade-in {
		animation: fadeInFromLeft 300ms forwards;
	}
	@keyframes fadeOutToLeft {
		from {
			opacity: 1;
			left: 0;
		}
		to {
			opacity: 0;
			left: -240px;
		}
	}
	@keyframes fadeOutToRight {
		from {
			opacity: 1;
			left: calc(100% - 240px);
		}
		to {
			opacity: 0;
			left: 100%;
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
	dialog.left.fade-out {
		animation: fadeOutToLeft 300ms forwards;
	}
	dialog.right.fade-out {
		animation: fadeOutToRight 300ms forwards;
	}
	dialog.fade-out::backdrop {
		animation: fadeOut 300ms forwards;
	}
	.dialog-contents {
		display: flex;
		flex-direction: column;
		justify-content: stretch;
		height: 100%;
		overflow: hidden;
	}
	.header {
		display: flex;
		gap: 16px;
		align-items: center;
		justify-content: stretch;
		min-height: 56px;
		padding: 16px 24px;
		margin-bottom: -24px;
		.title-block {
			flex-grow: 1;
			font-size: 1.4rem;
			line-height: normal;
		}
	}
	.body {
		flex-shrink: 1;
		position: relative;
		padding: 24px;
		flex-grow: 1;
	}
	.footer {
		display: flex;
		gap: 8px;
		justify-content: end;
		padding: 8px;
	}
	.scrollable {
		.header {
			margin-bottom: 0;
			border-bottom: solid 1px var(--svelte-ui-border-weak-color);
		}
		.body {
			flex-shrink: 1;
			padding: 24px;
			overflow: auto;
		}
		.footer {
			border-top: solid 1px var(--svelte-ui-border-weak-color);
		}
	}
</style>
