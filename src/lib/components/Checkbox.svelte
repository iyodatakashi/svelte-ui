<!-- Checkbox.svelte -->

<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// Snippet
		children,

		// 基本プロパティ
		name = '',
		value = $bindable(false),
		indeterminate = $bindable(false),

		// HTML属性系
		id = `checkbox-${Math.random().toString(36).substring(2, 15)}`,
		inputAttributes,

		// スタイル/レイアウト
		size = 'medium',

		// 状態/動作
		disabled = false,
		required = false,
		reducedMotion = false,

		// イベントハンドラー
		onchange = (value: boolean) => {},
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},
		onclick = (event: MouseEvent) => {},
		onkeydown = (event: KeyboardEvent) => {},

		// その他
		...restProps
	}: {
		// 基本プロパティ
		name?: string;
		value: boolean;
		indeterminate?: boolean;
		children?: Snippet;

		// HTML属性系
		id?: string;
		inputAttributes?: HTMLInputAttributes | undefined;

		// スタイル/レイアウト
		size?: 'small' | 'medium' | 'large';

		// 状態/動作
		disabled?: boolean;
		required?: boolean;
		reducedMotion?: boolean;

		// イベントハンドラー
		onchange?: (value: boolean) => void;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onclick?: (event: MouseEvent & { currentTarget: HTMLInputElement }) => void;
		onkeydown?: (event: KeyboardEvent) => void;

		// その他
		[key: string]: any;
	} = $props();

	// =========================================================================
	// $derived
	// =========================================================================
	const containerClasses = $derived(
		[
			'checkbox-container',
			`checkbox-container--${size}`,
			disabled && 'checkbox-container--disabled',
			reducedMotion && 'checkbox-container--no-motion'
		]
			.filter(Boolean)
			.join(' ')
	);

	// =========================================================================
	// Methods
	// =========================================================================
	const handleFocus = (event: FocusEvent) => {
		onfocus(event);
	};

	const handleBlur = (event: FocusEvent) => {
		onblur(event);
	};

	const handleChange = (event: Event) => {
		onchange(value);
	};

	const handleClick = (event: MouseEvent) =>
		onclick?.(event as MouseEvent & { currentTarget: HTMLInputElement });

	const handleKeydown = (event: KeyboardEvent) => {
		if (disabled) return;
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			value = !value;
			onchange(value);
		}
		onkeydown(event);
	};
</script>

<div class={containerClasses} data-testid="checkbox-container">
	<input
		type="checkbox"
		bind:checked={value}
		bind:indeterminate
		{id}
		{name}
		{disabled}
		{required}
		aria-invalid={false}
		aria-required={required ? 'true' : 'false'}
		aria-describedby={undefined}
		onfocus={handleFocus}
		onblur={handleBlur}
		onchange={handleChange}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...inputAttributes}
		{...restProps}
	/>
	{#if children}
		<label for={id} class="checkbox-label">
			{@render children()}
		</label>
	{/if}
</div>

<style>
	/* =========================================================================
	   Base Styles
	   ========================================================================= */
	.checkbox-container {
		display: flex;
		flex-direction: column;
		gap: 4px;
		contain: layout;
	}

	.checkbox-container input[type='checkbox'] {
		position: absolute;
		width: 16px;
		height: 16px;
		margin: 0;
		line-height: 1px;
		opacity: 0;
		cursor: pointer;
	}

	.checkbox-label {
		position: relative;
		display: flex;
		align-items: center;
		padding: var(--svelte-ui-checkbox-padding);
		white-space: nowrap;
		font-size: inherit;
		color: var(--svelte-ui-checkbox-label-color);
		cursor: pointer;
		min-height: var(--svelte-ui-checkbox-min-height);
	}

	.checkbox-label::before,
	.checkbox-label::after {
		position: absolute;
		content: '';
		display: block;
		top: 50%;
		transform: translateY(-50%);
	}

	/* Checkbox box */
	.checkbox-label::before {
		left: 0;
		width: var(--svelte-ui-checkbox-size);
		height: var(--svelte-ui-checkbox-size);
		border: var(--svelte-ui-checkbox-border-width) solid var(--svelte-ui-checkbox-border-color);
		border-radius: var(--svelte-ui-checkbox-border-radius);
		background-color: transparent;
		transition-property: background-color, border-color, opacity;
		transition-duration: var(--svelte-ui-transition-duration-fast);
	}

	/* Check mark container */
	.checkbox-label::after {
		content: 'check';
		left: 0;
		width: 0;
		overflow: hidden;
		font-size: var(--svelte-ui-checkbox-icon-size);
		font-family: 'Material Symbols Outlined';
		font-weight: bold;
		font-style: normal;
		color: var(--svelte-ui-checkbox-icon-color);
		text-align: center;
		line-height: 1;
		letter-spacing: normal;
		text-transform: none;
		display: inline-block;
		white-space: nowrap;
		word-wrap: normal;
		direction: ltr;
		font-feature-settings: 'liga';
		-webkit-font-smoothing: antialiased;
		opacity: 0;
		transition-property: width, opacity;
		transition-delay: 0s, 0s;
		transition-duration: var(--svelte-ui-transition-duration), var(--svelte-ui-transition-duration);
	}

	/* =========================================================================
	   Size Variants
	   ========================================================================= */
	.checkbox-container--small {
		font-size: var(--svelte-ui-font-size-sm);
	}

	.checkbox-container--small .checkbox-label {
		padding: var(--svelte-ui-checkbox-padding-sm);
		min-height: var(--svelte-ui-checkbox-min-height-sm);
	}

	.checkbox-container--small .checkbox-label::before {
		width: var(--svelte-ui-checkbox-size-sm);
		height: var(--svelte-ui-checkbox-size-sm);
	}

	.checkbox-container--small .checkbox-label::after {
		font-size: var(--svelte-ui-checkbox-icon-size-sm);
	}

	.checkbox-container--small input[type='checkbox']:checked + .checkbox-label::after,
	.checkbox-container--small input[type='checkbox']:indeterminate + .checkbox-label::after {
		width: var(--svelte-ui-checkbox-icon-width-sm);
	}

	.checkbox-container--large {
		font-size: var(--svelte-ui-font-size-lg);
	}

	.checkbox-container--large .checkbox-label {
		padding: var(--svelte-ui-checkbox-padding-lg);
		min-height: var(--svelte-ui-checkbox-min-height-lg);
	}

	.checkbox-container--large .checkbox-label::before {
		width: var(--svelte-ui-checkbox-size-lg);
		height: var(--svelte-ui-checkbox-size-lg);
	}

	.checkbox-container--large .checkbox-label::after {
		font-size: var(--svelte-ui-checkbox-icon-size-lg);
	}

	.checkbox-container--large input[type='checkbox']:checked + .checkbox-label::after,
	.checkbox-container--large input[type='checkbox']:indeterminate + .checkbox-label::after {
		width: var(--svelte-ui-checkbox-icon-width-lg);
	}

	/* =========================================================================
	   State Modifiers
	   ========================================================================= */
	/* Disabled state */
	.checkbox-container--disabled input[type='checkbox'] {
		cursor: not-allowed;
	}

	.checkbox-container--disabled .checkbox-label {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	/* Checked state */
	input[type='checkbox']:checked + .checkbox-label::after {
		width: var(--svelte-ui-checkbox-icon-width);
		opacity: 1;
		transition-delay:
			var(--svelte-ui-transition-duration-fast), var(--svelte-ui-transition-duration-fast);
	}

	/* Indeterminate state */
	input[type='checkbox']:indeterminate + .checkbox-label::after {
		content: 'remove';
		width: var(--svelte-ui-checkbox-icon-width);
		opacity: 1;
		transition-delay:
			var(--svelte-ui-transition-duration-fast), var(--svelte-ui-transition-duration-fast);
	}

	/* Hover states */
	@media (hover: hover) {
		.checkbox-container:not(.checkbox-container--disabled) .checkbox-label:hover::before {
			border-color: var(--svelte-ui-checkbox-hover-color);
		}
	}

	/* Focus states */
	input[type='checkbox']:focus-visible + .checkbox-label::before {
		outline: var(--svelte-ui-focus-outline-outer);
		outline-offset: var(--svelte-ui-focus-outline-offset-outer);
	}

	/* Checked/Indeterminate background */
	input[type='checkbox']:checked + .checkbox-label::before,
	input[type='checkbox']:indeterminate + .checkbox-label::before {
		background-color: var(--svelte-ui-checkbox-bg-checked);
		border-color: transparent;
	}

	/* =========================================================================
	   Motion & Media Queries
	   ========================================================================= */
	/* Mobile touch targets */
	@media (hover: none) and (pointer: coarse) {
		.checkbox-label {
			min-height: var(--svelte-ui-touch-target);
		}

		.checkbox-container--small .checkbox-label {
			min-height: var(--svelte-ui-touch-target-sm);
		}

		.checkbox-container--large .checkbox-label {
			min-height: var(--svelte-ui-touch-target-lg);
		}
	}

	/* Reduced motion */
	.checkbox-container--no-motion .checkbox-label::before,
	.checkbox-container--no-motion .checkbox-label::after {
		transition-duration: 0.01s;
	}

	/* Prefers reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.checkbox-label::before,
		.checkbox-label::after {
			transition-duration: 0.01s;
		}
	}
</style>
