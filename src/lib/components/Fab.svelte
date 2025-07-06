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
		icon = '',
		iconFill = false,
		color = 'var(--svelte-ui-primary-color)',
		variant = 'filled',
		position = 'right',
		shadow = true,
		reducedMotion = false,
		ariaLabel,
		ariaDescribedby,
		onclick,
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},
		onkeydown = (event: KeyboardEvent) => {},
		onmousedown,
		onmouseup,
		onmouseleave,
		ontouchstart,
		ontouchend,
		ontouchcancel,
		oncontextmenu,
		...restProps
	}: {
		children?: Snippet;
		buttonAttributes?: HTMLButtonAttributes | undefined;
		type?: HTMLButtonAttributes['type'];
		customStyle?: HTMLButtonAttributes['style'];
		disabled?: boolean;
		loading?: boolean;
		icon?: string;
		iconFill?: boolean;
		color?: string;
		variant?: 'filled' | 'outlined' | 'text';
		position?: 'left' | 'center' | 'right';
		shadow?: boolean;
		reducedMotion?: boolean;
		ariaLabel?: string;
		ariaDescribedby?: string;
		onclick?: (event: MouseEvent) => void;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		onmousedown?: (event: MouseEvent) => void;
		onmouseup?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
		ontouchstart?: (event: TouchEvent) => void;
		ontouchend?: (event: TouchEvent) => void;
		ontouchcancel?: (event: TouchEvent) => void;
		oncontextmenu?: (event: any) => void;
		[key: string]: any;
	} = $props();

	const isDisabled = $derived(disabled || loading);

	const backgroundColor = {
		filled: color,
		outlined: 'transparent',
		text: 'transparent'
	}[variant];

	const textColor = {
		filled: 'var(--svelte-ui-button-text-filled)',
		outlined: color,
		text: color
	}[variant];

	const hasLabel = children !== undefined;

	const handleClick = (event: MouseEvent) => {
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
	{...buttonAttributes}
	class="fab"
	class:fab--outlined={variant === 'outlined'}
	class:fab--without-label={!hasLabel}
	class:fab--left={position === 'left'}
	class:fab--center={position === 'center'}
	class:fab--right={position === 'right'}
	class:fab--shadow={shadow}
	class:fab--loading={loading}
	class:fab--no-motion={reducedMotion}
	style="color: {textColor}; background-color: {backgroundColor}; 
		border-color: {variant === 'outlined' ? color : ''}; 
		{customStyle ?? ''};"
	onclick={handleClick}
	onfocus={handleFocus}
	onblur={handleBlur}
	onkeydown={handleKeydown}
	{onmousedown}
	{onmouseup}
	{onmouseleave}
	{ontouchstart}
	{ontouchend}
	{ontouchcancel}
	{oncontextmenu}
	aria-label={ariaLabel || (hasLabel ? undefined : 'Floating Action Button')}
	aria-describedby={ariaDescribedby}
	aria-busy={loading ? 'true' : undefined}
	{...restProps}
>
	{#if loading}
		<div class="fab__loading">
			<LoadingSpinner size={24} strokeWidth={2} color="currentColor" />
		</div>
	{:else if icon}
		<div class="fab__icon">
			<Icon fill={iconFill} size={24}>{icon}</Icon>
		</div>
	{/if}

	{#if children}
		<div class="fab__label" class:fab__label--hidden={loading}>
			{@render children()}
		</div>
	{/if}
</button>

<style lang="scss">
	.fab {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		bottom: calc(24px + env(safe-area-inset-bottom));
		height: 56px;
		padding: 0 20px;
		background-color: transparent;
		border: none;
		border-radius: var(--svelte-ui-button-border-radius-rounded);
		font-size: inherit;
		font-family: inherit;
		color: var(--svelte-ui-button-label-color);
		line-height: normal;
		text-align: center;
		overflow: hidden;
		z-index: 1000;
		cursor: pointer;
		transition-property: background-color, border-color, color, opacity, transform, box-shadow;
		transition-duration: var(--svelte-ui-transition-duration);

		&.fab--left {
			left: 24px;
		}

		&.fab--center {
			left: 50%;
			transform: translateX(-50%);
		}

		&.fab--right {
			right: 24px;
		}

		& > * {
			z-index: 1;
		}

		&:before {
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

		&:hover:before {
			opacity: 1;
		}

		&:focus-visible {
			outline: 2px solid var(--svelte-ui-button-focus-color);
			outline-offset: 2px;
		}

		&:disabled {
			opacity: var(--svelte-ui-button-disabled-opacity);
			cursor: not-allowed;
			pointer-events: none;
		}

		&.fab--outlined {
			border-style: solid;
			border-width: var(--svelte-ui-border-width);
		}

		&.fab--shadow {
			box-shadow:
				0px 3px 5px -1px rgba(0, 0, 0, 0.2),
				0px 6px 10px 0px rgba(0, 0, 0, 0.14),
				0px 1px 18px 0px rgba(0, 0, 0, 0.12);
		}

		&.fab--shadow:hover {
			box-shadow:
				0px 5px 5px -3px rgba(0, 0, 0, 0.2),
				0px 8px 10px 1px rgba(0, 0, 0, 0.14),
				0px 3px 14px 2px rgba(0, 0, 0, 0.12);
		}

		&.fab--shadow:active {
			box-shadow:
				0px 7px 8px -4px rgba(0, 0, 0, 0.2),
				0px 12px 17px 2px rgba(0, 0, 0, 0.14),
				0px 5px 22px 4px rgba(0, 0, 0, 0.12);
		}

		&.fab--loading {
			cursor: wait;
		}

		&.fab--no-motion,
		&.fab--no-motion:before {
			transition-duration: 0.01s;
		}

		.fab__icon {
			margin: 0 8px 0 -8px;
			user-select: none;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.fab__loading {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.fab__label {
			white-space: nowrap;
			user-select: none;
			transition-property: opacity;
			transition-duration: var(--svelte-ui-transition-duration);
		}

		.fab__label--hidden {
			opacity: 0;
		}
	}

	.fab.fab--without-label {
		width: 56px;
		height: 56px;
		padding: 0;
		border-radius: 28px;

		.fab__icon {
			margin: 0;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.fab,
		.fab:before {
			transition-duration: 0.01s;
		}
	}

	/* Print styles */
	@media print {
		.fab {
			display: none;
		}
	}
</style>
