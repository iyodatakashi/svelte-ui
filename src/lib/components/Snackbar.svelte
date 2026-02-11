<!-- Snackbar.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { snackbarManager, type SnackbarItem as SnackbarData } from '$lib/utils/snackbar.svelte';
	import SnackbarItem from './SnackbarItem.svelte';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SnackbarProps = {
		// スタイル/レイアウト
		position?: 'top' | 'bottom';
		maxVisible?: number;
		variant?: 'filled' | 'outlined';

		// 状態/動作
		duration?: number;
	};

	let {
		// スタイル/レイアウト
		position = 'bottom',
		maxVisible = 5,
		variant = 'filled',

		// 状態/動作
		duration = 3000
	}: SnackbarProps = $props();

	// =========================================================================
	// Lifecycle
	// =========================================================================

	onMount(() => {
		snackbarManager.setDefaults({
			position,
			maxVisible,
			defaultDuration: duration,
			defaultVariant: variant
		});
	});

	// =========================================================================
	// $derived
	// =========================================================================

	let topItems: SnackbarData[] = $derived(
		snackbarManager.items.filter((item) => item.position === 'top')
	);
	let bottomItems: SnackbarData[] = $derived(
		snackbarManager.items.filter((item) => item.position === 'bottom')
	);
</script>

{#snippet snackbarItemSnippet(item: SnackbarData, index: number)}
	<div class="snackbar__item" style="z-index: {1000 + index};">
		<SnackbarItem
			children={item.children}
			message={item.message}
			type={item.type}
			actionLabel={item.actionLabel}
			id={item.id}
			variant={item.variant}
			position={item.position}
			iconVariant="outlined"
			color={item.color}
			textColor={item.textColor}
			duration={item.duration}
			closable={item.closable}
			onAction={item.onAction}
		/>
	</div>
{/snippet}

<!-- Snackbar Top Items -->
{#if topItems.length > 0}
	<div class="snackbar snackbar--top" data-testid="snackbar">
		{#each topItems as item, index (item.id)}
			{@render snackbarItemSnippet(item, index)}
		{/each}
	</div>
{/if}

<!-- Snackbar Bottom Items -->
{#if bottomItems.length > 0}
	<div class="snackbar snackbar--bottom" data-testid="snackbar">
		{#each bottomItems as item, index (item.id)}
			{@render snackbarItemSnippet(item, index)}
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
		top: calc(var(--svelte-ui-snackbar-offset) - var(--svelte-ui-snackbar-item-space));
	}

	.snackbar--bottom {
		bottom: calc(var(--svelte-ui-snackbar-offset) - var(--svelte-ui-snackbar-item-space));
		flex-direction: column-reverse;
	}

	.snackbar__item {
		pointer-events: auto;
		position: relative;
	}
</style>
