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

	let {
		isOpen = $bindable(false),
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

		mobileBehavior = 'auto', // 'auto' | 'fullscreen' | 'popup'
		margin = 8,
		allowRepositioning = true
	}: {
		isOpen?: boolean;
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

		mobileBehavior?: 'auto' | 'fullscreen' | 'popup';
		margin?: number;
		allowRepositioning?: boolean;
	} = $props();
	let popupRef: HTMLDivElement | undefined = $state();
	let popupId: string = $state(`popup-${Math.random().toString(36).substring(2, 15)}`);
	let previousActiveElement: HTMLElement | null = null;

	// モバイル関連の状態
	let isMobile: boolean = $state(false);
	let shouldUseFullscreen: boolean = $state(false);

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

	// isOpen状態の同期処理
	$effect(() => {
		if (isOpen) {
			// すでに開いている場合は何もしない
			if (popupRef && popupRef.matches(':popover-open')) {
				return;
			}
			open();
		} else {
			// すでに閉じている場合は何もしない
			if (!popupRef || !popupRef.matches(':popover-open')) {
				return;
			}
			close();
		}
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
		announceOpenClose('Popup', true, ariaLabel);
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

	const handleScroll = (event: Event) => {
		// スクロールイベントが発生した要素を取得
		const target = event.target;

		// Popup内の要素かどうかを判定
		if (
			popupRef &&
			target &&
			target instanceof Element &&
			(popupRef.contains(target) || target === popupRef)
		) {
			// Popup内でのスクロールの場合は閉じない
			return;
		}

		// anchorElementの祖先要素がスクロールされた場合のみPopupを閉じる
		if (anchorElement && target) {
			// ページ全体のスクロール（document、documentElement、body）の場合は常に閉じる
			if (target === document || target === document.documentElement || target === document.body) {
				close();
				return;
			}

			// スクロールされた要素がanchorElementの祖先要素かどうかを判定
			if (target instanceof Element && target.contains(anchorElement)) {
				// anchorElementの親要素がスクロールされた場合は閉じる
				close();
				return;
			}
		}

		// 関係ない要素のスクロールの場合は何もしない
	};

	const addEventListenersToClose = () => {
		window.addEventListener('resize', close);

		// すべてのスクロールイベントを監視（キャプチャフェーズで捕捉）
		// これにより、ページ全体のスクロールやoverflow:scrollの要素のスクロールも検出される
		window.addEventListener('scroll', handleScroll, true);

		// 念のため、特定の.scrollableクラスの要素も監視
		document.querySelectorAll('.scrollable').forEach((element) => {
			element.addEventListener('scroll', handleScroll);
		});
	};

	const removeEventListenersToClose = () => {
		window.removeEventListener('resize', close);

		// スクロールイベントリスナーの削除
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

		// フルスクリーンモードでボディスクロールを無効化
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
		<div class="popup__mobile-container">
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

	.popup__mobile-container {
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

	:popover-open.mobile.fullscreen.fade-out .popup__mobile-container {
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
		.popup__mobile-container {
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
