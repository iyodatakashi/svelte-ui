<!-- CheckboxGroup.svelte -->

<script lang="ts">
	import type { OptionValue } from '#lib/models/option/option.types';
	import Checkbox from './Checkbox.svelte';
	import { getStyleFromNumber } from '#lib/utils/style';
	import type { CheckboxGroupProps } from '#lib/models/checkbox/checkbox.types';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================

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

	// =========================================================================
	// Methods
	// =========================================================================
	const handleChange = (optionValue: OptionValue, checked: boolean) => {
		value = checked
			? [...(value ?? []), optionValue]
			: (value ?? []).filter((v) => v !== optionValue);
		onchange(value);
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const gapStyle = $derived(gap !== undefined ? getStyleFromNumber(gap) : undefined);
	const minOptionWidthStyle = $derived(getStyleFromNumber(minOptionWidth));
</script>

<ul
	class="checkbox-group"
	style:--internal-checkbox-group-flex-direction={direction === 'vertical' ? 'column' : 'row'}
	style:--internal-checkbox-group-gap={gapStyle}
	style:--internal-checkbox-group-wrap={wrap ? 'wrap' : 'none'}
	style:--internal-checkbox-group-min-option-width={minOptionWidthStyle}
	data-testid="checkbox-group"
>
	{#each options as option (option.value)}
		<li class="checkbox-group__option">
			<Checkbox
				value={(value ?? []).includes(option.value)}
				{size}
				disabled={disabled || (option.disabled ?? false)}
				{required}
				{reducedMotion}
				onchange={(checked) => handleChange(option.value, checked)}
			>
				{option.label}
			</Checkbox>
		</li>
	{/each}
</ul>

<style lang="scss">
	@use '#lib/assets/styles/component-base' as base;

	@include base.box-sizing;

	.checkbox-group {
		display: flex;
		flex-direction: var(--internal-checkbox-group-flex-direction);
		gap: var(--internal-checkbox-group-gap, var(--svelte-ui-checkbox-group-gap));
		flex-wrap: var(--internal-checkbox-group-wrap);
	}

	.checkbox-group__option {
		min-width: var(
			--internal-checkbox-group-min-option-width,
			var(--svelte-ui-checkbox-group-min-option-width)
		);
	}
</style>
