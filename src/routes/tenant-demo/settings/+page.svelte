<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Settings - Demo Tenant</title>
</svelte:head>

<div class="page-content">
	<h1>⚙️ Settings</h1>

	<div class="test-result">
		<h2>✅ pathPrefix Test Result</h2>
		<div class="result-details">
			<div class="result-item">
				<strong>Expected:</strong> Settings tab should be selected
			</div>
			<div class="result-item">
				<strong>Current URL:</strong> <code>{$page.url.pathname}</code>
			</div>
			<div class="result-item">
				<strong>Tab href:</strong> <code>/settings</code>
			</div>
			<div class="result-item">
				<strong>pathPrefix:</strong> <code>/tenant-demo</code>
			</div>
			<div class="result-item success">
				<strong>Result:</strong>
				<span>✅ If the Settings tab is highlighted above, pathPrefix is working correctly!</span>
			</div>
		</div>
	</div>

	<div class="content-section">
		<h2>Tenant Settings</h2>
		<div class="settings-container">
			<div class="settings-section">
				<h3>🏢 General Settings</h3>
				<div class="setting-item">
					<label for="tenant-name">Tenant Name</label>
					<input type="text" id="tenant-name" value="Demo Tenant" />
				</div>
				<div class="setting-item">
					<label for="tenant-domain">Domain</label>
					<input type="text" id="tenant-domain" value="demo-tenant.com" />
				</div>
				<div class="setting-item">
					<label for="tenant-description">Description</label>
					<textarea id="tenant-description" rows="3"
						>A demonstration tenant for testing multi-tenant functionality.</textarea
					>
				</div>
			</div>

			<div class="settings-section">
				<h3>🎨 Appearance</h3>
				<div class="setting-item">
					<label for="theme">Theme</label>
					<select id="theme">
						<option value="light">Light</option>
						<option value="dark">Dark</option>
						<option value="auto">Auto</option>
					</select>
				</div>
				<div class="setting-item">
					<label for="primary-color">Primary Color</label>
					<input type="color" id="primary-color" value="#6750a4" />
				</div>
				<div class="setting-item">
					<label>
						<input type="checkbox" checked />
						Use custom branding
					</label>
				</div>
			</div>

			<div class="settings-section">
				<h3>🔒 Security</h3>
				<div class="setting-item">
					<label>
						<input type="checkbox" checked />
						Enable two-factor authentication
					</label>
				</div>
				<div class="setting-item">
					<label>
						<input type="checkbox" />
						Require password reset every 90 days
					</label>
				</div>
				<div class="setting-item">
					<label for="session-timeout">Session Timeout (minutes)</label>
					<input type="number" id="session-timeout" value="30" min="5" max="1440" />
				</div>
			</div>

			<div class="settings-section">
				<h3>🌐 pathPrefix Configuration</h3>
				<div class="setting-item">
					<label for="path-prefix">Path Prefix</label>
					<input type="text" id="path-prefix" value="/tenant-demo" readonly />
					<p class="setting-help">This is the URL prefix used for this tenant's routes</p>
				</div>
				<div class="setting-item">
					<label>
						<input type="checkbox" checked />
						Use pathPrefix for tab navigation
					</label>
					<p class="setting-help">
						When enabled, tab navigation will automatically strip the path prefix for matching
					</p>
				</div>
			</div>
		</div>

		<div class="save-actions">
			<button class="btn-primary">Save Settings</button>
			<button class="btn-secondary">Reset to Defaults</button>
		</div>
	</div>

	<div class="navigation-test">
		<h2>Test Navigation</h2>
		<p>Click on these links to test the pathPrefix functionality:</p>
		<div class="test-links">
			<a href="/tenant-demo/dashboard" class="test-link">Dashboard</a>
			<a href="/tenant-demo/articles" class="test-link">Articles</a>
			<a href="/tenant-demo/users" class="test-link">Users</a>
			<a href="/tenant-demo/settings" class="test-link current">Settings (current)</a>
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

	.settings-container {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.settings-section {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.settings-section h3 {
		margin: 0 0 1rem 0;
		color: var(--svelte-ui-primary-color);
	}

	.setting-item {
		margin-bottom: 1rem;
	}

	.setting-item:last-child {
		margin-bottom: 0;
	}

	.setting-item label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 500;
		color: var(--svelte-ui-text-color);
	}

	.setting-item input[type='text'],
	.setting-item input[type='number'],
	.setting-item select,
	.setting-item textarea {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 4px;
		font-size: 1rem;
		background: var(--svelte-ui-surface-color);
		color: var(--svelte-ui-text-color);
	}

	.setting-item input[type='color'] {
		width: 4rem;
		height: 2.5rem;
		padding: 0.25rem;
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 4px;
		cursor: pointer;
	}

	.setting-item input[type='checkbox'] {
		margin-right: 0.5rem;
	}

	.setting-item label:has(input[type='checkbox']) {
		display: flex;
		align-items: center;
		margin-bottom: 0.5rem;
	}

	.setting-help {
		font-size: 0.85rem;
		color: var(--svelte-ui-text-subtle-color);
		margin-top: 0.25rem;
		margin-bottom: 0;
	}

	.save-actions {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
	}

	.btn-primary {
		padding: 0.75rem 1.5rem;
		background: var(--svelte-ui-primary-color);
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		transition: background-color 0.2s;
		font-size: 1rem;
	}

	.btn-primary:hover {
		background: var(--svelte-ui-hover-overlay);
	}

	.btn-secondary {
		padding: 0.75rem 1.5rem;
		background: transparent;
		color: var(--svelte-ui-primary-color);
		border: 1px solid var(--svelte-ui-primary-color);
		border-radius: 4px;
		cursor: pointer;
		transition: all 0.2s;
		font-size: 1rem;
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
		.save-actions {
			flex-direction: column;
		}

		.test-links {
			flex-direction: column;
		}
	}
</style>
