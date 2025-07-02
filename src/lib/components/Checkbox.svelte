<!-- Checkbox.svelte -->

<script lang="ts">
	import { type Snippet } from 'svelte';

	let {
		name = '',
		value = $bindable(false),
		indeterminate = $bindable(false),
		children,
		disabled = false,
		required = false,
		readonly = false,
		error = null,
		success = null,
		size = 'medium',
		reducedMotion = false,
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},
		onchange = (checked: boolean) => {},
		onclick = (event: MouseEvent) => {},
		onkeydown = (event: KeyboardEvent) => {},
		...restProps
	}: {
		name?: string;
		value: boolean;
		indeterminate?: boolean;
		children?: Snippet;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		error?: string | null;
		success?: string | null;
		size?: 'small' | 'medium' | 'large';
		reducedMotion?: boolean;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onchange?: (checked: boolean) => void;
		onclick?: (event: MouseEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		[key: string]: any;
	} = $props();

	const generateId = (): string => {
		return 'checkbox-' + Math.random().toString(36).substring(2, 15);
	};

	const id: string = generateId();

	const handleFocus = (event: FocusEvent) => {
		onfocus(event);
	};

	const handleBlur = (event: FocusEvent) => {
		onblur(event);
	};

	const handleChange = (event: Event) => {
		if (readonly) return;
		onchange(value);
	};

	const handleClick = (event: MouseEvent) => onclick(event);

	const handleKeydown = (event: KeyboardEvent) => {
		if (disabled || readonly) return;
		if (event.key === ' ' || event.key === 'Enter') {
			event.preventDefault();
			value = !value;
			onchange(value);
		}
		onkeydown(event);
	};

	// CSS classes based on state
	const containerClasses = $derived(
		[
			'checkbox-container',
			`checkbox-container--${size}`,
			disabled && 'checkbox-container--disabled',
			error && 'checkbox-container--error',
			success && 'checkbox-container--success',
			reducedMotion && 'checkbox-container--no-motion'
		]
			.filter(Boolean)
			.join(' ')
	);
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
		{readonly}
		aria-invalid={error ? 'true' : 'false'}
		aria-required={required ? 'true' : 'false'}
		aria-describedby={error ? `${id}-error` : success ? `${id}-success` : undefined}
		onfocus={handleFocus}
		onblur={handleBlur}
		onchange={handleChange}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...restProps}
	/>
	{#if children}
		<label for={id} class="checkbox-label">
			{@render children()}
		</label>
	{/if}
	{#if error}
		<div id="{id}-error" class="checkbox-message checkbox-message--error" role="alert">
			{error}
		</div>
	{/if}
	{#if success}
		<div id="{id}-success" class="checkbox-message checkbox-message--success">
			{success}
		</div>
	{/if}
</div>

<style>
	.checkbox-container {
		display: flex;
		flex-direction: column;
		gap: 4px;
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

	.checkbox-container--disabled input[type='checkbox'] {
		cursor: not-allowed;
	}

	.checkbox-label {
		position: relative;
		display: flex;
		align-items: center;
		padding: var(--svelte-ui-checkbox-padding);
		white-space: nowrap;
		font-size: inherit;
		color: var(--svelte-ui-checkbox-text-color);
		cursor: pointer;
		min-height: var(--svelte-ui-checkbox-min-height);
	}

	/* Mobile touch targets */
	@media (hover: none) and (pointer: coarse) {
		.checkbox-label {
			min-height: var(--svelte-ui-touch-target);
		}
	}

	.checkbox-container--disabled .checkbox-label {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
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
		transition-property: background-color, border-color;
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
		transition-property: width;
		transition-delay: var(--svelte-ui-transition-duration-fast);
		transition-duration: var(--svelte-ui-transition-duration);
	}

	/* Checked state */
	input[type='checkbox']:checked + .checkbox-label::after {
		width: var(--svelte-ui-checkbox-icon-width);
	}

	/* Indeterminate state */
	input[type='checkbox']:indeterminate + .checkbox-label::after {
		content: 'remove';
		width: var(--svelte-ui-checkbox-icon-width);
	}

	/* Hover states */
	.checkbox-label:hover::before,
	input[type='checkbox']:checked + .checkbox-label::before,
	input[type='checkbox']:indeterminate + .checkbox-label::before {
		border-color: var(--svelte-ui-primary-color);
	}

	/* Error state hover override */
	.checkbox-container--error .checkbox-label:hover::before,
	.checkbox-container--error input[type='checkbox']:checked + .checkbox-label::before,
	.checkbox-container--error input[type='checkbox']:indeterminate + .checkbox-label::before {
		border-color: var(--svelte-ui-error-color);
	}

	/* Success state hover override */
	.checkbox-container--success .checkbox-label:hover::before,
	.checkbox-container--success input[type='checkbox']:checked + .checkbox-label::before,
	.checkbox-container--success input[type='checkbox']:indeterminate + .checkbox-label::before {
		border-color: var(--svelte-ui-success-color);
	}

	/* Focus states */
	input[type='checkbox']:focus-visible + .checkbox-label::before {
		box-shadow: var(--svelte-ui-checkbox-focus-shadow);
	}

	/* Checked/Indeterminate background */
	input[type='checkbox']:checked + .checkbox-label::before,
	input[type='checkbox']:indeterminate + .checkbox-label::before {
		background-color: var(--svelte-ui-checkbox-bg-checked);
	}

	/* Size variants */
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

	/* Mobile touch targets for small */
	@media (hover: none) and (pointer: coarse) {
		.checkbox-container--small .checkbox-label {
			min-height: var(--svelte-ui-touch-target-sm);
		}
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

	/* Mobile touch targets for large */
	@media (hover: none) and (pointer: coarse) {
		.checkbox-container--large .checkbox-label {
			min-height: var(--svelte-ui-touch-target-lg);
		}
	}

	/* Error state */
	.checkbox-container--error .checkbox-label::before {
		border-color: var(--svelte-ui-error-color);
	}

	.checkbox-container--error input[type='checkbox']:checked + .checkbox-label::before,
	.checkbox-container--error input[type='checkbox']:indeterminate + .checkbox-label::before {
		background-color: var(--svelte-ui-error-color);
	}

	/* Success state */
	.checkbox-container--success .checkbox-label::before {
		border-color: var(--svelte-ui-success-color);
	}

	.checkbox-container--success input[type='checkbox']:checked + .checkbox-label::before,
	.checkbox-container--success input[type='checkbox']:indeterminate + .checkbox-label::before {
		background-color: var(--svelte-ui-success-color);
	}

	/* Message styles */
	.checkbox-message {
		font-size: var(--svelte-ui-font-size-xs);
		margin-top: 2px;
		margin-left: var(--svelte-ui-checkbox-message-offset);
	}

	.checkbox-message--error {
		color: var(--svelte-ui-error-color);
	}

	.checkbox-message--success {
		color: var(--svelte-ui-success-color);
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

	/* High contrast mode support */
	@media (prefers-contrast: high) {
		.checkbox-label::before {
			border-width: 3px;
		}
	}
</style>
