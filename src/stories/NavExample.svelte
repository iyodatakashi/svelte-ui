<script lang="ts">
	import Nav from '../lib/components/Nav.svelte';
	import type { NavItemSelectedVariant } from '../lib/components/NavItem.svelte';
	import type { MenuItem } from '../lib/types/menuItem';
	import type { NavVariant, ChildrenVariant } from '../lib/types/propOptions';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '../lib/types/icon';

	type NavExampleProps = {
		navItems?: MenuItem[];
		variant?: NavVariant;
		childrenVariant?: ChildrenVariant;
		pathPrefix?: string;
		currentPath?: string;
		selectedVariant?: NavItemSelectedVariant;
		gap?: number | string;
		chevron?: boolean;
		customContainerStyle?: string;
		customItemStyle?: string;
		customChildrenContainerStyle?: string;
		customChildrenItemStyle?: string;
		iconFilled?: boolean;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;
		iconVariant?: IconVariant;
		ariaLabel?: string;
	};

	let {
		navItems = [],
		variant = 'vertical',
		childrenVariant = 'accordion',
		pathPrefix = '',
		currentPath: currentPathProp,
		selectedVariant,
		gap,
		chevron,
		customContainerStyle,
		customItemStyle,
		customChildrenContainerStyle,
		customChildrenItemStyle,
		iconFilled,
		iconWeight,
		iconGrade,
		iconOpticalSize,
		iconVariant,
		ariaLabel
	}: NavExampleProps = $props();

	const firstHref = navItems[0]?.href ?? navItems[0]?.children?.[0]?.href ?? '';
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
	<Nav
		{navItems}
		{variant}
		{childrenVariant}
		{pathPrefix}
		{currentPath}
		{selectedVariant}
		{gap}
		{chevron}
		{customContainerStyle}
		{customItemStyle}
		{customChildrenContainerStyle}
		{customChildrenItemStyle}
		{iconFilled}
		{iconWeight}
		{iconGrade}
		{iconOpticalSize}
		{iconVariant}
		{ariaLabel}
	/>
</div>
