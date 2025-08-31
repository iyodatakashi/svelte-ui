<!-- Datepicker.svelte -->

<script lang="ts">
	import { type SvelteComponent } from 'svelte';
	import dayjs from 'dayjs';
	import localeData from 'dayjs/plugin/localeData';
	import 'dayjs/locale/ja';
	import 'dayjs/locale/en';
	import 'dayjs/locale/fr';
	import 'dayjs/locale/de';
	import 'dayjs/locale/es';
	import 'dayjs/locale/zh-cn';
	import Input from './Input.svelte';
	import Popup from './Popup.svelte';
	import DatepickerCalendar from './DatepickerCalendar.svelte';
	import { announceToScreenReader } from '../utils/accessibility';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/Icon';

	dayjs.extend(localeData);

	// =========================================================================
	// Props, States & Constants
	// =========================================================================

	let {
		// 基本プロパティ
		value = $bindable(),
		format,
		nullString = '',
		locale = 'en',
		rangeSeparator = ' - ',

		// HTML属性系
		id = `datepicker-${Math.random().toString(36).substring(2, 15)}`,
		inputAttributes,

		// スタイル/レイアウト
		variant = 'default',
		focusStyle = 'border',
		fullWidth = false,
		rounded = false,

		// アイコン関連
		hasIcon = false,
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = 24,
		iconVariant = 'outlined',

		// 状態/動作
		disabled = false,
		mode = 'single',
		allowDirectInput = false,
		openIfClicked = true,
		minDate,
		maxDate,

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
		value: Date | { start: Date; end: Date } | undefined;
		format?: string;
		nullString?: string;
		locale?: 'en' | 'ja' | 'fr' | 'de' | 'es' | 'zh-cn';
		rangeSeparator?: string;

		// HTML属性系
		id?: string;
		inputAttributes?: HTMLInputAttributes | undefined;

		// スタイル/レイアウト
		variant?: 'default' | 'inline';
		focusStyle?: 'background' | 'border' | 'none';
		fullWidth?: boolean;
		rounded?: boolean;

		// アイコン関連
		hasIcon?: boolean;
		iconFilled?: boolean;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;
		iconVariant?: IconVariant;

		// 状態/動作
		disabled?: boolean;
		mode?: 'single' | 'range';
		allowDirectInput?: boolean;
		openIfClicked?: boolean;
		minDate?: Date;
		maxDate?: Date;

		// 入力イベント
		onchange?: (value: Date | { start: Date; end: Date } | undefined) => void;
		oninput?: (value: string) => void;

		// フォーカスイベント
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;
		onkeydown?: (event: KeyboardEvent) => void;
		onkeyup?: (event: KeyboardEvent) => void;
		onclick?: (event: MouseEvent) => void;
		onmousedown?: (event: MouseEvent) => void;
		onmouseup?: (event: MouseEvent) => void;
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;
		onmouseover?: (event: MouseEvent) => void;
		onmouseout?: (event: MouseEvent) => void;
		oncontextmenu?: (event: MouseEvent) => void;
		onauxclick?: (event: MouseEvent) => void;
		ontouchstart?: (event: TouchEvent) => void;
		ontouchend?: (event: TouchEvent) => void;
		ontouchmove?: (event: TouchEvent) => void;
		ontouchcancel?: (event: TouchEvent) => void;
		onpointerdown?: (event: PointerEvent) => void;
		onpointerup?: (event: PointerEvent) => void;
		onpointerenter?: (event: PointerEvent) => void;
		onpointerleave?: (event: PointerEvent) => void;
		onpointermove?: (event: PointerEvent) => void;
		onpointercancel?: (event: PointerEvent) => void;

		// その他
		[key: string]: any;
	} = $props();

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let inputRef: any = $state();
	let containerElement: HTMLDivElement | undefined = $state();
	let popupRef: SvelteComponent | undefined = $state();
	let datapickerCalendarRef: SvelteComponent | undefined = $state();
	let openedViaKeyboard: boolean = $state(false);
	let displayValue = $state('');

	const calendarId = `${id}-calendar`;

	// =========================================================================

	const localeConfig = {
		en: {
			defaultFormat: 'MM/DD/YYYY (ddd)',
			rangeFormat: 'MM/DD/YYYY',
			selectDateLabel: 'Select a date. Current value:',
			notSelected: 'Not selected',
			directInputPlaceholder: 'Enter date'
		},
		ja: {
			defaultFormat: 'YYYY/M/D（ddd）',
			rangeFormat: 'YYYY/M/D',
			selectDateLabel: '日付を選択してください。現在の値:',
			notSelected: '未選択',
			directInputPlaceholder: '日付を入力してください'
		},
		fr: {
			defaultFormat: 'DD/MM/YYYY (ddd)',
			rangeFormat: 'DD/MM/YYYY',
			selectDateLabel: 'Sélectionnez une date. Valeur actuelle :',
			notSelected: 'Non sélectionné',
			directInputPlaceholder: 'Saisir la date'
		},
		de: {
			defaultFormat: 'DD.MM.YYYY (ddd)',
			rangeFormat: 'DD.MM.YYYY',
			selectDateLabel: 'Wählen Sie ein Datum. Aktueller Wert:',
			notSelected: 'Nicht ausgewählt',
			directInputPlaceholder: 'Datum eingeben'
		},
		es: {
			defaultFormat: 'DD/MM/YYYY (ddd)',
			rangeFormat: 'DD/MM/YYYY',
			selectDateLabel: 'Seleccione una fecha. Valor actual:',
			notSelected: 'No seleccionado',
			directInputPlaceholder: 'Introducir fecha'
		},
		'zh-cn': {
			defaultFormat: 'YYYY/M/D（ddd）',
			rangeFormat: 'YYYY/M/D',
			selectDateLabel: '请选择日期。当前值：',
			notSelected: '未选择',
			directInputPlaceholder: '请输入日期'
		}
	};

	// =========================================================================
	// Effects
	// =========================================================================
	$effect(() => {
		dayjs.locale(locale);
	});

	$effect(() => {
		const formatWithLocale = (date: Date) => dayjs(date).locale(locale).format(finalFormat);

		if (mode === 'range' && value && 'start' in value && 'end' in value) {
			displayValue = `${formatWithLocale(value.start)}${rangeSeparator}${formatWithLocale(value.end)}`;
		} else if (mode === 'single' && value && value instanceof Date) {
			displayValue = formatWithLocale(value);
		} else {
			displayValue = '';
		}
	});

	// =========================================================================
	// Methods
	// =========================================================================
	const handleChange = () => {
		// スクリーンリーダーアナウンス
		if (value) {
			if (mode === 'range' && typeof value === 'object' && 'start' in value && 'end' in value) {
				const startDate = dayjs(value.start).format(finalFormat);
				const endDate = dayjs(value.end).format(finalFormat);
				announceToScreenReader(`Date range selected: ${startDate} to ${endDate}`);
			} else if (value instanceof Date) {
				const formattedDate = dayjs(value).format(finalFormat);
				announceToScreenReader(`Date selected: ${formattedDate}`);
			}
		}

		onchange(value);

		// 単一日付選択時、または範囲選択時の終了日選択時にポップアップを閉じる
		if (
			mode === 'single' ||
			(mode === 'range' &&
				value &&
				typeof value === 'object' &&
				'start' in value &&
				'end' in value &&
				value.end)
		) {
			popupRef?.close();
		}
	};

	const handleClick = (event: MouseEvent) => {
		if (disabled) return;
		if (openIfClicked) {
			openedViaKeyboard = false;
			open();
		}
		onclick?.(event);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeydown(event);

		switch (event.key) {
			case 'Enter':
			case ' ':
				// 直接入力が許可されている場合はEnterキーで入力を確定
				if (allowDirectInput && event.key === 'Enter') {
					return; // Inputコンポーネントの処理に任せる
				}
				event.preventDefault();
				openedViaKeyboard = true;
				open();
				break;
			case 'ArrowDown':
				// ポップアップが既に開いている場合は何もしない（DatepickerCalendarのキーボード処理に任せる）
				if (popupRef?.getIsOpen && popupRef.getIsOpen()) {
					return;
				}
				event.preventDefault();
				openedViaKeyboard = true;
				open();
				break;
			case 'Escape':
				event.preventDefault();
				close();
				break;
		}
	};

	const handleKeyup = (event: KeyboardEvent) => {
		if (disabled) return;
		onkeyup(event);
	};

	const handleInput = (event: Event) => {
		if (disabled) return;
		const target = event.target as HTMLInputElement;
		oninput?.(target.value);
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

	const handlePopupOpen = () => {
		// DatepickerCalendarのイベントハンドラーを有効にする
		datapickerCalendarRef?.handlePopupOpen();
		// キーボードで開いた場合は、最初のキーボード操作時にフォーカス表示が有効になる
	};

	const handlePopupClose = () => {
		// DatepickerCalendarのイベントハンドラーを無効にする
		datapickerCalendarRef?.handlePopupClose();
		// 状態をリセット
		openedViaKeyboard = false;
	};

	const handleFocus = (event: FocusEvent) => {
		if (disabled) return;
		// キーボードでのフォーカス時のみPopupを開く
		// クリック時は handleClick で処理
		onfocus(event);
	};

	const handleBlur = (event: FocusEvent) => {
		if (disabled) return;
		// Popupのクリックアウト機能に依存するため、ここでは自動クローズしない
		// フォーカスイベントのみをハンドルする
		onblur(event);
	};

	const handleInputChange = (inputValue: string | number | undefined) => {
		if (disabled) return;
		if (!allowDirectInput) return;

		const inputStr = String(inputValue || '');
		if (!inputStr) {
			value = undefined;
			onchange(value);
			return;
		}

		// 日付の解析を試行
		const parsedDate = dayjs(inputStr, finalFormat, locale, true);
		if (parsedDate.isValid()) {
			value = parsedDate.toDate();
			onchange(value);
		}
	};

	export const open = () => {
		datapickerCalendarRef?.reset();
		popupRef?.open();
	};

	export const close = () => {
		popupRef?.close();
	};

	export const toggle = () => {
		datapickerCalendarRef?.reset();
		popupRef?.toggle();
	};

	// =========================================================================
	// $derived
	// =========================================================================

	const currentLocaleConfig = $derived(localeConfig[locale]);
	const finalFormat = $derived(
		format ||
			(mode === 'range' ? currentLocaleConfig.rangeFormat : currentLocaleConfig.defaultFormat)
	);
	const placeholderText = $derived(
		allowDirectInput
			? nullString || currentLocaleConfig.directInputPlaceholder
			: nullString || currentLocaleConfig.notSelected
	);
</script>

<div
	bind:this={containerElement}
	class="datepicker-container"
	class:datepicker-container--full-width={fullWidth}
>
	<Input
		bind:this={inputRef}
		value={displayValue}
		{variant}
		{focusStyle}
		{fullWidth}
		{rounded}
		{disabled}
		readonly={!allowDirectInput}
		placeholder={placeholderText}
		rightIcon={hasIcon ? (mode === 'range' ? 'date_range' : 'calendar_today') : undefined}
		{iconFilled}
		{iconWeight}
		{iconGrade}
		{iconOpticalSize}
		{iconVariant}
		onRightIconClick={handleClick}
		onclick={handleClick}
		onfocus={handleFocus}
		onblur={handleBlur}
		onchange={handleInputChange}
		oninput={handleInput}
		onkeydown={handleKeyDown}
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
		{id}
		{inputAttributes}
		{...restProps}
	/>
</div>
<Popup
	bind:this={popupRef}
	anchorElement={containerElement}
	onOpen={handlePopupOpen}
	onClose={handlePopupClose}
>
	<DatepickerCalendar
		bind:this={datapickerCalendarRef}
		bind:value
		{mode}
		onchange={handleChange}
		{minDate}
		{maxDate}
		{locale}
		id={calendarId}
	/>
</Popup>

<style lang="scss">
	.datepicker-container {
		position: relative;
		display: inline-block;
		width: auto;

		&.datepicker-container--full-width {
			display: block;
			width: 100%;
		}
	}
</style>
