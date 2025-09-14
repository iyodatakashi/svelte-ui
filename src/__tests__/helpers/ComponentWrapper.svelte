<!-- ComponentWrapper.svelte - Generic test wrapper component for components with Snippet -->
<script lang="ts">
	import type { Component } from 'svelte';
	import type { Snippet } from 'svelte';

	// Generic props for any component
	let {
		component,
		children = 'Default Content',
		...componentProps
	}: {
		component: Component;
		children?: string | Snippet;
		[key: string]: any;
	} = $props();

	// Create a snippet from string content if needed
	const contentSnippet: Snippet =
		typeof children === 'string' ? ((() => children) as unknown as Snippet) : children;

	// Use $state for dynamic component in Svelte 5 runes mode
	const Comp = $state(component);
</script>

<Comp {...componentProps}>
	{@render contentSnippet()}
</Comp>
