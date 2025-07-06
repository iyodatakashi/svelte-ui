<script lang="ts">
	import Icon from './Icon.svelte';
	import type { MenuItem } from '../types/MenuItem';

	let {
		tabItem,
		currentPath
	}: {
		tabItem: MenuItem;
		currentPath: string;
	} = $props();

	const isSelected: boolean = $derived.by(() => {
		if (currentPath === undefined) return false;
		if (tabItem.href === undefined) return false;
		if (tabItem.strictMatch) {
			if (currentPath === tabItem.href) return true;
			if (
				tabItem.matchingPath &&
				tabItem.matchingPath.some((href) => {
					return currentPath.startsWith(href);
				})
			)
				return true;
		} else {
			if (currentPath === '') return false;
			if (currentPath.startsWith(tabItem.href)) return true;
			if (
				tabItem.matchingPath &&
				tabItem.matchingPath.some((href) => {
					return currentPath.startsWith(href);
				})
			)
				return true;
		}
		return false;
	});
</script>

<a href={tabItem.href} class:is-selected={isSelected}>
	{#if tabItem.icon}
		<div class="icon-block">
			<Icon fill={isSelected}>{tabItem.icon}</Icon>
		</div>
	{/if}
	{#if tabItem.title}
		<div class="title-block">
			{tabItem.title}
		</div>
	{/if}
</a>

<style lang="scss">
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 4px;
		position: relative;
		height: 100%;
		padding: 0 16px;
		color: var(--text-light);
		white-space: nowrap;
	}
	a:hover {
		background-color: var(--hover-color);
	}
	a::before {
		content: '';
		display: block;
		position: absolute;
		left: 16px;
		bottom: 0;
		width: calc(100% - 32px);
		height: 4px;
		background-color: var(--primary-color);
		border-radius: 3px 3px 0 0;
		color: var(--primary-color);
		opacity: 0;
		transition-property: opacity;
		transition-duration: 0.3s;
	}
	a.is-selected {
		color: var(--primary-color);
	}
	a.is-selected::before {
		opacity: 1;
	}
	.icon-block {
		width: 24px;
		height: 24px;
	}
</style>
