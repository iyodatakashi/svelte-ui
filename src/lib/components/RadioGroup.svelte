<!-- RadioGroup.svelte -->

<script lang="ts">
	import type { Option, OptionValue } from '$lib/types/options';
	import Radio from './Radio.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import type { BivariantValueHandler } from '$lib/types/eventHandlers';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type RadioGroupProps = {
		// 基本プロパティ
		name?: string;
		options: Option[];
		value: OptionValue;

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
		onchange?: BivariantValueHandler<OptionValue>;
	};

	let {
		// 基本プロパティ
		name = `radio-${Math.random().toString(36).substring(2, 15)}`,
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
	}: RadioGroupProps = $props();

	// =========================================================================
	// Methods
	// =========================================================================
	const handleChange = () => {
		onchange(value);
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const gapStyle = $derived(gap !== undefined ? getStyleFromNumber(gap) : undefined);
	const minOptionWidthStyle = $derived(getStyleFromNumber(minOptionWidth));
</script>

<ul
	class="radio-group"
	style="--svelte-ui-radio-group-flex-direction: {direction === 'vertical' ? 'column' : 'row'};
    {gapStyle ? `--svelte-ui-radio-group-gap: ${gapStyle};` : ''}
    --svelte-ui-radio-group-wrap: {wrap ? 'wrap' : 'none'};
    --svelte-ui-radio-group-min-option-width: {minOptionWidthStyle}
    "
>
	{#each options as option (option.value)}
		<li class="radio-group__option">
			<Radio
				{name}
				bind:currentValue={value}
				value={option.value}
				{size}
				{disabled}
				{required}
				{reducedMotion}
				onchange={handleChange}
			>
				{option.label}
			</Radio>
		</li>
	{/each}
</ul>

<style>
	.radio-group {
		display: flex;
		flex-direction: var(--svelte-ui-radio-group-flex-direction);
		gap: var(--svelte-ui-radio-group-gap);
		flex-wrap: var(--svelte-ui-radio-group-wrap);
	}

	.radio-group__option {
		min-width: var(--svelte-ui-radio-group-min-option-width);
	}
</style>
