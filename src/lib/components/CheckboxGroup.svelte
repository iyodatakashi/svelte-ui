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
		/** `{ label, value, disabled? }[]` */
		options: Option[];
		/** Array of currently checked values. Supports `bind:value`. */
		value: OptionValue[];

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

	// =========================================================================
	// $defived
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
		flex-direction: var(
			--internal-checkbox-group-flex-direction,
			var(--svelte-ui-checkbox-group-flex-direction)
		);
		gap: var(--internal-checkbox-group-gap, var(--svelte-ui-checkbox-group-gap));
		flex-wrap: var(--internal-checkbox-group-wrap, var(--svelte-ui-checkbox-group-wrap));
	}

	.checkbox-group__option {
		min-width: var(
			--internal-checkbox-group-min-option-width,
			var(--svelte-ui-checkbox-group-min-option-width)
		);
	}
</style>
