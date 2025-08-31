<!-- Combobox.svelte -->

<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Input from './Input.svelte';
	import Popup from './Popup.svelte';
	import { announceSelection } from '../utils/accessibility';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// 基本プロパティ
		name,
		value = $bindable(),
		options = [],

		// HTML属性系
		inputAttributes,
		id = `combobox-${Math.random().toString(36).substring(2, 15)}`,
		tabindex = null,
		maxlength = null,

		// スタイル/レイアウト
		customStyle = '',
		variant = 'default',
		focusStyle = 'border',
		placeholder = '選択してください',
		fullWidth = false,
		minWidth = variant === 'inline' ? null : 120,
		maxWidth = null,
		rounded = false,

		// 状態/動作
		disabled = false,
		readonly = false,
		required = false,
		filterable = true,

		// 入力イベント
		onchange = () => {},
		oninput = () => {},

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

		// その他
		...restProps
	}: {
		// 基本プロパティ
		name?: string;
		value: string | number | null | undefined;
		options: (string | number | null)[];

		// HTML属性系
		inputAttributes?: HTMLInputAttributes | undefined;
		id?: string | null;
		tabindex?: number | null;
		maxlength?: number | null;

		// スタイル/レイアウト
		customStyle?: string;
		variant?: 'default' | 'inline';
		focusStyle?: 'background' | 'border' | 'none';
		placeholder?: string;
		fullWidth?: boolean;
		minWidth?: number | null;
		maxWidth?: number | null;
		rounded?: boolean;

		// 状態/動作
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		filterable?: boolean;

		// 入力イベント
		onchange?: (value: any) => void;
		oninput?: (value: any) => void;

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

		// その他
		[key: string]: any;
	} = $props();

	let searchTerm = $state('');
	let inputRef = $state<any>();
	let listElement = $state<HTMLDivElement>();
	let comboboxElement = $state<HTMLDivElement>();
	let popupRef = $state<any>();
	let highlightedIndex = $state(-1);
	let isFocused = $state(false);
	let inputValue = $state('');
	let comboboxRef = $state<HTMLDivElement>();

	// 各要素のIDを生成
	const inputId = `${id}-input`;
	const listboxId = `${id}-listbox`;

	// =========================================================================
	const isDisabled = $derived(disabled || readonly);

	// =========================================================================
	// $effect
	// =========================================================================
	// inputValueとvalueの同期
	$effect(() => {
		if (searchTerm !== '') {
			inputValue = searchTerm;
		} else {
			inputValue = value !== null && value !== undefined ? String(value) : '';
		}
	});

	// =========================================================================
	// Methods
	// =========================================================================
	// オプションを選択
	const selectOption = (option: string | number | null) => {
		value = option;
		searchTerm = '';
		popupRef?.close();
		highlightedIndex = -1;
		isFocused = false;

		// inputValueも更新
		inputValue = option !== null && option !== undefined ? String(option) : '';

		// スクリーンリーダーアナウンス
		if (option !== null && option !== undefined) {
			announceSelection(String(option));
		}

		onchange?.(option);
	};

	// input要素のフォーカス/クリック時
	const handleInputFocus = (event: FocusEvent) => {
		if (isDisabled) return;

		isFocused = true;
		popupRef?.open();
		if (filterable) {
			searchTerm = value !== null && value !== undefined ? String(value) : '';
		}
		highlightedIndex = -1;
		onfocus(event);
	};

	// 入力変更ハンドラー
	const handleInput = (currentValue: string | number | undefined) => {
		if (isDisabled) return;
		const currentInputValue = String(currentValue || '');

		if (filterable) {
			searchTerm = currentInputValue;
		}

		// 数値として解析を試行し、失敗した場合は文字列として扱う
		const numericValue = Number(currentInputValue);
		value = !isNaN(numericValue) && currentInputValue !== '' ? numericValue : currentInputValue;

		highlightedIndex = -1;
		popupRef?.open();
		oninput?.(value);
	};

	// 値確定ハンドラー
	const handleChange = (currentValue: string | number | undefined) => {
		if (isDisabled) return;
		const inputValue = String(currentValue || '');
		const numericValue = Number(inputValue);
		const finalValue = !isNaN(numericValue) && inputValue !== '' ? numericValue : inputValue;
		onchange?.(finalValue);
	};
	const handleClick = (event: MouseEvent) => {
		if (isDisabled) return;
		// クリック時にもポップアップを開く
		if (!isFocused) {
			isFocused = true;
			popupRef?.open();
			if (filterable) {
				searchTerm = value !== null && value !== undefined ? String(value) : '';
			}
			highlightedIndex = -1;
		}
		// Inputにフォーカスを移す（外側クリック検出のため）
		inputRef?.focus();
		onclick?.(event);
	};

	const handleKeydown = (event: KeyboardEvent) => {
		if (isDisabled) return;
		onkeydown(event);
		// TODO: キーボードナビゲーション実装
		// ArrowDown, ArrowUp, Enter, Escape等の処理
	};

	const handleKeyup = (event: KeyboardEvent) => {
		if (isDisabled) return;
		onkeyup(event);
	};

	// マウスイベント
	const handleMouseDown = (event: MouseEvent) => {
		if (isDisabled) return;
		onmousedown?.(event);
	};

	const handleMouseUp = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseup?.(event);
	};

	const handleMouseEnter = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseenter?.(event);
	};

	const handleMouseLeave = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseleave?.(event);
	};

	const handleMouseOver = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseover?.(event);
	};

	const handleMouseOut = (event: MouseEvent) => {
		if (isDisabled) return;
		onmouseout?.(event);
	};

	const handleContextMenu = (event: MouseEvent) => {
		if (isDisabled) return;
		oncontextmenu?.(event);
	};

	const handleAuxClick = (event: MouseEvent) => {
		if (isDisabled) return;
		onauxclick?.(event);
	};

	// タッチイベント
	const handleTouchStart = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchstart?.(event);
	};

	const handleTouchEnd = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchend?.(event);
	};

	const handleTouchMove = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchmove?.(event);
	};

	const handleTouchCancel = (event: TouchEvent) => {
		if (isDisabled) return;
		ontouchcancel?.(event);
	};

	// ポインターイベント
	const handlePointerDown = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerdown?.(event);
	};

	const handlePointerUp = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerup?.(event);
	};

	const handlePointerEnter = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerenter?.(event);
	};

	const handlePointerLeave = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointerleave?.(event);
	};

	const handlePointerMove = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointermove?.(event);
	};

	const handlePointerCancel = (event: PointerEvent) => {
		if (isDisabled) return;
		onpointercancel?.(event);
	};

	// Popup が閉じられたときの処理
	const handlePopupClose = () => {
		isFocused = false;
		highlightedIndex = -1;
		// 検索語をリセット（Popupのアニメーション完了後）
		if (value !== null && value !== undefined) {
			searchTerm = '';
		}
	};
	const handleBlur = (event: FocusEvent) => {
		if (isDisabled) return;
		// フォーカスが外れたらisFocusedをfalseにする
		isFocused = false;
		// 少し遅延させてからポップアップを閉じる（オプション選択時の処理のため）
		setTimeout(() => {
			popupRef?.close();
		}, 100);
		onblur(event);
	};

	// =========================================================================
	// $derived
	// =========================================================================

	// フィルタリングされたオプション
	const filteredOptions = $derived.by(() => {
		if (!filterable || !searchTerm) return options;
		return options.filter((option) =>
			option === null ? false : String(option).toLowerCase().includes(searchTerm.toLowerCase())
		);
	});
</script>

<div
	bind:this={comboboxElement}
	{id}
	class="combobox"
	class:combobox--full-width={fullWidth}
	style="max-width: {maxWidth}px; min-width: {minWidth}px"
	role="combobox"
	aria-expanded={!!popupRef}
	aria-controls={listboxId}
	aria-haspopup="listbox"
	aria-owns={listboxId}
>
	<!-- Inputコンポーネントを使用 -->
	<Input
		bind:this={inputRef}
		bind:value={inputValue}
		{name}
		id={inputId}
		{customStyle}
		{variant}
		{focusStyle}
		{placeholder}
		{fullWidth}
		{disabled}
		{readonly}
		{required}
		{tabindex}
		{maxlength}
		{rounded}
		rightIcon={variant !== 'inline' ? 'arrow_drop_down' : undefined}
		onRightIconClick={handleClick}
		onfocus={handleInputFocus}
		onblur={handleBlur}
		onclick={handleClick}
		oninput={handleInput}
		onchange={handleChange}
		onkeydown={handleKeydown}
		onkeyup={handleKeyup}
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
		{inputAttributes}
		{...restProps}
		role="textbox"
		aria-autocomplete="list"
		aria-controls={listboxId}
	/>
	<!-- オプションリスト -->
	<Popup
		bind:this={popupRef}
		anchorElement={comboboxElement}
		position="bottom-left"
		focusTrap={false}
		onClose={handlePopupClose}
		margin={0}
		allowRepositioning={false}
	>
		<div
			bind:this={listElement}
			id={listboxId}
			class="combobox__options"
			role="listbox"
			aria-label="オプション一覧"
			aria-labelledby={inputId}
		>
			{#each filteredOptions as option, index}
				<div role="presentation">
					<button
						type="button"
						class="combobox__option"
						class:combobox__option--highlighted={index === highlightedIndex}
						class:combobox__option--selected={option === value}
						role="option"
						aria-selected={option === value}
						onmousedown={(event) => {
							event.preventDefault();
							event.stopPropagation();
							selectOption(option);
						}}
						onmouseenter={() => (highlightedIndex = index)}
					>
						{option ?? '（空の値）'}
					</button>
				</div>
			{:else}
				<div class="combobox__no-options">該当するオプションがありません</div>
			{/each}
		</div>
	</Popup>
</div>

<style>
	/* =============================================
 * 基本構造・レイアウト
 * ============================================= */
	.combobox {
		display: inline-block;
		position: relative;
		width: auto;
		max-width: 100%;
	}

	.combobox--full-width {
		width: 100%;
	}

	/* =============================================
 * ドロップダウンアイコン
 * ============================================= */

	/* =============================================
 * オプションリスト
 * ============================================= */
	.combobox__options {
		min-width: var(--svelte-ui-combobox-min-width);
		width: max-content;
		max-width: var(--svelte-ui-combobox-max-width);
		background: var(--svelte-ui-combobox-bg);
		border-radius: var(--svelte-ui-combobox-border-radius);
		max-height: var(--svelte-ui-combobox-options-max-height);
		overflow-y: auto;
		margin: 0;
		padding: 0;
	}

	.combobox__option {
		width: 100%;
		padding: var(--svelte-ui-combobox-option-padding);
		border: none;
		background-color: transparent;
		text-align: left;
		cursor: pointer;
		font-size: inherit;
		color: var(--svelte-ui-combobox-text-color);
		transition:
			background-color var(--svelte-ui-transition-duration) ease,
			filter var(--svelte-ui-transition-duration) ease;

		@media (hover: hover) {
			&:hover,
			&.combobox__option--highlighted {
				background-color: var(--svelte-ui-combobox-bg);
				filter: var(--svelte-ui-combobox-option-hover-filter);
			}
		}

		&.combobox__option--highlighted {
			background-color: var(--svelte-ui-combobox-bg);
			filter: var(--svelte-ui-combobox-option-hover-filter);
		}

		&.combobox__option--selected {
			background-color: var(--svelte-ui-combobox-option-selected-bg);
		}

		&.combobox__option--selected.combobox__option--highlighted {
			background-color: var(--svelte-ui-combobox-option-selected-bg);
		}

		&:focus,
		&:focus-visible {
			outline: var(--svelte-ui-focus-outline-inner);
			outline-offset: var(--svelte-ui-focus-outline-offset-inner);
		}
	}

	.combobox__no-options {
		padding: var(--svelte-ui-combobox-option-padding);
		font-size: inherit;
		color: var(--svelte-ui-combobox-no-options-color);
		font-style: italic;
		list-style: none;
	}
</style>
