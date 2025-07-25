<!-- Textarea.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	let {
		name = '',
		value = $bindable(),
		textareaAttributes,
		customStyle = '',
		variant = 'default',
		focusStyle = 'background',
		placeholder = '',
		fullWidth = false,
		autoResize = true,
		rows = 3,
		minHeight = 36,
		resizable = false,
		clearable = false,
		rounded = false,
		disabled = false,
		readonly = false,
		required = false,
		id = null,
		maxlength = null,
		tabindex = null,
		onchange = () => {},
		oninput = () => {},
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},
		onclick = (event: MouseEvent) => {},
		onkeydown = (event: KeyboardEvent) => {},
		...restProps
	}: {
		name?: string;
		value: string | undefined;
		customStyle?: string;
		variant?: 'default' | 'inline';

		focusStyle?: 'background' | 'border' | 'none';
		placeholder?: string;
		fullWidth?: boolean;
		autoResize?: boolean;
		rows?: number;
		minHeight?: number | null;
		resizable?: boolean;
		clearable?: boolean;
		rounded?: boolean;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		id?: string | null;
		maxlength?: number | null;
		tabindex?: number | null;
		onchange?: (value: any) => void;
		oninput?: (value: any) => void;
		onfocus?: (event: FocusEvent & { currentTarget: HTMLTextAreaElement }) => void;
		onblur?: (event: FocusEvent & { currentTarget: HTMLTextAreaElement }) => void;
		onclick?: (event: MouseEvent & { currentTarget: HTMLTextAreaElement }) => void;
		textareaAttributes?: HTMLTextareaAttributes | undefined;
		onkeydown?: (event: KeyboardEvent & { currentTarget: HTMLTextAreaElement }) => void;
		[key: string]: any;
	} = $props();
	let ref: HTMLTextAreaElement | null = null;
	let isFocused: boolean = $state(false);

	// HTML表示用の値（autoResize時の高さ調整用）
	const htmlValue = $derived.by(() => {
		if (typeof value === 'string' && value !== '') {
			let html = value
				.replace(/ +/g, (match) => '&nbsp;'.repeat(match.length))
				.replace(/\n/g, '<br />');
			// 最後の行が空だったら空白を追加（高さ調整のため）
			const lines = html.split('<br />');
			if (lines.length > 0 && lines[lines.length - 1] === '') {
				html += '&nbsp;';
			}
			return html;
		} else {
			return value ?? '';
		}
	});

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
			ref.setSelectionRange(0, 0);
			ref.scrollTop = 0;
		}
	};
	const handleChange = () => onchange?.(value);
	const handleInput = () => oninput?.(value);
	const handleFocus = (event: FocusEvent) => {
		isFocused = true;
		onfocus?.(event as FocusEvent & { currentTarget: HTMLTextAreaElement });
	};
	const handleBlur = (event: FocusEvent) => {
		isFocused = false;
		onblur?.(event as FocusEvent & { currentTarget: HTMLTextAreaElement });
	};
	const handleClick = (event: MouseEvent) =>
		onclick?.(event as MouseEvent & { currentTarget: HTMLTextAreaElement });
	const handleKeydown = (event: KeyboardEvent) =>
		onkeydown?.(event as KeyboardEvent & { currentTarget: HTMLTextAreaElement });
</script>

<div
	class="textarea
	textarea--focus-{focusStyle}"
	class:textarea--inline={variant === 'inline'}
	class:textarea--full-width={fullWidth}
	class:textarea--auto-resize={autoResize}
	class:textarea--clearable={clearable}
	class:textarea--rounded={rounded}
	class:textarea--disabled={disabled}
	class:textarea--readonly={readonly}
	class:textarea--focused={isFocused}
>
	<!-- autoResize時の表示用要素（HTMLレンダリングで高さ調整） -->
	<div
		class="textarea__display-text"
		data-placeholder={placeholder}
		style="min-height: {minHeight}px; {customStyle}"
	>
		{@html htmlValue}
	</div>
	<div class="textarea__input-container">
		<textarea
			{id}
			{name}
			bind:value
			bind:this={ref}
			{rows}
			{placeholder}
			{disabled}
			{readonly}
			{required}
			{maxlength}
			{tabindex}
			class:resizable
			style={customStyle}
			onchange={handleChange}
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={handleBlur}
			onclick={handleClick}
			onkeydown={handleKeydown}
			{...textareaAttributes}
			{...restProps}
		></textarea>
		<!-- クリアボタン -->
		{#if clearable && !disabled && !readonly}
			<div class="textarea__clear-button">
				<IconButton
					ariaLabel="クリア"
					color="var(--svelte-ui-textarea-text-color)"
					onclick={clear}
					tabindex={-1}
					iconFilled={true}
					size={24}>cancel</IconButton
				>
			</div>
		{/if}
	</div>
</div>

<style>
	/* =============================================
 * 基本構造・レイアウト
 * ============================================= */
	.textarea {
		display: block;
		position: relative;
		height: 100%;
		width: auto;
		max-width: 100%;
	}

	.textarea__input-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: inherit;
		border: none;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
	}

	/* =============================================
 * 基本コンポーネント
 * ============================================= */
	.textarea__display-text {
		display: flex;
		align-items: start; /* テーブルの他の列に合わせて高さが高くなっているときに、上寄せになるようにするための措置 */
		width: 100%;
		background: inherit;
		border: inherit;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		word-break: inherit;
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

	textarea {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: inherit;
		background: transparent;
		border: none;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		opacity: 0;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		&:focus {
			outline: none;
		}

		&:not(.resizable) {
			resize: none;
		}
	}

	.textarea__clear-button {
		position: absolute;
		top: var(--svelte-ui-clear-button-top-textarea);
		right: var(--svelte-ui-clear-button-right-textarea);
		opacity: 0;
		transition: var(--svelte-ui-clear-button-transition);
	}

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.textarea--full-width {
		width: 100%;
	}

	.textarea--auto-resize {
		textarea {
			overflow: hidden;
		}
	}

	.textarea:not(.textarea--auto-resize) {
		.textarea__display-text {
			display: none;
		}

		label {
			position: static;
			height: auto;
		}

		textarea {
			position: static;
			height: auto;
		}
	}

	/* =============================================
 * 機能バリエーション
 * ============================================= */
	.textarea--clearable {
		textarea,
		.textarea__display-text {
			padding-right: var(--svelte-ui-clear-button-right-spacing);
		}
	}

	@media (hover: hover) {
		:hover .textarea__clear-button {
			opacity: 1;
		}
	}

	/* =============================================
 * プレースホルダー・テキスト表示
 * ============================================= */
	textarea::placeholder,
	.textarea__display-text:empty::before {
		color: var(--svelte-ui-textarea-placeholder-color);
	}

	/* =============================================
 * フォーカス効果バリエーション
 * ============================================= */
	.textarea--focus-border textarea:focus {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.textarea--focus-background textarea:focus {
		background: var(--svelte-ui-hover-overlay);
	}

	/* =============================================
 * 状態管理（disabled, readonly等）
 * ============================================= */
	.textarea--disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		pointer-events: none;
	}

	.textarea--readonly {
		textarea {
			cursor: default;
		}
	}

	textarea:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	textarea[readonly] {
		background-color: var(--svelte-ui-input-readonly-bg);
		cursor: default;
	}

	/* =============================================
 * 表示切り替え（フォーカス時・非autoResize時）
 * ============================================= */
	.textarea--focused,
	.textarea:not(.textarea--inline) {
		.textarea__display-text {
			opacity: 0;
		}

		textarea {
			opacity: 1;
		}
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.textarea:not(.textarea--inline) {
		.textarea__display-text {
			padding: var(--svelte-ui-textarea-padding);
		}

		textarea {
			position: static;
			padding: var(--svelte-ui-textarea-padding);
			background-color: var(--svelte-ui-textarea-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-textarea-border-color);
			border: none;
			border-radius: var(--svelte-ui-textarea-border-radius);
			color: var(--svelte-ui-textarea-text-color);
		}
	}

	/* =============================================
 * デザインバリアント：rounded
 * ============================================= */
	.textarea--rounded:not(.textarea--inline) {
		textarea {
			border-radius: var(--svelte-ui-textarea-border-radius-rounded);
		}
	}

	/* =============================================
 * デザインバリアント：inline
 * ============================================= */
	.textarea--inline {
		.textarea__display-text {
			opacity: 1;
		}

		textarea {
			opacity: 0;
		}

		&.textarea--focused {
			.textarea__display-text {
				opacity: 0;
			}

			textarea {
				opacity: 1;
			}
		}
	}
</style>
