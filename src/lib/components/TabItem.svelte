<script lang="ts">
	import Icon from './Icon.svelte';
	import type { MenuItem } from '../types/MenuItem';

	let {
		tabItem,
		isSelected = false
	}: {
		tabItem: MenuItem;
		isSelected?: boolean;
	} = $props();
</script>

<a
	href={tabItem.href}
	class:is-selected={isSelected}
	role="tab"
	aria-selected={isSelected}
	tabindex={0}
>
	{#if tabItem.icon}
		<div class="icon-block">
			<Icon fill={isSelected}>{tabItem.icon}</Icon>
		</div>
	{/if}
	{#if tabItem.title}
		<div class="title-block">
			{tabItem.title}
		</div>
	{/if}
</a>

<style lang="scss">
	a {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		position: relative;
		height: 100%;
		padding: 0 16px;
		color: var(--svelte-ui-text-subtle-color);
		white-space: nowrap;
		text-decoration: none;
		transition-property: background-color, color, outline;
		transition-duration: 0.3s;
		outline: none;
	}

	a:hover:not(.is-selected) {
		background-color: var(--svelte-ui-hover-overlay);
	}

	/* キーボードフォーカス時のみ枠線を表示 */
	a:focus-visible {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	/* フォールバック: :focus-visible未対応ブラウザ用 */
	@supports not selector(:focus-visible) {
		a:focus {
			outline: var(--svelte-ui-focus-outline-inner);
			outline-offset: var(--svelte-ui-focus-outline-offset-inner);
		}

		a:focus:not(.is-selected) {
			background-color: var(--svelte-ui-hover-overlay);
		}
	}

	/* 選択状態のインジケーター */
	a::before {
		content: '';
		display: block;
		position: absolute;
		left: 16px;
		bottom: 0;
		width: calc(100% - 32px);
		height: 4px;
		background-color: var(--svelte-ui-primary-color);
		border-radius: 3px 3px 0 0;
		opacity: 0;
		transition-property: opacity;
		transition-duration: 0.3s;
	}

	a.is-selected {
		color: var(--svelte-ui-primary-color);
		background-color: transparent;
	}

	a.is-selected::before {
		opacity: 1;
	}

	.icon-block {
		width: 24px;
		height: 24px;
	}
</style>
