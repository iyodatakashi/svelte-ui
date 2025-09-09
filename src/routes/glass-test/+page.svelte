<script>
	import IconButton from '$lib/components/IconButton.svelte';
</script>

<div class="container">
	<h1>Glass IconButton Test</h1>

	<div class="test-area gradient1">
		<h2>Diagonal Stripes</h2>
		<IconButton variant="glass" size={32} ariaLabel="Glass test">tune</IconButton>
		<IconButton variant="glass" size={48} ariaLabel="Glass test large">settings</IconButton>
	</div>

	<div class="test-area gradient2">
		<h2>Horizontal Stripes</h2>
		<IconButton variant="glass" size={40} ariaLabel="Glass test">star</IconButton>
		<IconButton variant="glass" size={40} rounded ariaLabel="Glass test rounded"
			>more_vert</IconButton
		>
	</div>

	<div class="test-area image">
		<h2>Radial Pattern</h2>
		<IconButton variant="glass" size={36} ariaLabel="Glass test">home</IconButton>
		<IconButton variant="glass" size={44} ariaLabel="Glass test">favorite</IconButton>
	</div>
</div>

<style>
	.container {
		padding: 20px;
		font-family: sans-serif;
	}

	h1 {
		text-align: center;
		margin-bottom: 40px;
	}

	.test-area {
		margin: 30px 0;
		padding: 40px;
		border-radius: 12px;
		display: flex;
		gap: 20px;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
	}

	.test-area h2 {
		width: 100%;
		text-align: center;
		margin: 0 0 20px 0;
		color: white;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
	}

	.gradient1 {
		background: repeating-linear-gradient(
			45deg,
			#ff6b6b 0px,
			#ff6b6b 20px,
			#4ecdc4 20px,
			#4ecdc4 40px,
			#45b7d1 40px,
			#45b7d1 60px,
			#96ceb4 60px,
			#96ceb4 80px
		);
	}

	.gradient2 {
		background: repeating-linear-gradient(
			90deg,
			#667eea 0px,
			#667eea 15px,
			#764ba2 15px,
			#764ba2 30px,
			#f093fb 30px,
			#f093fb 45px,
			#f441a5 45px,
			#f441a5 60px
		);
	}

	.image {
		background: repeating-conic-gradient(
			from 0deg at 50% 50%,
			#ff6b6b 0deg 30deg,
			#4ecdc4 30deg 60deg,
			#45b7d1 60deg 90deg,
			#96ceb4 90deg 120deg,
			#feca57 120deg 150deg,
			#f093fb 150deg 180deg,
			#667eea 180deg 210deg,
			#764ba2 210deg 240deg,
			#ff9a9e 240deg 270deg,
			#fecfef 270deg 300deg,
			#a8edea 300deg 330deg,
			#fed6e3 330deg 360deg
		);
	}
</style>
