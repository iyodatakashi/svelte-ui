<script lang="ts">
	import type { Snippet } from 'svelte';
	import NavDemoLayout from '#showcase/features/navDemo/NavDemoLayout.svelte';

	let { children }: { children: Snippet } = $props();
</script>

<NavDemoLayout>{@render children()}</NavDemoLayout>
