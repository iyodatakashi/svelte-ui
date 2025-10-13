<script lang="ts">
	import type { Option, OptionValue } from '$lib/types/options';
	import Checkbox from './Checkbox.svelte';
	import { onMount } from 'svelte';
	import { getStyleFromNumber } from '$lib/utils/style';

	let {
		// 基本プロパティ
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
		options: Option[];
		value: OptionValue[];

		// スタイル/レイアウト
		direction?: 'vertical' | 'horizontal';
		gap?: string | number;
		wrap?: boolean;
		minOptionWidth?: string | number;

		// 入力イベント
		onchange?: (value: OptionValue[]) => void;
	} = $props();
	let localValues: Record<string, boolean> = $state({});

	onMount(() => {
		options.forEach((option) => {
			localValues[option.value] = false;
		});
	});

	const handleChange = () => {
		value = options.filter((option) => localValues[option.value]).map((option) => option.value);
		onchange(value);
	};

	const gapStyle = getStyleFromNumber(gap);

	const minOptionWidthStyle = getStyleFromNumber(minOptionWidth);
</script>

<ul
	class="checkbox-group"
	style="--flex-direction: {direction === 'vertical' ? 'column' : 'row'};
    --gap: {gapStyle};
    --wrap: {wrap ? 'wrap' : 'none'};
    --min-option-width: {minOptionWidthStyle}
    "
>
	{#each options as option (option.value)}
		{#if localValues[option.value] !== undefined}
			<li class="checkbox-group__option">
				<Checkbox bind:value={localValues[option.value]} onchange={handleChange}>
					{option.label}
				</Checkbox>
			</li>
		{/if}
	{/each}
</ul>

<style>
	.checkbox-group {
		display: flex;
		flex-direction: var(--flex-direction);
		gap: var(--gap);
		flex-wrap: var(--wrap);
	}

	.checkbox-group__option {
		min-width: var(--min-option-width);
	}
</style>
