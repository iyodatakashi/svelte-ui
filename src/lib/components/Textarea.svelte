<!-- Textarea.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import { t } from '$lib/i18n';
	import { convertToHtml, convertToHtmlWithLink } from '$lib/utils/formatText';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { IconVariant } from '$lib/types/icon';

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
		minHeight = null,
		maxHeight = null,
		inline = false,
		focusStyle = 'outline',
		fullWidth = false,
		fullHeight = false,
		width = null,
		rounded = false,
		customStyle = '',

		// 状態/動作
		disabled = false,
		autoResize = true,
		resizable = false,
		clearable = false,
		clearButtonAriaLabel = t('input.clear'),
		readonly = false,
		required = false,
		iconVariant = 'outlined',
		linkify = false,

		// フォーカスイベント
		onfocus = () => {}, // No params for type inference
		onblur = () => {}, // No params for type inference

		// キーボードイベント
		onkeydown = () => {}, // No params for type inference
		onkeyup = () => {}, // No params for type inference

		// マウスイベント
		onclick = () => {}, // No params for type inference
		onmousedown = () => {}, // No params for type inference
		onmouseup = () => {}, // No params for type inference
		onmouseenter = () => {}, // No params for type inference
		onmouseleave = () => {}, // No params for type inference
		onmouseover = () => {}, // No params for type inference
		onmouseout = () => {}, // No params for type inference
		oncontextmenu = () => {}, // No params for type inference
		onauxclick = () => {}, // No params for type inference

		// タッチイベント
		ontouchstart = () => {}, // No params for type inference
		ontouchend = () => {}, // No params for type inference
		ontouchmove = () => {}, // No params for type inference
		ontouchcancel = () => {}, // No params for type inference

		// ポインターイベント
		onpointerdown = () => {}, // No params for type inference
		onpointerup = () => {}, // No params for type inference
		onpointerenter = () => {}, // No params for type inference
		onpointerleave = () => {}, // No params for type inference
		onpointermove = () => {}, // No params for type inference
		onpointercancel = () => {}, // No params for type inference

		// 入力イベント
		onchange = () => {}, // No params for type inference
		oninput = () => {}, // No params for type inference

		// その他
		...restProps
	}: {
		// 基本プロパティ
		name?: string;
		value: string;
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
		maxHeight?: string | number | null;
		inline?: boolean;
		focusStyle?: 'background' | 'outline' | 'none';
		fullWidth?: boolean;
		fullHeight?: boolean;
		width?: string | number | null;
		rounded?: boolean;
		customStyle?: string;

		// 状態/動作
		disabled?: boolean;
		autoResize?: boolean;
		resizable?: boolean;
		clearable?: boolean;
		clearButtonAriaLabel?: string;
		readonly?: boolean;
		required?: boolean;
		iconVariant?: IconVariant;
		linkify?: boolean;

		// フォーカスイベント
		onfocus?: Function; // No params for type inference
		onblur?: Function; // No params for type inference

		// キーボードイベント
		onkeydown?: Function; // No params for type inference
		onkeyup?: Function; // No params for type inference

		// マウスイベント
		onclick?: Function; // No params for type inference
		onmousedown?: Function; // No params for type inference
		onmouseup?: Function; // No params for type inference
		onmouseenter?: Function; // No params for type inference
		onmouseleave?: Function; // No params for type inference
		onmouseover?: Function; // No params for type inference
		onmouseout?: Function; // No params for type inference
		oncontextmenu?: Function; // No params for type inference
		onauxclick?: Function; // No params for type inference

		// タッチイベント
		ontouchstart?: Function; // No params for type inference
		ontouchend?: Function; // No params for type inference
		ontouchmove?: Function; // No params for type inference
		ontouchcancel?: Function; // No params for type inference

		// ポインターイベント
		onpointerdown?: Function; // No params for type inference
		onpointerup?: Function; // No params for type inference
		onpointerenter?: Function; // No params for type inference
		onpointerleave?: Function; // No params for type inference
		onpointermove?: Function; // No params for type inference
		onpointercancel?: Function; // No params for type inference

		// 入力イベント
		onchange?: (value: string) => void;
		oninput?: (value: string) => void;

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
		value = '';
		ref?.focus();
		onchange?.('');
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

	// キーボードイベント
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

	// min-height用CSS変数の上書きスタイル
	// デフォルト値は variables.scss の --svelte-ui-textarea-min-height に委譲し、
	// props で minHeight が指定されたときだけ上書きする
	const minHeightVarStyle = $derived(
		!inline && minHeight != null ? `--svelte-ui-textarea-min-height: ${minHeight}px;` : ''
	);

	const maxHeightStyle = $derived(getStyleFromNumber(maxHeight));
	const widthStyle = $derived(getStyleFromNumber(width));

	// HTML表示用の値（autoResize時の高さ調整用）
	const htmlValue = $derived.by(() => {
		if (value !== '') {
			let html = convertToHtml(value) as string;
			// 最後の行が空だったら空白を追加（高さ調整のため）
			const lines = html.split('<br />');
			if (lines.length > 0 && lines[lines.length - 1] === '') {
				html += '&nbsp;';
			}
			return html;
		} else {
			// inline かつ value が空のとき、placeholder がなければ
			// 1行分の高さを確保するためにダミーの &nbsp; を入れる
			// （placeholder がある場合は :empty::before でプレースホルダを表示したいので空にしておく）
			if (inline && !placeholder) {
				return '&nbsp;';
			}
			return '';
		}
	});

	// URLをリンク化した表示用HTML（クリック検出用オーバーレイで使用）
	const linkHtmlValue = $derived.by(() => {
		if (!linkify || value === '') {
			return '';
		}
		const result = convertToHtmlWithLink(value);
		return typeof result === 'string' ? result : String(result ?? '');
	});
</script>

<div
	class="textarea
	textarea--focus-{focusStyle}"
	class:textarea--inline={inline}
	class:textarea--linkify={linkify}
	class:textarea--full-width={fullWidth}
	class:textarea--full-height={fullHeight}
	class:textarea--auto-resize={autoResize}
	class:textarea--clearable={clearable}
	class:textarea--rounded={rounded}
	class:textarea--disabled={disabled}
	class:textarea--readonly={readonly}
	class:textarea--focused={isFocused}
	data-testid="textarea"
	style={!inline ? `max-height: ${maxHeightStyle};` : ''}
>
	<!-- autoResize時の表示用要素（HTMLレンダリングで高さ調整） -->
	<div
		class="textarea__display-text"
		data-placeholder={placeholder}
		style="{minHeightVarStyle} {customStyle}"
	>
		{@html htmlValue}
	</div>
	<div class="textarea__input">
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
			style="width: {widthStyle}; {minHeightVarStyle} {customStyle}"
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
					ariaLabel={clearButtonAriaLabel}
					color="var(--svelte-ui-textarea-text-color)"
					onclick={(event) => {
						event.stopPropagation();
						clear();
					}}
					tabindex={-1}
					iconFilled={true}
					{iconVariant}
					fontSize={18}>cancel</IconButton
				>
			</div>
		{/if}
	</div>
	{#if linkify}
		<div class="textarea__link-text" style="{minHeightVarStyle} {customStyle}">
			{@html linkHtmlValue}
		</div>
	{/if}
</div>

<style>
	/* =============================================
 * 基本構造・レイアウト
 * ============================================= */
	.textarea {
		display: block;
		position: relative;
		width: auto;
		max-width: 100%;

		&.textarea--full-height {
			height: 100%;
		}
	}

	.textarea__input {
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
	.textarea__display-text,
	.textarea__link-text {
		display: block;
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

	/* クリック可能なリンク用オーバーレイ */
	.textarea__link-text {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: inherit;
		pointer-events: none;
		z-index: 1;
	}

	.textarea__link-text :global(a) {
		pointer-events: auto;
		text-decoration: underline;
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

		&:not(.resizable) {
			resize: none;
		}
	}

	.textarea--clearable .textarea__clear-button {
		position: absolute;
		top: var(--svelte-ui-textarea-icon-top);
		right: 4px;
		opacity: 0;
		transition: var(--svelte-ui-transition-duration);
	}

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.textarea--full-width {
		width: 100%;
	}

	.textarea--auto-resize {
		textarea {
			overflow-y: auto;
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
			padding-right: var(--svelte-ui-textarea-icon-space);
		}
	}

	@media (hover: hover) {
		.textarea--clearable:hover .textarea__clear-button {
			opacity: 1;
		}
	}

	@media (hover: none) {
		.textarea--clearable .textarea__clear-button {
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
	.textarea--focus-outline textarea:focus {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.textarea--focus-background textarea:focus {
		background: var(--svelte-ui-hover-overlay);
		outline: none;
	}

	.textarea--focus-none textarea:focus {
		outline: none;
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
	 * 表示切り替え（フォーカス時・非inline）
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

	/* linkify=true かつ非 inline のときは、display-text は常に非表示（レイアウトだけ保持） */
	.textarea--linkify:not(.textarea--inline) .textarea__display-text {
		opacity: 0;
	}

	/* フォーカス時はリンク用オーバーレイも非表示にして（display:none）、リンクが反応しないようにする */
	.textarea--focused .textarea__link-text {
		display: none;
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.textarea:not(.textarea--inline) {
		.textarea__display-text,
		.textarea__link-text,
		textarea {
			min-height: var(--svelte-ui-textarea-min-height);
			padding: var(--svelte-ui-textarea-padding);
		}

		textarea {
			position: static;
			background-color: var(--svelte-ui-textarea-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-textarea-border-color);
			border: none;
			border-radius: var(--svelte-ui-textarea-border-radius);
			color: var(--svelte-ui-textarea-text-color);
		}

		&.textarea--clearable {
			textarea {
				padding-right: var(--svelte-ui-textarea-icon-space);
			}
		}
	}

	/* linkify=true かつフォーカスがないときは、textarea のテキストカラーだけ透明にして二重描画を防ぐ
	 * placeholder の色は textarea::placeholder 側で指定しているため、この指定の影響を受けない
	 */
	.textarea--linkify:not(.textarea--focused) textarea {
		color: transparent;
		caret-color: transparent;
		text-shadow: none;
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

		&.textarea--clearable .textarea__clear-button {
			top: var(--svelte-ui-textarea-icon-top-inline);
		}
	}

	/* inline + linkify のときは、display-text を常に隠し、textarea を常に表示 */
	.textarea--inline.textarea--linkify .textarea__display-text {
		opacity: 0;
	}

	.textarea--inline.textarea--linkify textarea {
		opacity: 1;
	}
</style>
