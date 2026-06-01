<!-- MultiSelect.svelte -->

<script lang="ts">
	import Popup from './Popup.svelte';
	import Checkbox from './Checkbox.svelte';
	import Icon from './Icon.svelte';
	import { t } from '$lib/i18n';
	import type { Option, OptionValue } from '$lib/types/options';
	import type { BivariantValueHandler, FocusHandler } from '$lib/types/callbackHandlers';
	import type { PopupPosition } from '$lib/types/propOptions';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type MultiSelectProps = {
		// 基本プロパティ
		name?: string;
		/** Selected values array. Supports `bind:values`. */
		values: OptionValue[];
		/** `{ label, value, disabled? }[]` */
		options: Option[];

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

		// 状態/動作
		disabled?: boolean;
		required?: boolean;

		// ポップアップ
		/** @default 'bottom-left' */
		position?: PopupPosition;

		// イベントハンドラ
		onfocus?: FocusHandler;
		onblur?: FocusHandler;
		onchange?: BivariantValueHandler<OptionValue[]>;
	};

	let {
		name,
		values = $bindable([]),
		options = [],

		id = `multi-select-${Math.random().toString(36).substring(2, 15)}`,
		ariaLabel,
		tabindex = null,
		placeholder = '',

		inline = false,
		focusStyle = 'outline',
		fullWidth = false,
		rounded = false,

		disabled = false,
		required = false,

		position = 'bottom-left',

		onfocus = () => {},
		onblur = () => {},
		onchange = () => {}
	}: MultiSelectProps = $props();

	let popupRef = $state<any>();
	let triggerEl = $state<HTMLButtonElement>();
	let isPopupOpen = $state(false);
	let triggerWidth = $state(0);
	let isFocused = $state(false);

	// =========================================================================
	// $derived
	// =========================================================================
	const listboxId = $derived(`${id}-listbox`);

	const displayText = $derived(
		values.length > 0
			? options
					.filter((o) => values.includes(o.value))
					.map((o) => o.label)
					.join(' ')
			: ''
	);

	// =========================================================================
	// Methods
	// =========================================================================
	const toggleOption = (optionValue: OptionValue) => {
		if (values.includes(optionValue)) {
			values = values.filter((v) => v !== optionValue);
		} else {
			values = [...values, optionValue];
		}
		onchange(values);
	};

	const handleTriggerClick = () => {
		if (disabled) return;
		popupRef?.toggle();
	};

	const handleTriggerKeydown = (event: KeyboardEvent) => {
		if (disabled) return;
		if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
			event.preventDefault();
			popupRef?.open();
		}
	};

	const handleFocus = (event: FocusEvent) => {
		if (disabled) return;
		isFocused = true;
		onfocus(event);
	};

	const handleBlur = (event: FocusEvent) => {
		if (disabled) return;
		isFocused = false;
		onblur(event);
	};

	const handlePopupOpen = () => {
		triggerWidth = triggerEl?.offsetWidth ?? 0;
	};

	const handlePopupClose = () => {
		triggerEl?.focus();
	};
</script>

<div
	class="multi-select multi-select--focus-{focusStyle}"
	class:multi-select--inline={inline}
	class:multi-select--full-width={fullWidth}
	class:multi-select--disabled={disabled}
	class:multi-select--focused={isFocused}
	class:multi-select--rounded={rounded}
	data-testid="multi-select"
>
	<button
		bind:this={triggerEl}
		{id}
		type="button"
		class="multi-select__trigger"
		role="combobox"
		aria-expanded={isPopupOpen}
		aria-haspopup="listbox"
		aria-controls={isPopupOpen ? listboxId : undefined}
		aria-label={ariaLabel ?? t('multiSelect.accessibleName')}
		aria-required={required ? 'true' : undefined}
		{tabindex}
		{disabled}
		onfocus={handleFocus}
		onblur={handleBlur}
		onclick={handleTriggerClick}
		onkeydown={handleTriggerKeydown}
	>
		{#if displayText}
			<span class="multi-select__display-text">{displayText}</span>
		{:else if placeholder}
			<span class="multi-select__placeholder">{placeholder}</span>
		{/if}
	</button>
	<div class="multi-select__dropdown-icon" aria-hidden="true">
		<Icon>arrow_drop_down</Icon>
	</div>

	<Popup
		bind:this={popupRef}
		bind:isOpen={isPopupOpen}
		anchorElement={triggerEl}
		{position}
		mobileFullscreen={true}
		onOpen={handlePopupOpen}
		onClose={handlePopupClose}
		margin={4}
	>
		<ul
			id={listboxId}
			class="multi-select__options"
			role="listbox"
			aria-multiselectable="true"
			aria-label={ariaLabel ?? t('multiSelect.accessibleName')}
			style:min-width="{triggerWidth}px"
		>
			{#each options as option, i (option.value)}
				<li role="presentation" class="multi-select__item">
					<Checkbox
						value={values.includes(option.value)}
						disabled={option.disabled}
						fullWidth
						customStyle="padding: 8px 12px"
						onchange={() => toggleOption(option.value)}
					>
						{option.label}
					</Checkbox>
				</li>
			{/each}
		</ul>
	</Popup>
</div>

<style lang="scss">
	/* =============================================
	 * 基本構造・レイアウト
	 * ============================================= */
	.multi-select {
		display: inline-block;
		position: relative;
		width: auto;
		max-width: 100%;
		vertical-align: top;
	}

	/* =============================================
	 * トリガーボタン
	 * ============================================= */
	.multi-select__trigger {
		width: 100%;
		min-height: var(--svelte-ui-select-height);
		padding: var(--svelte-ui-select-padding);
		padding-right: var(--svelte-ui-select-icon-space);
		background: transparent;
		border: none;
		font-family: inherit;
		font-size: inherit;
		font-weight: inherit;
		color: inherit;
		line-height: inherit;
		text-align: left;
		cursor: pointer;
		display: flex;
		align-items: center;
		overflow: hidden;

		&:focus,
		&:focus-visible {
			outline: var(--svelte-ui-focus-outline-inner);
			outline-offset: var(--svelte-ui-focus-outline-offset-inner);
		}
	}

	.multi-select__display-text {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
	}

	.multi-select__placeholder {
		color: var(--svelte-ui-select-placeholder-color);
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
	}

	.multi-select__dropdown-icon {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		right: 4px;
		width: 32px;
		height: 32px;
		transform: translateY(-50%);
		font-size: var(--svelte-ui-select-dropdown-icon-size);
		color: var(--svelte-ui-select-dropdown-icon-color);
		pointer-events: none;
	}

	/* =============================================
	 * レイアウトバリエーション
	 * ============================================= */
	.multi-select--full-width {
		width: 100%;
	}

	/* =============================================
	 * フォーカス効果バリエーション
	 * ============================================= */
	.multi-select--focus-outline .multi-select__trigger:focus {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.multi-select--focus-background .multi-select__trigger:focus {
		background: var(--svelte-ui-hover-overlay);
	}

	/* =============================================
	 * 状態管理
	 * ============================================= */
	.multi-select--disabled {
		opacity: var(--svelte-ui-input-disabled-opacity);
		cursor: not-allowed;

		.multi-select__trigger {
			cursor: not-allowed;
			pointer-events: none;
		}
	}

	/* =============================================
	 * デザインバリアント：default
	 * ============================================= */
	.multi-select:not(.multi-select--inline) {
		.multi-select__trigger {
			min-height: var(--svelte-ui-select-height);
			background-color: var(--svelte-ui-select-bg);
			box-shadow: 0 0 0 var(--svelte-ui-border-width) inset var(--svelte-ui-select-border-color);
			border: none;
			border-radius: var(--svelte-ui-select-border-radius);
			font-size: 1rem;
			line-height: var(--svelte-ui-select-height);
		}
	}

	/* =============================================
	 * デザインバリアント：inline
	 * ============================================= */
	.multi-select.multi-select--inline {
		.multi-select__trigger {
			padding: inherit;
			padding-right: var(--svelte-ui-input-icon-space-inline);
			background: transparent;
			border: none;
			border-radius: 0;
			color: inherit;
			min-height: auto;
			line-height: inherit;
		}

		.multi-select__dropdown-icon {
			right: 0;
		}
	}

	/* =============================================
	 * デザインバリアント：rounded
	 * ============================================= */
	.multi-select--rounded:not(.multi-select--inline) .multi-select__trigger {
		border-radius: var(--svelte-ui-select-border-radius-rounded);
	}

	/* =============================================
	 * オプションリスト（ポップアップ内）
	 * ============================================= */
	.multi-select__options {
		list-style: none;
		margin: 0;
		padding: 0;
		min-width: 160px;
		max-height: var(--svelte-ui-combobox-options-max-height);
		overflow-y: auto;
	}

	.multi-select__item {
		position: relative;
		padding: 0;
		margin: 0;

		@media (hover: hover) {
			&:hover :global(.checkbox:not(.checkbox--disabled)) {
				background-color: var(--svelte-ui-hover-overlay);
			}
		}
	}

	.multi-select__option-cover {
		position: absolute;
		inset: 0;
		cursor: pointer;

		&--disabled {
			cursor: not-allowed;
		}
	}
</style>
