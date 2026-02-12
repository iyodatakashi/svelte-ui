<!-- CheckboxGroup.svelte -->

<script lang="ts">
	import type { Option, OptionValue } from '$lib/types/options';
	import Checkbox from './Checkbox.svelte';
	import { onMount } from 'svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import type { BivariantValueHandler } from '$lib/types/callbackHandlers';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================

	export type CheckboxGroupProps = {
		// 基本プロパティ
		options: Option[];
		value: OptionValue[];

		// スタイル/レイアウト
		direction?: 'vertical' | 'horizontal';
		gap?: string | number;
		wrap?: boolean;
		minOptionWidth?: string | number;
		size?: 'small' | 'medium' | 'large';

		// 状態/動作
		disabled?: boolean;
		required?: boolean;

		// ARIA/アクセシビリティ
		reducedMotion?: boolean;

		// 入力イベント
		onchange?: BivariantValueHandler<OptionValue[]>;
	};

	let {
		// 基本プロパティ
		options,
		value = $bindable(),

		// スタイル/レイアウト
		direction = 'vertical',
		gap,
		wrap = false,
		minOptionWidth,
		size = 'medium',

		// 状態/動作
		disabled = false,
		required = false,

		// ARIA/アクセシビリティ
		reducedMotion = false,

		// 入力イベント
		onchange = () => {} // No params for type inference
	}: CheckboxGroupProps = $props();

	let localValues: Record<string, boolean> = $state({});

	// =========================================================================
	// Lifecycle
	// =========================================================================
	onMount(() => {
		options.forEach((option) => {
			localValues[String(option.value)] = false;
		});
	});

	// =========================================================================
	// Methods
	// =========================================================================
	const handleChange = () => {
		value = options
			.filter((option) => localValues[String(option.value)])
			.map((option) => option.value);
		onchange(value);
	};

	const gapStyle = gap !== undefined ? getStyleFromNumber(gap) : undefined;
	const minOptionWidthStyle = getStyleFromNumber(minOptionWidth);
</script>

<ul
	class="checkbox-group"
	style="--svelte-ui-checkbox-group-flex-direction: {direction === 'vertical' ? 'column' : 'row'};
    {gapStyle ? `--svelte-ui-checkbox-group-gap: ${gapStyle};` : ''}
    --svelte-ui-checkbox-group-wrap: {wrap ? 'wrap' : 'none'};
    --svelte-ui-checkbox-group-min-option-width: {minOptionWidthStyle}
    "
>
	{#each options as option (option.value)}
		{#if localValues[String(option.value)] !== undefined}
			<li class="checkbox-group__option">
				<Checkbox
					bind:value={localValues[String(option.value)]}
					{size}
					{disabled}
					{required}
					{reducedMotion}
					onchange={handleChange}
				>
					{option.label}
				</Checkbox>
			</li>
		{/if}
	{/each}
</ul>

<style>
	.checkbox-group {
		display: flex;
		flex-direction: var(--svelte-ui-checkbox-group-flex-direction);
		gap: var(--svelte-ui-checkbox-group-gap);
		flex-wrap: var(--svelte-ui-checkbox-group-wrap);
	}

	.checkbox-group__option {
		min-width: var(--svelte-ui-checkbox-group-min-option-width);
	}
</style>
