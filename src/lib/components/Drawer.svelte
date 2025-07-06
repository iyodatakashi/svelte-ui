<script lang="ts">
	import type { Snippet } from 'svelte';
	let {
		isOpen = $bindable(false),
		scrollable = false,
		closeIfClickOutside = true,
		width = 240,
		position = 'left',
		children
	}: {
		isOpen?: boolean;
		scrollable?: boolean;
		closeIfClickOutside?: boolean;
		width?: number;
		position?: 'left' | 'right';
		children: Snippet;
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
	class="{isOpen ? 'fade-in' : 'fade-out'} {position}"
	style="width: {width}px"
>
	<div class="dialog-contents" bind:this={containerRef}>
		{@render children()}
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
		overflow: auto;
	}
</style>
