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
		theme = 'light',
		focusStyle = 'border',
		customStyle = '',
		onchange = () => {},
		onfocus = () => {},
		onblur = () => {}
	}: {
		value?: string;
		disabled?: boolean;
		fullWidth?: boolean;
		rounded?: boolean;
		clearable?: boolean;
		theme?: 'light' | 'dark';
		focusStyle?: 'background' | 'border' | 'none';
		customStyle?: string;
		onchange?: () => void;
		onfocus?: () => void;
		onblur?: () => void;
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

	const handleChange = (): void => {
		if (!localValue.startsWith('#')) {
			localValue = '#' + localValue;
		}

		if (value !== prevValue || localValue !== prevValue) {
			value = localValue;
			prevValue = value;
			onchange();
		}
	};

	const handleFocus = (event: globalThis.FocusEvent): void => {
		isFocused = true;
		onfocus();
	};

	const handleBlur = (event: globalThis.FocusEvent): void => {
		isFocused = false;
		onblur();
	};

	const clear = (): void => {
		if (disabled) return;
		value = '';
		onchange();
	};
</script>

<div
	class="color-picker
	{theme === 'dark' ? 'dark-theme' : 'light-theme'}
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
			{disabled}
		/>
		<!-- クリアボタン -->
		{#if clearable && !disabled}
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
	</form>

	<div class="custom-color-picker">
		<input
			type="color"
			bind:value
			onchange={handleChange}
			onfocus={handleFocus}
			onblur={handleBlur}
			{disabled}
			class="color-input"
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
		padding: 0 12px 0 var(--svelte-ui-colorpalette-input-padding-left);
		background: transparent;
		border: none;
		background-color: var(--svelte-ui-colorpalette-bg);
		box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-colorpalette-border-color);
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

	.custom-color-picker {
		position: absolute;
		left: var(--svelte-ui-colorpalette-offset);
		display: inline-block;
		width: var(--svelte-ui-colorpalette-size);
		height: var(--svelte-ui-colorpalette-size);

		&::before {
			content: '';
			display: block;
			position: absolute;
			width: calc(100% - 2px);
			height: calc(100% - 2px);
			border: var(--svelte-ui-colorpalette-border-style) var(--svelte-ui-colorpalette-border-width)
				var(--svelte-ui-colorpalette-border-color);
			border-radius: var(--svelte-ui-colorpalette-border-radius);
		}
	}

	.color-input {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
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
		border-radius: var(--svelte-ui-colorpalette-border-radius);
		z-index: 1;
	}

	.clear-button-block {
		position: absolute;
		top: 50%;
		right: 8px;
		height: fit-content;
		transform: translate(0, -50%);
		opacity: var(--svelte-ui-clear-button-opacity-hidden);
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

	.color-picker:hover .clear-button-block {
		opacity: var(--svelte-ui-clear-button-opacity-visible);
		pointer-events: all;
	}

	/* =============================================
 * プレースホルダー・テキスト表示
 * ============================================= */
	input::placeholder {
		color: var(--svelte-ui-text-placeholder);
	}

	/* =============================================
 * フォーカス効果バリエーション
 * ============================================= */
	.focus-style-border .text-input:focus-visible {
		box-shadow: var(--svelte-ui-input-focus-shadow);
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
 * テーマバリエーション
 * ============================================= */
	.dark-theme {
		.text-input {
			background-color: var(--svelte-ui-colorpalette-bg-dark);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset
				var(--svelte-ui-colorpalette-border-color-dark);
			color: var(--svelte-ui-text-dark);
		}

		.custom-color-picker::before {
			border-color: var(--svelte-ui-colorpalette-border-color-dark);
		}

		&.focus-style-background .text-input:focus-visible {
			background: var(--svelte-ui-hover-overlay-dark);
		}
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.color-picker {
		.text-input {
			background-color: var(--svelte-ui-colorpalette-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset
				var(--svelte-ui-colorpalette-border-color);
			color: var(--svelte-ui-text);
		}

		.custom-color-picker::before {
			border-color: var(--svelte-ui-colorpalette-border-color);
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
			border-radius: var(--svelte-ui-border-radius-full);
		}

		.custom-color-picker::before {
			border-radius: var(--svelte-ui-border-radius-full);
		}

		&.clearable .text-input {
			padding-right: var(--svelte-ui-clear-button-padding-adjustment);
		}
	}
</style>
