<!-- Snackbar.svelte -->

<script lang="ts">
	import { snackbarManager, type SnackbarItem as SnackbarData } from '$lib/utils/snackbar.svelte';
	import SnackbarItem from './SnackbarItem.svelte';
	import type { SnackbarPosition, SnackbarVariant } from '$lib/types/propOptions';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SnackbarProps = {
		// スタイル/レイアウト
		/** @default 'bottom' */
		position?: SnackbarPosition;
		/** Maximum number of snackbars shown at once. @default 5 */
		maxVisible?: number;
		/** @default 'filled' */
		variant?: SnackbarVariant;

		// 状態/動作
		/** Auto-dismiss duration in milliseconds. @default 3000 */
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
	// $effect
	// =========================================================================

	$effect(() => {
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

	// =========================================================================
	// Top layer (popover)
	// =========================================================================
	// Modal は <dialog>.showModal() でトップレイヤーに載るため、通常の z-index では前面に出せない。
	// Snackbar 自身も popover でトップレイヤーに載せて Dialog より前面に表示する。
	let topEl: HTMLDivElement | null = $state(null);
	let bottomEl: HTMLDivElement | null = $state(null);

	const ensureShown = (el: HTMLDivElement | null) => {
		if (!el || typeof el.showPopover !== 'function') return;
		if (!el.matches(':popover-open')) el.showPopover();
	};

	$effect(() => {
		if (topItems.length > 0) ensureShown(topEl);
	});
	$effect(() => {
		if (bottomItems.length > 0) ensureShown(bottomEl);
	});
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
			iconVariant={item.iconVariant ?? 'outlined'}
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
	<div bind:this={topEl} class="snackbar snackbar--top" popover="manual" data-testid="snackbar">
		{#each topItems as item, index (item.id)}
			{@render snackbarItemSnippet(item, index)}
		{/each}
	</div>
{/if}

<!-- Snackbar Bottom Items -->
{#if bottomItems.length > 0}
	<div
		bind:this={bottomEl}
		class="snackbar snackbar--bottom"
		popover="manual"
		data-testid="snackbar"
	>
		{#each bottomItems as item, index (item.id)}
			{@render snackbarItemSnippet(item, index)}
		{/each}
	</div>
{/if}

<style>
	.snackbar {
		/* popover の UA デフォルトスタイルを打ち消す（inset/margin/border/padding/背景/overflow）。
		   inset は left より先に打ち消す（あとに置くと left の中央寄せを上書きしてしまう） */
		inset: auto;
		margin: 0;
		padding: 0;
		border: 0;
		background: transparent;
		overflow: visible;
		color: inherit;

		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		width: max-content;
		max-width: 90vw;
		pointer-events: none;
		/* popover 非対応ブラウザ向けフォールバック（対応時はトップレイヤーで最前面になる） */
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
