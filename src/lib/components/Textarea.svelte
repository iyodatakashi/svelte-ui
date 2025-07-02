<!-- Textarea.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	let {
		name = '',
		value = $bindable(),
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
		onchange = (value: string | undefined) => {},
		oninput = (value: string | undefined) => {},
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
		onchange?: (value: string | undefined) => void;
		oninput?: (value: string | undefined) => void;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onclick?: (event: MouseEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
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
		onfocus(event);
	};
	const handleBlur = (event: FocusEvent) => {
		isFocused = false;
		onblur(event);
	};
	const handleClick = (event: MouseEvent) => onclick(event);
	const handleKeydown = (event: KeyboardEvent) => onkeydown(event);
</script>

<div
	class="textarea
	focus-style-{focusStyle}"
	class:inline={variant === 'inline'}
	class:full-width={fullWidth}
	class:auto-resize={autoResize}
	class:clearable
	class:rounded
	class:disabled
	class:readonly
	class:is-focused={isFocused}
>
	<!-- autoResize時の表示用要素（HTMLレンダリングで高さ調整） -->
	<div
		class="plain-text"
		data-placeholder={placeholder}
		style="min-height: {minHeight}px; {customStyle}"
	>
		{@html htmlValue}
	</div>
	<label>
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
			{...restProps}
		></textarea>
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
	</label>
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

	label {
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
	.plain-text {
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

	.clear-button-block {
		position: absolute;
		top: var(--svelte-ui-clear-button-top-textarea);
		right: var(--svelte-ui-clear-button-right-textarea);
		opacity: var(--svelte-ui-clear-button-opacity-hidden);
		transition: var(--svelte-ui-clear-button-transition);
	}

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.textarea.full-width {
		width: 100%;
	}

	.textarea.auto-resize {
		textarea {
			overflow: hidden;
		}
	}

	.textarea:not(.auto-resize) {
		.plain-text {
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
	.clearable {
		textarea,
		.plain-text {
			padding-right: var(--svelte-ui-clear-button-padding-adjustment);
		}
	}

	:hover .clear-button-block {
		opacity: var(--svelte-ui-clear-button-opacity-visible);
		pointer-events: all;
	}

	/* =============================================
 * プレースホルダー・テキスト表示
 * ============================================= */
	textarea::placeholder,
	.plain-text:empty::before {
		color: var(--svelte-ui-text-placeholder);
	}

	/* =============================================
 * フォーカス効果バリエーション
 * ============================================= */
	.textarea.focus-style-border textarea:focus {
		box-shadow: var(--svelte-ui-input-focus-shadow);
	}

	.textarea.focus-style-background textarea:focus {
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
	.is-focused,
	.textarea:not(.inline) {
		.plain-text {
			opacity: 0;
		}

		textarea {
			opacity: 1;
		}
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.textarea:not(.inline) {
		.plain-text {
			padding: var(--svelte-ui-textarea-padding);
		}

		textarea {
			position: static;
			padding: var(--svelte-ui-textarea-padding);
			background-color: var(--svelte-ui-textarea-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-textarea-border-color);
			border: none;
			border-radius: var(--svelte-ui-textarea-border-radius);
			color: var(--svelte-ui-text);
		}
	}

	/* =============================================
 * デザインバリアント：rounded
 * ============================================= */
	.textarea.rounded:not(.inline) {
		textarea {
			border-radius: var(--svelte-ui-textarea-border-radius-rounded);
		}
	}

	/* =============================================
 * デザインバリアント：inline
 * ============================================= */
	.textarea.inline {
		.plain-text {
			opacity: 1;
		}

		textarea {
			opacity: 0;
		}

		&.is-focused {
			.plain-text {
				opacity: 0;
			}

			textarea {
				opacity: 1;
			}
		}
	}
</style>
