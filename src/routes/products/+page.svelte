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
			title: 'Products',
			href: '/products',
			icon: 'inventory',
			strictMatch: false // パスパラメーター対応
		},
		{
			title: 'Services',
			href: '/services',
			icon: 'build',
			strictMatch: true
		},
		{
			title: 'About',
			href: '/about',
			icon: 'info',
			strictMatch: true
		}
	];
</script>

<svelte:head>
	<title>Products - Tab Component Test</title>
</svelte:head>

<div class="container">
	<div class="tab-container">
		<Tab {tabItems} ariaLabel="Main navigation" />
	</div>

	<main>
		<h1>Products Page</h1>
		<p>This is the products page. The "Products" tab should be highlighted.</p>

		<div class="products-grid">
			<div class="product-card">
				<a href="/products/laptop">
					<h3>💻 Laptop</h3>
					<p>High-performance laptop</p>
				</a>
			</div>
			<div class="product-card">
				<a href="/products/phone">
					<h3>📱 Phone</h3>
					<p>Latest smartphone</p>
				</a>
			</div>
			<div class="product-card">
				<a href="/products/tablet">
					<h3>📱 Tablet</h3>
					<p>Versatile tablet</p>
				</a>
			</div>
		</div>

		<div class="test-info">
			<h2>Path Parameter Test</h2>
			<p>Click on the product links above to test path parameter matching:</p>
			<ul>
				<li><code>/products</code> - Products tab should be highlighted</li>
				<li><code>/products/laptop</code> - Products tab should still be highlighted</li>
				<li><code>/products/phone</code> - Products tab should still be highlighted</li>
				<li><code>/products/tablet</code> - Products tab should still be highlighted</li>
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

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1.5rem;
		margin-top: 2rem;
	}

	.product-card {
		background: white;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		border: 1px solid #e2e8f0;
		overflow: hidden;
		transition: transform 0.2s;
	}

	.product-card:hover {
		transform: translateY(-2px);
	}

	.product-card a {
		display: block;
		padding: 1.5rem;
		text-decoration: none;
		color: inherit;
	}

	.product-card h3 {
		margin: 0 0 0.5rem 0;
		color: #2d3748;
		font-size: 1.2rem;
	}

	.product-card p {
		margin: 0;
		color: #4a5568;
	}

	.test-info {
		background: #f8f9fa;
		padding: 1.5rem;
		border-radius: 8px;
		margin-top: 2rem;
	}

	.test-info h2 {
		margin-top: 0;
		color: #2d3748;
	}

	.test-info ul {
		list-style: none;
		padding: 0;
	}

	.test-info li {
		padding: 0.5rem 0;
		font-family: monospace;
		background: white;
		padding: 0.5rem;
		margin: 0.5rem 0;
		border-radius: 4px;
		border: 1px solid #e2e8f0;
	}

	.test-info code {
		background: #e2e8f0;
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-weight: bold;
	}
</style>
