<script>
	import Tab from '$lib/components/Tab.svelte';

	const tabItems = [
		{
			title: 'Home',
			href: '/',
			icon: 'home',
			strictMatch: true
		},
		{
			title: 'About',
			href: '/about',
			icon: 'info',
			strictMatch: true
		},
		{
			title: 'Services',
			href: '/services',
			icon: 'build',
			strictMatch: true
		},
		{
			title: 'Contact',
			href: '/contact',
			icon: 'mail',
			strictMatch: true
		},
		{
			title: 'Accessibility Test',
			href: '/accessibility-test',
			icon: 'accessibility',
			strictMatch: true
		}
	];
</script>

<svelte:head>
	<title>About - Tab Component Test</title>
</svelte:head>

<div class="container">
	<div class="tab-container">
		<Tab {tabItems} ariaLabel="Main navigation" />
	</div>

	<main>
		<h1>About Page</h1>
		<p>
			This is the About page. Notice how the "About" tab is now highlighted with a blue indicator.
		</p>

		<div class="content">
			<h2>Tab Component Features</h2>
			<ul>
				<li>✅ Automatic active state based on current URL</li>
				<li>✅ Keyboard navigation with arrow keys</li>
				<li>✅ Home/End key support</li>
				<li>✅ WAI-ARIA accessibility compliance</li>
				<li>✅ Focus management</li>
				<li>✅ Responsive design</li>
			</ul>
		</div>
	</main>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
	}

	.tab-container {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
		height: 60px;
	}

	.content {
		background: #f8f9fa;
		padding: 2rem;
		border-radius: 8px;
		margin-top: 2rem;
	}

	.content h2 {
		color: #2d3748;
		margin-top: 0;
	}

	.content ul {
		list-style: none;
		padding: 0;
	}

	.content li {
		padding: 0.5rem 0;
		font-size: 1.1rem;
	}
</style>
