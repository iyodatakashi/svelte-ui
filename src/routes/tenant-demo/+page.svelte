<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	// Auto-redirect to dashboard after 3 seconds
	onMount(() => {
		const timer = setTimeout(() => {
			goto('/tenant-demo/dashboard');
		}, 3000);

		return () => clearTimeout(timer);
	});
</script>

<svelte:head>
	<title>Multi-Tenant Demo - pathPrefix Test</title>
</svelte:head>

<div class="page-content">
	<div class="welcome-section">
		<h1>🏢 Multi-Tenant Demo</h1>
		<p class="subtitle">Testing pathPrefix functionality with Tab component</p>
	</div>

	<div class="demo-explanation">
		<h2>🎯 What is this demo?</h2>
		<p>
			This demo demonstrates how the <strong>pathPrefix</strong> feature works in multi-tenant applications
			where URLs have tenant-specific prefixes.
		</p>

		<div class="problem-solution">
			<div class="problem">
				<h3>❌ The Problem</h3>
				<p>In multi-tenant apps, URLs often have tenant prefixes:</p>
				<ul>
					<li>Actual URL: <code>/tenant-demo/dashboard</code></li>
					<li>Tab href: <code>/dashboard</code></li>
					<li>Result: ❌ Tab doesn't match, not highlighted</li>
				</ul>
			</div>

			<div class="solution">
				<h3>✅ The Solution</h3>
				<p>Using pathPrefix automatically strips the tenant prefix:</p>
				<ul>
					<li>pathPrefix: <code>/tenant-demo</code></li>
					<li>Normalized URL: <code>/dashboard</code></li>
					<li>Tab href: <code>/dashboard</code></li>
					<li>Result: ✅ Perfect match, tab highlighted!</li>
				</ul>
			</div>
		</div>
	</div>

	<div class="usage-section">
		<h2>📝 Usage</h2>
		<div class="code-example">
			<pre><code
					>{`<Tab 
  tabItems={menuItems} 
  pathPrefix="/tenant-demo"
  ariaLabel="Tenant navigation"
/>`}</code
				></pre>
		</div>
	</div>

	<div class="auto-redirect">
		<h2>🔄 Auto-Redirect</h2>
		<p>You will be automatically redirected to the dashboard in 3 seconds...</p>
		<div class="redirect-actions">
			<a href="/tenant-demo/dashboard" class="btn-primary">Go to Dashboard Now</a>
			<a href="/" class="btn-secondary">Back to Home</a>
		</div>
	</div>

	<div class="quick-links">
		<h2>🔗 Quick Links</h2>
		<div class="links-grid">
			<a href="/tenant-demo/dashboard" class="quick-link">
				<div class="link-icon">📊</div>
				<div class="link-content">
					<h3>Dashboard</h3>
					<p>View analytics and metrics</p>
				</div>
			</a>
			<a href="/tenant-demo/articles" class="quick-link">
				<div class="link-icon">📝</div>
				<div class="link-content">
					<h3>Articles</h3>
					<p>Manage your content</p>
				</div>
			</a>
			<a href="/tenant-demo/users" class="quick-link">
				<div class="link-icon">👥</div>
				<div class="link-content">
					<h3>Users</h3>
					<p>Manage tenant users</p>
				</div>
			</a>
			<a href="/tenant-demo/settings" class="quick-link">
				<div class="link-icon">⚙️</div>
				<div class="link-content">
					<h3>Settings</h3>
					<p>Configure your tenant</p>
				</div>
			</a>
		</div>
	</div>

	<div class="test-info">
		<h2>🧪 Test Instructions</h2>
		<div class="test-steps">
			<div class="test-step">
				<div class="step-number">1</div>
				<div class="step-content">
					<h3>Navigate to any page</h3>
					<p>Click on the navigation tabs or quick links above</p>
				</div>
			</div>
			<div class="test-step">
				<div class="step-number">2</div>
				<div class="step-content">
					<h3>Observe the tab highlighting</h3>
					<p>
						Notice how the correct tab is highlighted despite the URL having <code
							>/tenant-demo</code
						> prefix
					</p>
				</div>
			</div>
			<div class="test-step">
				<div class="step-number">3</div>
				<div class="step-content">
					<h3>Check the URL structure</h3>
					<p>
						URLs will show <code>/tenant-demo/page</code> but tabs match against <code>/page</code>
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="redirect-test">
		<h2>🔄 beforeNavigate Redirect Test</h2>
		<p>
			The layout now includes automatic redirection. When you're in the tenant area and click a
			relative path link, it will automatically redirect to the tenant-prefixed URL.
		</p>

		<div class="test-links">
			<h3>✅ These links will be redirected:</h3>
			<div class="redirect-links">
				<a href="/dashboard" class="test-link redirect-link">
					<span class="link-arrow">→</span>
					<span class="link-text">/dashboard</span>
					<span class="link-result">→ /tenant-demo/dashboard</span>
				</a>
				<a href="/articles" class="test-link redirect-link">
					<span class="link-arrow">→</span>
					<span class="link-text">/articles</span>
					<span class="link-result">→ /tenant-demo/articles</span>
				</a>
				<a href="/users" class="test-link redirect-link">
					<span class="link-arrow">→</span>
					<span class="link-text">/users</span>
					<span class="link-result">→ /tenant-demo/users</span>
				</a>
				<a href="/settings" class="test-link redirect-link">
					<span class="link-arrow">→</span>
					<span class="link-text">/settings</span>
					<span class="link-result">→ /tenant-demo/settings</span>
				</a>
			</div>

			<h3>❌ These links will NOT be redirected:</h3>
			<div class="no-redirect-links">
				<a href="/api/test" class="test-link no-redirect-link">
					<span class="link-arrow">→</span>
					<span class="link-text">/api/test</span>
					<span class="link-result">(excluded path)</span>
				</a>
				<a href="/auth/login" class="test-link no-redirect-link">
					<span class="link-arrow">→</span>
					<span class="link-text">/auth/login</span>
					<span class="link-result">(excluded path)</span>
				</a>
				<a href="/tenant-demo/dashboard" class="test-link no-redirect-link">
					<span class="link-arrow">→</span>
					<span class="link-text">/tenant-demo/dashboard</span>
					<span class="link-result">(already prefixed)</span>
				</a>
				<a href="/" class="test-link no-redirect-link">
					<span class="link-arrow">→</span>
					<span class="link-text">/</span>
					<span class="link-result">(home page)</span>
				</a>
			</div>

			<div class="test-note">
				<p>
					<strong>📝 Note:</strong> Open your browser's developer console to see redirect logs. The
					console will show messages like:
					<code>🔄 Redirecting from /dashboard to /tenant-demo/dashboard</code>
				</p>
			</div>
		</div>
	</div>

	<div class="current-path">
		<h2>🌐 Current Path Info</h2>
		<div class="path-info">
			<div class="path-item">
				<strong>Full URL:</strong> <code>{$page.url.pathname}</code>
			</div>
			<div class="path-item">
				<strong>Path Prefix:</strong> <code>/tenant-demo</code>
			</div>
			<div class="path-item">
				<strong>Normalized Path:</strong>
				<code>{$page.url.pathname.replace('/tenant-demo', '') || '/'}</code>
			</div>
		</div>
	</div>
</div>

<style>
	.page-content {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.welcome-section {
		text-align: center;
		margin-bottom: 3rem;
	}

	.welcome-section h1 {
		color: var(--svelte-ui-primary-color);
		margin-bottom: 0.5rem;
		font-size: 2.5rem;
	}

	.subtitle {
		color: var(--svelte-ui-text-subtle-color);
		font-size: 1.2rem;
		margin: 0;
	}

	.demo-explanation {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
		padding: 2rem;
		margin-bottom: 2rem;
	}

	.demo-explanation h2 {
		color: var(--svelte-ui-text-color);
		margin: 0 0 1rem 0;
	}

	.problem-solution {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
		margin-top: 2rem;
	}

	.problem,
	.solution {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-weak-color);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.problem {
		border-left: 4px solid var(--svelte-ui-error-color);
	}

	.solution {
		border-left: 4px solid var(--svelte-ui-success-color);
	}

	.problem h3,
	.solution h3 {
		margin: 0 0 1rem 0;
	}

	.problem ul,
	.solution ul {
		margin: 1rem 0 0 1rem;
	}

	.problem li,
	.solution li {
		margin-bottom: 0.5rem;
	}

	.usage-section {
		margin-bottom: 2rem;
	}

	.usage-section h2 {
		color: var(--svelte-ui-text-color);
		margin-bottom: 1rem;
	}

	.code-example {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.code-example pre {
		margin: 0;
		overflow-x: auto;
	}

	.code-example code {
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 0.9rem;
		line-height: 1.4;
		background: transparent;
		color: var(--svelte-ui-text-color);
	}

	.auto-redirect {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-primary-color);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
		text-align: center;
	}

	.auto-redirect h2 {
		color: var(--svelte-ui-primary-color);
		margin: 0 0 1rem 0;
	}

	.redirect-actions {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin-top: 1rem;
	}

	.btn-primary {
		padding: 0.75rem 1.5rem;
		background: var(--svelte-ui-primary-color);
		color: white;
		text-decoration: none;
		border-radius: 4px;
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
		text-decoration: none;
		border-radius: 4px;
		transition: all 0.2s;
		font-size: 1rem;
	}

	.btn-secondary:hover {
		background: var(--svelte-ui-primary-color);
		color: white;
	}

	.quick-links {
		margin-bottom: 2rem;
	}

	.quick-links h2 {
		color: var(--svelte-ui-text-color);
		margin-bottom: 1rem;
	}

	.links-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 1rem;
	}

	.quick-link {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
		padding: 1.5rem;
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 1rem;
		transition: all 0.2s;
	}

	.quick-link:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		border-color: var(--svelte-ui-primary-color);
	}

	.link-icon {
		font-size: 2rem;
		flex-shrink: 0;
	}

	.link-content h3 {
		margin: 0 0 0.25rem 0;
		color: var(--svelte-ui-text-color);
	}

	.link-content p {
		margin: 0;
		color: var(--svelte-ui-text-subtle-color);
		font-size: 0.9rem;
	}

	.test-info {
		margin-bottom: 2rem;
	}

	.test-info h2 {
		color: var(--svelte-ui-text-color);
		margin-bottom: 1rem;
	}

	.test-steps {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.test-step {
		display: flex;
		align-items: flex-start;
		gap: 1rem;
	}

	.step-number {
		width: 2rem;
		height: 2rem;
		background: var(--svelte-ui-primary-color);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		flex-shrink: 0;
	}

	.step-content h3 {
		margin: 0 0 0.5rem 0;
		color: var(--svelte-ui-text-color);
	}

	.step-content p {
		margin: 0;
		color: var(--svelte-ui-text-subtle-color);
		line-height: 1.5;
	}

	.current-path {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
		padding: 1.5rem;
	}

	.current-path h2 {
		color: var(--svelte-ui-text-color);
		margin: 0 0 1rem 0;
	}

	.path-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.path-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.path-item code {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-weak-color);
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-size: 0.9rem;
	}

	.redirect-test {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.redirect-test h2 {
		color: var(--svelte-ui-primary-color);
		margin: 0 0 1rem 0;
	}

	.test-links h3 {
		color: var(--svelte-ui-text-color);
		margin: 0 0 1rem 0;
	}

	.redirect-links,
	.no-redirect-links {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-top: 0.5rem;
	}

	.test-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 6px;
		text-decoration: none;
		color: var(--svelte-ui-text-color);
		transition: all 0.2s;
	}

	.test-link:hover {
		background: var(--svelte-ui-surface-color-hover);
		border-color: var(--svelte-ui-primary-color);
	}

	.test-link .link-arrow {
		font-size: 1rem;
		flex-shrink: 0;
	}

	.test-link .link-text {
		font-weight: bold;
		color: var(--svelte-ui-primary-color);
	}

	.test-link .link-result {
		font-size: 0.9rem;
		color: var(--svelte-ui-text-subtle-color);
		margin-left: 0.5rem;
	}

	.test-link.redirect-link .link-result {
		color: var(--svelte-ui-success-color);
	}

	.test-link.no-redirect-link .link-result {
		color: var(--svelte-ui-error-color);
	}

	.test-note {
		margin-top: 1.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--svelte-ui-border-color);
	}

	.test-note p {
		margin: 0;
		color: var(--svelte-ui-text-subtle-color);
		font-size: 0.9rem;
	}

	.test-note strong {
		color: var(--svelte-ui-text-color);
	}

	.test-note code {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-weak-color);
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.page-content {
			padding: 1rem;
		}

		.welcome-section h1 {
			font-size: 2rem;
		}

		.problem-solution {
			grid-template-columns: 1fr;
		}

		.redirect-actions {
			flex-direction: column;
			align-items: center;
		}

		.links-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
