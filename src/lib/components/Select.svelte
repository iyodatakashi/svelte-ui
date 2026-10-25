<!-- Select.svelte -->

<script lang="ts">
	import { tick } from 'svelte';
	import Icon from './Icon.svelte';
	import Popup from './Popup.svelte';
	import { announceSelection } from '$lib/utils/accessibility';
	import { t } from '$lib/i18n';
	import type {
		FocusHandler,
		KeyboardHandler,
		MouseHandler,
		TouchHandler,
		PointerHandler,
		BivariantValueHandler
	} from '$lib/types/callbackHandlers';
	import type { Option, OptionValue } from '$lib/types/options';
	import type { CloseReason, PopupPosition } from '$lib/types/propOptions';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type SelectProps = {
		// 基本プロパティ
		name?: string;
		/** Supports `bind:value`. */
		value: OptionValue;
		/** `{ label, value, disabled? }[]` or `'separator'` for dividers. */
		options: (Option | 'separator')[];

		// HTML属性系
		id?: string | null;
		ariaLabel?: string;
		tabindex?: number | null;
		placeholder?: string;

		// スタイル/レイアウト
		/** Renders inline. @default false */
		inline?: boolean;
		/** @default 'outline' */
		focusStyle?: 'background' | 'outline' | 'none';
		fullWidth?: boolean;
		rounded?: boolean;
		customStyle?: string;

		// 状態/動作
		disabled?: boolean;
		required?: boolean;

		// ポップアップ
		/** @default 'bottom-left' */
		position?: PopupPosition;
		/** On mobile, displays the popup as a sheet that slides up from the bottom. @default false */
		mobileFullscreen?: boolean;

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
		onchange?: BivariantValueHandler<OptionValue>;
	};

	let {
		// 基本プロパティ
		name,
		value = $bindable(),
		options = [],

		// HTML属性系
		id = `select-${Math.random().toString(36).substring(2, 15)}`,
		ariaLabel,
		tabindex = null,
		placeholder = '',

		// スタイル/レイアウト
		inline = false,
		focusStyle = 'outline',
		fullWidth = false,
		rounded = false,
		customStyle = '',

		// 状態/動作
		disabled = false,
		required = false,

		// ポップアップ
		position = 'bottom-left',
		mobileFullscreen = false,

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
		onchange = () => {} // No params for type inference
	}: SelectProps = $props();

	const TYPEAHEAD_RESET_MS = 600;

	let popupRef = $state<Popup>();
	let triggerEl = $state<HTMLButtonElement>();
	let listEl = $state<HTMLUListElement>();
	let optionEls: HTMLLIElement[] = $state([]);
	let isPopupOpen = $state(false);
	let isFocused = $state(false);
	let triggerWidth = $state(0);
	/** ハイライト中の選択肢の options 内インデックス（未選択は -1） */
	let activeIndex = $state(-1);
	let typeaheadBuffer = '';
	let typeaheadTimer: ReturnType<typeof setTimeout> | undefined;

	// =========================================================================
	// $derived
	// =========================================================================
	// アイコンの領域は customStyle で消されないよう、customStyle より後ろに指定する
	const triggerStyle = $derived(
		[customStyle, `padding-right: var(--svelte-ui-select-icon-space${inline ? '-inline' : ''})`]
			.filter(Boolean)
			.join('; ')
	);

	const fallbackId = `select-${Math.random().toString(36).substring(2, 15)}`;
	const baseId = $derived(id ?? fallbackId);
	const listboxId = $derived(`${baseId}-listbox`);
	const accessibleName = $derived(ariaLabel ?? t('select.accessibleName'));

	const selectedOption = $derived(
		options.find((option) => option !== 'separator' && option.value === value) as Option | undefined
	);

	/** キーボード操作で移動できる選択肢の options 内インデックス */
	const navigableIndexes = $derived(
		options.reduce<number[]>((indexes, option, index) => {
			if (option !== 'separator' && !option.disabled) {
				indexes.push(index);
			}
			return indexes;
		}, [])
	);

	// =========================================================================
	// Methods
	// =========================================================================
	const getOptionId = (index: number): string => `${baseId}-option-${index}`;

	const getOptionAt = (index: number): Option | undefined => {
		const option = options[index];
		return option === 'separator' ? undefined : option;
	};

	const setActiveIndex = async (index: number) => {
		activeIndex = index;
		await tick();
		optionEls[index]?.scrollIntoView({ block: 'nearest' });
	};

	const moveActiveIndex = (step: number) => {
		if (navigableIndexes.length === 0) return;
		const current = navigableIndexes.indexOf(activeIndex);
		const next =
			current === -1
				? step > 0
					? 0
					: navigableIndexes.length - 1
				: (current + step + navigableIndexes.length) % navigableIndexes.length;
		setActiveIndex(navigableIndexes[next]);
	};

	/** 入力した文字で始まる選択肢へ移動する（ネイティブ select 相当の挙動） */
	const moveByTypeahead = (key: string) => {
		clearTimeout(typeaheadTimer);
		typeaheadBuffer += key.toLowerCase();
		typeaheadTimer = setTimeout(() => {
			typeaheadBuffer = '';
		}, TYPEAHEAD_RESET_MS);

		// 1文字目は現在位置の次から探し、同じ文字の連打で候補を巡回できるようにする
		const offset = typeaheadBuffer.length === 1 ? navigableIndexes.indexOf(activeIndex) + 1 : 0;
		const searchOrder = [...navigableIndexes.slice(offset), ...navigableIndexes.slice(0, offset)];
		const matched = searchOrder.find((index) =>
			getOptionAt(index)?.label.toLowerCase().startsWith(typeaheadBuffer)
		);

		if (matched !== undefined) {
			setActiveIndex(matched);
		}
	};

	const selectOption = (option: Option) => {
		if (disabled || option.disabled) return;

		value = option.value;
		announceSelection(option.label);
		onchange?.(value);
		popupRef?.close();
	};

	const handleFocus = (event: FocusEvent) => {
		isFocused = true;
		onfocus?.(event);
	};

	const handleBlur = (event: FocusEvent) => {
		isFocused = false;
		onblur?.(event);
	};

	const handleTriggerClick = (event: MouseEvent) => {
		popupRef?.toggle();
		onclick?.(event);
	};

	const handleTriggerKeydown = (event: KeyboardEvent) => {
		onkeydown?.(event);

		switch (event.key) {
			case 'Enter':
			case ' ':
			case 'ArrowDown':
			case 'ArrowUp':
				event.preventDefault();
				popupRef?.open();
				break;
		}
	};

	const handleListClick = (event: MouseEvent) => {
		const optionEl = (event.target as HTMLElement | null)?.closest<HTMLElement>(
			'[data-option-index]'
		);
		if (!optionEl) return;

		const option = getOptionAt(Number(optionEl.dataset.optionIndex));
		if (option) selectOption(option);
	};

	const handleListKeydown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				moveActiveIndex(1);
				break;
			case 'ArrowUp':
				event.preventDefault();
				moveActiveIndex(-1);
				break;
			case 'Home':
				event.preventDefault();
				if (navigableIndexes.length > 0) setActiveIndex(navigableIndexes[0]);
				break;
			case 'End':
				event.preventDefault();
				if (navigableIndexes.length > 0)
					setActiveIndex(navigableIndexes[navigableIndexes.length - 1]);
				break;
			case 'Enter':
			case ' ': {
				event.preventDefault();
				const option = getOptionAt(activeIndex);
				if (option) selectOption(option);
				break;
			}
			case 'Tab':
				popupRef?.close();
				break;
			default:
				if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
					event.preventDefault();
					moveByTypeahead(event.key);
				}
				break;
		}
	};

	const handlePopupOpen = () => {
		triggerWidth = triggerEl?.offsetWidth ?? 0;

		const selectedIndex = options.findIndex(
			(option) => option !== 'separator' && option.value === value && !option.disabled
		);
		setActiveIndex(selectedIndex >= 0 ? selectedIndex : (navigableIndexes[0] ?? -1));

		tick().then(() => {
			listEl?.focus();
		});
	};

	const handlePopupClose = (reason: CloseReason) => {
		activeIndex = -1;
		typeaheadBuffer = '';
		clearTimeout(typeaheadTimer);

		if (reason !== 'outside') {
			triggerEl?.focus();
		}
	};
</script>

<div
	class="select select--focus-{focusStyle}"
	class:select--inline={inline}
	class:select--full-width={fullWidth}
	class:select--disabled={disabled}
	class:select--focused={isFocused}
	class:select--rounded={rounded}
	data-testid="select"
>
	<button
		bind:this={triggerEl}
		{id}
		type="button"
		class="select__trigger"
		role="combobox"
		aria-expanded={isPopupOpen}
		aria-haspopup="listbox"
		aria-controls={isPopupOpen ? listboxId : undefined}
		aria-label={accessibleName}
		aria-required={required ? 'true' : undefined}
		{tabindex}
		{disabled}
		style={triggerStyle}
		onfocus={handleFocus}
		onblur={handleBlur}
		onclick={handleTriggerClick}
		onkeydown={handleTriggerKeydown}
		{onkeyup}
		{onmousedown}
		{onmouseup}
		{onmouseenter}
		{onmouseleave}
		{onmouseover}
		{onmouseout}
		{oncontextmenu}
		{onauxclick}
		{ontouchstart}
		{ontouchend}
		{ontouchmove}
		{ontouchcancel}
		{onpointerdown}
		{onpointerup}
		{onpointerenter}
		{onpointerleave}
		{onpointermove}
		{onpointercancel}
	>
		<span class="select__inner">
			{#if selectedOption}
				<span class="select__display-text">{selectedOption.label}</span>
			{:else if placeholder}
				<span class="select__placeholder">{placeholder}</span>
			{/if}
		</span>
		<span class="select__dropdown-icon" aria-hidden="true">
			<Icon>arrow_drop_down</Icon>
		</span>
	</button>

	<!-- フォーム送信用（ネイティブ select を使わないため値を hidden で送る） -->
	{#if name}
		<input type="hidden" {name} value={value ?? ''} />
	{/if}

	<Popup
		bind:this={popupRef}
		bind:isOpen={isPopupOpen}
		anchorElement={triggerEl}
		{position}
		role="presentation"
		{mobileFullscreen}
		onOpen={handlePopupOpen}
		onClose={handlePopupClose}
		margin={4}
		id={id ? `${id}-popup` : undefined}
	>
		<ul
			bind:this={listEl}
			id={listboxId}
			class="select__options"
			role="listbox"
			tabindex="-1"
			aria-label={accessibleName}
			aria-activedescendant={activeIndex >= 0 ? getOptionId(activeIndex) : undefined}
			style:--internal-select-trigger-width="{triggerWidth}px"
			onclick={handleListClick}
			onkeydown={handleListKeydown}
		>
			{#each options as option, index (option === 'separator' ? `separator-${index}` : option.value)}
				{#if option === 'separator'}
					<li class="select__separator" role="separator"></li>
				{:else}
					<li
						bind:this={optionEls[index]}
						id={getOptionId(index)}
						data-option-index={index}
						class="select__option"
						class:select__option--selected={option.value === value}
						class:select__option--active={index === activeIndex}
						class:select__option--disabled={option.disabled}
						role="option"
						aria-selected={option.value === value}
						aria-disabled={option.disabled ? 'true' : undefined}
						onmouseenter={() => {
							if (!option.disabled) activeIndex = index;
						}}
					>
						<span class="select__option-check">
							{#if option.value === value}
								<Icon size="var(--svelte-ui-select-option-check-size)">check</Icon>
							{/if}
						</span>
						<span class="select__option-label">{option.label}</span>
					</li>
				{/if}
			{/each}
		</ul>
	</Popup>
</div>

<style lang="scss">
	/* =============================================
	 * 基本構造・レイアウト
	 * ============================================= */
	.select {
		display: inline-block;
		position: relative;
		width: auto;
		max-width: 100%;
		vertical-align: top;
	}

	/* =============================================
	 * トリガーボタン
	 * ============================================= */
	.select__trigger {
		display: flex;
		align-items: center;
		position: relative;
		width: 100%;
		min-height: var(--svelte-ui-select-height);
		padding: var(--svelte-ui-select-padding);
		background: transparent;
		border: none;
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: left;
		cursor: pointer;
	}

	.select__inner {
		flex: 1;
		align-self: stretch;
		display: flex;
		align-items: center;
		min-width: 0;
	}

	.select__display-text,
	.select__placeholder {
		flex: 1;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.select__placeholder {
		color: var(--svelte-ui-select-placeholder-color);
	}

	/* アイコンはテキストと同じ content box を基準に中央寄せする（padding-block: inherit）。
	   絶対配置の基準はトリガーの padding box なので、そのままだと padding が上下非対称なときにズレる */
	.select__dropdown-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		inset-block: 0;
		right: 4px;
		width: 32px;
		padding-block: inherit;
		color: var(--svelte-ui-select-dropdown-icon-color);
		pointer-events: none;
	}

	/* =============================================
	 * レイアウトバリエーション
	 * ============================================= */
	.select--full-width {
		width: 100%;
	}

	/* =============================================
	 * フォーカス効果バリエーション
	 * ============================================= */
	.select--focus-outline .select__trigger:focus-visible {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	/* デザインバリアントの背景指定より詳細度を上げるため .select を併記 */
	.select.select--focus-background .select__trigger:focus-visible {
		outline: none;
		background: var(--svelte-ui-hover-overlay);
	}

	.select--focus-none .select__trigger:focus-visible {
		outline: none;
	}

	/* =============================================
	 * 状態管理（disabled等）
	 * ============================================= */
	.select--disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		cursor: not-allowed;

		.select__trigger {
			cursor: not-allowed;
			pointer-events: none;
		}
	}

	/* =============================================
	 * デザインバリアント：default
	 * ============================================= */
	.select:not(.select--inline) {
		.select__trigger {
			min-height: var(--svelte-ui-select-height);
			background-color: var(--svelte-ui-select-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-select-border-color);
			border: none;
			border-radius: var(--svelte-ui-select-border-radius);
			font-size: var(--svelte-ui-font-size);
		}
	}

	/* =============================================
	 * デザインバリアント：inline
	 * ============================================= */
	.select.select--inline {
		.select__trigger {
			padding: inherit;
			background: transparent;
			border: none;
			border-radius: 0;
			color: inherit;
			min-height: auto;
			line-height: inherit;
		}

		.select__inner {
			align-self: auto;
			align-items: flex-start;
			min-height: 1lh;
		}

		.select__dropdown-icon {
			/* 複数行になりうるので、箱の中央ではなく最初の行にそろえる */
			bottom: auto;
			box-sizing: content-box;
			height: 1lh;
			padding-bottom: 0;
			right: 0;
		}
	}

	/* =============================================
	 * デザインバリアント：rounded
	 * ============================================= */
	.select--rounded:not(.select--inline) .select__trigger {
		border-radius: var(--svelte-ui-select-border-radius-rounded);
	}

	/* =============================================
	 * オプションリスト（ポップアップ内）
	 * ============================================= */
	.select__options {
		list-style: none;
		margin: 0;
		padding: 0;
		/* トリガー幅に合わせつつ、トリガーが狭いときはテーマの下限を保つ */
		min-width: max(
			var(--internal-select-trigger-width, 0px),
			var(--svelte-ui-select-options-min-width)
		);
		max-height: var(--svelte-ui-select-options-max-height);
		overflow-y: auto;
		outline: none;
	}

	.select__option {
		display: flex;
		align-items: center;
		gap: var(--svelte-ui-select-option-gap);
		padding: var(--svelte-ui-select-option-padding);
		color: var(--svelte-ui-text-color);
		white-space: nowrap;
		cursor: pointer;
		transition: background-color var(--svelte-ui-transition-duration) ease;

		@media (hover: hover) {
			&:hover {
				background-color: var(--svelte-ui-select-option-hover-bg);
			}
		}

		&.select__option--active {
			background-color: var(--svelte-ui-select-option-hover-bg);
		}

		&.select__option--selected {
			background-color: var(--svelte-ui-select-option-selected-bg);
		}

		&.select__option--disabled {
			opacity: var(--svelte-ui-input-disabled-opacity);
			cursor: not-allowed;
		}
	}

	.select__option-check {
		display: flex;
		justify-content: center;
		align-items: center;
		flex: 0 0 auto;
		width: var(--svelte-ui-select-option-check-size);
		height: var(--svelte-ui-select-option-check-size);
	}

	.select__separator {
		height: 0;
		margin: var(--svelte-ui-select-separator-margin);
		border-bottom: solid 1px var(--svelte-ui-select-separator-color);
	}

	/* =============================================
	 * モバイル（タッチターゲット確保）
	 * ============================================= */
	@media (max-width: 768px) {
		.select__option {
			min-height: var(--svelte-ui-touch-target);
		}
	}

	:global(.popup--fullscreen) .select__option {
		min-height: var(--svelte-ui-touch-target-lg);
		padding: 16px 24px;
	}

	/* Reduced motion support */
	@media (prefers-reduced-motion: reduce) {
		.select__option {
			transition: none;
		}
	}
</style>
