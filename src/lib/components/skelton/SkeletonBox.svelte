<script lang="ts">
	// =========================================================================
	// Props
	// =========================================================================

	let {
		// 基本プロパティ
		width = '100%',
		height = '40px',
		radius,
		animated = true,
		className = '',
		customStyle = ''
	}: {
		width?: string | number;
		height?: string | number;
		radius?: string | number;
		animated?: boolean;
		className?: string;
		customStyle?: string;
	} = $props();

	// =========================================================================
	// $derived
	// =========================================================================

	const containerClasses = $derived(
		['skeleton-box', animated && 'skeleton-box--animated', className].filter(Boolean).join(' ')
	);

	const widthStyle = $derived(typeof width === 'number' ? `${width}px` : width);
	const heightStyle = $derived(typeof height === 'number' ? `${height}px` : height);
	const radiusStyle = $derived(typeof radius === 'number' ? `${radius}px` : radius);
</script>

<div
	class={containerClasses}
	style="width: {widthStyle}; height: {heightStyle}; border-radius: {radiusStyle}; {customStyle}"
>
	<div class="skeleton-box-item"></div>
</div>

<style lang="scss">
	.skeleton-box {
		display: block;
		position: relative;
		overflow: hidden;

		&--animated {
			.skeleton-box-item {
				position: relative;
				overflow: hidden;

				&::before {
					content: '';
					position: absolute;
					top: 0;
					left: -100%;
					width: 100%;
					height: 100%;
					background: linear-gradient(
						90deg,
						transparent,
						var(--svelte-ui-skeleton-shimmer-color),
						transparent
					);
					animation: skeleton-shimmer 1.5s infinite;
				}
			}
		}
	}

	.skeleton-box-item {
		width: 100%;
		height: 100%;
		background-color: var(--svelte-ui-skeleton-bg-color);
		display: block;
	}

	@keyframes skeleton-shimmer {
		0% {
			left: -100%;
		}
		100% {
			left: 100%;
		}
	}
</style>
