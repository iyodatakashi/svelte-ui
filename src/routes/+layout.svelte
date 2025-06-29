<script lang="ts">
	import type { Snippet } from 'svelte';
	import '$lib/assets/styles/import.scss';

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
