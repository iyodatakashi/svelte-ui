<!-- Combobox.svelte -->

<script lang="ts">
	import Input from './Input.svelte';
	import Icon from './Icon.svelte';
	import Popup from './Popup.svelte';
	import { announceSelection } from '$lib/utils/accessibility';
	let {
		name,
		value = $bindable(),
		options = [],
		customStyle = '',
		variant = 'default',

		focusStyle = 'border',
		placeholder = '選択してください',
		fullWidth = false,
		minWidth = variant === 'inline' ? null : 120,
		maxWidth = null,
		disabled = false,
		readonly = false,
		required = false,
		id = null,
		tabindex = null,
		maxlength = null,
		filterable = true,
		rounded = false,
		onchange = (value: string | number | null | undefined) => {},
		oninput = (value: string | number | null | undefined) => {},
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},
		onclick = (event: MouseEvent) => {},
		onkeydown = (event: KeyboardEvent) => {},
		...restProps
	}: {
		name?: string;
		value: string | number | null | undefined;
		options: (string | number | null)[];
		customStyle?: string;
		variant?: 'default' | 'inline';

		focusStyle?: 'background' | 'border' | 'none';
		placeholder?: string;
		fullWidth?: boolean;
		minWidth?: number | null;
		maxWidth?: number | null;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		id?: string | null;
		tabindex?: number | null;
		maxlength?: number | null;
		filterable?: boolean;
		rounded?: boolean;
		onchange?: (value: string | number | null | undefined) => void;
		oninput?: (value: string | number | null | undefined) => void;
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onclick?: (event: MouseEvent & { currentTarget: HTMLDivElement }) => void;
		onkeydown?: (event: KeyboardEvent) => void;
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
	const comboboxId = id || `combobox-${Math.random().toString(36).substring(2, 15)}`;
	const listboxId = `listbox-${Math.random().toString(36).substring(2, 15)}`;

	// inputValueとvalueの同期
	$effect(() => {
		if (searchTerm !== '') {
			inputValue = searchTerm;
		} else {
			inputValue = value !== null && value !== undefined ? String(value) : '';
		}
	});
	// フィルタリングされたオプション
	const filteredOptions = $derived.by(() => {
		if (!filterable || !searchTerm) return options;
		return options.filter((option) =>
			option === null ? false : String(option).toLowerCase().includes(searchTerm.toLowerCase())
		);
	});
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
	const handleInputFocus = () => {
		if (disabled || readonly) return;

		isFocused = true;
		popupRef?.open();
		if (filterable) {
			searchTerm = value !== null && value !== undefined ? String(value) : '';
		}
		highlightedIndex = -1;
		onfocus(new FocusEvent('focus'));
	};

	// 入力変更ハンドラー
	const handleInput = (currentValue: string | number | undefined) => {
		if (readonly) return;
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
		const inputValue = String(currentValue || '');
		const numericValue = Number(inputValue);
		const finalValue = !isNaN(numericValue) && inputValue !== '' ? numericValue : inputValue;
		onchange?.(finalValue);
	};
	const handleClick = (event: MouseEvent) => {
		if (!disabled && !readonly) {
			handleInputFocus();
		}
		onclick?.(event as MouseEvent & { currentTarget: HTMLDivElement });
	};
	const handleKeydown = () => {
		onkeydown(new KeyboardEvent('keydown'));
		if (disabled || readonly) return;
		// TODO: キーボードナビゲーション実装
		// ArrowDown, ArrowUp, Enter, Escape等の処理
	};

	// Popup が閉じられたときの処理
	const handlePopupClose = () => {
		isFocused = false;
		highlightedIndex = -1;
		// 検索語をリセット
		if (value !== null && value !== undefined) {
			searchTerm = '';
		}
	};
	const handleBlur = () => {
		// 少し遅延させてからポップアップを閉じる（オプション選択時の処理のため）
		setTimeout(() => {
			if (!isFocused) {
				popupRef?.close();
			}
		}, 100);
		onblur(new FocusEvent('blur'));
	};
</script>

<div
	bind:this={comboboxElement}
	class="combobox"
	class:combobox--full-width={fullWidth}
	style="max-width: {maxWidth}px; min-width: {minWidth}px"
>
	<!-- Inputコンポーネントを使用 -->
	<Input
		bind:this={inputRef}
		bind:value={inputValue}
		{name}
		id={comboboxId}
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
		{...restProps}
	/>
	<!-- オプションリスト -->
	<Popup
		bind:this={popupRef}
		anchorElement={comboboxElement}
		position="bottom-left"
		role="listbox"
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
			aria-labelledby={comboboxId}
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
		background: none;
		text-align: left;
		cursor: pointer;
		font-size: inherit;
		color: var(--svelte-ui-combobox-text-color);
		transition: background-color var(--svelte-ui-transition-duration) ease;

		&:hover,
		&.combobox__option--highlighted {
			background-color: var(--svelte-ui-combobox-option-hover-bg);
		}

		&.combobox__option--selected {
			background-color: var(--svelte-ui-combobox-option-selected-bg);
		}

		&.combobox__option--selected.combobox__option--highlighted {
			background-color: var(--svelte-ui-combobox-option-selected-bg);
		}

		&:focus {
			outline: 2px solid var(--svelte-ui-focus-color);
			outline-offset: -2px;
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
