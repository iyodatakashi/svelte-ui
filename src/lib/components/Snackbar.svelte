<!-- Snackbar.svelte -->

<script lang="ts">
	import { onMount } from 'svelte';
	import { snackbarManager, type SnackbarItem as SnackbarData } from '../utils/snackbar.svelte';
	import SnackbarItem from './SnackbarItem.svelte';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================

	let {
		// スタイル/レイアウト
		position = 'bottom',
		maxVisible = 5,
		variant = 'filled',

		// 状態/動作
		duration = 3000
	}: {
		// スタイル/レイアウト
		position?: 'top' | 'bottom';
		maxVisible?: number;
		variant?: 'filled' | 'outlined';

		// 状態/動作
		duration?: number;
	} = $props();

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
