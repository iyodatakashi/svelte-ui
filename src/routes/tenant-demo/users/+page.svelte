<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Users - Demo Tenant</title>
</svelte:head>

<div class="page-content">
	<h1>👥 Users</h1>

	<div class="test-result">
		<h2>✅ pathPrefix Test Result</h2>
		<div class="result-details">
			<div class="result-item">
				<strong>Expected:</strong> Users tab should be selected
			</div>
			<div class="result-item">
				<strong>Current URL:</strong> <code>{$page.url.pathname}</code>
			</div>
			<div class="result-item">
				<strong>Tab href:</strong> <code>/users</code>
			</div>
			<div class="result-item">
				<strong>pathPrefix:</strong> <code>/tenant-demo</code>
			</div>
			<div class="result-item success">
				<strong>Result:</strong>
				<span>✅ If the Users tab is highlighted above, pathPrefix is working correctly!</span>
			</div>
		</div>
	</div>

	<div class="content-section">
		<h2>User Management</h2>
		<div class="users-container">
			<div class="user-card">
				<div class="user-avatar">👤</div>
				<div class="user-info">
					<h3>John Doe</h3>
					<p class="user-role">Administrator</p>
					<p class="user-email">john.doe@demo-tenant.com</p>
					<p class="user-status active">Active</p>
				</div>
				<div class="user-actions">
					<button class="btn-primary">Edit</button>
					<button class="btn-secondary">View</button>
				</div>
			</div>

			<div class="user-card">
				<div class="user-avatar">👩</div>
				<div class="user-info">
					<h3>Jane Smith</h3>
					<p class="user-role">Editor</p>
					<p class="user-email">jane.smith@demo-tenant.com</p>
					<p class="user-status active">Active</p>
				</div>
				<div class="user-actions">
					<button class="btn-primary">Edit</button>
					<button class="btn-secondary">View</button>
				</div>
			</div>

			<div class="user-card">
				<div class="user-avatar">🧑</div>
				<div class="user-info">
					<h3>Bob Johnson</h3>
					<p class="user-role">Viewer</p>
					<p class="user-email">bob.johnson@demo-tenant.com</p>
					<p class="user-status inactive">Inactive</p>
				</div>
				<div class="user-actions">
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
			<a href="/tenant-demo/articles" class="test-link">Articles</a>
			<a href="/tenant-demo/users" class="test-link current">Users (current)</a>
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

	.users-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.user-card {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
		padding: 1.5rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.user-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.user-avatar {
		font-size: 2rem;
		width: 3rem;
		height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--svelte-ui-primary-color);
		border-radius: 50%;
	}

	.user-info {
		flex: 1;
	}

	.user-info h3 {
		margin: 0 0 0.25rem 0;
		color: var(--svelte-ui-text-color);
	}

	.user-role {
		color: var(--svelte-ui-primary-color);
		font-weight: 500;
		margin: 0 0 0.25rem 0;
	}

	.user-email {
		color: var(--svelte-ui-text-subtle-color);
		font-size: 0.9rem;
		margin: 0 0 0.25rem 0;
	}

	.user-status {
		font-size: 0.8rem;
		padding: 0.2rem 0.5rem;
		border-radius: 12px;
		display: inline-block;
		margin: 0;
	}

	.user-status.active {
		background: var(--svelte-ui-success-color);
		color: white;
	}

	.user-status.inactive {
		background: var(--svelte-ui-error-color);
		color: white;
	}

	.user-actions {
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
		.user-card {
			flex-direction: column;
			text-align: center;
		}

		.user-info {
			text-align: center;
		}

		.test-links {
			flex-direction: column;
		}
	}
</style>
