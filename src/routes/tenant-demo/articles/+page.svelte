<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Articles - Demo Tenant</title>
</svelte:head>

<div class="page-content">
	<h1>📝 Articles</h1>

	<div class="test-result">
		<h2>✅ pathPrefix Test Result</h2>
		<div class="result-details">
			<div class="result-item">
				<strong>Expected:</strong> Articles tab should be selected
			</div>
			<div class="result-item">
				<strong>Current URL:</strong> <code>{$page.url.pathname}</code>
			</div>
			<div class="result-item">
				<strong>Tab href:</strong> <code>/articles</code>
			</div>
			<div class="result-item">
				<strong>pathPrefix:</strong> <code>/tenant-demo</code>
			</div>
			<div class="result-item success">
				<strong>Result:</strong>
				<span>✅ If the Articles tab is highlighted above, pathPrefix is working correctly!</span>
			</div>
		</div>
	</div>

	<div class="content-section">
		<h2>Article Management</h2>
		<div class="articles-container">
			<div class="article-card">
				<h3>🚀 Getting Started with Multi-Tenant Apps</h3>
				<p class="article-meta">Published: March 15, 2024 • By: Demo User</p>
				<p>
					Learn how to build scalable multi-tenant applications with proper URL routing and
					navigation.
				</p>
				<div class="article-actions">
					<button class="btn-primary">Edit</button>
					<button class="btn-secondary">View</button>
				</div>
			</div>

			<div class="article-card">
				<h3>🎯 Tab Navigation Best Practices</h3>
				<p class="article-meta">Published: March 10, 2024 • By: Demo User</p>
				<p>
					Discover the best practices for implementing tab navigation in modern web applications.
				</p>
				<div class="article-actions">
					<button class="btn-primary">Edit</button>
					<button class="btn-secondary">View</button>
				</div>
			</div>

			<div class="article-card">
				<h3>🔧 Component Architecture</h3>
				<p class="article-meta">Published: March 5, 2024 • By: Demo User</p>
				<p>
					Understanding how to structure reusable components for maximum flexibility and
					maintainability.
				</p>
				<div class="article-actions">
					<button class="btn-primary">Edit</button>
					<button class="btn-secondary">View</button>
				</div>
			</div>
		</div>
	</div>

	<div class="navigation-test">
		<h2>Test Navigation</h2>
		<p>Click on these links to test the pathPrefix functionality:</p>
		<div class="test-links">
			<a href="/tenant-demo/dashboard" class="test-link">Dashboard</a>
			<a href="/tenant-demo/articles" class="test-link current">Articles (current)</a>
			<a href="/tenant-demo/users" class="test-link">Users</a>
			<a href="/tenant-demo/settings" class="test-link">Settings</a>
		</div>
	</div>
</div>

<style>
	.page-content {
		padding: 1rem 0;
	}

	h1 {
		color: var(--svelte-ui-text-color);
		margin-bottom: 2rem;
	}

	.test-result {
		background: var(--svelte-ui-surface-color);
		border: 2px solid var(--svelte-ui-success-color);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.test-result h2 {
		color: var(--svelte-ui-success-color);
		margin: 0 0 1rem 0;
	}

	.result-details {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.result-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.result-item.success {
		padding: 0.5rem;
		background: var(--svelte-ui-success-color);
		color: white;
		border-radius: 4px;
		font-weight: bold;
	}

	.result-item code {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-weak-color);
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-size: 0.9rem;
	}

	.content-section {
		margin-bottom: 2rem;
	}

	.content-section h2 {
		color: var(--svelte-ui-text-color);
		margin-bottom: 1rem;
	}

	.articles-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.article-card {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
		padding: 1.5rem;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.article-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.article-card h3 {
		margin: 0 0 0.5rem 0;
		color: var(--svelte-ui-primary-color);
	}

	.article-meta {
		color: var(--svelte-ui-text-subtle-color);
		font-size: 0.9rem;
		margin: 0 0 1rem 0;
	}

	.article-card p {
		margin: 0 0 1rem 0;
		color: var(--svelte-ui-text-color);
		line-height: 1.5;
	}

	.article-actions {
		display: flex;
		gap: 0.5rem;
	}

	.btn-primary {
		padding: 0.5rem 1rem;
		background: var(--svelte-ui-primary-color);
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.btn-primary:hover {
		background: var(--svelte-ui-hover-overlay);
	}

	.btn-secondary {
		padding: 0.5rem 1rem;
		background: transparent;
		color: var(--svelte-ui-primary-color);
		border: 1px solid var(--svelte-ui-primary-color);
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s;
	}

	.btn-secondary:hover {
		background: var(--svelte-ui-primary-color);
		color: white;
	}

	.navigation-test {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.navigation-test h2 {
		color: var(--svelte-ui-text-color);
		margin: 0 0 1rem 0;
	}

	.navigation-test p {
		color: var(--svelte-ui-text-subtle-color);
		margin-bottom: 1rem;
	}

	.test-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.test-link {
		padding: 0.5rem 1rem;
		background: var(--svelte-ui-primary-color);
		color: white;
		text-decoration: none;
		border-radius: 4px;
		transition: background-color 0.2s;
	}

	.test-link:hover {
		background: var(--svelte-ui-hover-overlay);
	}

	.test-link.current {
		background: var(--svelte-ui-success-color);
		pointer-events: none;
	}

	@media (max-width: 768px) {
		.test-links {
			flex-direction: column;
		}
	}
</style>
