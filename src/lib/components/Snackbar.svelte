<!-- Snackbar.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { snackbar, type SnackbarItem as SnackbarData } from '../utils/snackbar';
	import SnackbarItem from './SnackbarItem.svelte';

	let items: SnackbarData[] = $state([]);
	let topItems: SnackbarData[] = $derived(items.filter((item) => item.position === 'top'));
	let bottomItems: SnackbarData[] = $derived(items.filter((item) => item.position === 'bottom'));

	// Snackbar管理ストアを購読
	onMount(() => {
		const unsubscribe = snackbar.store.subscribe((newItems) => {
			items = newItems;
		});

		return unsubscribe;
	});
</script>

<!-- Top position snackbars -->
{#if topItems.length > 0}
	<div class="snackbar-container snackbar-container--top">
		{#each topItems as item, index (item.id)}
			<div class="snackbar-wrapper" style="z-index: {1000 + index};">
				<SnackbarItem
					id={item.id}
					message={item.message}
					type={item.type}
					variant={item.variant}
					duration={item.duration}
					position={item.position}
					closable={item.closable}
					actionLabel={item.actionLabel}
					onAction={item.onAction}
					children={item.children}
				/>
			</div>
		{/each}
	</div>
{/if}

<!-- Bottom position snackbars -->
{#if bottomItems.length > 0}
	<div class="snackbar-container snackbar-container--bottom">
		{#each bottomItems as item, index (item.id)}
			<div class="snackbar-wrapper" style="z-index: {1000 + index};">
				<SnackbarItem
					id={item.id}
					message={item.message}
					type={item.type}
					variant={item.variant}
					duration={item.duration}
					position={item.position}
					closable={item.closable}
					actionLabel={item.actionLabel}
					onAction={item.onAction}
					children={item.children}
				/>
			</div>
		{/each}
	</div>
{/if}

<style>
	.snackbar-container {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		width: max-content;
		max-width: 90vw;
		pointer-events: none;
		z-index: var(--svelte-ui-snackbar-z-index, 1000);
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.snackbar-container--top {
		top: 20px;
		/* top位置では新しいSnackbarが下に追加される（通常のflex-direction） */
		/* 最初のSnackbarが画面上端に近いので、上の余白は不要 */
	}

	.snackbar-container--bottom {
		bottom: 20px;
		flex-direction: column-reverse; /* 新しいSnackbarが下（画面下端寄り）に追加 */
		/* 最初のSnackbarが画面下端に近いので、下の余白は不要 */
	}

	.snackbar-wrapper {
		pointer-events: auto;
		position: relative; /* staticの代わりにrelativeを使用 */
	}

	/* アニメーション改善 */
	.snackbar-wrapper :global(.snackbar) {
		margin-bottom: 0; /* デフォルトのマージンを削除 */
	}
</style>
