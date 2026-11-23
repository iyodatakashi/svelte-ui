/**
 * Collects CSS variables used in an element and its descendants
 * Checks both inline styles and computed styles (including CSS classes)
 */
export function collectCssVarNames(element: Element): string[] {
	const vars = new Set<string>();
	const walk = (el: Element) => {
		// Check inline styles
		const style = (el as HTMLElement).style;
		for (let i = 0; i < style.length; i++) {
			const prop = style.item(i);
			const val = style.getPropertyValue(prop);
			const matches = val.match(/var\((--svelte-ui-[^)]+)\)/g) || [];
			matches.forEach((m) => vars.add(m.replace(/var\(|\)/g, '')));
		}

		// Check computed styles (includes CSS classes)
		const computedStyle = getComputedStyle(el);
		for (let i = 0; i < computedStyle.length; i++) {
			const prop = computedStyle.item(i);
			const val = computedStyle.getPropertyValue(prop);
			const matches = val.match(/var\((--svelte-ui-[^)]+)\)/g) || [];
			matches.forEach((m) => vars.add(m.replace(/var\(|\)/g, '')));
		}

		Array.from(el.children).forEach((c) => walk(c));
	};
	walk(element);
	return Array.from(vars);
}
