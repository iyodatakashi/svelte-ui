<script lang="ts">
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';
	import { beforeNavigate, goto } from '$app/navigation';
	import TenantDemoLayout from '#showcase/features/tenantDemo/TenantDemoLayout.svelte';

	let { children }: { children: Snippet } = $props();

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
					// eslint-disable-next-line svelte/no-navigation-without-resolve -- 遷移先のパスへ実行時に /tenant-demo を足した文字列で、resolve() の型が受け付ける経路として書けない
					goto(redirectPath);
				}
			}
		}
	});
</script>

<TenantDemoLayout>{@render children()}</TenantDemoLayout>
