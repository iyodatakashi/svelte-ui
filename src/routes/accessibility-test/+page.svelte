<script lang="ts">
	import Tab from '$lib/components/Tab.svelte';
	import type { MenuItem } from '$lib/types/menuItem';

	const mainTabs: MenuItem[] = [
		{
			title: 'Home',
			href: '/',
			icon: 'home'
		},
		{
			title: 'Products',
			href: '/products',
			icon: 'inventory'
		},
		{
			title: 'About',
			href: '/about',
			icon: 'info'
		},
		{
			title: 'Contact',
			href: '/contact',
			icon: 'contact_mail'
		}
	];

	const adminTabs: MenuItem[] = [
		{
			title: 'Dashboard',
			href: '/admin/dashboard',
			icon: 'dashboard'
		},
		{
			title: 'Users',
			href: '/admin/users',
			icon: 'people'
		},
		{
			title: 'Settings',
			href: '/admin/settings',
			icon: 'settings'
		}
	];
</script>

<svelte:head>
	<title>Tab Accessibility Test</title>
</svelte:head>

<div class="container">
	<h1>Tab Component Accessibility Test</h1>

	<div class="info-section">
		<h2>How to Test Accessibility Features</h2>
		<ul>
			<li>
				<strong>Keyboard Navigation:</strong> Press Tab to focus the tab list, then use arrow keys (←/→)
				to navigate between tabs
			</li>
			<li>
				<strong>Jump to First/Last:</strong> Use Home/End keys to jump to the first or last tab
			</li>
			<li><strong>Screen Reader:</strong> Each tab announces its name and selection state</li>
			<li>
				<strong>Focus Management:</strong> Focus moves correctly between tabs and is visually indicated
			</li>
		</ul>
	</div>

	<div class="test-section">
		<h2 id="main-nav-heading">Main Navigation</h2>
		<div class="tab-container">
			<Tab tabItems={mainTabs} ariaLabelledby="main-nav-heading" />
		</div>
	</div>

	<div class="test-section">
		<h2>Admin Navigation</h2>
		<div class="tab-container">
			<Tab tabItems={adminTabs} ariaLabel="Admin navigation tabs" />
		</div>
	</div>

	<div class="test-section">
		<h2>Many Tabs (Scrolling Test)</h2>
		<div class="tab-container">
			<Tab
				tabItems={[
					{ title: 'Tab 1', href: '/tab1' },
					{ title: 'Tab 2', href: '/tab2' },
					{ title: 'Tab 3', href: '/tab3' },
					{ title: 'Tab 4', href: '/tab4' },
					{ title: 'Tab 5', href: '/tab5' },
					{ title: 'Tab 6', href: '/tab6' },
					{ title: 'Tab 7', href: '/tab7' },
					{ title: 'Tab 8', href: '/tab8' },
					{ title: 'Tab 9', href: '/tab9' },
					{ title: 'Tab 10', href: '/tab10' }
				]}
				ariaLabel="Test tabs with many items"
			/>
		</div>
	</div>

	<div class="test-section">
		<h2>Instructions for Manual Testing</h2>
		<div class="instruction-grid">
			<div class="instruction-item">
				<h3>🔍 Visual Testing</h3>
				<ul>
					<li>Check focus indicators are visible</li>
					<li>Verify selected state is clear</li>
					<li>Test high contrast mode</li>
				</ul>
			</div>
			<div class="instruction-item">
				<h3>⌨️ Keyboard Testing</h3>
				<ul>
					<li>Tab to focus the tab list</li>
					<li>Arrow keys to navigate tabs</li>
					<li>Home/End for first/last tab</li>
					<li>Enter to activate tab</li>
				</ul>
			</div>
			<div class="instruction-item">
				<h3>🔊 Screen Reader Testing</h3>
				<ul>
					<li>Enable screen reader</li>
					<li>Navigate to tab list</li>
					<li>Listen for role announcements</li>
					<li>Check selected state announcements</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<style>
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		color: var(--primary-color);
		margin-bottom: 2rem;
	}

	.info-section {
		background: var(--background-secondary);
		padding: 1.5rem;
		border-radius: 8px;
		margin-bottom: 2rem;
	}

	.test-section {
		margin-bottom: 3rem;
	}

	.test-section h2 {
		margin-bottom: 1rem;
		color: var(--text-primary);
	}

	.tab-container {
		border: 1px solid var(--border-color);
		border-radius: 8px;
		height: 60px;
		overflow-x: auto;
		overflow-y: visible;
	}

	.instruction-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-top: 1rem;
	}

	.instruction-item {
		background: var(--background-secondary);
		padding: 1.5rem;
		border-radius: 8px;
		border-left: 4px solid var(--primary-color);
	}

	.instruction-item h3 {
		margin-top: 0;
		margin-bottom: 1rem;
		color: var(--primary-color);
	}

	.instruction-item ul {
		margin: 0;
		padding-left: 1.5rem;
	}

	.instruction-item li {
		margin-bottom: 0.5rem;
	}

	ul {
		line-height: 1.6;
	}

	li {
		margin-bottom: 0.5rem;
	}
</style>
