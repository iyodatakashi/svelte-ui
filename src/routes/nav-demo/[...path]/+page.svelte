<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Nav Demo - {$page.url.pathname}</title>
</svelte:head>

<h1>{$page.url.pathname}</h1>
<p>現在のパス: <code>{$page.url.pathname}</code></p>
