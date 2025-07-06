<!-- LoadingSpinner.svelte -->

<script lang="ts">
	let {
		speed = 1,
		size = 32,
		color,
		strokeWidth = 3,
		reducedMotion = false
	}: {
		speed?: number;
		size?: number;
		color?: string;
		strokeWidth?: number;
		reducedMotion?: boolean;
	} = $props();

	const radius = $derived((size - strokeWidth) / 2);

	// speedによる動的計算
	const growDuration = $derived(1.6 / speed);
	const rotateDuration = $derived(0.8 / speed);
</script>

<div
	class="spinner"
	class:spinner--no-motion={reducedMotion}
	style:--grow-duration="{growDuration}s"
	style:--rotate-duration="{rotateDuration}s"
	style:--spinner-size="{size}px"
	style:--spinner-color={color}
>
	<svg viewBox="0 0 {size} {size}" width={size} height={size}>
		<circle cx={size / 2} cy={size / 2} r={radius} style:stroke-width={strokeWidth} />
	</svg>
</div>

<style>
	.spinner {
		width: var(--spinner-size, var(--svelte-ui-loadingspinner-size));
		height: var(--spinner-size, var(--svelte-ui-loadingspinner-size));
	}

	.spinner svg {
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
		animation: rotate var(--rotate-duration, 0.8s) linear infinite;
	}

	.spinner circle {
		fill: none;
		stroke: var(--spinner-color, var(--svelte-ui-loadingspinner-color));
		stroke-linecap: butt;
		animation: complex-grow var(--grow-duration, 1.6s) linear infinite;
		transform-origin: center;
	}

	@keyframes rotate {
		0% {
			transform: rotate(-90deg);
		}
		100% {
			transform: rotate(270deg);
		}
	}

	@keyframes complex-grow {
		/* フェーズ1: 12時から6時まで */
		0% {
			stroke-dasharray: 0 88;
			stroke-dashoffset: -44;
		}
		50% {
			stroke-dasharray: 44 88;
			stroke-dashoffset: 0;
		}
		/* フェーズ2: 6時から12時まで */
		100% {
			stroke-dasharray: 0 88;
			stroke-dashoffset: -44;
		}
	}

	/* Reduced motion */
	.spinner--no-motion svg,
	.spinner--no-motion circle {
		animation-duration: 0.01s;
	}

	/* Prefers reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.spinner svg,
		.spinner circle {
			animation-duration: 0.01s;
		}
	}
</style>
