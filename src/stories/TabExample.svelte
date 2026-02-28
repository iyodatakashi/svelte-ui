<script lang="ts">
	import Tab from '../lib/components/Tab.svelte';
	import type { MenuItem } from '../lib/types/menuItem';

	type TabExampleProps = {
		tabItems: MenuItem[];
		currentPath?: string;
		pathPrefix?: string;
		customPathMatcher?: (currentPath: string, itemHref: string, item: MenuItem) => boolean;
		textColor?: string;
		selectedTextColor?: string;
		selectedBarColor?: string;
		ariaLabel?: string;
		ariaLabelledby?: string;
	};

	let {
		tabItems,
		currentPath: currentPathProp,
		pathPrefix = '',
		customPathMatcher,
		textColor,
		selectedTextColor,
		selectedBarColor,
		ariaLabel,
		ariaLabelledby
	}: TabExampleProps = $props();

	const firstHref = tabItems[0]?.href ?? '';
	let currentPath = $state(currentPathProp ?? firstHref);

	$effect(() => {
		if (currentPathProp !== undefined && currentPathProp !== '') {
			currentPath = currentPathProp;
		}
	});

	function handleClick(e: MouseEvent) {
		const a = (e.target as HTMLElement).closest('a[href]');
		if (a) {
			e.preventDefault();
			const href = a.getAttribute('href');
			if (href != null) currentPath = href;
		}
	}
</script>

<div onclick={handleClick} role="presentation">
	<Tab
		{tabItems}
		{pathPrefix}
		{customPathMatcher}
		currentPath={currentPath}
		{textColor}
		{selectedTextColor}
		{selectedBarColor}
		{ariaLabel}
		{ariaLabelledby}
	/>
</div>
