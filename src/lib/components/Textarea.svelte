<!-- Textarea.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import { getStyleFromNumber } from '$lib/utils/style';
	import { t } from '$lib/i18n';
	import { convertToHtml, convertToHtmlWithLink } from '$lib/utils/formatText';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import type { IconVariant } from '$lib/types/icon';
	import type {
		FocusHandler,
		KeyboardHandler,
		MouseHandler,
		TouchHandler,
		PointerHandler
	} from '$lib/types/callbackHandlers';
	import type { FocusStyle } from '$lib/types/propOptions';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type TextareaProps = {
		// 基本プロパティ
		name?: string;
		value: string | null | undefined;
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
		minHeight?: string | number | null;
		maxHeight?: string | number | null;
		inline?: boolean;
		focusStyle?: FocusStyle;
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
		onfocus?: FocusHandler;
		onblur?: FocusHandler;

		// キーボードイベント
		onkeydown?: KeyboardHandler;
		onkeyup?: KeyboardHandler;

		// マウスイベント
		onclick?: MouseHandler;
		onmousedown?: MouseHandler;
		onmouseup?: MouseHandler;
		onmouseenter?: MouseHandler;
		onmouseleave?: MouseHandler;
		onmouseover?: MouseHandler;
		onmouseout?: MouseHandler;
		oncontextmenu?: MouseHandler;
		onauxclick?: MouseHandler;

		// タッチイベント
		ontouchstart?: TouchHandler;
		ontouchend?: TouchHandler;
		ontouchmove?: TouchHandler;
		ontouchcancel?: TouchHandler;

		// ポインターイベント
		onpointerdown?: PointerHandler;
		onpointerup?: PointerHandler;
		onpointerenter?: PointerHandler;
		onpointerleave?: PointerHandler;
		onpointermove?: PointerHandler;
		onpointercancel?: PointerHandler;

		// 入力イベント
		onchange?: (value: string) => void;
		oninput?: (value: string) => void;

		// その他
		[key: string]: any;
	};

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
	}: TextareaProps = $props();

	let textareaRef: HTMLTextAreaElement | null = null;
	let containerRef: HTMLDivElement | null = null;
	let displayTextRef: HTMLDivElement | null = $state(null);
	let linkTextRef: HTMLDivElement | null = $state(null);
	let isFocused: boolean = $state(false);
	let resizeObserver: ResizeObserver | null = null;

	// =========================================================================
	// Methods
	// =========================================================================
	const clear = (): void => {
		if (disabled || readonly) return;
		value = '';
		textareaRef?.focus();
		onchange?.('');
	};

	// 外部からフォーカスを当てる（キャレットを先頭に移動）
	export const focus = () => {
		if (textareaRef) {
			textareaRef.focus();
			textareaRef.setSelectionRange(0, 0);
			textareaRef.scrollTop = 0;
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

	// スクロール同期
	const handleScroll = () => {
		if (!textareaRef) return;
		const scrollTop = textareaRef.scrollTop;
		if (displayTextRef) {
			displayTextRef.scrollTop = scrollTop;
		}
		if (linkify && linkTextRef) {
			linkTextRef.scrollTop = scrollTop;
		}
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const minHeightStyle = $derived(getStyleFromNumber(minHeight));
	const maxHeightStyle = $derived(getStyleFromNumber(maxHeight));
	const widthStyle = $derived(getStyleFromNumber(width));

	// HTML表示用の値（autoResize時の高さ調整用）
	const htmlValue = $derived.by(() => {
		const normalizedValue = value ?? '';
		if (normalizedValue !== '') {
			const converted = convertToHtml(normalizedValue);
			const html = String(converted ?? '');
			// 最後の行が空だったら空白を追加（高さ調整のため）
			const lines = html.split('<br />');
			if (lines.length > 0 && lines[lines.length - 1] === '') {
				return html + '&nbsp;';
			}
			return html;
		} else {
			// inline かつ value が空のとき
			// 1行分の高さを確保するためにダミーの &nbsp; を入れる
			if (inline) {
				return '&nbsp;';
			}
			return '';
		}
	});

	// URLをリンク化した表示用HTML（クリック検出用オーバーレイで使用）
	const linkHtmlValue = $derived.by(() => {
		const normalizedValue = value ?? '';
		if (!linkify || normalizedValue === '') {
			return '';
		}
		const result = convertToHtmlWithLink(normalizedValue);
		return String(result ?? '');
	});

	// display-text / link-text とコンポーネント全体のサイズ同期を解除
	const cleanupSizeSync = () => {
		if (resizeObserver) {
			resizeObserver.disconnect();
			resizeObserver = null;
		}
		if (containerRef) {
			containerRef.style.removeProperty('height');
			// width は width プロップで制御されるため、ここでは削除しない
		}
		if (displayTextRef) {
			displayTextRef.style.removeProperty('height');
			displayTextRef.style.removeProperty('width');
		}
		if (linkTextRef) {
			linkTextRef.style.removeProperty('height');
			linkTextRef.style.removeProperty('width');
		}
	};

	// textarea のサイズに合わせてコンポーネント全体 / display-text / link-text のサイズを同期
	// forceWidth=true のときは、width プロップの有無に関係なく textarea の幅で上書きする
	const syncSizeFromTextarea = (forceWidth: boolean = false) => {
		if (!containerRef || !displayTextRef || !textareaRef) return;
		const rect = textareaRef.getBoundingClientRect();
		const height = rect.height;
		const width = rect.width;
		if (!height || !width) return;

		// コンポーネント全体の高さは textarea に合わせる
		containerRef.style.height = `${height}px`;

		// 幅は、初期状態では width プロップを優先し、
		// ユーザーがリサイズ（ResizeObserver 経由）したあとは textarea の幅で上書きする
		if (forceWidth || !widthStyle) {
			containerRef.style.width = `${width}px`;
		}

		// display-text / link-text はコンテナにフィットさせる
		displayTextRef.style.height = '100%';
		displayTextRef.style.width = '100%';
		if (linkTextRef) {
			linkTextRef.style.height = '100%';
			linkTextRef.style.width = '100%';
		}
	};

	// resizable=true のときに textarea のサイズ変更を監視
	const setupResizeObserver = () => {
		if (!textareaRef) return;

		// resizable でなければ監視は不要
		if (!resizable) {
			if (resizeObserver) {
				resizeObserver.disconnect();
				resizeObserver = null;
			}
			return;
		}

		// 既存のオブザーバがあれば一旦解除
		if (resizeObserver) {
			resizeObserver.disconnect();
			resizeObserver = null;
		}

		resizeObserver = new ResizeObserver(() => {
			// ユーザーのリサイズ後は textarea の幅でコンテナ幅を上書きする
			syncSizeFromTextarea(true);
		});
		resizeObserver.observe(textareaRef);
	};

	// autoResize=false のとき、コンポーネント全体のサイズに display-text / link-text を合わせる
	$effect(() => {
		if (!containerRef || !displayTextRef || !textareaRef) {
			cleanupSizeSync();
			return;
		}

		// autoResize=true のときは、サイズ同期を行わず従来の挙動を維持
		if (autoResize) {
			cleanupSizeSync();
			return;
		}

		// 初期同期
		syncSizeFromTextarea();
		// resizable=true のときにのみ ResizeObserver をセットアップ
		setupResizeObserver();

		return () => {
			cleanupSizeSync();
		};
	});
</script>

<div
	bind:this={containerRef}
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
	style="width: {widthStyle}; {!inline ? `max-height: ${maxHeightStyle};` : ''}"
>
	<div
		bind:this={displayTextRef}
		class="textarea__display-text"
		style="min-height: {minHeightStyle}; max-height: {maxHeightStyle}; {customStyle}"
	>
		{@html htmlValue}
	</div>
	<div class="textarea__wrapper">
		<textarea
			{id}
			{name}
			bind:value
			bind:this={textareaRef}
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
			style="min-height: {minHeightStyle}; {customStyle}"
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
			onscroll={handleScroll}
			{...textareaAttributes}
			{...restProps}
		></textarea>
	</div>
	{#if linkify}
		<div
			bind:this={linkTextRef}
			class="textarea__link-text"
			style="min-height: {minHeightStyle}; max-height: {maxHeightStyle}; {customStyle}"
		>
			{@html linkHtmlValue}
		</div>
	{/if}
	<!-- クリアボタン -->
	{#if clearable && !disabled && !readonly}
		<div class="textarea__clear-button">
			<IconButton
				ariaLabel={clearButtonAriaLabel}
				color="var(--svelte-ui-text-color)"
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

	.textarea__wrapper {
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
	textarea {
		width: 100%;
		height: auto;
		min-height: var(--svelte-ui-textarea-min-height);
		padding: var(--svelte-ui-textarea-padding);
		background-color: var(--svelte-ui-textarea-bg);
		box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-textarea-border-color);
		border: none;
		border-radius: var(--svelte-ui-textarea-border-radius);
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		&:not(.resizable) {
			resize: none;
		}
	}

	.textarea__display-text,
	.textarea__link-text {
		display: block;
		width: 100%;
		min-height: var(--svelte-ui-textarea-min-height);
		padding: var(--svelte-ui-textarea-padding);
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
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-width: none; /* Firefox */
		-ms-overflow-style: none; /* IE and Edge */

		&::-webkit-scrollbar {
			display: none; /* Chrome, Safari, Opera */
		}

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
		pointer-events: none;
		z-index: 1;
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
			height: 100%;
			overflow-y: auto;
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
		/* Match Input behavior: readonly fields keep the same background,
		 * but use a default cursor to indicate non-editable. */
		cursor: default;
	}

	/* =============================================
	 * 表示切り替え
	 * ============================================= */
	.textarea:not(.textarea--focused) textarea {
		color: transparent;
		caret-color: transparent;
		text-shadow: none;
	}

	.textarea--focused {
		.textarea__display-text {
			opacity: 0;
		}
	}

	/* =============================================
	 * 機能バリエーション
	 * ============================================= */
	/* clearable */
	.textarea--clearable {
		textarea,
		.textarea__display-text,
		.textarea__link-text {
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

	/* linkify */
	.textarea--linkify {
		.textarea__display-text {
			opacity: 0;
		}

		.textarea__link-text :global(a) {
			pointer-events: auto;
		}

		&.textarea--focused {
			.textarea__link-text {
				opacity: 0;
			}

			:global(a) {
				pointer-events: none;
			}
		}
	}

	/* =============================================
 * デザインバリエーション
 * ============================================= */
	/* rounded */
	.textarea--rounded:not(.textarea--inline) {
		textarea {
			border-radius: var(--svelte-ui-textarea-border-radius-rounded);
		}
	}

	/* inline */
	.textarea--inline {
		.textarea__display-text,
		.textarea__link-text,
		textarea {
			min-height: auto;
			padding-top: inherit;
			padding-bottom: inherit;
			padding-left: inherit;
		}

		textarea {
			padding: inherit;
			background: transparent;
			box-shadow: none;
			border-radius: 0;
			font-size: inherit;
			font-weight: inherit;
			color: inherit;
			line-height: inherit;
			text-align: inherit;
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
		}

		&.textarea--clearable .textarea__clear-button {
			top: var(--svelte-ui-textarea-icon-top-inline);
		}
	}
</style>
