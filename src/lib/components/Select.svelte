<!-- Select.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';

	let {
		name,
		value = $bindable(),
		options = [],
		customStyle = '',
		variant = 'default',

		focusStyle = 'border',
		placeholder = '',
		fullWidth = false,
		disabled = false,
		required = false,
		id = null,
		tabindex = null,
		size = null,
		rounded = false,
		onchange = () => {},
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},
		onclick = (event: MouseEvent) => {},
		onkeydown = (event: KeyboardEvent) => {},
		...restProps
	}: {
		name?: string;
		value: string | number | null | undefined;
		options: any[];
		customStyle?: string;
		variant?: 'default' | 'inline';

		focusStyle?: 'background' | 'border' | 'none';
		placeholder?: string;
		fullWidth?: boolean;
		disabled?: boolean;
		required?: boolean;
		id?: string | null;
		tabindex?: number | null;
		size?: number | null;
		rounded?: boolean;
		onchange?: Function;
		onfocus?: (event: FocusEvent & { currentTarget: HTMLSelectElement }) => void;
		onblur?: (event: FocusEvent & { currentTarget: HTMLSelectElement }) => void;
		onclick?: (event: MouseEvent & { currentTarget: HTMLSelectElement }) => void;
		onkeydown?: (event: KeyboardEvent & { currentTarget: HTMLSelectElement }) => void;
		[key: string]: any;
	} = $props();

	let isFocused: boolean = $state(false);

	const handleFocus = (event: FocusEvent) => {
		isFocused = true;
		onfocus?.(event as FocusEvent & { currentTarget: HTMLSelectElement });
	};
	const handleBlur = (event: FocusEvent) => {
		isFocused = false;
		onblur?.(event as FocusEvent & { currentTarget: HTMLSelectElement });
	};
	const handleChange = () => {
		onchange?.(value);
	};
	const handleClick = (event: MouseEvent) =>
		onclick?.(event as MouseEvent & { currentTarget: HTMLSelectElement });
	const handleKeydown = (event: KeyboardEvent) =>
		onkeydown?.(event as KeyboardEvent & { currentTarget: HTMLSelectElement });
</script>

<div
	class="select
select--focus-{focusStyle}"
	class:select--inline={variant === 'inline'}
	class:select--full-width={fullWidth}
	class:select--disabled={disabled}
	class:select--focused={isFocused}
	class:select--rounded={rounded}
>
	<select
		{id}
		{name}
		bind:value
		{disabled}
		{required}
		{tabindex}
		{size}
		style={customStyle}
		onfocus={handleFocus}
		onblur={handleBlur}
		onchange={handleChange}
		onclick={handleClick}
		onkeydown={handleKeydown}
		{...restProps}
	>
		<!-- プレースホルダーオプション -->
		{#if placeholder}
			<option value="" disabled selected={value === undefined || value === null}>
				{placeholder}
			</option>
		{/if}
		<!-- 通常のオプション -->
		{#each options as option (option.value)}
			<option value={option.value} disabled={option.disabled}>
				{option.label}
			</option>
		{/each}
	</select>
	<!-- ドロップダウンアイコン -->
	<div class="select__dropdown-icon" aria-hidden="true">
		<Icon>arrow_drop_down</Icon>
	</div>
</div>

<style>
	/* =============================================
 * 基本構造・レイアウト
 * ============================================= */
	.select {
		display: inline-block;
		position: relative;
		width: auto;
		max-width: 100%;
	}

	/* =============================================
 * 基本コンポーネント
 * ============================================= */
	select {
		width: 100%;
		min-height: var(--svelte-ui-select-height);
		padding: var(--svelte-ui-select-padding);
		background: transparent;
		border: none;
		border-radius: 0;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		&:focus,
		&:focus-visible {
			outline: none;
		}
	}

	.select__dropdown-icon {
		position: absolute;
		top: 50%;
		right: var(--svelte-ui-select-dropdown-icon-right);
		transform: translateY(-50%);
		font-size: var(--svelte-ui-select-dropdown-icon-size);
		color: var(--svelte-ui-select-dropdown-icon-color);
		pointer-events: none;
	}

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.select--full-width {
		width: 100%;
	}

	/* =============================================
 * プレースホルダー・オプション表示
 * ============================================= */
	option[value=''] {
		color: var(--svelte-ui-select-placeholder-color);
	}

	/* =============================================
 * フォーカス効果バリエーション
 * ============================================= */
	.select--focus-border select:focus {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.select--focus-background select:focus {
		background: var(--svelte-ui-hover-overlay);
	}

	/* =============================================
 * 状態管理（disabled, readonly等）
 * ============================================= */
	.select--disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		pointer-events: none;

		.select__dropdown-icon {
			opacity: var(--svelte-ui-button-disabled-opacity);
		}
	}

	select:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.select:not(.inline) {
		select {
			min-height: var(--svelte-ui-select-height);
			padding: var(--svelte-ui-select-padding);
			background-color: var(--svelte-ui-select-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-select-border-color);
			border: none;
			border-radius: var(--svelte-ui-select-border-radius);
			font-size: 1rem;
			color: var(--svelte-ui-select-text-color);
			line-height: var(--svelte-ui-select-height);
		}

		.dropdown-icon {
			right: var(--svelte-ui-select-dropdown-icon-right);
		}
	}

	/* =============================================
 * デザインバリアント：inline
 * ============================================= */
	.select.inline {
		select {
			padding: inherit;
			padding-right: var(--svelte-ui-input-icon-space-inline);
			background: transparent;
			border: none;
			border-radius: 0;
			color: inherit;
			min-height: auto;
			line-height: inherit;
		}

		.dropdown-icon {
			right: 0;
		}
	}

	/* =============================================
 * デザインバリアント：rounded
 * ============================================= */
	.select--rounded:not(.select--inline) select {
		border-radius: var(--svelte-ui-select-border-radius-rounded);
	}
</style>
