<script lang="ts">
	import type { Option, OptionValue } from '$lib/types/options';
	import Radio from './Radio.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';

	let {
		// 基本プロパティ
		name = `radio-${Math.random().toString(36).substring(2, 15)}`,
		options,
		value = $bindable(),

		// スタイル/レイアウト
		direction = 'vertical',
		gap = '0',
		wrap = false,
		minOptionWidth,

		// 入力イベント
		onchange = () => {} // No params for type inference
	}: {
		// 基本プロパティ
		name?: string;
		options: Option[];
		value: OptionValue;

		// スタイル/レイアウト
		direction?: 'vertical' | 'horizontal';
		gap?: string | number;
		wrap?: boolean;
		minOptionWidth?: string | number;

		// 入力イベント
		onchange?: (value: OptionValue) => void;
	} = $props();
	let localValues: Record<string, boolean> = $state({});

	const handleChange = () => {
		onchange(value);
	};

	const gapStyle = getStyleFromNumber(gap);

	const minOptionWidthStyle = getStyleFromNumber(minOptionWidth);
</script>

<ul
	class="radio-group"
	style="--flex-direction: {direction === 'vertical' ? 'column' : 'row'};
    --gap: {gapStyle};
    --wrap: {wrap ? 'wrap' : 'none'};
    --min-option-width: {minOptionWidthStyle}
    "
>
	{#each options as option (option.value)}
		<li class="radio-group__option">
			<Radio {name} bind:currentValue={value} value={option.value} onchange={handleChange}>
				{option.label}
			</Radio>
		</li>
	{/each}
</ul>

<style>
	.radio-group {
		display: flex;
		flex-direction: var(--flex-direction);
		gap: var(--gap);
		flex-wrap: var(--wrap);
	}

	.radio-group__option {
		min-width: var(--min-option-width);
	}
</style>
