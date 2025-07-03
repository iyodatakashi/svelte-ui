<!-- Button.svelte -->

<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import Icon from './Icon.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';

	let {
		children,
		buttonAttributes,
		type = 'button',
		customStyle,
		disabled = false,
		loading = false,
		tabindex = null,
		iconFill = false,
		fullWidth = false,
		minWidth = 0,
		popup = false,
		rounded = false,
		icon = '',
		color = 'var(--primary-color)',
		variant = 'text',
		size = 'medium',
		reducedMotion = false,
		ariaLabel,
		ariaDescribedby,
		ariaExpanded,
		onclick,
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},
		onkeydown = (event: KeyboardEvent) => {},
		...restProps
	}: {
		children: Snippet;
		buttonAttributes?: HTMLButtonAttributes | undefined;
		type?: HTMLButtonAttributes['type'];
		customStyle?: HTMLButtonAttributes['style'];
		disabled?: boolean;
		loading?: boolean;
		tabindex?: number | null;
		iconFill?: boolean;
		fullWidth?: boolean;
		minWidth?: number;
		popup?: boolean;
		rounded?: boolean;
		icon?: string;
		color?: string;
		variant?: 'filled' | 'outlined' | 'text';
		size?: 'small' | 'medium' | 'large';
		reducedMotion?: boolean;
		ariaLabel?: string;
		ariaDescribedby?: string;
		ariaExpanded?: boolean;
		onclick?: (event: MouseEvent & { currentTarget: HTMLButtonElement }) => void;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		[key: string]: any;
	} = $props();

	const isDisabled = $derived(disabled || loading);

	const backgroundColors = {
		filled: color,
		outlined: 'transparent',
		text: 'transparent'
	};

	const textColors = {
		filled: 'var(--svelte-ui-button-text-filled)',
		outlined: color,
		text: color
	};

	// CSS classes based on state
	const buttonClasses = $derived(
		[
			'button',
			`button--${variant}`,
			`button--${size}`,
			popup && 'button--popup',
			rounded && 'button--rounded',
			fullWidth && 'button--full-width',
			loading && 'button--loading',
			reducedMotion && 'button--no-motion'
		]
			.filter(Boolean)
			.join(' ')
	);

	const handleClick = (event: MouseEvent & { currentTarget: HTMLButtonElement }) => {
		if (isDisabled) return;
		if (onclick) onclick(event);
	};

	const handleFocus = (event: FocusEvent) => onfocus(event);
	const handleBlur = (event: FocusEvent) => onblur(event);
	const handleKeydown = (event: KeyboardEvent) => onkeydown(event);
</script>

<button
	{type}
	disabled={isDisabled}
	class={buttonClasses}
	style="color: {textColors[variant]}; background-color: {backgroundColors[variant]}; 
		border-color: {variant === 'outlined' ? color : ''}; 
		min-width: {minWidth}px; 
		{customStyle ?? ''};"
	onclick={handleClick}
	onfocus={handleFocus}
	onblur={handleBlur}
	onkeydown={handleKeydown}
	{tabindex}
	aria-label={ariaLabel}
	aria-describedby={ariaDescribedby}
	aria-expanded={ariaExpanded}
	aria-busy={loading ? 'true' : undefined}
	data-testid="button"
	{...buttonAttributes}
	{...restProps}
>
	{#if loading}
		<div class="button__loading">
			<LoadingSpinner />
		</div>
	{:else if icon}
		<div class="button__icon">
			<Icon fill={iconFill}>{icon}</Icon>
		</div>
	{/if}

	<div class="button__label" class:button__label--hidden={loading}>
		{@render children()}
	</div>

	{#if popup && !loading}
		<div class="button__popup-icon">
			<Icon>arrow_drop_down</Icon>
		</div>
	{/if}
</button>

<style>
	.button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 4px;
		position: relative;
		max-width: 100%;
		background-color: transparent;
		border: none;
		border-radius: var(--svelte-ui-button-border-radius);
		font-size: inherit;
		font-family: inherit;
		color: var(--svelte-ui-text-color);
		line-height: normal;
		overflow: hidden;
		cursor: pointer;
		transition-property: background-color, border-color, color, opacity, transform;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	/* Size variants */
	.button--small {
		min-height: var(--svelte-ui-button-height-sm);
		padding: var(--svelte-ui-button-padding-sm);
		font-size: var(--svelte-ui-button-font-size-sm);
	}

	.button--medium {
		min-height: var(--svelte-ui-button-height);
		padding: var(--svelte-ui-button-padding);
		font-size: var(--svelte-ui-button-font-size);
	}

	.button--large {
		min-height: var(--svelte-ui-button-height-lg);
		padding: var(--svelte-ui-button-padding-lg);
		font-size: var(--svelte-ui-button-font-size-lg);
	}

	/* Mobile touch targets */
	@media (hover: none) and (pointer: coarse) {
		.button--small {
			min-height: var(--svelte-ui-touch-target-sm);
		}
		.button--medium {
			min-height: var(--svelte-ui-touch-target);
		}
		.button--large {
			min-height: var(--svelte-ui-touch-target-lg);
		}
	}

	/* Variant styles */
	.button--outlined {
		border-style: solid;
		border-width: var(--svelte-ui-border-width);
	}

	/* State modifiers */
	.button--full-width {
		width: 100%;
	}

	.button--rounded {
		border-radius: var(--svelte-ui-button-border-radius-rounded);
	}

	/* Hover effects */
	.button:before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--svelte-ui-button-hover-overlay);
		opacity: 0;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
		z-index: 0;
	}

	.button:hover:before {
		opacity: 1;
	}

	/* Focus styles */
	.button:focus-visible {
		outline: 2px solid var(--svelte-ui-button-focus-color);
		outline-offset: 2px;
	}

	/* Disabled state */
	.button:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
		pointer-events: none;
	}

	/* Loading state */
	.button--loading {
		cursor: wait;
	}

	/* Content sections */
	.button > * {
		z-index: 1;
	}

	.button__icon {
		margin-left: -4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button__label {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	.button__label--hidden {
		opacity: 0;
	}

	.button__popup-icon {
		margin-right: -4px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button__loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* Size-specific adjustments */
	.button--small .button__icon {
		margin-left: -2px;
	}

	.button--small .button__popup-icon {
		margin-right: -2px;
	}

	.button--large .button__icon {
		margin-left: -6px;
	}

	.button--large .button__popup-icon {
		margin-right: -6px;
	}

	/* Reduced motion */
	.button--no-motion,
	.button--no-motion:before,
	.button--no-motion .button__label {
		transition-duration: 0.01s;
	}

	/* Prefers reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.button,
		.button:before,
		.button__label {
			transition-duration: 0.01s;
		}
	}

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.button--outlined {
			border-width: var(--svelte-ui-border-width-thick);
		}

		.button:focus-visible {
			outline-width: 3px;
		}
	}

	/* Print styles */
	@media print {
		.button {
			border: var(--svelte-ui-border-width) solid #000;
			background: transparent !important;
			color: #000 !important;
		}
	}
</style>
