<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Dashboard - Demo Tenant</title>
</svelte:head>

<div class="page-content">
	<h1>📊 Dashboard</h1>

	<div class="test-result">
		<h2>✅ pathPrefix Test Result</h2>
		<div class="result-details">
			<div class="result-item">
				<strong>Expected:</strong> Dashboard tab should be selected
			</div>
			<div class="result-item">
				<strong>Current URL:</strong> <code>{$page.url.pathname}</code>
			</div>
			<div class="result-item">
				<strong>Tab href:</strong> <code>/dashboard</code>
			</div>
			<div class="result-item">
				<strong>pathPrefix:</strong> <code>/tenant-demo</code>
			</div>
			<div class="result-item success">
				<strong>Result:</strong>
				<span>✅ If the Dashboard tab is highlighted above, pathPrefix is working correctly!</span>
			</div>
		</div>
	</div>

	<div class="content-section">
		<h2>Dashboard Content</h2>
		<div class="dashboard-grid">
			<div class="dashboard-card">
				<h3>📈 Analytics</h3>
				<p>View your application metrics and performance data.</p>
			</div>
			<div class="dashboard-card">
				<h3>👥 Users</h3>
				<p>Manage your tenant users and permissions.</p>
			</div>
			<div class="dashboard-card">
				<h3>📝 Recent Articles</h3>
				<p>Latest articles and content from your tenant.</p>
			</div>
			<div class="dashboard-card">
				<h3>⚙️ Settings</h3>
				<p>Configure your tenant settings and preferences.</p>
			</div>
		</div>
	</div>

	<div class="navigation-test">
		<h2>Test Navigation</h2>
		<p>Click on these links to test the pathPrefix functionality:</p>
		<div class="test-links">
			<a href="/tenant-demo/dashboard" class="test-link current">Dashboard (current)</a>
			<a href="/tenant-demo/articles" class="test-link">Articles</a>
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

	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.dashboard-card {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
		padding: 1.5rem;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.dashboard-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.dashboard-card h3 {
		margin: 0 0 0.5rem 0;
		color: var(--svelte-ui-primary-color);
	}

	.dashboard-card p {
		margin: 0;
		color: var(--svelte-ui-text-subtle-color);
		line-height: 1.5;
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
		.dashboard-grid {
			grid-template-columns: 1fr;
		}

		.test-links {
			flex-direction: column;
		}
	}
</style>
