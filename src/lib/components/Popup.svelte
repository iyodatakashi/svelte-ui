<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onDestroy } from 'svelte';
	let {
		anchorElement,
		position = 'bottom',
		children
	}: {
		anchorElement: HTMLElement;
		position?: 'top' | 'bottom' | 'left' | 'right';
		children: Snippet;
	} = $props();
	let isOpen: boolean = $state(false);
	let popupRef: HTMLDivElement | undefined = $state();
	onDestroy(() => {
		removeEventListenersToClose();
	});
	export const toggle = () => {
		if (isOpen) {
			close();
		} else {
			open();
		}
	};
	export const open = () => {
		setTimeout(() => {
			popupRef?.removeEventListener('animationend', closeEnd);
			popupRef?.showPopover();
			setPosition();
			isOpen = true;
			addEventListenersToClose();
		}, 1);
	};
	export const close = () => {
		isOpen = false;
		removeEventListenersToClose();
		popupRef?.addEventListener('animationend', closeEnd, { once: true });
	};
	export const closeEnd = () => {
		popupRef?.hidePopover();
	};
	const setPosition = (): void => {
		if (anchorElement && popupRef) {
			let x: number;
			let y: number;
			const anchorPosition = anchorElement.getBoundingClientRect();
			const popupPosition = popupRef.getBoundingClientRect();
			const windowSize = { width: window.innerWidth, height: window.innerHeight };
			const positionX = position === 'top' || position === 'bottom' ? 'center' : position;
			const positionY = position === 'left' || position === 'right' ? 'center' : position;
			switch (positionX) {
				case 'center':
					x = Math.min(
						Math.max(anchorPosition.left + (anchorPosition.width - popupPosition.width) / 2, 4),
						windowSize.width - popupPosition.width - 4
					);
					break;
				case 'left':
					x = Math.max(anchorPosition.left - anchorPosition.width, 4);
					break;
				case 'right':
					x = Math.min(anchorPosition.right, windowSize.width - popupPosition.width - 4);
					break;
			}
			switch (positionY) {
				case 'center':
					y = Math.min(
						Math.max(anchorPosition.top + (anchorPosition.height - popupPosition.height) / 2, 4),
						windowSize.height - popupPosition.height - 4
					);
					break;
				case 'top':
					y = Math.max(anchorPosition.top - popupPosition.height, 4);
					break;
				case 'bottom':
					y = Math.min(anchorPosition.bottom, windowSize.height - popupPosition.height - 4);
					break;
			}
			popupRef.style.left = x + 'px';
			popupRef.style.top = y + 'px';
		}
	};
	const addEventListenersToClose = () => {
		window.addEventListener('resize', close);
		document.querySelectorAll('.scrollable').forEach((element) => {
			element.addEventListener('scroll', close);
		});
	};
	const removeEventListenersToClose = () => {
		window.removeEventListener('resize', close);
		document.querySelectorAll('.scrollable').forEach((element) => {
			element.removeEventListener('scroll', close);
		});
	};
	const clickOutside = (element: HTMLElement, callbackFunction: Function) => {
		function onClick(event: MouseEvent) {
			if (event.target instanceof Node && !element.contains(event.target)) {
				callbackFunction();
			}
		}
		setTimeout(() => {
			document.body.addEventListener('click', onClick);
		}, 1);
		return {
			update(newCallbackFunction: Function) {
				callbackFunction = newCallbackFunction;
			},
			destroy() {
				document.body.removeEventListener('click', onClick);
			}
		};
	};
</script>

<div
	popover="manual"
	bind:this={popupRef}
	class:fade-out={!isOpen}
	use:clickOutside={() => {
		close();
	}}
>
	{@render children()}
</div>

<style lang="scss">
	:popover-open {
		border-radius: 4px;
		box-shadow:
			0 11px 15px -7px rgb(0 0 0 / 20%),
			0 24px 38px 3px rgb(0 0 0 / 14%),
			0 9px 46px 8px rgb(0 0 0 / 12%);
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	:popover-open,
	:popover-open::backdrop {
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
	:popover-open.fade-out,
	:popover-open.fade-out::backdrop {
		animation: fadeOut 300ms forwards;
	}
</style>
