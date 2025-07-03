/**
 * Mobile detection and touch utilities
 */

// モバイルデバイス検出
export const isMobileDevice = (): boolean => {
	if (typeof window === 'undefined') return false;

	// User agent based detection
	const userAgent = window.navigator.userAgent.toLowerCase();
	const mobileKeywords = ['mobile', 'android', 'iphone', 'ipad', 'tablet', 'touch'];
	const isMobileUA = mobileKeywords.some((keyword) => userAgent.includes(keyword));

	// Screen size based detection
	const isSmallScreen = window.innerWidth <= 768;

	// Touch capability detection
	const hasTouchCapability = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

	return isMobileUA || (isSmallScreen && hasTouchCapability);
};

// タッチイベントのサポート確認
export const supportsTouchEvents = (): boolean => {
	if (typeof window === 'undefined') return false;
	return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// スワイプジェスチャーの検出
export interface SwipeGestureOptions {
	threshold?: number; // 最小スワイプ距離（px）
	timeout?: number; // 最大スワイプ時間（ms）
	restraint?: number; // 垂直方向の許容誤差（px）
	allowedTime?: number; // 許容時間（ms）
}

export interface SwipeResult {
	direction: 'up' | 'down' | 'left' | 'right' | null;
	distance: number;
	duration: number;
}

export const createSwipeGestureDetector = (
	element: HTMLElement,
	onSwipe: (result: SwipeResult) => void,
	options: SwipeGestureOptions = {}
) => {
	const { threshold = 50, restraint = 100, allowedTime = 300 } = options;

	let startX = 0;
	let startY = 0;
	let startTime = 0;
	let isTracking = false;

	const handleTouchStart = (e: TouchEvent) => {
		if (e.touches.length !== 1) return;

		const touch = e.touches[0];
		startX = touch.clientX;
		startY = touch.clientY;
		startTime = Date.now();
		isTracking = true;
	};

	const handleTouchEnd = (e: TouchEvent) => {
		if (!isTracking || e.changedTouches.length !== 1) return;

		const touch = e.changedTouches[0];
		const endX = touch.clientX;
		const endY = touch.clientY;
		const endTime = Date.now();

		const distanceX = endX - startX;
		const distanceY = endY - startY;
		const duration = endTime - startTime;
		const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

		isTracking = false;

		// 時間チェック
		if (duration > allowedTime) {
			onSwipe({ direction: null, distance, duration });
			return;
		}

		// 距離チェック
		if (distance < threshold) {
			onSwipe({ direction: null, distance, duration });
			return;
		}

		// 方向の判定
		let direction: SwipeResult['direction'] = null;

		if (Math.abs(distanceX) >= Math.abs(distanceY)) {
			// 水平方向のスワイプ
			if (Math.abs(distanceY) <= restraint) {
				direction = distanceX < 0 ? 'left' : 'right';
			}
		} else {
			// 垂直方向のスワイプ
			if (Math.abs(distanceX) <= restraint) {
				direction = distanceY < 0 ? 'up' : 'down';
			}
		}

		onSwipe({ direction, distance, duration });
	};

	const handleTouchMove = () => {
		if (!isTracking) return;
		// スワイプ中のスクロールを防ぐ（必要に応じて）
		// touchmove event could be used here if needed
	};

	// イベントリスナーの追加
	element.addEventListener('touchstart', handleTouchStart, { passive: true });
	element.addEventListener('touchend', handleTouchEnd, { passive: true });
	element.addEventListener('touchmove', handleTouchMove, { passive: true });

	// クリーンアップ関数を返す
	return () => {
		element.removeEventListener('touchstart', handleTouchStart);
		element.removeEventListener('touchend', handleTouchEnd);
		element.removeEventListener('touchmove', handleTouchMove);
	};
};

// ビューポートサイズの取得
export const getViewportSize = () => {
	if (typeof window === 'undefined') {
		return { width: 0, height: 0 };
	}

	return {
		width: window.innerWidth,
		height: window.innerHeight
	};
};

// セーフエリアの取得（iOSのノッチ対応など）
export const getSafeAreaInsets = () => {
	if (typeof window === 'undefined' || !CSS.supports) {
		return { top: 0, right: 0, bottom: 0, left: 0 };
	}

	const computedStyle = getComputedStyle(document.documentElement);

	return {
		top: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-top)') || '0', 10),
		right: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-right)') || '0', 10),
		bottom: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-bottom)') || '0', 10),
		left: parseInt(computedStyle.getPropertyValue('env(safe-area-inset-left)') || '0', 10)
	};
};

// タッチターゲットサイズの確保
export const ensureTouchTargetSize = (minSize: number = 44): string => {
	return `min-width: ${minSize}px; min-height: ${minSize}px;`;
};

// モバイルでのスクロール無効化
export const disableBodyScroll = () => {
	if (typeof document === 'undefined') return () => {};

	const originalStyle = window.getComputedStyle(document.body);
	const originalOverflow = originalStyle.overflow;
	const originalPosition = originalStyle.position;

	document.body.style.overflow = 'hidden';
	if (isMobileDevice()) {
		document.body.style.position = 'fixed';
		document.body.style.width = '100%';
	}

	return () => {
		document.body.style.overflow = originalOverflow;
		document.body.style.position = originalPosition;
		if (isMobileDevice()) {
			document.body.style.width = '';
		}
	};
};
