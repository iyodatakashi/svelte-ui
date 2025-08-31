<script lang="ts">
	// =========================================================================
	// Props
	// =========================================================================

	let {
		// 基本プロパティ
		width = '100%',
		height = '40px',
		animated = true,
		rounded = false,
		className = '',
		customStyle = ''
	}: {
		width?: string | number;
		height?: string | number;
		animated?: boolean;
		rounded?: boolean;
		className?: string;
		customStyle?: string;
	} = $props();

	// =========================================================================
	// $derived
	// =========================================================================

	const containerClasses = $derived(
		[
			'skeleton-box-container',
			animated && 'skeleton-box-container--animated',
			rounded && 'skeleton-box-container--rounded',
			className
		]
			.filter(Boolean)
			.join(' ')
	);

	const widthStyle = $derived(typeof width === 'number' ? `${width}px` : width);
	const heightStyle = $derived(typeof height === 'number' ? `${height}px` : height);
</script>

<div class={containerClasses} style="width: {widthStyle}; height: {heightStyle}; {customStyle}">
	<div class="skeleton-box-item"></div>
</div>

<style lang="scss">
	.skeleton-box-container {
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

		&--rounded {
			.skeleton-box-item {
				border-radius: var(--svelte-ui-border-radius-rounded);
			}
		}
	}

	.skeleton-box-item {
		width: 100%;
		height: 100%;
		background-color: var(--svelte-ui-skeleton-bg-color);
		border-radius: var(--svelte-ui-border-radius);
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
