<script lang="ts">
	import Nav from '#lib/sharedComponents/Nav.svelte';
	import type { NavProps } from '#lib/models/nav/nav.types';

	let { navItems = [], currentPath: currentPathProp, ...restProps }: NavProps = $props();

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
	<Nav {...restProps} {navItems} {currentPath} />
</div>
