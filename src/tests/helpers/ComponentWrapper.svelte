<!-- ComponentWrapper.svelte - Generic test wrapper component for components with Snippet -->
<script lang="ts">
	import type { Component } from 'svelte';

	// Generic props for any component
	let {
		component,
		children = 'Default Content',
		...componentProps
	}: {
		component: Component;
		children?: string;
		[key: string]: any;
	} = $props();
</script>

{#if component}
	{@const Comp = component}
	<Comp {...componentProps}>
		{children}
	</Comp>
{/if}
