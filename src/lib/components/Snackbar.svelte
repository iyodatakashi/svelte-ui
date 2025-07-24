<!-- Snackbar.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { snackbar, type SnackbarItem as SnackbarData } from '../utils/snackbar';
	import SnackbarItem from './SnackbarItem.svelte';

	type Props = {
		position?: 'top' | 'bottom';
		maxVisible?: number;
		duration?: number;
		variant?: 'filled' | 'outlined';
	};

	let {
		position = 'bottom',
		maxVisible = 5,
		duration = 3000,
		variant = 'filled'
	}: Props = $props();

	let items: SnackbarData[] = $state([]);
	let topItems: SnackbarData[] = $derived(items.filter((item) => item.position === 'top'));
	let bottomItems: SnackbarData[] = $derived(items.filter((item) => item.position === 'bottom'));

	// Snackbar管理ストアを購読
	onMount(() => {
		// デフォルト設定を適用
		snackbar.setDefaults({
			position,
			maxVisible,
			defaultDuration: duration,
			defaultVariant: variant
		});

		const unsubscribe = snackbar.store.subscribe((newItems) => {
			items = newItems;
		});

		return unsubscribe;
	});
</script>

<!-- Top position snackbars -->
{#if topItems.length > 0}
	<div class="snackbar snackbar--top">
		{#each topItems as item, index (item.id)}
			<div class="snackbar__item" style="z-index: {1000 + index};">
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
	<div class="snackbar snackbar--bottom">
		{#each bottomItems as item, index (item.id)}
			<div class="snackbar__item" style="z-index: {1000 + index};">
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
	.snackbar {
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

	.snackbar--top {
		top: calc(var(--svelte-ui-snackbar-offset) - var(--svelte-ui-snackbar-item-spacing));
	}

	.snackbar--bottom {
		bottom: calc(var(--svelte-ui-snackbar-offset) - var(--svelte-ui-snackbar-item-spacing));
		flex-direction: column-reverse;
	}

	.snackbar__item {
		pointer-events: auto;
		position: relative;
	}

	.snackbar__item :global(.snackbar-item__content) {
		margin-bottom: 0;
	}
</style>
