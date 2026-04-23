<!-- RadioGroup.svelte -->

<script lang="ts">
	import type { Option, OptionValue } from '$lib/types/options';
	import Radio from './Radio.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import type { BivariantValueHandler } from '$lib/types/callbackHandlers';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type RadioGroupProps = {
		// 基本プロパティ
		name?: string;
		/** `{ label, value, disabled? }[]` */
		options: Option[];
		/** Currently selected value. Supports `bind:value`. */
		value: OptionValue;

		// スタイル/レイアウト
		/** @default 'vertical' */
		direction?: 'vertical' | 'horizontal';
		gap?: string | number;
		wrap?: boolean;
		minOptionWidth?: string | number;
		/** @default 'medium' */
		size?: 'small' | 'medium' | 'large';

		// 状態/動作
		disabled?: boolean;
		required?: boolean;

		// ARIA/アクセシビリティ
		/** Disables animations for accessibility. @default false */
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
	style:--internal-radio-group-flex-direction={direction === 'vertical' ? 'column' : 'row'}
	style:--internal-radio-group-gap={gapStyle}
	style:--internal-radio-group-wrap={wrap ? 'wrap' : 'none'}
	style:--internal-radio-group-min-option-width={minOptionWidthStyle}
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
		flex-direction: var(
			--internal-radio-group-flex-direction,
			var(--svelte-ui-radio-group-flex-direction)
		);
		gap: var(--internal-radio-group-gap, var(--svelte-ui-radio-group-gap));
		flex-wrap: var(--internal-radio-group-wrap, var(--svelte-ui-radio-group-wrap));
	}

	.radio-group__option {
		min-width: var(
			--internal-radio-group-min-option-width,
			var(--svelte-ui-radio-group-min-option-width)
		);
	}
</style>
