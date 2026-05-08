<script lang="ts">
	import type { Snippet } from 'svelte';
	import Nav from '$lib/components/Nav.svelte';
	import type { NavVariant, SubMenuMode } from '$lib/types/propOptions';

	let { children }: { children: Snippet } = $props();

	const navItems = [
		{ label: 'Home', href: '/nav-demo', icon: 'home', strictMatch: true },
		{
			label: 'Products',
			href: '/nav-demo/products',
			icon: 'inventory_2',
			strictMatch: true,
			children: [
				{ label: 'Electronics', href: '/nav-demo/products/electronics', icon: 'devices' },
				{ label: 'Clothing', href: '/nav-demo/products/clothing', icon: 'checkroom' },
				{ label: 'Books', href: '/nav-demo/products/books', icon: 'menu_book' }
			]
		},
		{
			label: 'Services',
			icon: 'build',
			children: [
				{ label: 'Consulting', href: '/nav-demo/services/consulting' },
				{ label: 'Support', href: '/nav-demo/services/support' },
				{ label: 'Training', href: '/nav-demo/services/training' }
			]
		},
		{ label: 'Settings', href: '/nav-demo/settings', icon: 'settings' }
	];

	let variant: NavVariant = $state('vertical');
	let subMenuMode: SubMenuMode = $state('accordion');

	const variantOptions: NavVariant[] = ['vertical', 'horizontal', 'mobile'];
	const modesByVariant: Record<NavVariant, SubMenuMode[]> = {
		vertical: ['accordion', 'expanded', 'popup'],
		horizontal: ['popup', 'bar'],
		mobile: ['popup', 'bottom-sheet'],
		tab: []
	};

	$effect(() => {
		const modes = modesByVariant[variant];
		if (!modes.includes(subMenuMode)) subMenuMode = modes[0];
	});
</script>

<div class="demo-page">
	<div class="demo-toolbar">
		<span class="demo-toolbar__label">variant:</span>
		{#each variantOptions as v}
			<button
				class="demo-toolbar__btn"
				class:demo-toolbar__btn--active={variant === v}
				onclick={() => (variant = v)}>{v}</button
			>
		{/each}
		<span class="demo-toolbar__sep">|</span>
		<span class="demo-toolbar__label">subMenuMode:</span>
		{#each modesByVariant[variant] as m}
			<button
				class="demo-toolbar__btn"
				class:demo-toolbar__btn--active={subMenuMode === m}
				onclick={() => (subMenuMode = m)}>{m}</button
			>
		{/each}
	</div>

	<div class="demo-body" class:demo-body--horizontal={variant === 'horizontal'}>
		{#if variant === 'vertical'}
			<aside class="demo-sidebar">
				<Nav {navItems} variant="vertical" {subMenuMode} ariaLabel="Demo nav" />
			</aside>
		{:else if variant === 'horizontal'}
			<div class="demo-topnav">
				<Nav {navItems} variant="horizontal" {subMenuMode} ariaLabel="Demo nav" />
			</div>
		{:else if variant === 'mobile'}
			<div class="demo-mobilenav">
				<Nav {navItems} variant="mobile" {subMenuMode} ariaLabel="Demo nav" />
			</div>
		{/if}

		<main class="demo-content">
			{@render children()}
		</main>
	</div>
</div>

<style>
	.demo-page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		font-family: sans-serif;
	}

	.demo-toolbar {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 10px 16px;
		background: #f1f5f9;
		border-bottom: 1px solid #e2e8f0;
		flex-wrap: wrap;
	}

	.demo-toolbar__label {
		font-size: 0.8rem;
		color: #64748b;
		font-weight: 600;
	}

	.demo-toolbar__sep {
		color: #cbd5e1;
		margin: 0 4px;
	}

	.demo-toolbar__btn {
		padding: 4px 10px;
		border-radius: 4px;
		border: 1px solid #cbd5e1;
		background: white;
		font-size: 0.8rem;
		cursor: pointer;
		color: #334155;
	}

	.demo-toolbar__btn--active {
		background: #3b82f6;
		border-color: #3b82f6;
		color: white;
	}

	.demo-body {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.demo-body--horizontal {
		flex-direction: column;
	}

	.demo-sidebar {
		width: 220px;
		flex-shrink: 0;
		border-right: 1px solid #e2e8f0;
		padding: 12px 8px;
		display: flex;
		flex-direction: row;
	}

	/* vertical の場合は横並び（sidebar + content） */
	:global(.demo-body:not(.demo-body--horizontal)) {
		flex-direction: row;
	}

	.demo-topnav {
		padding: 8px 16px;
		border-bottom: 1px solid #e2e8f0;
	}

	.demo-mobilenav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		border-top: 1px solid #e2e8f0;
		background: white;
		z-index: 100;
	}

	.demo-content {
		flex: 1;
		padding: 24px;
	}
</style>
