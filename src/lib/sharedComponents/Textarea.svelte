<!-- Textarea.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import { getStyleFromNumber } from '#lib/utils/style';
	import { t } from '#lib/models/i18n/i18n';
	import { escapeHtml, convertToLink } from '#lib/utils/formatText';
	import type { TextareaProps } from '#lib/models/field/field.types';

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

		// スタイル/レイアウト
		rows = 3,
		minHeight = null,
		maxHeight = null,
		inline = false,
		focusStyle = 'outline',
		width = null,
		fullWidth = false,
		fullHeight = false,
		rounded = false,
		customStyle = '',

		// アイコン関連
		clearButtonAriaLabel = t('input.clear'),
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = 24,
		iconVariant = 'outlined',

		// 状態/動作
		disabled = false,
		autoResize = true,
		resizable = false,
		clearable = false,
		readonly = false,
		required = false,
		linkify = false,

		// ARIA/アクセシビリティ
		ariaLabel,

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

	// =========================================================================
	// $effect
	// =========================================================================
	// resizable でユーザーが textarea をドラッグしてサイズを変えたら、箱をその大きさに合わせる
	// （autoResize=true では高さが中身で決まるため対象外）
	$effect(() => {
		if (!textareaRef || autoResize || !resizable) return;

		const observer = new ResizeObserver(syncSizeFromTextarea);
		observer.observe(textareaRef);

		return () => {
			observer.disconnect();
			containerRef?.style.removeProperty('height');
		};
	});

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

	// textarea は箱いっぱいに広がるので、ドラッグで付いたインラインの大きさをそのまま箱に移す
	const syncSizeFromTextarea = () => {
		if (!containerRef || !textareaRef) return;
		const { width, height } = textareaRef.style;
		if (height) containerRef.style.height = height;
		if (width) containerRef.style.width = width;
	};

	// =========================================================================
	// $derived
	// =========================================================================
	// --------------------------------
	// display & link value
	// --------------------------------
	const hasDisplayValue = $derived(
		value !== null && value !== undefined && !(typeof value === 'string' && value === '')
	);

	// HTML表示用の値（pre-wrap で表示するため HTML エスケープのみ行う）
	const displayValue = $derived.by(() => {
		const normalizedValue = value ?? '';
		if (normalizedValue !== '') {
			const html = escapeHtml(normalizedValue);
			// 末尾が改行のとき、pre-wrap では最終行の高さが確保されず textarea と1行分ずれるためダミー空白を足す
			return normalizedValue.endsWith('\n') ? html + '&nbsp;' : html;
		}
		// 値が空のとき: placeholder があればその幅・高さを確保して表示、なければ inline 時のみ &nbsp;
		return placeholder ? escapeHtml(placeholder) : inline ? '&nbsp;' : '';
	});

	// URLをリンク化した表示用HTML（クリック検出用オーバーレイで使用）
	const linkHtmlValue = $derived.by(() => {
		const normalizedValue = value ?? '';
		if (!linkify || normalizedValue === '') {
			return '';
		}
		return convertToLink(escapeHtml(normalizedValue));
	});

	// --------------------------------
	// style from number
	// --------------------------------
	// minHeight 未指定時は rows から算出（rows を効かせる）
	const minHeightStyle = $derived(
		minHeight != null
			? getStyleFromNumber(minHeight)
			: `calc(${rows - 1} * var(--svelte-ui-textarea-line-height) + var(--svelte-ui-textarea-min-height))`
	);
	const maxHeightStyle = $derived(getStyleFromNumber(maxHeight));
	const widthStyle = $derived(getStyleFromNumber(width));
	// 箱（ルート）は border-box、display-text は箱の content box に置くので縦 padding を差し引く
	const innerMinHeightStyle = $derived(
		`calc(${minHeightStyle} - var(--internal-textarea-vertical-padding))`
	);
	const innerMaxHeightStyle = $derived(
		maxHeightStyle
			? `calc(${maxHeightStyle} - var(--internal-textarea-vertical-padding))`
			: undefined
	);
	// style: ディレクティブは style 属性に勝つため、幅・最大高さも同じ文字列に混ぜる
	const boxStyle = $derived(
		[
			customStyle,
			widthStyle ? `width: ${widthStyle}` : '',
			!inline && maxHeightStyle ? `max-height: ${maxHeightStyle}` : ''
		]
			.filter(Boolean)
			.join('; ')
	);
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
	class:textarea--max-height={maxHeight != null && !inline}
	class:textarea--clearable={clearable}
	class:textarea--rounded={rounded}
	class:textarea--disabled={disabled}
	class:textarea--readonly={readonly}
	class:textarea--focused={isFocused}
	data-testid="textarea"
	style={boxStyle}
>
	<div
		bind:this={displayTextRef}
		class="textarea__display-text"
		class:textarea__display-text--placeholder={!hasDisplayValue}
		style:min-height={innerMinHeightStyle}
		style:max-height={innerMaxHeightStyle}
	>
		{@html displayValue}
	</div>
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
		aria-label={ariaLabel}
		{tabindex}
		{autocomplete}
		{wrap}
		{spellcheck}
		{autocapitalize}
		class:resizable
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
		{...restProps}
	></textarea>
	{#if linkify}
		<div bind:this={linkTextRef} class="textarea__link-text">
			{@html linkHtmlValue}
		</div>
	{/if}
	<!-- クリアボタン -->
	{#if clearable && !disabled && !readonly}
		<div class="textarea__clear-button">
			<IconButton
				ariaLabel={clearButtonAriaLabel}
				color="var(--svelte-ui-textarea-icon-color)"
				onclick={(event) => {
					event.stopPropagation();
					clear();
				}}
				tabindex={-1}
				{iconFilled}
				{iconVariant}
				fontSize={18}>cancel</IconButton
			>
		</div>
	{/if}
</div>

<style lang="scss">
	@use '#lib/assets/styles/component-base' as base;

	@include base.box-sizing;

	/* =============================================
 * 基本構造・レイアウト
 * ============================================= */
	.textarea {
		display: block;
		position: relative;
		width: auto;
		max-width: 100%;
		overflow: hidden;
		--internal-textarea-vertical-padding: calc(
			var(--svelte-ui-textarea-min-height) - var(--svelte-ui-textarea-line-height)
		);
		padding: var(--svelte-ui-textarea-padding);
		background-color: var(--svelte-ui-textarea-bg);
		box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-textarea-border-color);
		border-radius: var(--svelte-ui-textarea-border-radius);

		&.textarea--full-height {
			height: 100%;
		}
	}

	/* 文字の層を 3 つ重ねる。どの層も、文字が並ぶ領域（位置・幅・折り返し）を一致させる。
	   - display-text: 通常フロー。箱の content box に置き、箱の高さを決める
	   - textarea / link-text: 箱の padding box を覆い、余白は padding: inherit で箱から受け取る。
	     スクロールする要素が余白ごと箱を覆うので、スクロールバーは箱の端に出る */
	textarea,
	.textarea__link-text {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: inherit;
		border-radius: inherit;
	}

	/* =============================================
	 * 基本コンポーネント
	 * ============================================= */
	textarea {
		background-color: transparent;
		border: none;
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		/* 自動入力時はブラウザが背景色と文字色を !important で変えるため、
		   背景は transition で変化を止め、文字色は text-fill-color で戻す */
		&:-webkit-autofill {
			transition: background-color 5000s ease-in-out 0s;
			-webkit-text-fill-color: var(--svelte-ui-text-color);
			caret-color: var(--svelte-ui-text-color);
		}

		&:not(.resizable) {
			resize: none;
		}
	}

	.textarea__display-text,
	.textarea__link-text {
		display: block;
		background: transparent;
		border: none;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		word-break: inherit;
		opacity: 1;
		transition: none;
		overflow-y: auto;
		overflow-x: hidden;
		/* スクロールバーは見せないが、textarea と同じ幅を確保して折り返し位置を揃える */
		scrollbar-color: transparent transparent;
		/* textarea の UA デフォルト(overflow-wrap: break-word)に合わせ、長い連続文字列の折り返し位置を一致させる */
		overflow-wrap: break-word;

		&::before {
			content: '';
		}

		&:empty::before {
			content: attr(data-placeholder);
		}
	}

	/* textarea の white-space: pre-wrap に合わせて空白・改行を同じルールで扱う */
	.textarea__display-text {
		width: 100%;
		min-height: var(--svelte-ui-textarea-line-height);
		max-height: 100%;
		padding: 0;
		white-space: pre-wrap;
	}

	/* クリック可能なリンク用オーバーレイ */
	.textarea__link-text {
		white-space: pre-wrap;
		pointer-events: none;
		z-index: 1;
	}

	/* ボタンを右から 4px に置き、残りの領域を内側に確保する */
	.textarea.textarea--clearable {
		padding-right: 4px;
	}

	/* 残りのボタンの列は、どの文字の層にも右の透明な border として確保する。
	   textarea / link-text の padding は箱から受け取るため、そこに足し合わせることができない。
	   border はスクロール領域の外になるので、スクロールバーはボタンの列の左に出る */
	.textarea--clearable .textarea__display-text,
	.textarea--clearable textarea,
	.textarea--clearable .textarea__link-text {
		border-right: calc(var(--svelte-ui-textarea-icon-space) - 4px) solid transparent;
	}

	.textarea--clearable .textarea__clear-button {
		position: absolute;
		top: calc(
			var(--svelte-ui-textarea-icon-top) -
				(var(--svelte-ui-textarea-min-height) - var(--svelte-ui-textarea-line-height)) / 2
		);
		padding-top: inherit;
		right: 0;
		padding-right: inherit;
		opacity: 0;
		transition: var(--svelte-ui-transition-duration);
	}

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.textarea--full-width {
		width: 100%;
	}

	/* autoResize=false では中身で伸ばさない。display-text は rows / minHeight の高さ（min-height）に留め、
	   箱に高さがあるとき（fullHeight・resizable でのドラッグ）はその高さまで広げる */
	.textarea:not(.textarea--auto-resize) {
		display: flex;
		flex-direction: column;

		.textarea__display-text {
			height: 0;
			flex-grow: 1;
		}
	}

	.textarea--auto-resize {
		textarea {
			/* maxHeight 未指定時は高さが常に中身と一致するため、丸め由来の 1px オーバーフローで
			   スクロールバーが出ないよう hidden にする。maxHeight 指定時のみ auto でスクロールさせる */
			overflow-y: hidden;
		}

		&.textarea--max-height textarea {
			overflow-y: auto;
		}
	}

	/* =============================================
 * プレースホルダー・テキスト表示
 * ============================================= */
	textarea::placeholder,
	.textarea__display-text:empty::before,
	.textarea__display-text--placeholder {
		color: var(--svelte-ui-textarea-placeholder-color);
	}

	/* =============================================
 * フォーカス効果バリエーション
 * ============================================= */
	textarea:focus {
		outline: none;
	}

	/* textarea は箱の padding box を覆うので、箱全体を囲む枠・背景を textarea に描ける */
	.textarea--focus-outline.textarea--focused textarea {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.textarea--focus-background.textarea--focused textarea {
		background: var(--svelte-ui-hover-overlay);
	}

	/* =============================================
 * 状態管理（disabled, readonly等）
 * ============================================= */
	.textarea--readonly textarea {
		cursor: default;
		pointer-events: none;
	}

	.textarea--disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		textarea {
			cursor: not-allowed;
		}
	}

	/* =============================================
	 * 表示切り替え
	 * ============================================= */
	/* 非フォーカス時: textarea要素自体を不可視化（枠線・背景はルートにあるため display-text のみ表示） */
	.textarea:not(.textarea--focused) textarea {
		opacity: 0;
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
		border-radius: var(--svelte-ui-textarea-border-radius-rounded);
	}

	/* inline */
	.textarea--inline {
		--internal-textarea-vertical-padding: 0px;
		padding: 0;
		background-color: transparent;
		box-shadow: none;
		border-radius: 0;

		.textarea__display-text {
			min-height: auto;
		}

		textarea {
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
