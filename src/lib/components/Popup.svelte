<!-- Popup.svelte -->

<script lang="ts">
	/**
	 * 🚨 CRITICAL: DO NOT MANAGE POPUP STATE FROM PARENT COMPONENTS
	 *
	 * This Popup component manages its own open/closed state internally.
	 * Parent components must NEVER create their own popup state variables.
	 *
	 * ❌ WRONG: let isPopupOpen = $state(false)
	 * ✅ RIGHT: Use popupRef.open(), popupRef.close(), popupRef.toggle()
	 * ✅ RIGHT: Use onOpen/onClose callbacks for side effects
	 *
	 * This prevents state synchronization bugs and ensures consistent behavior.
	 */

	import type { Snippet } from 'svelte';
	import { onDestroy, tick, onMount } from 'svelte';
	import { isMobileDevice, disableBodyScroll, getViewportSize } from '../utils/mobile';
	import { announceOpenClose } from '../utils/accessibility';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// Snippet
		children,

		// DOM参照
		anchorElement,

		// 基本プロパティ
		role = 'menu',

		// スタイル/レイアウト
		position = 'bottom',
		margin = 8,

		// 状態/動作
		isOpen = $bindable(false),
		focusTrap = false,
		restoreFocus = false,
		mobileFullscreen = false,
		mobileBehavior = 'auto',
		allowRepositioning = true,

		// ARIA/アクセシビリティ
		ariaLabel,
		ariaLabelledby,
		ariaDescribedby,

		// イベントハンドラー
		onOpen = () => {},
		onClose = () => {}
	}: {
		// Snippet
		children: Snippet;

		// DOM参照
		anchorElement: HTMLElement;

		// 基本プロパティ
		role?: string;

		// スタイル/レイアウト
		position?:
			| 'top'
			| 'bottom'
			| 'left'
			| 'right'
			| 'top-left'
			| 'top-center'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-center'
			| 'bottom-right'
			| 'left-top'
			| 'left-center'
			| 'left-bottom'
			| 'right-top'
			| 'right-center'
			| 'right-bottom'
			| 'auto';
		margin?: number;

		// 状態/動作
		isOpen?: boolean;
		focusTrap?: boolean;
		restoreFocus?: boolean;
		mobileFullscreen?: boolean;
		mobileBehavior?: 'auto' | 'fullscreen' | 'popup';
		allowRepositioning?: boolean;

		// ARIA/アクセシビリティ
		ariaLabel?: string;
		ariaLabelledby?: string;
		ariaDescribedby?: string;

		// イベントハンドラー
		onOpen?: () => void;
		onClose?: () => void;
	} = $props();

	let popupRef: HTMLDivElement | undefined = $state();
	let popupId: string = $state(`popup-${Math.random().toString(36).substring(2, 15)}`);
	let previousActiveElement: HTMLElement | null = null;
	let isMobile: boolean = $state(false);
	let shouldUseFullscreen: boolean = $state(false);
	let bodyScrollCleanup: (() => void) | undefined = $state();

	// =========================================================================
	// Lifecycle
	// =========================================================================
	onMount(() => {
		isMobile = isMobileDevice();

		if (mobileBehavior === 'auto') {
			shouldUseFullscreen = isMobile;
		} else if (mobileBehavior === 'fullscreen') {
			shouldUseFullscreen = true;
		} else {
			shouldUseFullscreen = mobileFullscreen;
		}
	});

	onDestroy(() => {
		removeEventListenersToClose();
		removeKeyboardListener();
		cleanupMobileFeatures();
	});

	// =========================================================================
	// Effects
	// =========================================================================
	$effect(() => {
		if (isOpen) {
			if (popupRef && popupRef.matches(':popover-open')) {
				return;
			}
			open();
		} else {
			if (!popupRef || !popupRef.matches(':popover-open')) {
				return;
			}
			close();
		}
	});

	// =========================================================================
	// Methods
	// =========================================================================
	const handleKeyDown = (event: KeyboardEvent) => {
		if (!isOpen) return;

		switch (event.key) {
			case 'Escape':
				event.preventDefault();
				close();
				break;
			case 'Tab':
				if (focusTrap) {
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

	const handleScroll = (event: Event) => {
		const target = event.target;

		if (
			popupRef &&
			target &&
			target instanceof Element &&
			(popupRef.contains(target) || target === popupRef)
		) {
			return;
		}

		if (anchorElement && target) {
			if (target === document || target === document.documentElement || target === document.body) {
				close();
				return;
			}

			if (target instanceof Element && target.contains(anchorElement)) {
				close();
				return;
			}
		}
	};

	const getBestPosition = (
		anchorRect: DOMRect,
		popupRect: DOMRect,
		viewport: { width: number; height: number },
		margin: number
	): typeof position => {
		const spaceAbove = anchorRect.top;
		const spaceBelow = viewport.height - anchorRect.bottom;
		const spaceLeft = anchorRect.left;
		const spaceRight = viewport.width - anchorRect.right;

		const needHeight = popupRect.height + margin;
		const needWidth = popupRect.width + margin;

		const candidates = [
			{ position: 'bottom-center' as const, score: spaceBelow >= needHeight ? spaceBelow : 0 },
			{
				position: 'top-center' as const,
				score: !allowRepositioning ? 0 : spaceAbove >= needHeight ? spaceAbove : 0
			},
			{ position: 'right-center' as const, score: spaceRight >= needWidth ? spaceRight : 0 },
			{ position: 'left-center' as const, score: spaceLeft >= needWidth ? spaceLeft : 0 }
		];

		const best = candidates.reduce((a, b) => (a.score > b.score ? a : b));
		return best.score > 0 ? best.position : 'bottom-center';
	};

	const calculatePosition = (
		pos: typeof position,
		anchorRect: DOMRect,
		popupRect: DOMRect,
		viewport: { width: number; height: number },
		margin: number
	): { x: number; y: number } => {
		let x = 0;
		let y = 0;

		switch (pos) {
			case 'top':
			case 'top-center':
				x = anchorRect.left + (anchorRect.width - popupRect.width) / 2;
				y = anchorRect.top - popupRect.height - margin;
				break;
			case 'top-left':
				x = anchorRect.left;
				y = anchorRect.top - popupRect.height - margin;
				break;
			case 'top-right':
				x = anchorRect.right - popupRect.width;
				y = anchorRect.top - popupRect.height - margin;
				break;
			case 'bottom':
			case 'bottom-center':
				x = anchorRect.left + (anchorRect.width - popupRect.width) / 2;
				y = anchorRect.bottom + margin;
				break;
			case 'bottom-left':
				x = anchorRect.left;
				y = anchorRect.bottom + margin;
				break;
			case 'bottom-right':
				x = anchorRect.right - popupRect.width;
				y = anchorRect.bottom + margin;
				break;
			case 'left':
			case 'left-center':
				x = anchorRect.left - popupRect.width - margin;
				y = anchorRect.top + (anchorRect.height - popupRect.height) / 2;
				break;
			case 'left-top':
				x = anchorRect.left - popupRect.width - margin;
				y = anchorRect.top;
				break;
			case 'left-bottom':
				x = anchorRect.left - popupRect.width - margin;
				y = anchorRect.bottom - popupRect.height;
				break;
			case 'right':
			case 'right-center':
				x = anchorRect.right + margin;
				y = anchorRect.top + (anchorRect.height - popupRect.height) / 2;
				break;
			case 'right-top':
				x = anchorRect.right + margin;
				y = anchorRect.top;
				break;
			case 'right-bottom':
				x = anchorRect.right + margin;
				y = anchorRect.bottom - popupRect.height;
				break;
		}

		x = Math.max(margin, Math.min(x, viewport.width - popupRect.width - margin));

		if (!allowRepositioning) {
			y = Math.max(margin, y);
			if (y + popupRect.height + margin > viewport.height) {
				const availableHeight = viewport.height - y - margin;
				if (popupRef) {
					popupRef.style.maxHeight = `${availableHeight}px`;
					popupRef.style.overflowY = 'auto';
				}
			}
		} else {
			y = Math.max(margin, Math.min(y, viewport.height - popupRect.height - margin));
		}

		return { x, y };
	};

	const setPosition = (): void => {
		if (anchorElement && popupRef) {
			const anchorRect = anchorElement.getBoundingClientRect();
			const popupRect = popupRef.getBoundingClientRect();
			const viewport = {
				width: window.innerWidth,
				height: window.innerHeight
			};

			let actualPosition = position;

			if (position === 'auto') {
				actualPosition = getBestPosition(anchorRect, popupRect, viewport, margin);
			}

			const coords = calculatePosition(actualPosition, anchorRect, popupRect, viewport, margin);

			popupRef.style.setProperty('left', '0px', 'important');
			popupRef.style.setProperty('top', '0px', 'important');
			popupRef.style.setProperty('position', 'fixed', 'important');
			popupRef.style.setProperty(
				'transform',
				`translate(${coords.x}px, ${coords.y}px)`,
				'important'
			);
		}
	};

	const addEventListenersToClose = () => {
		window.addEventListener('resize', close);
		window.addEventListener('scroll', handleScroll, true);
		document.querySelectorAll('.scrollable').forEach((element) => {
			element.addEventListener('scroll', handleScroll);
		});
	};

	const removeEventListenersToClose = () => {
		window.removeEventListener('resize', close);
		window.removeEventListener('scroll', handleScroll, true);
		document.querySelectorAll('.scrollable').forEach((element) => {
			element.removeEventListener('scroll', handleScroll);
		});
	};

	const addKeyboardListener = () => {
		document.addEventListener('keydown', handleKeyDown);
	};

	const removeKeyboardListener = () => {
		document.removeEventListener('keydown', handleKeyDown);
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

	const announceToScreenReader = () => {
		if (!ariaLabel && !ariaLabelledby) return;
		announceOpenClose('Popup', true, ariaLabel);
	};

	const setupMobileFeatures = () => {
		if (!popupRef || !isMobile) return;

		if (shouldUseFullscreen) {
			bodyScrollCleanup = disableBodyScroll();
		}
	};

	const cleanupMobileFeatures = () => {
		if (bodyScrollCleanup) {
			bodyScrollCleanup();
			bodyScrollCleanup = undefined;
		}
	};

	const closeEnd = () => {
		popupRef?.hidePopover();

		if (popupRef) {
			popupRef.style.maxHeight = '';
			popupRef.style.overflowY = '';
		}

		if (restoreFocus && previousActiveElement) {
			previousActiveElement.focus();
		}
		previousActiveElement = null;

		// アニメーション完了後にonCloseを呼ぶ
		onClose?.();
	};

	const clickOutside = (element: HTMLElement, callbackFunction: Function) => {
		function onClick(event: MouseEvent) {
			if (!(event.target instanceof Node)) return;

			const isInsidePopup = element.contains(event.target);
			const isInsideAnchor = anchorElement && anchorElement.contains(event.target);
			const isOutside = !isInsidePopup && !isInsideAnchor;

			if (isOutside) {
				callbackFunction();
				event.stopPropagation();
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

	export const open = async () => {
		previousActiveElement = document.activeElement as HTMLElement;

		setTimeout(async () => {
			popupRef?.removeEventListener('animationend', closeEnd);
			popupRef?.showPopover();
			isOpen = true;
			addEventListenersToClose();
			addKeyboardListener();

			await tick();

			if (!shouldUseFullscreen) {
				setPosition();
				await new Promise((resolve) => requestAnimationFrame(resolve));
				setPosition();
			}

			setupMobileFeatures();

			if (focusTrap) {
				focusFirstElement();
			}

			announceToScreenReader();
			onOpen?.();
		}, 1);
	};

	export const close = () => {
		isOpen = false;
		removeEventListenersToClose();
		removeKeyboardListener();
		cleanupMobileFeatures();
		popupRef?.addEventListener('animationend', closeEnd, { once: true });
		// onCloseはアニメーション完了後に呼ぶ（closeEndで実行）
	};

	export const toggle = () => {
		if (isOpen) {
			close();
		} else {
			open();
		}
	};

	export const getIsOpen = () => {
		return isOpen;
	};
</script>

<div
	popover="manual"
	bind:this={popupRef}
	class="popup"
	class:fade-out={!isOpen}
	class:mobile={isMobile}
	class:fullscreen={shouldUseFullscreen}
	{role}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	aria-describedby={ariaDescribedby}
	aria-modal={undefined}
	id={popupId}
	use:clickOutside={() => {
		close();
	}}
>
	{#if shouldUseFullscreen}
		<div class="popup__mobile">
			<div class="popup__mobile-content">
				{@render children()}
			</div>
		</div>
	{:else}
		{@render children()}
	{/if}
</div>

<style lang="scss">
	:popover-open {
		border: solid 1px var(--svelte-ui-border-weak-color);
		border-radius: 4px;
		box-shadow:
			0 11px 15px -7px rgb(0 0 0 / 20%),
			0 24px 38px 3px rgb(0 0 0 / 14%),
			0 9px 46px 8px rgb(0 0 0 / 12%);
		background: var(--svelte-ui-surface-color);
		z-index: 1000; /* Popupを最前面に表示 */
	}

	:popover-open:focus-visible {
		outline: 2px solid var(--svelte-ui-popup-focus-color);
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

	/* =============================================
	 * Mobile-specific styles
	 * ============================================= */
	:popover-open.mobile {
		position: fixed;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		border: none;
		border-radius: 0;
		box-shadow: none;
		background: transparent;
		z-index: var(--svelte-ui-z-modal);
	}

	:popover-open.mobile.fullscreen {
		padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom)
			env(safe-area-inset-left);
	}

	.popup__mobile {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--svelte-ui-surface-color);
		border-top-left-border-radius: var(--svelte-ui-popup-mobile-border-radius);
		border-top-right-border-radius: var(--svelte-ui-popup-mobile-border-radius);
		max-height: 90vh;
		overflow: hidden;
		animation: slideUpMobile 300ms ease-out;
		box-shadow:
			0 -4px 6px -1px rgb(0 0 0 / 10%),
			0 -2px 4px -1px rgb(0 0 0 / 6%);
	}

	.popup__mobile-content {
		padding: var(--svelte-ui-popup-mobile-margin);
		max-height: calc(90vh - 60px);
		overflow-y: auto;
	}

	/* Mobile animations */
	@keyframes slideUpMobile {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}

	:popover-open.mobile.fullscreen.fade-out .popup__mobile {
		animation: slideDownMobile 300ms ease-in;
	}

	@keyframes slideDownMobile {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(100%);
		}
	}

	/* Responsive design adjustments */
	@media (max-width: 480px) {
		.popup__mobile {
			border-radius: 0;
			max-height: 100vh;
		}

		.popup__mobile-content {
			max-height: calc(100vh - 60px);
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
