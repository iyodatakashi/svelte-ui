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

	// 円周の動的計算
	const circumference = $derived(2 * Math.PI * radius);
	const halfCircumference = $derived(circumference / 2);
	const negativeHalfCircumference = $derived(-circumference / 2);

	// speedによる動的計算
	const growDuration = $derived(1.6 / speed);
	const rotateDuration = $derived(0.8 / speed);
</script>

<div
	class="loading-spinner"
	class:spinner--no-motion={reducedMotion}
	style:--grow-duration="{growDuration}s"
	style:--rotate-duration="{rotateDuration}s"
	style:--spinner-size="{size}px"
	style:--spinner-color={color}
	style:--circumference={circumference}
	style:--half-circumference={halfCircumference}
	style:--negative-half-circumference={negativeHalfCircumference}
>
	<svg viewBox="0 0 {size} {size}" width={size} height={size}>
		<circle cx={size / 2} cy={size / 2} r={radius} style:stroke-width={strokeWidth} />
	</svg>
</div>

<style>
	.loading-spinner {
		width: var(--spinner-size, var(--svelte-ui-loadingspinner-size));
		height: var(--spinner-size, var(--svelte-ui-loadingspinner-size));
		line-height: 1px;
	}

	.loading-spinner svg {
		width: 100%;
		height: 100%;
		transform: rotate(-90deg);
		animation: rotate var(--rotate-duration, 0.8s) linear infinite;
	}

	.loading-spinner circle {
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
		/* 負の値も別のCSS変数として定義 */
		0% {
			stroke-dasharray: 0 var(--circumference);
			stroke-dashoffset: var(--negative-half-circumference);
		}
		50% {
			stroke-dasharray: var(--half-circumference) var(--circumference);
			stroke-dashoffset: 0;
		}
		100% {
			stroke-dasharray: 0 var(--circumference);
			stroke-dashoffset: var(--negative-half-circumference);
		}
	}

	/* Reduced motion */
	.spinner--no-motion svg,
	.spinner--no-motion circle {
		animation-duration: 0.01s;
	}

	/* Prefers reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.loading-spinner svg,
		.loading-spinner circle {
			animation-duration: 0.01s;
		}
	}
</style>
