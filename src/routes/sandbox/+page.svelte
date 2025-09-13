<script lang="ts">
	import Skeleton from '$lib/components/skeleton/Skeleton.svelte';
</script>

<div class="container">
	<Skeleton
		patterns={[{ type: 'video-list', layout: 'vertical', repeatDirection: 'horizontal' }]}
	/>
</div>

<style>
	.container {
		padding: 32px;
		width: 100%;
	}
</style>
