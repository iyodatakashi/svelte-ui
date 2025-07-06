<script>
	import Tab from '$lib/components/Tab.svelte';
	import { page } from '$app/stores';

	// パスパラメーターを取得
	const productId = $page.params.id;

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

	// 商品情報
	const products = {
		laptop: {
			title: '💻 Laptop',
			price: '$999',
			description: 'High-performance laptop with 16GB RAM and 512GB SSD'
		},
		phone: {
			title: '📱 Phone',
			price: '$699',
			description: 'Latest smartphone with 5G connectivity'
		},
		tablet: {
			title: '📱 Tablet',
			price: '$399',
			description: 'Versatile tablet perfect for work and entertainment'
		}
	};

	const product = products[productId] || {
		title: '❓ Unknown Product',
		price: 'N/A',
		description: 'Product not found'
	};
</script>

<svelte:head>
	<title>{product.title} - Products</title>
</svelte:head>

<div class="container">
	<div class="tab-container">
		<Tab {tabItems} ariaLabel="Main navigation" />
	</div>

	<main>
		<nav class="breadcrumb">
			<a href="/products">Products</a>
			<span>→</span>
			<span>{productId}</span>
		</nav>

		<div class="product-detail">
			<h1>{product.title}</h1>
			<div class="product-info">
				<div class="price">{product.price}</div>
				<p>{product.description}</p>
			</div>

			<div class="actions">
				<button class="btn-primary">Add to Cart</button>
				<button class="btn-secondary">Add to Wishlist</button>
			</div>
		</div>

		<div class="path-test">
			<h2>Path Parameter Test Results</h2>
			<div class="test-results">
				<div class="test-item">
					<strong>Current Path:</strong>
					<code>/products/{productId}</code>
				</div>
				<div class="test-item">
					<strong>Tab href:</strong>
					<code>/products</code>
				</div>
				<div class="test-item">
					<strong>strictMatch:</strong>
					<code>false</code>
				</div>
				<div class="test-item">
					<strong>Expected:</strong>
					<span class="success">✅ Products tab should be highlighted</span>
				</div>
			</div>

			<div class="navigation-links">
				<h3>Test other products:</h3>
				<a href="/products/laptop">💻 Laptop</a>
				<a href="/products/phone">📱 Phone</a>
				<a href="/products/tablet">📱 Tablet</a>
				<a href="/products/unknown">❓ Unknown Product</a>
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

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin-bottom: 1rem;
		color: #6b7280;
	}

	.breadcrumb a {
		color: #3b82f6;
		text-decoration: none;
	}

	.breadcrumb a:hover {
		text-decoration: underline;
	}

	.product-detail {
		background: white;
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		margin-bottom: 2rem;
	}

	.product-detail h1 {
		margin-top: 0;
		color: #1f2937;
		font-size: 2rem;
	}

	.product-info {
		margin: 1rem 0;
	}

	.price {
		font-size: 1.5rem;
		color: #059669;
		font-weight: bold;
		margin-bottom: 1rem;
	}

	.actions {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
	}

	.btn-primary,
	.btn-secondary {
		padding: 0.75rem 1.5rem;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		font-size: 1rem;
		transition: all 0.2s;
	}

	.btn-primary {
		background: #3b82f6;
		color: white;
	}

	.btn-primary:hover {
		background: #2563eb;
	}

	.btn-secondary {
		background: #f3f4f6;
		color: #374151;
		border: 1px solid #d1d5db;
	}

	.btn-secondary:hover {
		background: #e5e7eb;
	}

	.path-test {
		background: #f8f9fa;
		padding: 1.5rem;
		border-radius: 8px;
	}

	.path-test h2 {
		margin-top: 0;
		color: #1f2937;
	}

	.test-results {
		display: grid;
		gap: 0.5rem;
		margin-bottom: 2rem;
	}

	.test-item {
		background: white;
		padding: 0.75rem;
		border-radius: 4px;
		border: 1px solid #e5e7eb;
	}

	.test-item strong {
		color: #374151;
	}

	.test-item code {
		background: #e5e7eb;
		padding: 0.25rem 0.5rem;
		border-radius: 3px;
		font-family: monospace;
	}

	.success {
		color: #059669;
		font-weight: 600;
	}

	.navigation-links {
		margin-top: 1rem;
	}

	.navigation-links h3 {
		margin-bottom: 0.5rem;
		color: #374151;
	}

	.navigation-links a {
		display: inline-block;
		margin-right: 1rem;
		margin-bottom: 0.5rem;
		padding: 0.5rem 1rem;
		background: white;
		border: 1px solid #d1d5db;
		border-radius: 4px;
		text-decoration: none;
		color: #374151;
		transition: all 0.2s;
	}

	.navigation-links a:hover {
		background: #f3f4f6;
		border-color: #9ca3af;
	}
</style>
