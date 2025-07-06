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
	import {
		isMobileDevice,
		createSwipeGestureDetector,
		disableBodyScroll,
		getViewportSize
	} from '$lib/utils/mobile';

	let {
		anchorElement,
		position = 'bottom',
		children,
		role = 'menu',
		ariaLabel,
		ariaLabelledby,
		ariaDescribedby,
		focusTrap = false,
		restoreFocus = false,
		onOpen,
		onClose,
		mobileFullscreen = false,
		enableSwipeToClose = true,
		mobileBehavior = 'auto', // 'auto' | 'fullscreen' | 'popup'
		margin = 8,
		allowRepositioning = true
	}: {
		anchorElement: HTMLElement;
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
		children: Snippet;
		role?: 'menu' | 'tooltip' | 'listbox';
		ariaLabel?: string;
		ariaLabelledby?: string;
		ariaDescribedby?: string;
		focusTrap?: boolean;
		restoreFocus?: boolean;
		onOpen?: () => void;
		onClose?: () => void;
		mobileFullscreen?: boolean;
		enableSwipeToClose?: boolean;
		mobileBehavior?: 'auto' | 'fullscreen' | 'popup';
		margin?: number;
		allowRepositioning?: boolean;
	} = $props();

	let isOpen: boolean = $state(false);
	let popupRef: HTMLDivElement | undefined = $state();
	let popupId: string = $state(`popup-${Math.random().toString(36).substr(2, 9)}`);
	let previousActiveElement: HTMLElement | null = null;

	// モバイル関連の状態
	let isMobile: boolean = $state(false);
	let shouldUseFullscreen: boolean = $state(false);
	let swipeCleanup: (() => void) | undefined = $state();
	let bodyScrollCleanup: (() => void) | undefined = $state();

	onMount(() => {
		// モバイルデバイス検出
		isMobile = isMobileDevice();

		// モバイル表示モードの決定
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
		previousActiveElement = document.activeElement as HTMLElement;

		setTimeout(async () => {
			popupRef?.removeEventListener('animationend', closeEnd);

			popupRef?.showPopover();

			isOpen = true;
			addEventListenersToClose();
			addKeyboardListener();

			await tick();

			// サイズを取得して正しい位置を計算
			if (!shouldUseFullscreen) {
				setPosition();

				// 追加で正確な位置計算（サイズ確定後）
				await new Promise((resolve) => requestAnimationFrame(resolve));
				setPosition();
			}

			// モバイル機能の設定
			setupMobileFeatures();

			// Set focus to the popup or first focusable element
			if (focusTrap) {
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

		// モバイル機能のクリーンアップ
		cleanupMobileFeatures();

		popupRef?.addEventListener('animationend', closeEnd, { once: true });

		// Notify parent component
		onClose?.();
	};

	export const getIsOpen = () => {
		return isOpen;
	};

	const closeEnd = () => {
		popupRef?.hidePopover();

		// 高さ制限をリセット
		if (popupRef) {
			popupRef.style.maxHeight = '';
			popupRef.style.overflowY = '';
		}

		// オプションが有効な場合のみ元の要素にフォーカスを戻す
		if (restoreFocus && previousActiveElement) {
			previousActiveElement.focus();
		}
		previousActiveElement = null;
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
			const anchorRect = anchorElement.getBoundingClientRect();
			const popupRect = popupRef.getBoundingClientRect();
			const viewport = {
				width: window.innerWidth,
				height: window.innerHeight
			};

			let actualPosition = position;

			// Auto positioning: 最適なポジションを自動選択
			if (position === 'auto') {
				actualPosition = getBestPosition(anchorRect, popupRect, viewport, margin);
			}

			const coords = calculatePosition(actualPosition, anchorRect, popupRect, viewport, margin);

			// 位置指定
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

	const getBestPosition = (
		anchorRect: DOMRect,
		popupRect: DOMRect,
		viewport: { width: number; height: number },
		margin: number
	): typeof position => {
		// スペースの計算
		const spaceAbove = anchorRect.top;
		const spaceBelow = viewport.height - anchorRect.bottom;
		const spaceLeft = anchorRect.left;
		const spaceRight = viewport.width - anchorRect.right;

		// 必要なスペース
		const needHeight = popupRect.height + margin;
		const needWidth = popupRect.width + margin;

		// 各方向の候補をスコアリング
		const candidates = [
			{ position: 'bottom-center' as const, score: spaceBelow >= needHeight ? spaceBelow : 0 },
			{
				position: 'top-center' as const,
				score: !allowRepositioning ? 0 : spaceAbove >= needHeight ? spaceAbove : 0
			},
			{ position: 'right-center' as const, score: spaceRight >= needWidth ? spaceRight : 0 },
			{ position: 'left-center' as const, score: spaceLeft >= needWidth ? spaceLeft : 0 }
		];

		// 最も良いポジションを選択
		const best = candidates.reduce((a, b) => (a.score > b.score ? a : b));
		return best.score > 0 ? best.position : 'bottom-center'; // フォールバック
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

		// 基本ポジション計算
		switch (pos) {
			// Top positions
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

			// Bottom positions
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

			// Left positions
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

			// Right positions
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

		// 画面端での調整
		x = Math.max(margin, Math.min(x, viewport.width - popupRect.width - margin));

		// allowRepositioning が false の場合は位置調整せず、高さを制限
		if (!allowRepositioning) {
			y = Math.max(margin, y);
			// 画面下端からはみ出す場合は高さを制限
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
			if (!(event.target instanceof Node)) return;

			// Popup要素とanchorElement両方をチェック
			const isInsidePopup = element.contains(event.target);
			const isInsideAnchor = anchorElement && anchorElement.contains(event.target);
			const isOutside = !isInsidePopup && !isInsideAnchor;

			if (isOutside) {
				callbackFunction();
				event.stopPropagation(); // イベント伝播を止める
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

	// モバイル機能の管理
	const setupMobileFeatures = () => {
		if (!popupRef || !isMobile) return;

		// スワイプジェスチャーの設定
		if (enableSwipeToClose) {
			swipeCleanup = createSwipeGestureDetector(
				popupRef,
				(result) => {
					// 下方向のスワイプで閉じる
					if (result.direction === 'down' && result.distance > 80) {
						close();
					}
				},
				{
					threshold: 50,
					restraint: 120,
					allowedTime: 500
				}
			);
		}

		// フルスクリーンモードでボディスクロールを無効化
		if (shouldUseFullscreen) {
			bodyScrollCleanup = disableBodyScroll();
		}
	};

	const cleanupMobileFeatures = () => {
		if (swipeCleanup) {
			swipeCleanup();
			swipeCleanup = undefined;
		}
		if (bodyScrollCleanup) {
			bodyScrollCleanup();
			bodyScrollCleanup = undefined;
		}
	};
</script>

<div
	popover="manual"
	bind:this={popupRef}
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
		<div class="mobile-container">
			{#if enableSwipeToClose}
				<div class="swipe-indicator"></div>
			{/if}
			<div class="mobile-content">
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

	.mobile-container {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: var(--svelte-ui-surface-color);
		border-top-left-radius: var(--svelte-ui-popup-mobile-border-radius);
		border-top-right-radius: var(--svelte-ui-popup-mobile-border-radius);
		max-height: 90vh;
		overflow: hidden;
		animation: slideUpMobile 300ms ease-out;
		box-shadow:
			0 -4px 6px -1px rgb(0 0 0 / 10%),
			0 -2px 4px -1px rgb(0 0 0 / 6%);
	}

	.swipe-indicator {
		width: 36px;
		height: 4px;
		background: var(--svelte-ui-border-color);
		border-radius: 2px;
		margin: 8px auto;
		opacity: 0.6;
	}

	.mobile-content {
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

	:popover-open.mobile.fullscreen.fade-out .mobile-container {
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
		.mobile-container {
			border-radius: 0;
			max-height: 100vh;
		}

		.mobile-content {
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
