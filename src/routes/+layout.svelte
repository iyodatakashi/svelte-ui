<script lang="ts">
	import type { Snippet } from 'svelte';
	import '#lib/assets/styles/import.scss';
	import '#lib/assets/styles/optional/reset.scss';
	import '#lib/assets/styles/optional/fonts.scss';

	let { children }: { children: Snippet } = $props();
</script>

{@render children()}
