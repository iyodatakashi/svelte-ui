<!-- Input.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import Icon from './Icon.svelte';
	let {
		name,
		value = $bindable(),
		type = 'text',
		customStyle = '',
		variant = 'default',
		focusStyle = 'background',
		placeholder = '',
		fullWidth = false,
		minWidth = variant === 'inline' ? null : 120,
		maxWidth = null,
		min = null,
		max = null,
		step = null,
		maxlength = null,
		pattern = null,
		clearable = false,
		hasRightIcon = false,
		rightIcon = undefined,
		leftIcon = undefined,
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = null,
		iconVariant = 'outlined',
		rounded = false,
		disabled = false,
		readonly = false,
		required = false,
		id = null,
		tabindex = null,
		size = null,
		autocomplete = null,
		onchange = (value: string | number | undefined) => {},
		oninput = (value: string | number | undefined) => {},
		onfocus = () => {},
		onblur = () => {},
		onclick = () => {},
		onkeydown = () => {},
		onRightIconClick = () => {},
		onLeftIconClick = () => {}
	}: {
		name?: string;
		value: string | number | undefined;
		type?: 'text' | 'password' | 'number';
		customStyle?: string;
		variant?: 'default' | 'inline';
		focusStyle?: 'background' | 'border' | 'none';
		placeholder?: string;
		fullWidth?: boolean;
		minWidth?: number | null;
		maxWidth?: number | null;
		min?: number | null;
		max?: number | null;
		step?: number | null;
		maxlength?: number | null;
		pattern?: string | null;
		clearable?: boolean;
		hasRightIcon?: boolean;
		rightIcon?: string;
		leftIcon?: string;
		iconFilled?: boolean;
		iconWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
		iconGrade?: number;
		iconOpticalSize?: number | null;
		iconVariant?: 'outlined' | 'filled' | 'rounded' | 'sharp';
		rounded?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		id?: string | null;
		tabindex?: number | null;
		size?: number | null;
		autocomplete?: HTMLInputElement['autocomplete'] | null | undefined;
		onchange?: (value: string | number | undefined) => void;
		oninput?: (value: string | number | undefined) => void;
		onfocus?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
		onblur?: (event: FocusEvent & { currentTarget: HTMLInputElement }) => void;
		onclick?: (event: MouseEvent & { currentTarget: HTMLInputElement }) => void;
		onkeydown?: (event: KeyboardEvent & { currentTarget: HTMLInputElement }) => void;
		onRightIconClick?: (event: MouseEvent & { currentTarget: HTMLButtonElement }) => void;
		onLeftIconClick?: (event: MouseEvent & { currentTarget: HTMLButtonElement }) => void;
	} = $props();
	let ref: HTMLInputElement | undefined = $state();
	let isFocused: boolean = $state(false);
	// 表示用の値をフォーマット（inlineモードでの省略表示用）
	const getDisplayValue = (): string => {
		if (value === undefined) return '';
		// 数値型の場合はコンマ区切りで表示
		if (type === 'number' && typeof value === 'number') {
			return value.toLocaleString();
		}
		return String(value);
	};
	const clear = (): void => {
		if (disabled || readonly) return;
		value = undefined;
		ref?.focus();
		onchange?.(value);
	};
	// 外部からフォーカスを当てる（キャレットを先頭に移動）
	export const focus = () => {
		if (ref) {
			ref.focus();
			// テキスト系の場合、キャレットを先頭に移動
			if (type !== 'number') {
				ref.setSelectionRange?.(0, 0);
			}
			ref.scrollTop = 0;
		}
	};
	// Enterキー押下時の処理（フォーカスを外してonchangeを発火）
	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		ref?.blur();
		onchange?.(value);
	};
	const handleChange = () => onchange?.(value);
	const handleInput = () => oninput?.(value);
	const handleFocus = (event: FocusEvent) => {
		isFocused = true;
		onfocus?.(event as FocusEvent & { currentTarget: HTMLInputElement });
	};
	const handleBlur = (event: FocusEvent) => {
		isFocused = false;
		onblur?.(event as FocusEvent & { currentTarget: HTMLInputElement });
	};
	const handleClick = (event: MouseEvent) =>
		onclick?.(event as MouseEvent & { currentTarget: HTMLInputElement });
	const handleKeydown = (event: KeyboardEvent) =>
		onkeydown?.(event as KeyboardEvent & { currentTarget: HTMLInputElement });
</script>

<div
	class="input
	input--focus-{focusStyle}
	input--type-{type}"
	class:input--inline={variant === 'inline'}
	class:input--auto-resize={variant === 'inline'}
	class:input--full-width={fullWidth}
	class:input--clearable={clearable}
	class:input--has-icon-right={hasRightIcon || rightIcon}
	class:input--has-icon-left={leftIcon}
	class:input--rounded={rounded}
	class:input--disabled={disabled}
	class:input--readonly={readonly}
	class:input--focused={isFocused}
	style="max-width: {maxWidth}px; min-width: {minWidth}px"
>
	<!-- inline時の表示用要素（text-overflow: ellipsisが効く） -->
	{#if variant === 'inline'}
		<div class="input__display-text" data-placeholder={placeholder} style={customStyle}>
			{getDisplayValue()}
		</div>
	{/if}
	<!-- 入力用フォーム -->
	<form onsubmit={handleSubmit}>
		<label>
			<input
				{id}
				{name}
				bind:value
				bind:this={ref}
				{type}
				style={customStyle}
				{placeholder}
				{autocomplete}
				{min}
				{max}
				{step}
				{maxlength}
				{pattern}
				{disabled}
				{readonly}
				{required}
				{tabindex}
				{size}
				onchange={handleChange}
				oninput={handleInput}
				onfocus={handleFocus}
				onblur={handleBlur}
				onclick={handleClick}
				onkeydown={handleKeydown}
			/>
		</label>
	</form>
	<!-- クリアボタン -->
	{#if clearable && !disabled && !readonly}
		<div class="input__clear-button">
			<IconButton
				ariaLabel="クリア"
				color="var(--svelte-ui-input-text-color)"
				onclick={clear}
				tabindex={-1}
				iconFilled={true}
				size={24}>cancel</IconButton
			>
		</div>
	{/if}

	<!-- Left Icon -->
	{#if leftIcon}
		<div class="input__icon-left">
			{#if onLeftIconClick}
				<IconButton
					ariaLabel="左アイコン"
					color="var(--svelte-ui-select-icon-color)"
					variant="text"
					onclick={onLeftIconClick}
					tabindex={-1}
					{iconFilled}
					{iconWeight}
					size={32}
				>
					{leftIcon}
				</IconButton>
			{:else}
				<Icon
					filled={iconFilled}
					weight={iconWeight}
					grade={iconGrade}
					opticalSize={iconOpticalSize}
					variant={iconVariant}
				>
					{leftIcon}
				</Icon>
			{/if}
		</div>
	{/if}

	<!-- Right Icon -->
	{#if rightIcon}
		<div class="input__icon-right">
			{#if onRightIconClick}
				<IconButton
					ariaLabel="右アイコン"
					color="var(--svelte-ui-select-icon-color)"
					variant="text"
					onclick={onRightIconClick}
					tabindex={-1}
					{iconFilled}
					{iconWeight}
					size={32}
				>
					{rightIcon}
				</IconButton>
			{:else}
				<Icon
					filled={iconFilled}
					weight={iconWeight}
					grade={iconGrade}
					opticalSize={iconOpticalSize}
					variant={iconVariant}
				>
					{rightIcon}
				</Icon>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* =============================================
 * 基本構造・レイアウト
 * ============================================= */
	.input {
		display: inline-block;
		position: relative;
		width: auto;
		max-width: 100%;
		height: inherit;
	}

	form {
		padding: inherit;
		border: none;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		opacity: 0;
	}

	label {
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
	}

	/* =============================================
 * 基本コンポーネント
 * ============================================= */
	input {
		width: 100%;
		min-width: 1em;
		padding: inherit;
		background: transparent;
		border: none;
		border-radius: 0;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;

		&:focus,
		&:focus-visible {
			outline: none;
		}

		&[type='number'] {
			text-align: right;
			&::-webkit-outer-spin-button,
			&::-webkit-inner-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}
	}

	.input__display-text {
		display: inline-block;
		vertical-align: top;
		width: 100%;
		min-width: 1em;
		padding: inherit;
		background: inherit;
		border: inherit;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		white-space: nowrap;
		vertical-align: top;
		overflow: hidden;
		text-overflow: ellipsis;
		opacity: 1;
		transition: none;
		cursor: text !important;

		&::before {
			content: '';
		}

		&:empty::before {
			content: attr(data-placeholder);
		}
	}

	.input__clear-button {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(0, -50%);
		opacity: 0;
		transition: var(--svelte-ui-clear-button-transition);
	}

	@media (hover: hover) {
		:hover .input__clear-button {
			opacity: 1;
		}
	}

	.input__icon-left {
		display: flex;
		justify-content: center;
		position: absolute;
		top: 50%;
		left: 0;
		width: 40px;
		transform: translateY(-50%);
		font-size: var(--svelte-ui-select-dropdown-size);
		color: var(--svelte-ui-select-icon-color);
		pointer-events: auto;
		z-index: 1;
	}

	.input__icon-right {
		display: flex;
		justify-content: center;
		position: absolute;
		top: 50%;
		right: 0;
		width: 40px;
		transform: translateY(-50%);
		font-size: var(--svelte-ui-select-dropdown-size);
		color: var(--svelte-ui-select-icon-color);
		pointer-events: auto;
		z-index: 1;
	}

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.input--auto-resize {
		width: fit-content;
	}

	.input--full-width {
		width: 100%;
	}

	/* =============================================
 * 機能バリエーション
 * ============================================= */
	.input--clearable {
		input,
		.input__display-text {
			padding-right: 24px;
		}
	}

	.input--has-icon-right {
		input,
		.input__display-text {
			padding-right: var(--svelte-ui-input-icon-space);
		}
	}

	.input--has-icon-left {
		input,
		.input__display-text {
			padding-left: var(--svelte-ui-input-icon-space);
		}
	}

	/* =============================================
 * プレースホルダー・テキスト表示
 * ============================================= */
	input::placeholder,
	.input__display-text:empty::before {
		color: var(--svelte-ui-input-placeholder-color);
	}

	/* =============================================
 * フォーカス効果バリエーション
 * ============================================= */
	.input--focus-border input:focus {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.input--focus-background input:focus {
		background: var(--svelte-ui-hover-overlay);
	}

	/* =============================================
 * 状態管理（disabled, readonly等）
 * ============================================= */
	.input--disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		pointer-events: none;

		.input__icon-left,
		.input__icon-right {
			opacity: var(--svelte-ui-button-disabled-opacity);
		}
	}

	.input--readonly {
		input {
			cursor: default;
		}
	}

	input:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	input[readonly] {
		background-color: var(--svelte-ui-input-readonly-bg);
		cursor: default;
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.input:not(.input--inline) {
		form {
			position: static;
			opacity: 1;
		}

		input {
			min-height: var(--svelte-ui-input-height);
			padding: var(--svelte-ui-input-padding);
			background-color: var(--svelte-ui-input-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-input-border-color);
			border: none;
			border-radius: var(--svelte-ui-input-border-radius);
			color: var(--svelte-ui-input-text-color);
		}

		.input__clear-button {
			right: 8px;
		}

		&.input--clearable {
			input {
				padding-right: var(--svelte-ui-clear-button-padding-adjustment);
			}
		}

		&.input--has-icon-right {
			input {
				padding-right: var(--svelte-ui-input-icon-space);
			}
		}

		&.input--has-icon-left {
			input {
				padding-left: var(--svelte-ui-input-icon-space);
			}
		}
	}

	/* =============================================
 * デザインバリアント：rounded
 * ============================================= */
	.input--rounded:not(.input--inline) {
		input {
			border-radius: var(--svelte-ui-input-border-radius-rounded);
		}
	}

	/* =============================================
 * デザインバリアント：inline
 * ============================================= */
	.input--inline {
		&.input--type-number .input__display-text {
			text-align: right;
		}

		form,
		label {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
		}

		&.input--has-icon-right {
			input,
			.input__display-text {
				padding-right: var(--svelte-ui-input-icon-space-inline);
			}
		}

		&.input--has-icon-left {
			input,
			.input__display-text {
				padding-left: var(--svelte-ui-input-icon-space-inline);
			}
		}

		&.input--focused {
			.input__display-text {
				opacity: 0;
			}

			form {
				opacity: 1;
			}
		}
	}
</style>
