<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Input from '$lib/components/Input.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Radio from '$lib/components/Radio.svelte';
	import Select from '$lib/components/Select.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import { onMount } from 'svelte';
	import Tab from '$lib/components/Tab.svelte';
	import Fab from '../lib/components/Fab.svelte';
	import type { MenuItem } from '../lib/types/MenuItem';

	let theme = $state('light');
	let isDialogOpen = $state(false);
	let checkboxValue = $state(false);
	let inputValue = $state('');

	// ハイコントラストモードの検出
	let isHighContrast = $state(false);
	let mediaQuery: MediaQueryList | null = null;

	function checkHighContrast() {
		if (typeof window !== 'undefined') {
			mediaQuery = window.matchMedia('(prefers-contrast: more)');
			isHighContrast = mediaQuery.matches;

			mediaQuery.addEventListener('change', (e) => {
				isHighContrast = e.matches;
			});
		}
	}

	const toggleTheme = () => {
		theme = theme === 'light' ? 'dark' : 'light';
		if (typeof document !== 'undefined') {
			document.body.setAttribute('data-theme', theme);
		}
	};

	onMount(() => {
		if (typeof document !== 'undefined') {
			document.body.setAttribute('data-theme', theme);
		}
		checkHighContrast();
	});

	const selectOptions = [
		{ value: 'option1', label: 'オプション 1' },
		{ value: 'option2', label: 'オプション 2' },
		{ value: 'option3', label: 'オプション 3' }
	];

	let selectValue = $state('');
	let radioValue = $state('');

	const tabItems: MenuItem[] = [
		{
			title: 'Home',
			href: '/',
			icon: 'home'
		},
		{
			title: 'About',
			href: '/about',
			icon: 'info'
		},
		{
			title: 'Services',
			href: '/services',
			icon: 'business'
		},
		{
			title: 'Contact',
			href: '/contact',
			icon: 'contact_mail'
		},
		{
			title: 'Products',
			href: '/products',
			icon: 'inventory_2',
			strictMatch: false
		}
	];

	// Multi-tenant test tabs
	const multiTenantTabs: MenuItem[] = [
		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: 'dashboard'
		},
		{
			title: 'Articles',
			href: '/articles',
			icon: 'article'
		},
		{
			title: 'Settings',
			href: '/settings',
			icon: 'settings'
		}
	];

	// Custom path matcher for multi-tenant
	const customMatcher = (currentPath: string, itemHref: string, item: MenuItem) => {
		// Simulate multi-tenant path: /tenant-name/path
		const pathWithoutTenant = currentPath.replace(/^\/[^/]+/, '');

		if (item.strictMatch) {
			return pathWithoutTenant === itemHref;
		} else {
			// Handle root path
			if (itemHref === '/') {
				return pathWithoutTenant === '/' || pathWithoutTenant === '';
			}
			return pathWithoutTenant.startsWith(itemHref);
		}
	};
</script>

<svelte:head>
	<title>SvelteKit UI Library - High Contrast Test</title>
	<meta name="description" content="Testing High Contrast Mode" />
</svelte:head>

<main>
	<div class="container">
		<h1>High Contrast Mode Test</h1>

		<div class="debug-info">
			<h2>Debug Information</h2>
			<p><strong>High Contrast Mode Detected (OS):</strong> {isHighContrast ? 'Yes' : 'No'}</p>
			<p><strong>Current Theme:</strong> {theme}</p>
			<p><strong>Media Query:</strong> <code>@media (prefers-contrast: more)</code></p>
			<p>
				<strong>Implementation:</strong> CSS variables automatically override based on system preference
			</p>

			<div style="margin-top: 1rem;">
				<button
					type="button"
					onclick={toggleTheme}
					style="padding: 8px 16px; background: var(--svelte-ui-primary-color); color: white; border: none; border-radius: 4px; cursor: pointer;"
				>
					Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
				</button>
			</div>

			<div
				style="margin-top: 1rem; padding: 1rem; background: var(--svelte-ui-border-weak-color); border-radius: 4px;"
			>
				<h3>How to Test High Contrast Mode</h3>
				<ul style="margin-left: 1.5rem;">
					<li>
						<strong>macOS:</strong> System Preferences → Accessibility → Display → Increase contrast
					</li>
					<li><strong>Windows:</strong> Settings → Ease of Access → High contrast</li>
					<li>
						<strong>Chrome DevTools:</strong> Elements → Styles → Toggle device toolbar → More options
						→ Emulate CSS media feature prefers-contrast
					</li>
				</ul>
			</div>

			<div class="css-variable-test">
				<h3>CSS Variables Test</h3>
				<div class="test-box">
					<p>
						Text Color: <span class="text-color-test"
							>This text should be CanvasText in high contrast</span
						>
					</p>
					<div class="bg-color-test">Background: This should be Canvas in high contrast</div>
					<div class="border-color-test">
						Border: This should be CanvasText border in high contrast
					</div>
				</div>
			</div>
		</div>

		<div class="components-test">
			<h2>Components Test</h2>

			<div class="component-section">
				<h3>Button</h3>
				<Button variant="filled">Filled Button</Button>
				<Button variant="outlined">Outlined Button</Button>
				<Button variant="text">Text Button</Button>
			</div>

			<div class="component-section">
				<h3>Input</h3>
				<Input bind:value={inputValue} placeholder="Type something..." />
			</div>

			<div class="component-section">
				<h3>Select</h3>
				<Select
					bind:value={selectValue}
					options={selectOptions}
					placeholder="Select an option..."
				/>
			</div>

			<div class="component-section">
				<h3>Checkbox</h3>
				<Checkbox bind:value={checkboxValue} label="Test checkbox" />
			</div>

			<div class="component-section">
				<h3>Radio</h3>
				<Radio name="test-radio" bind:currentValue={radioValue} value="radio1">Option 1</Radio>
				<Radio name="test-radio" bind:currentValue={radioValue} value="radio2">Option 2</Radio>
			</div>

			<div class="component-section">
				<h3>Dialog</h3>
				<Button variant="outlined" onclick={() => (isDialogOpen = true)}>Open Dialog</Button>

				<Dialog bind:isOpen={isDialogOpen} title="Test Dialog">
					<p>This is a test dialog to check high contrast mode.</p>
					{#snippet footer()}
						<Button variant="filled" onclick={() => (isDialogOpen = false)}>Close</Button>
					{/snippet}
				</Dialog>
			</div>
		</div>

		<div class="tab-container">
			<Tab {tabItems} ariaLabel="Main navigation" />
		</div>

		<div class="multi-tenant-test">
			<h2>Multi-Tenant Tab Test</h2>

			<div class="test-section">
				<h3>With pathPrefix</h3>
				<p>Simulates: Current path is '/tenant-name/articles', but tab href is '/articles'</p>
				<div class="tab-container">
					<Tab
						tabItems={multiTenantTabs}
						pathPrefix="/tenant-name"
						ariaLabel="Multi-tenant navigation with pathPrefix"
					/>
				</div>
			</div>

			<div class="test-section">
				<h3>With customPathMatcher</h3>
				<p>Custom logic to strip tenant prefix from current path for matching</p>
				<div class="tab-container">
					<Tab
						tabItems={multiTenantTabs}
						customPathMatcher={customMatcher}
						ariaLabel="Multi-tenant navigation with custom matcher"
					/>
				</div>
			</div>

			<div class="usage-example">
				<h3>Usage Examples</h3>
				<pre><code
						>{`// Method 1: Using pathPrefix
<Tab tabItems={items} pathPrefix="/tenant-name" />

// Method 2: Using customPathMatcher
<Tab tabItems={items} customPathMatcher={(currentPath, itemHref, item) => {
  const pathWithoutTenant = currentPath.replace(/^\/[^/]+/, '');
  return pathWithoutTenant.startsWith(itemHref);
}} />`}</code
					></pre>
			</div>
		</div>

		<main>
			<h2>Home Page</h2>
			<p>This is the home page. Navigate through the tabs above to see the active state change.</p>

			<div class="info-box">
				<h3>Test Instructions:</h3>
				<ul>
					<li>Click on different tabs to see the active state change</li>
					<li>Use keyboard navigation (arrow keys) to navigate between tabs</li>
					<li>Try Home/End keys for first/last tab</li>
					<li>Notice the blue indicator shows the current page</li>
				</ul>
			</div>

			<div class="test-links">
				<h3>Component Tests:</h3>
				<div class="demo-links">
					<a href="/tenant-demo" class="demo-link">
						<div class="demo-icon">🏢</div>
						<div class="demo-info">
							<h4>Multi-Tenant Demo</h4>
							<p>Test pathPrefix functionality with Tab component</p>
						</div>
					</a>
				</div>
			</div>
		</main>
	</div>
</main>

<!-- Fabコンポーネントのテスト -->
<Fab icon="add" position="left" color="#6750a4" />
<Fab icon="edit" position="center" color="#6750a4">Edit</Fab>
<Fab icon="favorite" position="right" color="#6750a4">Favorite</Fab>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		background: var(--svelte-ui-surface-color);
		min-height: 100vh;
	}

	h1 {
		color: var(--svelte-ui-text-color);
		margin-bottom: 2rem;
	}

	h2,
	h3 {
		color: var(--svelte-ui-text-color);
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.debug-info {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		padding: 1rem;
		margin-bottom: 2rem;
		border-radius: 4px;
	}

	.css-variable-test {
		margin-top: 1rem;
	}

	.test-box {
		border: 1px solid var(--svelte-ui-border-color);
		padding: 1rem;
		margin-top: 0.5rem;
		border-radius: 4px;
	}

	.text-color-test {
		color: var(--svelte-ui-text-color);
		font-weight: bold;
	}

	.bg-color-test {
		background: var(--svelte-ui-surface-color);
		padding: 0.5rem;
		margin: 0.5rem 0;
		border-radius: 4px;
	}

	.border-color-test {
		border: 2px solid var(--svelte-ui-border-color);
		padding: 0.5rem;
		margin: 0.5rem 0;
		border-radius: 4px;
	}

	.component-section {
		margin-bottom: 2rem;
		padding: 1rem;
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 4px;
	}

	.component-section h3 {
		margin-top: 0;
	}

	code {
		background: var(--svelte-ui-surface-color);
		padding: 0.2rem 0.4rem;
		border-radius: 2px;
		font-family: 'Courier New', monospace;
	}

	/* High contrast mode debug styles */
	@media (prefers-contrast: more) {
		.debug-info {
			outline: 2px solid red;
		}

		.debug-info::before {
			content: '🔍 HIGH CONTRAST MODE DETECTED';
			display: block;
			background: red;
			color: white;
			padding: 0.5rem;
			margin: -1rem -1rem 1rem -1rem;
			font-weight: bold;
		}
	}

	/* 手動テスト用のスタイルは削除 - variables.scssの@media (prefers-contrast: high)を使用 */

	.tab-container {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
		height: 60px;
	}

	.info-box {
		background: #f5f5f5;
		padding: 1rem;
		border-radius: 4px;
		margin-top: 2rem;
	}

	.info-box h3 {
		margin-top: 0;
		color: #333;
	}

	.info-box ul {
		margin-bottom: 0;
	}

	.info-box li {
		margin-bottom: 0.5rem;
	}

	.multi-tenant-test {
		margin-top: 3rem;
		padding: 2rem;
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
	}

	.multi-tenant-test h2 {
		margin-top: 0;
		color: var(--svelte-ui-primary-color);
	}

	.test-section {
		margin-bottom: 2rem;
		padding: 1rem;
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-weak-color);
		border-radius: 4px;
	}

	.test-section h3 {
		margin-top: 0;
		color: var(--svelte-ui-text-color);
	}

	.test-section p {
		color: var(--svelte-ui-text-subtle-color);
		font-style: italic;
		margin-bottom: 1rem;
	}

	.usage-example {
		margin-top: 2rem;
		padding: 1rem;
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-weak-color);
		border-radius: 4px;
	}

	.usage-example h3 {
		margin-top: 0;
		color: var(--svelte-ui-text-color);
	}

	.usage-example pre {
		background: var(--svelte-ui-surface-color);
		padding: 1rem;
		border-radius: 4px;
		overflow-x: auto;
		border: 1px solid var(--svelte-ui-border-weak-color);
	}

	.usage-example code {
		background: transparent;
		padding: 0;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.9rem;
		line-height: 1.4;
	}

	.demo-links {
		margin-top: 1rem;
	}

	.demo-link {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
		text-decoration: none;
		transition: all 0.2s;
		margin-bottom: 1rem;
	}

	.demo-link:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		border-color: var(--svelte-ui-primary-color);
	}

	.demo-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.demo-info h4 {
		margin: 0 0 0.25rem 0;
		color: var(--svelte-ui-text-color);
	}

	.demo-info p {
		margin: 0;
		color: var(--svelte-ui-text-subtle-color);
		font-size: 0.9rem;
	}
</style>
