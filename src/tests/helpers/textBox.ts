/**
 * 要素の中で文字が並ぶ領域（border・スクロールバー・padding を除いた範囲）を返す。
 * 余白を padding・border のどちらで持つかに関わらず、文字の層どうしの位置を比べられる。
 */
export const textBox = (el: HTMLElement) => {
	const rect = el.getBoundingClientRect();
	const style = getComputedStyle(el);
	const left = rect.left + el.clientLeft + parseFloat(style.paddingLeft);
	const top = rect.top + el.clientTop + parseFloat(style.paddingTop);
	const right = rect.left + el.clientLeft + el.clientWidth - parseFloat(style.paddingRight);
	return { left, top, right, width: right - left };
};
