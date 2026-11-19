<script lang="ts">
	import Tab from '$lib/components/Tab.svelte';
	import type { MenuItem } from '$lib/types/menuItem';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { beforeNavigate, goto } from '$app/navigation';

	// テナントデモ用のタブアイテム
	const tabItems: MenuItem[] = [
		{
			label: 'Dashboard',
			href: '/dashboard',
			icon: 'dashboard'
		},
		{
			label: 'Articles',
			href: '/articles',
			icon: 'article'
		},
		{
			label: 'Users',
			href: '/users',
			icon: 'people'
		},
		{
			label: 'Settings',
			href: '/settings',
			icon: 'settings'
		}
	];

	// 現在のパスを安全に取得
	const currentPath = $derived(browser ? page.url.pathname : '');

	// テナントプレフィックス
	const tenantPrefix = '/tenant-demo';

	// ナビゲーション前の処理
	beforeNavigate(({ to, cancel }) => {
		// 遷移先URLが存在しない場合は何もしない
		if (!to?.url?.pathname) return;

		const targetPath = to.url.pathname;
		const currentPathname = page.url.pathname;

		// 現在のパスがテナント内にある場合のみ処理
		if (currentPathname.startsWith(tenantPrefix)) {
			// 遷移先が相対パス（/で始まるがテナントパス付きでない）の場合
			if (targetPath.startsWith('/') && !targetPath.startsWith(tenantPrefix)) {
				// 外部パスや特定のパスは除外
				const excludedPaths = ['/api', '/auth', '/login', '/logout', '/health'];
				const isExcluded = excludedPaths.some((path) => targetPath.startsWith(path));

				if (!isExcluded) {
					// ナビゲーションをキャンセル
					cancel();
					// テナントパス付きのURLにリダイレクト
					const redirectPath = `${tenantPrefix}${targetPath}`;
					console.log(`🔄 Redirecting from ${targetPath} to ${redirectPath}`);
					goto(redirectPath);
				}
			}
		}
	});
</script>

<div class="tenant-demo-layout">
	<header class="header">
		<div class="tenant-info">
			<h1>🏢 Demo Tenant</h1>
			<p>Multi-tenant application simulation</p>
		</div>

		<nav class="navigation">
			<Tab {tabItems} pathPrefix="/tenant-demo" ariaLabel="Tenant navigation" />
		</nav>
	</header>

	<main class="main-content">
		<div class="path-indicator">
			<strong>Current URL:</strong> <code>{currentPath || 'Loading...'}</code>
		</div>

		<div class="explanation">
			<h2>🎯 pathPrefix Demo</h2>
			<div class="demo-info">
				<div class="info-item">
					<strong>pathPrefix:</strong> <code>/tenant-demo</code>
				</div>
				<div class="info-item">
					<strong>Tab hrefs:</strong> <code>/dashboard</code>, <code>/articles</code>,
					<code>/users</code>, <code>/settings</code>
				</div>
				<div class="info-item">
					<strong>Actual URLs:</strong> <code>/tenant-demo/dashboard</code>,
					<code>/tenant-demo/articles</code>, etc.
				</div>
			</div>
		</div>

		<slot />
	</main>
</div>

<style>
	.tenant-demo-layout {
		min-height: 100vh;
		background: var(--svelte-ui-surface-color);
	}

	.header {
		background: white;
		border-bottom: 1px solid var(--svelte-ui-border-color);
		padding: 1rem 2rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.tenant-info {
		margin-bottom: 1rem;
	}

	.tenant-info h1 {
		margin: 0 0 0.5rem 0;
		color: var(--svelte-ui-primary-color);
		font-size: 1.5rem;
	}

	.tenant-info p {
		margin: 0;
		color: var(--svelte-ui-text-subtle-color);
		font-size: 0.9rem;
	}

	.navigation {
		height: 60px;
		background: var(--svelte-ui-surface-color);
		border-radius: 8px;
		border: 1px solid var(--svelte-ui-border-weak-color);
	}

	.main-content {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.path-indicator {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-weak-color);
		border-radius: 4px;
		padding: 1rem;
		margin-bottom: 2rem;
		font-family: monospace;
	}

	.explanation {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-color);
		border-radius: 8px;
		padding: 1.5rem;
		margin-bottom: 2rem;
	}

	.explanation h2 {
		margin: 0 0 1rem 0;
		color: var(--svelte-ui-text-color);
	}

	.demo-info {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.info-item {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.info-item code {
		background: var(--svelte-ui-surface-color);
		border: 1px solid var(--svelte-ui-border-weak-color);
		padding: 0.2rem 0.4rem;
		border-radius: 3px;
		font-size: 0.9rem;
	}

	@media (max-width: 768px) {
		.header {
			padding: 1rem;
		}

		.main-content {
			padding: 1rem;
		}

		.demo-info {
			font-size: 0.9rem;
		}
	}
</style>
