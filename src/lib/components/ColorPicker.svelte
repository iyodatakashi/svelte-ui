<!-- ColorPicker.svelte -->

<script lang="ts">
	import { untrack } from 'svelte';
	import IconButton from './IconButton.svelte';

	let {
		value = $bindable(''),
		disabled = false,
		fullWidth = false,
		rounded = false,
		clearable = false,
		focusStyle = 'border',
		customStyle = '',
		onchange = (value: string) => {},
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},
		onclick = (event: MouseEvent) => {},
		onkeydown = (event: KeyboardEvent) => {},
		...restProps
	}: {
		value?: string;
		disabled?: boolean;
		fullWidth?: boolean;
		rounded?: boolean;
		clearable?: boolean;
		focusStyle?: 'background' | 'border' | 'none';
		customStyle?: string;
		onchange?: (value: string) => void;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onclick?: (event: MouseEvent & { currentTarget: HTMLInputElement }) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		[key: string]: any;
	} = $props();

	let localValue: string = $state(value);
	let prevValue: string = $state('');
	let isFocused: boolean = $state(false);

	$effect(() => {
		value;
		untrack(() => {
			/* value を localValue に反映 */
			localValue = value;

			/* value が更新されたらonchangeを実行 */
			handleChange();
		});
	});

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		handleChange();
	};

	const handleChange = (event?: Event): void => {
		if (!localValue.startsWith('#')) {
			localValue = '#' + localValue;
		}

		if (value !== prevValue || localValue !== prevValue) {
			value = localValue;
			prevValue = value;
			onchange(value);
		}
	};

	const handleFocus = (event: FocusEvent): void => {
		isFocused = true;
		onfocus(event);
	};

	const handleBlur = (event: FocusEvent): void => {
		isFocused = false;
		onblur(event);
	};

	const clear = (): void => {
		if (disabled) return;
		value = '';
		onchange(value);
	};

	const handleClick = (event: MouseEvent) =>
		onclick?.(event as MouseEvent & { currentTarget: HTMLInputElement });
	const handleKeydown = (event: KeyboardEvent) => onkeydown(event);
</script>

<div
	class="color-picker
	focus-style-{focusStyle}"
	class:full-width={fullWidth}
	class:rounded
	class:clearable
	class:disabled
	class:is-focused={isFocused}
	style={customStyle}
>
	<form class:full-width={fullWidth} onsubmit={handleSubmit}>
		<input
			bind:value={localValue}
			type="text"
			class="text-input"
			onchange={handleChange}
			onfocus={handleFocus}
			onblur={handleBlur}
			onclick={handleClick}
			onkeydown={handleKeydown}
			{disabled}
			{...restProps}
		/>
		<!-- クリアボタン -->
		{#if clearable && !disabled}
			<div class="clear-button-block">
				<IconButton
					ariaLabel="クリア"
					color="var(--svelte-ui-colorpicker-text-color)"
					onclick={clear}
					tabindex={-1}
					iconFilled={true}
					size={24}>cancel</IconButton
				>
			</div>
		{/if}
	</form>

	<div class="color-picker-trigger">
		<input
			type="color"
			bind:value
			onchange={handleChange}
			onfocus={handleFocus}
			onblur={handleBlur}
			onclick={handleClick}
			onkeydown={handleKeydown}
			{disabled}
			class="color-input"
			{...restProps}
		/>
		<div class="color-display" style="background-color: {value};"></div>
	</div>
</div>

<style>
	/* =============================================
 * 基本構造・レイアウト
 * ============================================= */
	.color-picker {
		display: inline-flex;
		justify-content: stretch;
		align-items: center;
		position: relative;
		width: auto;
		max-width: 100%;
	}

	form {
		padding: inherit;
		border: none;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		position: relative;
	}

	/* =============================================
 * 基本コンポーネント
 * ============================================= */
	.text-input {
		width: 100%;
		min-width: 1em;
		padding: 0 12px 0 var(--svelte-ui-colorpicker-text-padding-left);
		background: transparent;
		border: none;
		background-color: var(--svelte-ui-colorpicker-bg);
		box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-colorpicker-border-color);
		border-radius: var(--svelte-ui-input-border-radius);
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		min-height: var(--svelte-ui-input-height);

		&:focus,
		&:focus-visible {
			outline: none;
		}
	}

	.color-picker-trigger {
		position: absolute;
		left: var(--svelte-ui-colorpicker-trigger-offset);
		display: inline-block;
		width: var(--svelte-ui-colorpicker-trigger-size);
		height: var(--svelte-ui-colorpicker-trigger-size);
		padding: 0;

		&::before {
			content: '';
			display: block;
			position: absolute;
			width: 100%;
			height: 100%;
			border: var(--svelte-ui-colorpicker-trigger-border-style)
				var(--svelte-ui-colorpicker-trigger-border-width)
				var(--svelte-ui-colorpicker-trigger-border-color);
			border-radius: var(--svelte-ui-colorpicker-trigger-border-radius);
		}
	}

	.color-input {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		padding: 0;
		z-index: 2;
		pointer-events: auto;
		cursor: pointer;
	}

	.color-display {
		display: block;
		width: 100%;
		height: 100%;
		cursor: pointer;
		position: relative;
		border-radius: var(--svelte-ui-colorpicker-trigger-border-radius);
		z-index: 1;
	}

	.clear-button-block {
		position: absolute;
		top: 50%;
		right: 8px;
		height: fit-content;
		transform: translate(0, -50%);
		opacity: 0;
		transition: var(--svelte-ui-clear-button-transition);
	}

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.color-picker.full-width {
		width: 100%;

		form {
			width: 100%;
		}
	}

	/* =============================================
 * 機能バリエーション：clearable
 * ============================================= */
	.clearable {
		.text-input {
			padding-right: var(--svelte-ui-clear-button-padding-adjustment);
		}
	}

	@media (hover: hover) {
		.color-picker:hover .clear-button-block {
			opacity: 1;
			pointer-events: all;
		}
	}

	/* =============================================
 * プレースホルダー・テキスト表示
 * ============================================= */
	input::placeholder {
		color: var(--svelte-ui-colorpicker-placeholder-color);
	}

	/* =============================================
 * フォーカス効果バリエーション
 * ============================================= */
	.focus-style-border .text-input:focus-visible {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.focus-style-background .text-input:focus-visible {
		background: var(--svelte-ui-hover-overlay);
	}

	/* =============================================
 * 状態管理（disabled, focused等）
 * ============================================= */
	.disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		pointer-events: none;

		.color-input {
			cursor: not-allowed;
			pointer-events: none;
		}
	}

	.text-input:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.color-picker {
		.text-input {
			background-color: var(--svelte-ui-colorpicker-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset
				var(--svelte-ui-colorpicker-border-color);
			color: var(--svelte-ui-colorpicker-text-color);
		}

		.color-picker-trigger::before {
			border-color: var(--svelte-ui-colorpicker-trigger-border-color);
		}
	}

	/* =============================================
 * デザインバリアント：rounded
 * ============================================= */
	.color-picker.rounded {
		.text-input {
			border-radius: var(--svelte-ui-input-border-radius-rounded);
		}

		.color-display {
			border-radius: var(--svelte-ui-border-radius-rounded);
		}

		.color-picker-trigger::before {
			border-radius: var(--svelte-ui-border-radius-rounded);
		}

		&.clearable .text-input {
			padding-right: var(--svelte-ui-clear-button-padding-adjustment);
		}
	}
</style>
