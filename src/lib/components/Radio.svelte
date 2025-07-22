<!-- Radio.svelte -->

<script lang="ts">
	import { type Snippet } from 'svelte';

	let {
		name = '',
		value = '',
		currentValue = $bindable(null),
		children,
		disabled = false,
		required = false,
		size = 'medium',
		reducedMotion = false,
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},
		onchange = (value: string | number | boolean | null | undefined) => {},
		onclick = (event: MouseEvent) => {},
		onkeydown = (event: KeyboardEvent) => {},
		...restProps
	}: {
		name: string;
		value: string | number | boolean;
		currentValue: string | number | boolean | null;
		children?: Snippet;
		disabled?: boolean;
		required?: boolean;
		size?: 'small' | 'medium' | 'large';
		reducedMotion?: boolean;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onchange?: (value: string | number | boolean | null | undefined) => void;
		onclick?: (event: MouseEvent & { currentTarget: HTMLInputElement }) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		[key: string]: any;
	} = $props();

	const id = `radio-${Math.random().toString(36).substring(2, 15)}`;
	const isChecked: boolean = $derived(currentValue === value);

	const handleFocus = (event: FocusEvent) => {
		onfocus(event);
	};

	const handleBlur = (event: FocusEvent) => {
		onblur(event);
	};

	const handleChange = (event: Event) => {
		if (disabled) return;

		const target = event.target as HTMLInputElement;
		if (target.checked) {
			currentValue = value;
			onchange(value);
		}
	};

	const handleClick = (event: MouseEvent) =>
		onclick?.(event as MouseEvent & { currentTarget: HTMLInputElement });

	const handleKeydown = (event: KeyboardEvent) => {
		if (disabled) return;

		// Arrow key navigation for radio group
		if (
			event.key === 'ArrowUp' ||
			event.key === 'ArrowDown' ||
			event.key === 'ArrowLeft' ||
			event.key === 'ArrowRight'
		) {
			const radioInputs = document.querySelectorAll(`input[type="radio"][name="${name}"]`);
			const currentIndex = Array.from(radioInputs).findIndex((input) => input === event.target);

			if (currentIndex !== -1) {
				event.preventDefault();
				let nextIndex;

				if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
					nextIndex = currentIndex > 0 ? currentIndex - 1 : radioInputs.length - 1;
				} else {
					nextIndex = currentIndex < radioInputs.length - 1 ? currentIndex + 1 : 0;
				}

				const nextInput = radioInputs[nextIndex] as HTMLInputElement;
				if (nextInput && !nextInput.disabled) {
					nextInput.focus();
					nextInput.click();
				}
			}
		}

		onkeydown(event);
	};

	// CSS classes based on state
	const containerClasses = $derived(
		[
			'radio-container',
			`radio-container--${size}`,
			disabled && 'radio-container--disabled',
			reducedMotion && 'radio-container--no-motion'
		]
			.filter(Boolean)
			.join(' ')
	);
</script>

<div class={containerClasses} data-testid="radio-container">
	<input
		type="radio"
		checked={isChecked}
		{id}
		{name}
		{value}
		{disabled}
		{required}
		aria-describedby={undefined}
		onfocus={handleFocus}
		onblur={handleBlur}
		onchange={handleChange}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...restProps}
	/>
	<label for={id} class={`radio-label ${!!children ? 'with-label' : 'no-label'}`}>
		{#if children}
			{@render children()}
		{/if}
	</label>
</div>

<style>
	.radio-container {
		display: flex;
		flex-direction: column;
		gap: 4px;
		contain: layout;
	}

	.radio-container input[type='radio'] {
		position: absolute;
		width: 16px;
		height: 16px;
		margin: 0;
		line-height: 1px;
		opacity: 0;
		cursor: pointer;
	}

	.radio-container--disabled input[type='radio'] {
		cursor: not-allowed;
	}

	.radio-label {
		position: relative;
		display: flex;
		align-items: center;
		padding: var(--svelte-ui-radio-padding);
		white-space: nowrap;
		font-size: inherit;
		color: var(--svelte-ui-radio-label-color);
		cursor: pointer;
		min-height: var(--svelte-ui-radio-min-height);
	}

	.radio-label.no-label {
		padding-left: 20px;
		min-height: 16px;
	}

	/* Mobile touch targets */
	@media (hover: none) and (pointer: coarse) {
		.radio-label {
			min-height: var(--svelte-ui-touch-target);
		}
	}

	.radio-container--disabled .radio-label {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	.radio-label::before,
	.radio-label::after {
		position: absolute;
		content: '';
		display: block;
		top: 50%;
		transform: translateY(-50%);
	}

	/* Radio button outer circle */
	.radio-label::after {
		left: 0;
		width: var(--svelte-ui-radio-size);
		height: var(--svelte-ui-radio-size);
		border: var(--svelte-ui-radio-border-width) solid var(--svelte-ui-radio-border-color);
		border-radius: var(--svelte-ui-radio-border-radius);
		background-color: transparent;
		transition-property: border-color, background-color;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	/* Radio button inner dot */
	.radio-label::before {
		left: calc(var(--svelte-ui-radio-size) / 2);
		width: 0;
		height: 0;
		background-color: var(--svelte-ui-radio-bg-checked);
		border-radius: var(--svelte-ui-radio-border-radius);
		transition-property: left, top, width, height;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	/* Checked state */
	input[type='radio']:checked + .radio-label::before {
		left: calc((var(--svelte-ui-radio-size) - var(--svelte-ui-radio-dot-size)) / 2);
		width: var(--svelte-ui-radio-dot-size);
		height: var(--svelte-ui-radio-dot-size);
	}

	/* Hover states */
	@media (hover: hover) {
		.radio-container:not(.radio-container--disabled) .radio-label:hover::after,
		.radio-container:not(.radio-container--disabled) .radio-label:hover::before {
			border-color: var(--svelte-ui-radio-hover-color);
		}
	}

	/* Checked state */
	input[type='radio']:checked + .radio-label::after {
		border-color: var(--svelte-ui-radio-hover-color);
	}

	/* Focus state */
	input[type='radio']:focus-visible + .radio-label::after {
		outline: var(--svelte-ui-focus-outline-outer);
		outline-offset: var(--svelte-ui-focus-outline-offset-outer);
	}

	/* Size variants */
	.radio-container--small {
		font-size: var(--svelte-ui-font-size-sm);
	}

	.radio-container--small .radio-label {
		padding: var(--svelte-ui-radio-padding-sm);
		min-height: var(--svelte-ui-radio-min-height-sm);
	}

	.radio-container--small .radio-label.no-label {
		padding-left: 16px;
		min-height: 12px;
	}

	.radio-container--small .radio-label::after {
		width: var(--svelte-ui-radio-size-sm);
		height: var(--svelte-ui-radio-size-sm);
	}

	.radio-container--small .radio-label::before {
		left: calc(var(--svelte-ui-radio-size-sm) / 2);
	}

	.radio-container--small input[type='radio']:checked + .radio-label::before {
		left: calc((var(--svelte-ui-radio-size-sm) - var(--svelte-ui-radio-dot-size-sm)) / 2);
		width: var(--svelte-ui-radio-dot-size-sm);
		height: var(--svelte-ui-radio-dot-size-sm);
	}

	/* Mobile touch targets for small */
	@media (hover: none) and (pointer: coarse) {
		.radio-container--small .radio-label {
			min-height: var(--svelte-ui-touch-target-sm);
		}
	}

	.radio-container--large {
		font-size: var(--svelte-ui-font-size-lg);
	}

	.radio-container--large .radio-label {
		padding: var(--svelte-ui-radio-padding-lg);
		min-height: var(--svelte-ui-radio-min-height-lg);
	}

	.radio-container--large .radio-label.no-label {
		padding-left: 24px;
		min-height: 20px;
	}

	.radio-container--large .radio-label::after {
		width: var(--svelte-ui-radio-size-lg);
		height: var(--svelte-ui-radio-size-lg);
	}

	.radio-container--large .radio-label::before {
		left: calc(var(--svelte-ui-radio-size-lg) / 2);
	}

	.radio-container--large input[type='radio']:checked + .radio-label::before {
		left: calc((var(--svelte-ui-radio-size-lg) - var(--svelte-ui-radio-dot-size-lg)) / 2);
		width: var(--svelte-ui-radio-dot-size-lg);
		height: var(--svelte-ui-radio-dot-size-lg);
	}

	/* Mobile touch targets for large */
	@media (hover: none) and (pointer: coarse) {
		.radio-container--large .radio-label {
			min-height: var(--svelte-ui-touch-target-lg);
		}
	}

	/* Reduced motion */
	.radio-container--no-motion .radio-label::before,
	.radio-container--no-motion .radio-label::after {
		transition-duration: 0.01s;
	}

	/* Prefers reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.radio-label::before,
		.radio-label::after {
			transition-duration: 0.01s;
		}
	}
</style>
