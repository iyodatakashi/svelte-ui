/**
 * Mobile detection and utilities
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
