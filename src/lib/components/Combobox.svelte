<!-- Combobox.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
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
		onclick?: (event: MouseEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		[key: string]: any;
	} = $props();
	let isOpen = $state(false);
	let searchTerm = $state('');
	let inputElement = $state<HTMLInputElement>();
	let listElement = $state<HTMLUListElement>();
	let highlightedIndex = $state(-1);
	let isFocused = $state(false);
	const comboboxId = id || `combobox-${Math.random().toString(36).substr(2, 9)}`;
	const listboxId = `listbox-${Math.random().toString(36).substr(2, 9)}`;
	// フィルタリングされたオプション
	const filteredOptions = $derived.by(() => {
		if (!filterable || !searchTerm) return options;
		return options.filter((option) =>
			option === null ? false : String(option).toLowerCase().includes(searchTerm.toLowerCase())
		);
	});
	// 表示用のテキスト
	const displayText = $derived.by(() => {
		return isOpen && searchTerm !== ''
			? searchTerm
			: value !== null && value !== undefined
				? String(value)
				: '';
	});
	// オプションを選択
	const selectOption = (option: string | number | null) => {
		value = option;
		searchTerm = '';
		isOpen = false;
		highlightedIndex = -1;
		onchange?.(option);
	};
	// input要素のフォーカス/クリック時
	const handleInputFocus = (event: FocusEvent) => {
		if (disabled || readonly) return;
		isFocused = true;
		isOpen = true;
		if (filterable) {
			searchTerm = value !== null && value !== undefined ? String(value) : '';
		}
		highlightedIndex = -1;
		onfocus(event);
	};
	// コンボボックスを閉じる
	const closeComboBox = (event: FocusEvent) => {
		isOpen = false;
		searchTerm = '';
		highlightedIndex = -1;
		isFocused = false;
		onblur(event);
	};
	// 入力変更ハンドラー
	const handleInput = (event: Event) => {
		if (readonly) return;
		const target = event.target as HTMLInputElement;
		if (filterable) {
			searchTerm = target.value;
		}
		// 数値として解析を試行し、失敗した場合は文字列として扱う
		const inputValue = target.value;
		const numericValue = Number(inputValue);
		value = !isNaN(numericValue) && inputValue !== '' ? numericValue : inputValue;
		highlightedIndex = -1;
		if (!isOpen) {
			isOpen = true;
		}
		oninput?.(value);
	};
	// 値確定ハンドラー
	const handleChange = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const inputValue = target.value;
		const numericValue = Number(inputValue);
		const finalValue = !isNaN(numericValue) && inputValue !== '' ? numericValue : inputValue;
		onchange?.(finalValue);
	};
	// フォーム送信ハンドラー
	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
		isOpen = false;
		highlightedIndex = -1;
		onchange?.(value);
		inputElement?.blur();
	};
	const handleClick = (event: MouseEvent) => {
		if (!disabled && !readonly) {
			handleInputFocus(event as unknown as FocusEvent);
		}
		onclick(event);
	};
	const handleKeydown = (event: KeyboardEvent) => {
		onkeydown(event);
		if (disabled || readonly) return;
		// TODO: キーボードナビゲーション実装
		// ArrowDown, ArrowUp, Enter, Escape等の処理
	};
	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as Node;
		if (
			inputElement &&
			!inputElement.contains(target) &&
			listElement &&
			!listElement.contains(target)
		) {
			closeComboBox(event as unknown as FocusEvent);
		}
	};
	$effect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div
	class="combobox
focus-style-{focusStyle}"
	class:inline={variant === 'inline'}
	class:auto-resize={variant === 'inline'}
	class:full-width={fullWidth}
	class:disabled
	class:readonly
	class:is-open={isOpen}
	class:is-focused={isFocused}
	class:rounded
	style="max-width: {maxWidth}px; min-width: {minWidth}px"
>
	<form onsubmit={handleSubmit}>
		<!-- inline時の表示用要素（コンテンツ幅決定用） -->
		{#if variant === 'inline'}
			<div
				class="plain-text"
				class:is-placeholder={!displayText}
				data-placeholder={placeholder}
				style={customStyle}
			>
				{displayText || placeholder}
			</div>
		{/if}
		<input
			bind:this={inputElement}
			type="text"
			{name}
			id={comboboxId}
			class="combobox-input"
			value={displayText}
			{placeholder}
			{disabled}
			{required}
			{tabindex}
			{maxlength}
			style={customStyle}
			onfocus={handleInputFocus}
			onclick={handleClick}
			oninput={handleInput}
			onchange={handleChange}
			onblur={closeComboBox}
			onkeydown={handleKeydown}
			role="combobox"
			aria-expanded={isOpen}
			aria-controls={listboxId}
			aria-haspopup="listbox"
			aria-autocomplete="list"
			{...restProps}
		/>
	</form>
	<!-- ドロップダウンアイコン -->
	{#if variant !== 'inline'}
		<div class="dropdown-icon">
			<Icon>arrow_drop_down</Icon>
		</div>
	{/if}
	<!-- オプションリスト -->
	{#if isOpen}
		<ul
			bind:this={listElement}
			id={listboxId}
			class="options-list"
			role="listbox"
			aria-label="オプション一覧"
			aria-labelledby={comboboxId}
		>
			{#each filteredOptions as option, index}
				<li role="presentation">
					<button
						type="button"
						class="option"
						class:highlighted={index === highlightedIndex}
						class:selected={option === value}
						role="option"
						aria-selected={option === value}
						onclick={() => selectOption(option)}
						onmouseenter={() => (highlightedIndex = index)}
					>
						{option ?? '（空の値）'}
					</button>
				</li>
			{:else}
				<li class="no-options">該当するオプションがありません</li>
			{/each}
		</ul>
	{/if}
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

	form {
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
		display: inline-block;
		vertical-align: top;
		width: 100%;
		min-width: 1em;
		padding: inherit;
		background: inherit;
		border: inherit;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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

	.combobox-input {
		width: 100%;
		min-height: var(--svelte-ui-input-height);
		padding: inherit;
		background: transparent;
		border: none;
		border-radius: 0;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: inherit;

		&:focus,
		&:focus-visible {
			outline: none;
		}
	}

	.dropdown-icon {
		position: absolute;
		top: 50%;
		right: 8px;
		transform: translateY(-50%);
		font-size: var(--svelte-ui-combobox-dropdown-icon-size);
		color: var(--svelte-ui-combobox-icon-color);
		pointer-events: none;
	}

	/* =============================================
 * オプションリスト
 * ============================================= */
	.options-list {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: var(--svelte-ui-z-dropdown);
		min-width: var(--svelte-ui-combobox-min-width);
		width: max-content;
		max-width: var(--svelte-ui-combobox-max-width);
		background: var(--svelte-ui-combobox-bg);
		border: var(--svelte-ui-border-width) solid var(--svelte-ui-combobox-border-color);
		border-top: none;
		border-bottom-left-radius: var(--svelte-ui-combobox-border-radius);
		border-bottom-right-radius: var(--svelte-ui-combobox-border-radius);
		max-height: var(--svelte-ui-combobox-options-max-height);
		overflow-y: auto;
		list-style: none;
		margin: 0;
		padding: 0;
		box-shadow: var(--svelte-ui-combobox-shadow);
	}

	.option {
		width: 100%;
		padding: var(--svelte-ui-combobox-option-padding);
		border: none;
		background: none;
		text-align: left;
		cursor: pointer;
		font-size: inherit;
		color: inherit;
		transition: background-color var(--svelte-ui-transition-normal)
			var(--svelte-ui-transition-timing);

		&:hover,
		&.highlighted {
			background-color: var(--svelte-ui-combobox-option-hover-bg);
		}

		&.selected {
			background-color: var(--svelte-ui-combobox-option-selected-bg);
		}

		&.selected.highlighted {
			background-color: var(--svelte-ui-combobox-option-selected-bg);
		}

		&:focus {
			outline: 2px solid var(--svelte-ui-focus-color);
			outline-offset: -2px;
		}
	}

	.no-options {
		padding: var(--svelte-ui-combobox-option-padding);
		font-size: inherit;
		color: var(--svelte-ui-text-secondary);
		font-style: italic;
		list-style: none;
	}

	/* =============================================
 * レイアウトバリエーション
 * ============================================= */
	.combobox.auto-resize {
		width: fit-content;
	}

	.combobox.full-width {
		width: 100%;
	}

	/* =============================================
 * プレースホルダー・テキスト表示
 * ============================================= */
	input::placeholder {
		color: var(--svelte-ui-text-placeholder);
	}

	.plain-text.is-placeholder {
		color: var(--svelte-ui-text-placeholder);
	}

	/* =============================================
 * フォーカス効果バリエーション
 * ============================================= */
	.focus-style-border .combobox-input:focus {
		box-shadow: var(--svelte-ui-input-focus-shadow);
	}

	.focus-style-background .combobox-input:focus {
		background: var(--svelte-ui-hover-overlay);
	}

	/* =============================================
 * 状態管理（disabled, readonly, focused等）
 * ============================================= */
	.disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		pointer-events: none;

		.dropdown-icon {
			opacity: var(--svelte-ui-button-disabled-opacity);
		}
	}

	.readonly {
		pointer-events: none;

		.dropdown-icon {
			opacity: var(--svelte-ui-button-disabled-opacity);
		}
	}

	.readonly .combobox-input {
		background-color: var(--svelte-ui-input-readonly-bg);
		cursor: default;
	}

	.combobox-input:disabled {
		opacity: var(--svelte-ui-button-disabled-opacity);
		cursor: not-allowed;
	}

	/* =============================================
 * デザインバリアント：default
 * ============================================= */
	.combobox:not(.inline) {
		.combobox-input {
			min-height: var(--svelte-ui-input-height);
			padding: 0 32px 0 var(--svelte-ui-input-padding-left);
			background-color: var(--svelte-ui-input-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-input-border-color);
			border: none;
			border-radius: var(--svelte-ui-combobox-border-radius);
			color: var(--svelte-ui-combobox-text-color);
		}

		.dropdown-icon {
			right: var(--svelte-ui-combobox-dropdown-icon-right);
		}

		&.is-open .combobox-input {
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;
		}
	}

	/* =============================================
 * デザインバリアント：rounded
 * ============================================= */
	.combobox.rounded:not(.inline) {
		.combobox-input {
			border-radius: var(--svelte-ui-input-border-radius-rounded);
		}

		&.is-open .combobox-input {
			border-bottom-left-radius: var(--svelte-ui-input-border-radius-rounded);
			border-bottom-right-radius: var(--svelte-ui-input-border-radius-rounded);
		}
	}

	.combobox.rounded {
		.options-list {
			border-radius: var(--svelte-ui-combobox-border-radius-rounded);
			border-top-left-radius: var(--svelte-ui-combobox-border-radius-rounded);
			border-top-right-radius: var(--svelte-ui-combobox-border-radius-rounded);
		}
	}

	/* =============================================
 * デザインバリアント：inline
 * ============================================= */
	.combobox.inline {
		.plain-text {
			padding: inherit;
			background: inherit;
			border: inherit;
		}

		.combobox-input {
			padding: inherit;
			background: inherit;
			border: inherit;
			box-shadow: none;
			border-radius: 0;
		}

		.options-list {
			border: var(--svelte-ui-border-width) solid var(--svelte-ui-combobox-border-color);
			border-radius: var(--svelte-ui-combobox-border-radius);
		}

		/* フォーカス状態の切り替え */
		&.is-focused {
			.plain-text {
				opacity: 0;
				visibility: hidden;
			}
		}
	}
</style>
