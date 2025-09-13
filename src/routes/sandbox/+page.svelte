<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Skeleton from '$lib/components/skeleton/Skeleton.svelte';
	let value: string = $state('');
</script>

<div class="container">
	<Input bind:value minWidth={300} />
	<Skeleton
		patterns={[
			{ type: 'avatar', showName: true },
			{
				type: 'article-list',
				lines: 3,
				thumbnailConfig: { width: 300, aspectRatio: '16/9' }
			}
		]}
	/>
</div>

<style>
	.container {
		padding: 32px;
		width: 100%;
	}
</style>
