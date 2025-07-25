<!-- IconButton.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import LoadingSpinner from './LoadingSpinner.svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		type = 'button',
		size = 32,
		fontSize = size * 0.75,
		variant = 'text',
		color,
		disabled = false,
		loading = false,
		tabindex = null,
		iconFilled = false,
		iconWeight = 300,
		customStyle,
		rounded = true,
		pressed = false,
		showBadge = false,
		badgeCount = 0,
		badgeVariant = 'count',
		badgeColor,
		badgeMax = 99,
		reducedMotion = false,
		ariaLabel,
		ariaDescribedby,
		ariaPressed,
		children,
		onclick,
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},
		onkeydown = (event: KeyboardEvent) => {},
		...restProps
	}: {
		type?: 'button' | 'submit' | 'reset' | null | undefined;
		size?: number;
		fontSize?: number;
		variant?: 'filled' | 'outlined' | 'text';
		color?: string;
		disabled?: boolean;
		loading?: boolean;
		tabindex?: number | null;
		iconFilled?: boolean;
		iconWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
		customStyle?: HTMLButtonAttributes['style'];
		rounded?: boolean;
		pressed?: boolean;
		showBadge?: boolean;
		badgeCount?: number;
		badgeVariant?: 'dot' | 'count';
		badgeColor?: string;
		badgeMax?: number;
		reducedMotion?: boolean;
		ariaLabel: string;
		ariaDescribedby?: string;
		ariaPressed?: boolean;
		children: Snippet;
		onclick?: (event: MouseEvent & { currentTarget: HTMLButtonElement }) => void;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		[key: string]: any;
	} = $props();

	const isDisabled = $derived(disabled || loading);

	const backgroundColor = $derived(
		{
			filled: color || 'var(--svelte-ui-iconbutton-bg-filled)',
			outlined: 'var(--svelte-ui-iconbutton-bg-outlined)',
			text: 'var(--svelte-ui-iconbutton-bg-text)'
		}[variant]
	);

	const textColor = $derived(
		{
			filled: 'var(--svelte-ui-iconbutton-text-filled)',
			outlined: color || 'var(--svelte-ui-iconbutton-text-outlined)',
			text: color || 'var(--svelte-ui-iconbutton-text-text)'
		}[variant]
	);

	const badgeDisplay = $derived(() => {
		if (!showBadge) return '';
		if (badgeVariant === 'dot') return '';
		if (badgeCount > badgeMax) return `${badgeMax}+`;
		return badgeCount.toString();
	});

	const buttonClasses = $derived(
		[
			'iconbutton',
			`iconbutton--${variant}`,
			rounded && 'iconbutton--rounded',
			pressed && 'iconbutton--pressed',
			loading && 'iconbutton--loading',
			reducedMotion && 'iconbutton--no-motion'
		]
			.filter(Boolean)
			.join(' ')
	);

	const handleClick = (event: MouseEvent & { currentTarget: HTMLButtonElement }) => {
		if (isDisabled) return;
		if (onclick) onclick(event);
	};
</script>

<div class="iconbutton-container" data-testid="iconbutton-container">
	<button
		{type}
		disabled={isDisabled}
		class={buttonClasses}
		style="color: {textColor}; background-color: {backgroundColor}; 
			border-color: {variant === 'outlined'
			? color || 'var(--svelte-ui-iconbutton-border-outlined)'
			: ''}; 
			width: {size}px; height: {size}px; 
			{customStyle ?? ''};"
		onclick={handleClick}
		{tabindex}
		aria-label={ariaLabel}
		aria-describedby={ariaDescribedby}
		aria-pressed={ariaPressed !== undefined ? ariaPressed : pressed ? 'true' : undefined}
		aria-busy={loading ? 'true' : undefined}
		data-testid="iconbutton"
		{...restProps}
	>
		{#if loading}
			<div class="iconbutton__loading">
				<LoadingSpinner size={size * 0.5} strokeWidth={2} color="currentColor" />
			</div>
		{:else}
			<div class="iconbutton__icon" class:iconbutton__icon--hidden={loading}>
				<Icon filled={iconFilled} weight={iconWeight} size={fontSize}>
					{@render children()}
				</Icon>
			</div>
		{/if}
	</button>

	{#if showBadge && (badgeVariant === 'dot' || badgeCount > 0)}
		<div
			class="iconbutton__badge iconbutton__badge--{badgeVariant}"
			style="background-color: {badgeColor || 'var(--badge-color)'}"
			aria-label={badgeVariant === 'count' ? `${badgeCount}件の通知` : '新しい通知があります'}
			aria-live="polite"
		>
			{badgeVariant === 'count' ? badgeDisplay() : ''}
		</div>
	{/if}
</div>

<style>
	.iconbutton-container {
		position: relative;
		display: block;
	}

	.iconbutton {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		padding: 0;
		background-color: transparent;
		border: none;
		border-radius: var(--svelte-ui-iconbutton-border-radius);
		line-height: 1;
		overflow: hidden;
		color: inherit;
		cursor: pointer;
		transition-property: background-color, border-color, color, opacity, transform;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	.iconbutton--rounded {
		border-radius: var(--svelte-ui-iconbutton-border-radius-rounded);
	}

	.iconbutton--outlined {
		border-style: solid;
		border-width: var(--svelte-ui-border-width);
	}

	.iconbutton:before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--svelte-ui-iconbutton-hover-overlay);
		opacity: 0;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
		z-index: 0;
	}

	@media (hover: hover) {
		.iconbutton:hover:before {
			opacity: 1;
		}
	}

	.iconbutton:focus-visible {
		outline: var(--svelte-ui-focus-outline);
		outline-offset: var(--svelte-ui-focus-outline-offset);
	}

	.iconbutton--pressed {
		transform: scale(0.95);
	}

	.iconbutton--pressed:before {
		opacity: 0.12;
	}

	.iconbutton:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
		pointer-events: none;
	}

	.iconbutton--loading {
		cursor: wait;
	}

	.iconbutton > * {
		z-index: 1;
	}

	.iconbutton__icon {
		display: flex;
		align-items: center;
		justify-content: center;
		transition-property: opacity;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	.iconbutton__icon--hidden {
		opacity: 0;
	}

	.iconbutton__loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.iconbutton__badge {
		position: absolute;
		top: -2px;
		right: -2px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: var(--badge-font-size);
		font-weight: 600;
		color: var(--badge-text-color);
		line-height: 1;
		text-align: center;
		border-radius: var(--svelte-ui-border-radius-rounded);
		z-index: 2;
	}

	.iconbutton__badge--dot {
		width: 8px;
		height: 8px;
		min-width: unset;
	}

	.iconbutton__badge--count {
		min-width: 16px;
		height: 16px;
		padding: 0 4px;
		border-radius: 8px;
	}

	.iconbutton--no-motion,
	.iconbutton--no-motion:before,
	.iconbutton--no-motion .iconbutton__icon {
		transition-duration: 0.01s;
	}

	.iconbutton--no-motion.iconbutton--pressed {
		transform: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.iconbutton,
		.iconbutton:before,
		.iconbutton__icon {
			transition-duration: 0.01s;
		}

		.iconbutton--pressed {
			transform: none;
		}
	}
</style>
