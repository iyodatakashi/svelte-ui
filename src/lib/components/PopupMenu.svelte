<script lang="ts">
	import Popup from './Popup.svelte';
	import Icon from './Icon.svelte';
	import type { MenuItem } from '$lib/types/MenuItem';
	import { goto } from '$app/navigation';
	import type { SvelteComponent } from 'svelte';
	let {
		anchorElement,
		position = 'bottom',
		menuItems
	}: {
		anchorElement: HTMLElement;
		position?: 'top' | 'bottom' | 'left' | 'right';
		menuItems: (MenuItem | 'separator')[];
	} = $props();
	let popupRef: SvelteComponent | undefined = $state();
	const handleClick = (event: MouseEvent, item: MenuItem | 'separator') => {
		event.preventDefault();
		event.stopPropagation();
		if (item === 'separator') return;
		if (item.href) {
			goto(`${item.href}`);
		}
		if (item.callback) {
			item.callback();
		}
		popupRef?.close();
	};
	export const open = () => {
		popupRef?.open();
	};
	export const close = () => {
		popupRef?.close();
	};
	export const toggle = () => {
		popupRef?.toggle();
	};
</script>

<Popup bind:this={popupRef} {anchorElement} {position}>
	<div class="menu-container">
		<ul class="menu-list">
			{#each menuItems as item}
				<li class="menu-item">
					{#if item === 'separator'}
						<div class="separator"></div>
					{:else}
						<button onclick={(event) => handleClick(event, item)}>
							{#if item.icon}
								<Icon>{item.icon}</Icon>
							{/if}
							{item.title}
						</button>
					{/if}
				</li>
			{/each}
		</ul>
	</div>
</Popup>

<style lang="scss">
	.menu-container {
		background-color: var(--white);
		border-radius: 4px;
	}
	.menu-list {
		padding: 8px 0;
	}
	button {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 8px 16px;
		background: transparent;
		border: none;
		font-size: 1rem;
		color: var(--svelte-ui-text);
		text-align: left;
		white-space: nowrap;
	}
	button:hover {
		background-color: var(--svelte-ui-hover-overlay);
	}
	.separator {
		height: 0;
		margin: 8px 0;
		border-bottom: solid 1px var(--svelte-ui-border-color);
	}
</style>
