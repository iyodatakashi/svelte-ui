<script lang="ts">
	import SkeletonBox from './SkeletonBox.svelte';
	import type { SkeletonButtonsConfig } from './Skeleton.svelte';

	let {
		buttonsConfig = {}
	}: {
		buttonsConfig?: Partial<SkeletonButtonsConfig>;
	} = $props();

	// デフォルト設定
	const DEFAULT_BUTTONS_CONFIG: SkeletonButtonsConfig = {
		type: 'buttons',
		width: '120px',
		height: '36px',
		radius: 'var(--svelte-ui-skeleton-button-radius)',
		count: 1,
		align: 'left',
		animated: true,
		customStyle: ''
	};

	// マージされた設定
	const mergedButtonsConfig = $derived({
		...DEFAULT_BUTTONS_CONFIG,
		...buttonsConfig
	});

	const widthStyle = $derived(
		typeof mergedButtonsConfig.width === 'number'
			? `${mergedButtonsConfig.width}px`
			: mergedButtonsConfig.width
	);
	const heightStyle = $derived(
		typeof mergedButtonsConfig.height === 'number'
			? `${mergedButtonsConfig.height}px`
			: mergedButtonsConfig.height
	);
	const radiusStyle = $derived(
		typeof mergedButtonsConfig.radius === 'number'
			? `${mergedButtonsConfig.radius}px`
			: mergedButtonsConfig.radius
	);

	// alignに応じたCSSクラスを生成
	const alignClass = $derived(`skeleton-buttons--align-${mergedButtonsConfig.align}`);
</script>

<div class="skeleton-buttons {alignClass}">
	{#each Array(mergedButtonsConfig.count) as _}
		<SkeletonBox
			width={widthStyle}
			height={heightStyle}
			radius={radiusStyle}
			animated={mergedButtonsConfig.animated}
			customStyle={mergedButtonsConfig.customStyle}
		/>
	{/each}
</div>

<style>
	.skeleton-buttons {
		display: flex;
		gap: 16px;
	}

	.skeleton-buttons--align-left {
		justify-content: flex-start;
	}

	.skeleton-buttons--align-center {
		justify-content: center;
	}

	.skeleton-buttons--align-right {
		justify-content: flex-end;
	}
</style>
