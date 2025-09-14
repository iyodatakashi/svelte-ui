<!-- Combobox.svelte -->

<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import Input from './Input.svelte';
	import Popup from './Popup.svelte';
	import Icon from './Icon.svelte';
	import { announceSelection } from '../utils/accessibility';
	import { t } from '../i18n';
	import type { Option } from '../types/options';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// 基本プロパティ
		name,
		value = $bindable(),
		options = [] as Option[],

		// HTML属性系
		inputAttributes,
		id = `combobox-${Math.random().toString(36).substring(2, 15)}`,
		tabindex = null,
		maxlength = null,

		// スタイル/レイアウト
		customStyle = '',
		variant = 'default',
		focusStyle = 'outline',
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
		onchange = () => {}, // No params for type inference
		oninput = () => {}, // No params for type inference

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

		// その他
		...restProps
	}: {
		// 基本プロパティ
		name?: string;
		value: string | number | null | undefined;
		options: Option[];

		// HTML属性系
		inputAttributes?: HTMLInputAttributes | undefined;
		id?: string | null;
		tabindex?: number | null;
		maxlength?: number | null;

		// スタイル/レイアウト
		customStyle?: string;
		variant?: 'default' | 'inline';
		focusStyle?: 'background' | 'outline' | 'none';
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

	// =========================================================================
	// $effect
	// =========================================================================
	// inputValueとvalueの同期
	$effect(() => {
		if (searchTerm !== '') {
			inputValue = searchTerm;
		} else {
			// valueに対応するオプションのlabelを表示
			const selectedOption = options.find((option) => option.value === value);
			inputValue = selectedOption ? selectedOption.label : '';
		}
	});

	// =========================================================================
	// Methods
	// =========================================================================
	// オプションを選択
	const selectOption = (option: Option) => {
		value = option.value;
		searchTerm = '';
		popupRef?.close();
		highlightedIndex = -1;
		isFocused = false;

		// inputValueも更新
		inputValue = option.label;

		// スクリーンリーダーアナウンス
		if (option.value !== null && option.value !== undefined) {
			announceSelection(option.label);
		}

		onchange?.(option.value);
	};

	// input要素のフォーカス/クリック時
	const handleInputFocus = (event: FocusEvent) => {
		if (disabled) return;

		isFocused = true;
		popupRef?.open();
		if (filterable) {
			const selectedOption = options.find((option) => option.value === value);
			searchTerm = selectedOption ? selectedOption.label : '';
		}
		highlightedIndex = -1;
		onfocus(event);
	};

	// 入力変更ハンドラー
	const handleInput = (currentValue: string | number | undefined) => {
		if (disabled || readonly) return;
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
		if (disabled || readonly) return;
		const inputValue = String(currentValue || '');
		const numericValue = Number(inputValue);
		const finalValue = !isNaN(numericValue) && inputValue !== '' ? numericValue : inputValue;
		onchange?.(finalValue);
	};
	const handleClick = (event: MouseEvent) => {
		if (disabled) return;
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
		if (disabled) return;
		onkeydown(event);

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				if (!isFocused) {
					isFocused = true;
					popupRef?.open();
				}
				highlightedIndex = Math.min(highlightedIndex + 1, filteredOptions.length - 1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				if (!isFocused) {
					isFocused = true;
					popupRef?.open();
				}
				highlightedIndex = Math.max(highlightedIndex - 1, -1);
				break;
			case 'Enter':
				event.preventDefault();
				if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
					selectOption(filteredOptions[highlightedIndex]);
				}
				break;
			case 'Escape':
				event.preventDefault();
				searchTerm = '';
				highlightedIndex = -1;
				popupRef?.close();
				isFocused = false;
				break;
		}
	};

	const handleKeyup = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeyup(event);
	};

	// マウスイベント
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
		if (disabled) return;
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
			option.label.toLowerCase().includes(searchTerm.toLowerCase())
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
	data-testid="combobox"
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
	<!-- ドロップダウンアイコン -->
	{#if variant !== 'inline'}
		<div class="combobox__dropdown-icon" aria-hidden="true">
			<Icon>arrow_drop_down</Icon>
		</div>
	{/if}
	<!-- オプションリスト -->
	<Popup
		bind:this={popupRef}
		anchorElement={comboboxElement}
		position="bottom-left"
		focusTrap={false}
		onClose={handlePopupClose}
		margin={4}
		allowRepositioning={false}
	>
		<div
			bind:this={listElement}
			id={listboxId}
			class="combobox__options"
			role="listbox"
			aria-label={t('combobox.optionsList')}
			aria-labelledby={inputId}
		>
			{#each filteredOptions as option, index}
				<div role="presentation">
					<button
						type="button"
						class="combobox__option"
						class:combobox__option--highlighted={index === highlightedIndex}
						class:combobox__option--selected={option.value === value}
						class:combobox__option--disabled={option.disabled}
						role="option"
						aria-selected={option.value === value}
						disabled={option.disabled}
						onmousedown={(event) => {
							event.preventDefault();
							event.stopPropagation();
							selectOption(option);
						}}
						onmouseenter={() => (highlightedIndex = index)}
					>
						{option.label}
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
	.combobox__dropdown-icon {
		position: absolute;
		top: 50%;
		right: var(--svelte-ui-combobox-dropdown-icon-right);
		transform: translateY(-50%);
		font-size: var(--svelte-ui-combobox-dropdown-icon-size);
		color: var(--svelte-ui-combobox-dropdown-icon-color);
		pointer-events: none;
	}

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
		transition: background-color var(--svelte-ui-transition-duration) ease;

		@media (hover: hover) {
			&:hover,
			&.combobox__option--highlighted {
				background-color: var(--svelte-ui-combobox-option-hover-bg);
			}
		}

		&.combobox__option--highlighted {
			background-color: var(--svelte-ui-combobox-option-hover-bg);
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
