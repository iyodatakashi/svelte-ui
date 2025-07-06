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
	<title>Services - Tab Component Test</title>
</svelte:head>

<div class="container">
	<div class="tab-container">
		<Tab {tabItems} ariaLabel="Main navigation" />
	</div>

	<main>
		<h1>Services Page</h1>
		<p>This is the Services page. The "Services" tab should be highlighted.</p>

		<div class="services-grid">
			<div class="service-card">
				<h3>🎯 Component Development</h3>
				<p>Custom Svelte components with accessibility built-in</p>
			</div>
			<div class="service-card">
				<h3>🔧 UI Library</h3>
				<p>Comprehensive design system with consistent styling</p>
			</div>
			<div class="service-card">
				<h3>📱 Responsive Design</h3>
				<p>Mobile-first approach with touch-friendly interfaces</p>
			</div>
			<div class="service-card">
				<h3>♿ Accessibility</h3>
				<p>WCAG 2.1 compliant with keyboard navigation</p>
			</div>
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

	.services-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.service-card {
		background: white;
		padding: 1.5rem;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		border: 1px solid #e2e8f0;
	}

	.service-card h3 {
		margin-top: 0;
		color: #2d3748;
		font-size: 1.2rem;
	}

	.service-card p {
		color: #4a5568;
		margin-bottom: 0;
	}
</style>
