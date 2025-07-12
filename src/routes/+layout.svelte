<script lang="ts">
	import type { Snippet } from 'svelte';
	// Core styles (required for components)
	import '$lib/assets/styles/import.scss';
	// Optional styles for demo pages
	import '$lib/assets/styles/optional/reset.scss';
	import '$lib/assets/styles/optional/fonts.scss';

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
