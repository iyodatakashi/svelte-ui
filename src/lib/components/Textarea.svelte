<!-- Textarea.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { IconVariant } from '$lib/types/Icon';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================

	let {
		// 基本プロパティ
		name = '',
		value = $bindable(),
		placeholder = '',

		// HTML属性系
		id = null,
		tabindex = null,
		maxlength = null,
		autocomplete = null,
		wrap = null,
		spellcheck = null,
		autocapitalize = null,
		textareaAttributes,

		// スタイル/レイアウト
		rows = 3,
		minHeight = 36,
		inline = false,
		focusStyle = 'background',
		fullWidth = false,
		rounded = false,
		customStyle = '',

		// 状態/動作
		disabled = false,
		autoResize = true,
		resizable = false,
		clearable = false,
		clearButtonAriaLabel = 'クリア',
		readonly = false,
		required = false,
		iconVariant = 'outlined',

		// フォーカスイベント
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},

		// キーボードイベント
		onkeydown = (event: KeyboardEvent) => {},
		onkeyup = (event: KeyboardEvent) => {},

		// マウスイベント
		onclick = (event: MouseEvent) => {},
		onmousedown = (event: MouseEvent) => {},
		onmouseup = (event: MouseEvent) => {},
		onmouseenter = (event: MouseEvent) => {},
		onmouseleave = (event: MouseEvent) => {},
		onmouseover = (event: MouseEvent) => {},
		onmouseout = (event: MouseEvent) => {},
		oncontextmenu = (event: MouseEvent) => {},
		onauxclick = (event: MouseEvent) => {},

		// タッチイベント
		ontouchstart = (event: TouchEvent) => {},
		ontouchend = (event: TouchEvent) => {},
		ontouchmove = (event: TouchEvent) => {},
		ontouchcancel = (event: TouchEvent) => {},

		// ポインターイベント
		onpointerdown = (event: PointerEvent) => {},
		onpointerup = (event: PointerEvent) => {},
		onpointerenter = (event: PointerEvent) => {},
		onpointerleave = (event: PointerEvent) => {},
		onpointermove = (event: PointerEvent) => {},
		onpointercancel = (event: PointerEvent) => {},

		// 入力イベント
		onchange = () => {},
		oninput = () => {},

		// その他
		...restProps
	}: {
		// 基本プロパティ
		name?: string;
		value: string | undefined;
		placeholder?: string;

		// HTML属性系
		id?: string | null;
		tabindex?: number | null;
		maxlength?: number | null;
		autocomplete?: HTMLTextareaAttributes['autocomplete'];
		wrap?: 'soft' | 'hard' | null;
		spellcheck?: boolean | null;
		autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters' | null;
		textareaAttributes?: HTMLTextareaAttributes | undefined;

		// スタイル/レイアウト
		rows?: number;
		minHeight?: number | null;
		inline?: boolean;
		focusStyle?: 'background' | 'border' | 'none';
		fullWidth?: boolean;
		rounded?: boolean;
		customStyle?: string;

		// 状態/動作
		disabled?: boolean;
		autoResize?: boolean;
		resizable?: boolean;
		clearable?: boolean;
		readonly?: boolean;
		required?: boolean;
		iconVariant?: IconVariant;

		// フォーカスイベント
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;

		// キーボードイベント
		onkeydown?: (event: KeyboardEvent) => void;
		onkeyup?: (event: KeyboardEvent) => void;

		// マウスイベント
		onclick?: (event: MouseEvent) => void;
		onmousedown?: (event: MouseEvent) => void;
		onmouseup?: (event: MouseEvent) => void;
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
		onmouseover?: (event: MouseEvent) => void;
		onmouseout?: (event: MouseEvent) => void;
		oncontextmenu?: (event: MouseEvent) => void;
		onauxclick?: (event: MouseEvent) => void;

		// タッチイベント
		ontouchstart?: (event: TouchEvent) => void;
		ontouchend?: (event: TouchEvent) => void;
		ontouchmove?: (event: TouchEvent) => void;
		ontouchcancel?: (event: TouchEvent) => void;

		// ポインターイベント
		onpointerdown?: (event: PointerEvent) => void;
		onpointerup?: (event: PointerEvent) => void;
		onpointerenter?: (event: PointerEvent) => void;
		onpointerleave?: (event: PointerEvent) => void;
		onpointermove?: (event: PointerEvent) => void;
		onpointercancel?: (event: PointerEvent) => void;

		// 入力イベント
		onchange?: (value: any) => void;
		oninput?: (value: any) => void;

		// その他
		[key: string]: any;
	} = $props();

	let ref: HTMLTextAreaElement | null = null;
	let isFocused: boolean = $state(false);

	// =========================================================================

	// Methods
	// =========================================================================

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

	const handleChange = () => {
		if (disabled || readonly) return;
		onchange?.(value);
	};
	const handleInput = () => {
		if (disabled || readonly) return;
		oninput?.(value);
	};
	const handleFocus = (event: FocusEvent) => {
		if (disabled) return;
		isFocused = true;
		onfocus?.(event);
	};

	const handleBlur = (event: FocusEvent) => {
		if (disabled) return;
		isFocused = false;
		onblur?.(event);
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeydown?.(event);
	};

	const handleKeyup = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeyup?.(event);
	};

	// マウスイベント
	const handleClick = (event: MouseEvent) => {
		if (disabled) return;
		onclick?.(event);
	};

	const handleMouseDown = (event: MouseEvent) => {
		if (disabled) return;
		onmousedown?.(event);
	};

	const handleMouseUp = (event: MouseEvent) => {
		if (disabled) return;
		onmouseup?.(event);
	};

	const handleMouseEnter = (event: MouseEvent) => {
		if (disabled) return;
		onmouseenter?.(event);
	};

	const handleMouseLeave = (event: MouseEvent) => {
		if (disabled) return;
		onmouseleave?.(event);
	};

	const handleMouseOver = (event: MouseEvent) => {
		if (disabled) return;
		onmouseover?.(event);
	};

	const handleMouseOut = (event: MouseEvent) => {
		if (disabled) return;
		onmouseout?.(event);
	};

	const handleContextMenu = (event: MouseEvent) => {
		if (disabled) return;
		oncontextmenu?.(event);
	};

	const handleAuxClick = (event: MouseEvent) => {
		if (disabled) return;
		onauxclick?.(event);
	};

	// タッチイベント
	const handleTouchStart = (event: TouchEvent) => {
		if (disabled) return;
		ontouchstart?.(event);
	};

	const handleTouchEnd = (event: TouchEvent) => {
		if (disabled) return;
		ontouchend?.(event);
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (disabled) return;
		ontouchmove?.(event);
	};

	const handleTouchCancel = (event: TouchEvent) => {
		if (disabled) return;
		ontouchcancel?.(event);
	};

	// ポインターイベント
	const handlePointerDown = (event: PointerEvent) => {
		if (disabled) return;
		onpointerdown?.(event);
	};

	const handlePointerUp = (event: PointerEvent) => {
		if (disabled) return;
		onpointerup?.(event);
	};

	const handlePointerEnter = (event: PointerEvent) => {
		if (disabled) return;
		onpointerenter?.(event);
	};

	const handlePointerLeave = (event: PointerEvent) => {
		if (disabled) return;
		onpointerleave?.(event);
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (disabled) return;
		onpointermove?.(event);
	};

	const handlePointerCancel = (event: PointerEvent) => {
		if (disabled) return;
		onpointercancel?.(event);
	};

	// =========================================================================
	// $derived
	// =========================================================================

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
</script>

<div
	class="textarea
	textarea--focus-{focusStyle}"
	class:textarea--inline={inline}
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
		style="{!inline ? `min-height: ${minHeight}px;` : ''} {customStyle}"
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
			{autocomplete}
			{wrap}
			{spellcheck}
			{autocapitalize}
			class:resizable
			style="{!inline ? `min-height: ${minHeight}px;` : ''} {customStyle}"
			onchange={handleChange}
			oninput={handleInput}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleKeydown}
			onkeyup={handleKeyup}
			onclick={handleClick}
			onmousedown={handleMouseDown}
			onmouseup={handleMouseUp}
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
			onmouseover={handleMouseOver}
			onmouseout={handleMouseOut}
			oncontextmenu={handleContextMenu}
			onauxclick={handleAuxClick}
			ontouchstart={handleTouchStart}
			ontouchend={handleTouchEnd}
			ontouchmove={handleTouchMove}
			ontouchcancel={handleTouchCancel}
			onpointerdown={handlePointerDown}
			onpointerup={handlePointerUp}
			onpointerenter={handlePointerEnter}
			onpointerleave={handlePointerLeave}
			onpointermove={handlePointerMove}
			onpointercancel={handlePointerCancel}
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
					{iconVariant}
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

		&:focus,
		&:focus-visible {
			outline: var(--svelte-ui-focus-outline-inner);
			outline-offset: var(--svelte-ui-focus-outline-offset-inner);
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
