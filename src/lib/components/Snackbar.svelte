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
	<div class="snackbar-list snackbar-list--top">
		{#each topItems as item, index (item.id)}
			<div class="snackbar-list__item" style="z-index: {1000 + index};">
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
	<div class="snackbar-list snackbar-list--bottom">
		{#each bottomItems as item, index (item.id)}
			<div class="snackbar-list__item" style="z-index: {1000 + index};">
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
	.snackbar-list {
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

	.snackbar-list--top {
		top: 24px;
	}

	.snackbar-list--bottom {
		bottom: 24px;
		flex-direction: column-reverse;
	}

	.snackbar-list__item {
		pointer-events: auto;
		position: relative;
	}

	.snackbar-list__item :global(.snackbar) {
		margin-bottom: 0;
	}
</style>
