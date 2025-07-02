<!-- Input.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
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
		onkeydown = () => {}
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
		rounded?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		id?: string | null;
		tabindex?: number | null;
		size?: number | null;
		autocomplete?: AutoFill | null | undefined;
		onchange?: (value: string | number | undefined) => void;
		oninput?: (value: string | number | undefined) => void;
		onfocus?: Function;
		onblur?: Function;
		onclick?: Function;
		onkeydown?: Function;
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
	const handleFocus = () => {
		isFocused = true;
		onfocus?.();
	};
	const handleBlur = () => {
		isFocused = false;
		onblur?.();
	};
	const handleClick = () => onclick?.();
	const handleKeydown = () => onkeydown?.();
</script>

<div
	class="input
	focus-style-{focusStyle}
	{type}"
	class:inline={variant === 'inline'}
	class:auto-resize={variant === 'inline'}
	class:full-width={fullWidth}
	class:clearable
	class:rounded
	class:disabled
	class:readonly
	class:is-focused={isFocused}
	style="max-width: {maxWidth}px; min-width: {minWidth}px"
>
	<!-- inline時の表示用要素（text-overflow: ellipsisが効く） -->
	{#if variant === 'inline'}
		<div class="plain-text" data-placeholder={placeholder} style={customStyle}>
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
		<div class="clear-button-block">
			<IconButton
				ariaLabel="クリア"
				color="var(--svelte-ui-text)"
				onclick={clear}
				tabindex={-1}
				iconFill={true}
				size={24}>cancel</IconButton
			>
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

	.plain-text {
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

	.clear-button-block {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translate(0, -50%);
		opacity: 0;
		transition: var(--svelte-ui-clear-button-transition);
	}

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.input.auto-resize {
		width: fit-content;
	}

	.input.full-width {
		width: 100%;
	}

	/* =============================================
 * 機能バリエーション
 * ============================================= */
	.clearable {
		input,
		.plain-text {
			padding-right: 24px;
		}
	}

	:hover .clear-button-block {
		opacity: 1;
		pointer-events: all;
	}

	/* =============================================
 * プレースホルダー・テキスト表示
 * ============================================= */
	input::placeholder,
	.plain-text:empty::before {
		color: var(--svelte-ui-text-placeholder);
	}

	/* =============================================
 * フォーカス効果バリエーション
 * ============================================= */
	.focus-style-border input:focus {
		box-shadow: var(--svelte-ui-input-focus-shadow);
	}

	.focus-style-background input:focus {
		background: var(--svelte-ui-hover-overlay);
	}

	/* =============================================
 * 状態管理（disabled, readonly等）
 * ============================================= */
	.disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		pointer-events: none;
	}

	.readonly {
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
	.input:not(.inline) {
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
			color: var(--svelte-ui-text);
		}

		.clear-button-block {
			right: 8px;
		}

		&.clearable {
			input {
				padding-right: var(--svelte-ui-clear-button-padding-adjustment);
			}
		}
	}

	/* =============================================
 * デザインバリアント：rounded
 * ============================================= */
	.input.rounded:not(.inline) {
		input {
			border-radius: var(--svelte-ui-input-border-radius-rounded);
		}
	}

	/* =============================================
 * デザインバリアント：inline
 * ============================================= */
	.input.inline {
		&.number .plain-text {
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

		&.is-focused {
			.plain-text {
				opacity: 0;
			}

			form {
				opacity: 1;
			}
		}
	}
</style>
