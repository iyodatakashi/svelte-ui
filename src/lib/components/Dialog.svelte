<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		isOpen = $bindable(false),
		title = '',
		scrollable = false,
		closeIfClickOutside = true,
		width = 320,
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
		header?: Snippet;
		body?: Snippet;
		children?: Snippet;
		footer?: Snippet;
	} = $props();
	let dialogRef: HTMLDialogElement;
	let containerRef: HTMLDivElement;
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
		dialogRef.classList.add('fade-in');
		dialogRef.removeEventListener('animationend', closeEnd);
		dialogRef.showModal();
		setTimeout(() => {
			const activeElement = document.activeElement as HTMLElement | null;
			activeElement?.blur();
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
	};
</script>

<dialog
	bind:this={dialogRef}
	class:scrollable
	class={isOpen ? 'fade-in' : 'fade-out'}
	style="width: {width}px"
>
	<div class="dialog-contents" bind:this={containerRef}>
		{#if header || title}
			<div class="header">
				{#if header}
					{@render header()}
				{:else}
					<div class="title-block">
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
		padding: 0;
		overflow: hidden;
		border-width: 0;
		border-radius: 4px;
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
		animation: fadeIn 300ms forwards;
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
		animation: fadeOut 300ms forwards;
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
			border-bottom: solid 1px var(--border-light);
		}
		.body {
			flex-shrink: 1;
			padding: 24px;
			overflow: auto;
		}
		.footer {
			border-top: solid 1px var(--border-light);
		}
	}
</style>
