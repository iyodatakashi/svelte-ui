<script lang="ts">
	import type { Snippet } from 'svelte';
	import { onDestroy, tick } from 'svelte';

	let {
		anchorElement,
		position = 'bottom',
		children,
		role = 'dialog',
		ariaLabel,
		ariaLabelledby,
		ariaDescribedby,
		focusTrap = true,
		onOpen,
		onClose
	}: {
		anchorElement: HTMLElement;
		position?: 'top' | 'bottom' | 'left' | 'right';
		children: Snippet;
		role?: 'dialog' | 'menu' | 'tooltip' | 'listbox';
		ariaLabel?: string;
		ariaLabelledby?: string;
		ariaDescribedby?: string;
		focusTrap?: boolean;
		onOpen?: () => void;
		onClose?: () => void;
	} = $props();

	let isOpen: boolean = $state(false);
	let popupRef: HTMLDivElement | undefined = $state();
	let previousActiveElement: Element | null = $state(null);
	let popupId: string = $state(`popup-${Math.random().toString(36).substr(2, 9)}`);

	onDestroy(() => {
		removeEventListenersToClose();
		removeKeyboardListener();
	});

	const handleKeyDown = (event: KeyboardEvent) => {
		if (!isOpen) return;

		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				close();
				break;
			case 'Tab':
				if (focusTrap && role === 'dialog') {
					handleTabKey(event);
				}
				break;
		}
	};

	const handleTabKey = (event: KeyboardEvent) => {
		if (!popupRef) return;

		const focusableElements = popupRef.querySelectorAll(
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

	export const toggle = () => {
		if (isOpen) {
			close();
		} else {
			open();
		}
	};

	export const open = async () => {
		// Store the currently focused element
		previousActiveElement = document.activeElement;

		setTimeout(async () => {
			popupRef?.removeEventListener('animationend', closeEnd);
			popupRef?.showPopover();
			setPosition();
			isOpen = true;
			addEventListenersToClose();
			addKeyboardListener();

			await tick();

			// Set focus to the popup or first focusable element
			if (focusTrap && role === 'dialog') {
				focusFirstElement();
			}

			announceToScreenReader();

			// Notify parent component
			onOpen?.();
		}, 1);
	};

	export const close = () => {
		isOpen = false;
		removeEventListenersToClose();
		removeKeyboardListener();
		popupRef?.addEventListener('animationend', closeEnd, { once: true });

		// Restore focus to the element that opened the popup
		restoreFocus();

		// Notify parent component
		onClose?.();
	};

	const closeEnd = () => {
		popupRef?.hidePopover();
	};

	const focusFirstElement = () => {
		if (!popupRef) return;

		const focusableElement = popupRef.querySelector(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		) as HTMLElement;

		if (focusableElement) {
			focusableElement.focus();
		} else {
			popupRef.focus();
		}
	};

	const restoreFocus = () => {
		if (previousActiveElement instanceof HTMLElement) {
			previousActiveElement.focus();
		} else if (anchorElement) {
			anchorElement.focus();
		}
	};

	const announceToScreenReader = () => {
		if (!ariaLabel && !ariaLabelledby) return;

		const announcement = document.createElement('div');
		announcement.setAttribute('aria-live', 'polite');
		announcement.setAttribute('aria-atomic', 'true');
		announcement.className = 'sr-only';
		announcement.textContent = ariaLabel ? `${ariaLabel} opened` : 'Popup opened';
		document.body.appendChild(announcement);

		setTimeout(() => {
			if (document.body.contains(announcement)) {
				document.body.removeChild(announcement);
			}
		}, 1000);
	};

	const setPosition = (): void => {
		if (anchorElement && popupRef) {
			let x: number = 0;
			let y: number = 0;
			const anchorPosition = anchorElement.getBoundingClientRect();
			const popupPosition = popupRef.getBoundingClientRect();
			const windowSize = { width: window.innerWidth, height: window.innerHeight };
			const positionX: 'center' | 'left' | 'right' =
				position === 'top' || position === 'bottom' ? 'center' : (position as 'left' | 'right');
			const positionY: 'center' | 'top' | 'bottom' =
				position === 'left' || position === 'right' ? 'center' : (position as 'top' | 'bottom');
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

	const addKeyboardListener = () => {
		document.addEventListener('keydown', handleKeyDown);
	};

	const removeKeyboardListener = () => {
		document.removeEventListener('keydown', handleKeyDown);
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
	{role}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	aria-describedby={ariaDescribedby}
	aria-modal={role === 'dialog' ? 'true' : undefined}
	id={popupId}
	use:clickOutside={() => {
		close();
	}}
>
	{@render children()}
</div>

<style lang="scss">
	:popover-open {
		border: solid 1px var(--svelte-ui-border-weak);
		border-radius: 4px;
		box-shadow:
			0 11px 15px -7px rgb(0 0 0 / 20%),
			0 24px 38px 3px rgb(0 0 0 / 14%),
			0 9px 46px 8px rgb(0 0 0 / 12%);
		background: var(--svelte-ui-surface);
	}

	:popover-open:focus-visible {
		outline: 2px solid var(--svelte-ui-primary-color);
		outline-offset: 2px;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	:popover-open,
	:popover-open::backdrop {
		animation: fadeIn 300ms forwards;
	}

	@keyframes fadeOut {
		from {
			opacity: 1;
			transform: scale(1);
		}
		to {
			opacity: 0;
			transform: scale(0.95);
		}
	}

	:popover-open.fade-out,
	:popover-open.fade-out::backdrop {
		animation: fadeOut 300ms forwards;
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

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		:popover-open {
			border-width: 2px;
		}

		:popover-open:focus-visible {
			outline-width: 3px;
		}
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		:popover-open,
		:popover-open::backdrop,
		:popover-open.fade-out,
		:popover-open.fade-out::backdrop {
			animation-duration: 0.01s;
		}
	}
</style>
