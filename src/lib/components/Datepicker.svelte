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
	import { announceToScreenReader } from '$lib/utils/accessibility';
	import { getLocale } from '$lib/config';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';
	import type {
		BivariantValueHandler,
		FocusHandler,
		KeyboardHandler,
		MouseHandler,
		TouchHandler,
		PointerHandler
	} from '$lib/types/callbackHandlers';
	import type { DatepickerMode, FocusStyle } from '$lib/types/propOptions';

	dayjs.extend(localeData);

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type DatepickerProps = {
		// 基本プロパティ
		value: Date | { start: Date; end: Date } | undefined;
		format?: string;
		placeholder?: string;
		locale?: 'en' | 'ja' | 'fr' | 'de' | 'es' | 'zh-cn';
		rangeSeparator?: string;

		// HTML属性系
		id?: string;
		inputAttributes?: HTMLInputAttributes | undefined;

		// スタイル/レイアウト
		inline?: boolean;
		focusStyle?: FocusStyle;
		fullWidth?: boolean;
		width?: string | number | null;
		minWidth?: string | number | null;
		maxWidth?: string | number | null;
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
		readonly?: boolean;
		mode?: DatepickerMode;
		enableTextInput?: boolean;
		enableClickToOpen?: boolean;
		minDate?: Date;
		maxDate?: Date;

		// 入力イベント
		onchange?: BivariantValueHandler<Date | { start: Date; end: Date } | undefined>;
		oninput?: BivariantValueHandler<string>;

		// フォーカスイベント
		onfocus?: FocusHandler;
		onblur?: FocusHandler;
		onkeydown?: KeyboardHandler;
		onkeyup?: KeyboardHandler;
		onclick?: MouseHandler;
		onmousedown?: MouseHandler;
		onmouseup?: MouseHandler;
		onmouseenter?: MouseHandler;
		onmouseleave?: MouseHandler;
		onmouseover?: MouseHandler;
		onmouseout?: MouseHandler;
		oncontextmenu?: MouseHandler;
		onauxclick?: MouseHandler;
		ontouchstart?: TouchHandler;
		ontouchend?: TouchHandler;
		ontouchmove?: TouchHandler;
		ontouchcancel?: TouchHandler;
		onpointerdown?: PointerHandler;
		onpointerup?: PointerHandler;
		onpointerenter?: PointerHandler;
		onpointerleave?: PointerHandler;
		onpointermove?: PointerHandler;
		onpointercancel?: PointerHandler;

		// その他
		[key: string]: any;
	};

	let {
		// 基本プロパティ
		value = $bindable(),
		format,
		placeholder = '',
		locale,
		rangeSeparator = ' - ',

		// HTML属性系
		id = `datepicker-${Math.random().toString(36).substring(2, 15)}`,
		inputAttributes,

		// スタイル/レイアウト
		inline = false,
		focusStyle = 'outline',
		fullWidth = false,
		width,
		minWidth,
		maxWidth,
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
		readonly = false,
		mode = 'single',
		enableTextInput = false,
		enableClickToOpen = true,
		minDate,
		maxDate,

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
	}: DatepickerProps = $props();

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let inputRef: any = $state();
	let containerElement: HTMLDivElement | undefined = $state();
	let popupRef: SvelteComponent | undefined = $state();
	let datapickerCalendarRef: SvelteComponent | undefined = $state();
	let openedViaKeyboard: boolean = $state(false);
	let displayValue = $state('');

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
	const resolvedLocale = $derived(locale ?? getLocale());

	$effect(() => {
		// range モードのときは、value を「start <= end」の順序に正規化
		if (mode === 'range' && value && 'start' in value && 'end' in value) {
			const startDay = dayjs(value.start).locale(resolvedLocale);
			const endDay = dayjs(value.end).locale(resolvedLocale);
			if (startDay.isAfter(endDay)) {
				value = { start: value.end, end: value.start };
			}
		}
	});

	$effect(() => {
		const formatWithLocale = (date: Date) => dayjs(date).locale(resolvedLocale).format(finalFormat);

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
		if (value && !readonly) {
			if (mode === 'range' && typeof value === 'object' && 'start' in value && 'end' in value) {
				const startDate = dayjs(value.start).locale(resolvedLocale).format(finalFormat);
				const endDate = dayjs(value.end).locale(resolvedLocale).format(finalFormat);
				announceToScreenReader(`Date range selected: ${startDate} to ${endDate}`);
			} else if (value instanceof Date) {
				const formattedDate = dayjs(value).locale(resolvedLocale).format(finalFormat);
				announceToScreenReader(`Date selected: ${formattedDate}`);
			}
		}

		if (!readonly) {
			onchange(value);
		}

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
		if (disabled || readonly) return;
		if (enableClickToOpen) {
			const isOpen = popupRef?.getIsOpen && popupRef.getIsOpen();
			if (isOpen) {
				close();
			} else {
				openedViaKeyboard = false;
				open();
			}
		}
		onclick?.(event);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (disabled || readonly) return;
		onkeydown(event);

		// enableTextInput のときは、カーソルキー系は Input 内のキャレット移動に使わせたいので、
		// カレンダー用のグローバル keydown まで届かないようにここで止める
		if (enableTextInput) {
			if (
				event.key === 'ArrowUp' ||
				event.key === 'ArrowDown' ||
				event.key === 'ArrowLeft' ||
				event.key === 'ArrowRight' ||
				event.key === 'Home' ||
				event.key === 'End' ||
				event.key === 'PageUp' ||
				event.key === 'PageDown'
			) {
				event.stopPropagation();
				return;
			}
			if (event.key === 'Enter') {
				// Enter も Input 側で確定に使われるので、カレンダーに伝播させない
				event.stopPropagation();
				return;
			}
		}

		switch (event.key) {
			case 'Enter':
			case ' ':
				// 既にポップアップが開いている場合は、Datepicker 側では何もせず
				// Calendar 側のキーボード処理に任せる
				if (popupRef?.getIsOpen && popupRef.getIsOpen()) {
					return;
				}
				// enableTextInput=false で、まだポップアップが開いていない場合のみ
				// Enter/Space でポップアップを開く
				event?.preventDefault?.();
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
		if (disabled || readonly) return;
		onkeyup(event);
	};

	const handleInput = (inputValue: string | number) => {
		if (disabled || readonly) return;
		oninput?.(String(inputValue));
	};

	// マウスイベント
	const handleMouseDown = (event: MouseEvent) => {
		if (disabled || readonly) return;
		// 入力もクリックによるオープンも無効な場合は、クリックでフォーカススタイルが出ないようにする
		if (!enableTextInput && !enableClickToOpen) {
			event.preventDefault();
		}
		onmousedown?.(event);
	};

	const handleMouseUp = (event: MouseEvent) => {
		if (disabled || readonly) return;
		onmouseup?.(event);
	};

	const handleMouseEnter = (event: MouseEvent) => {
		if (disabled || readonly) return;
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
		// Popupの外側クリック機能に依存するため、ここでは自動クローズしない
		// フォーカスイベントのみをハンドルする
		onblur(event);
	};

	const handleInputChange = (inputValue: string | number | undefined) => {
		if (disabled) return;
		if (!enableTextInput) return;

		const inputStr = String(inputValue ?? '').trim();

		// 空文字列の場合は値をクリア
		if (!inputStr) {
			value = undefined;
			onchange(value);
			return;
		}

		// 日付パース処理
		if (mode === 'range') {
			const parsedRange = parseRangeInput(inputStr, resolvedLocale);
			if (!parsedRange) return;

			value = parsedRange;
			onchange(value);
			return;
		}

		// single モードでは先頭の「日付本体」のみを解釈する
		const parsedSingle = parseSingleInput(inputStr, resolvedLocale);
		if (!parsedSingle) return;

		value = parsedSingle;
		onchange(value);
	};

	const parseSingleInput = (inputStr: string, locale: string): Date | null => {
		const parseFormat = currentLocaleConfig.defaultFormat;
		const datePart = extractDatePart(inputStr);
		const parsedDate = dayjs(datePart, parseFormat, locale, true);
		if (!parsedDate.isValid()) return null;
		return parsedDate.toDate();
	};

	const parseRangeInput = (inputStr: string, locale: string): { start: Date; end: Date } | null => {
		const parseFormat = currentLocaleConfig.rangeFormat;
		const dateLikeParts = inputStr.match(/[0-9０-９./-]+/g) ?? [];

		if (dateLikeParts.length < 2) {
			return null;
		}

		const startRaw = extractDatePart(dateLikeParts[0]);
		const endRaw = extractDatePart(dateLikeParts[1]);

		const startParsed = dayjs(startRaw, parseFormat, locale, true);
		const endParsed = dayjs(endRaw, parseFormat, locale, true);

		if (!startParsed.isValid() || !endParsed.isValid()) {
			return null;
		}

		const startDate = startParsed.toDate();
		const endDate = endParsed.toDate();

		// start > end の場合はここで入れ替えて正規化して返す
		return startDate <= endDate
			? { start: startDate, end: endDate }
			: { start: endDate, end: startDate };
	};

	const extractDatePart = (raw: string): string => {
		// 入力値のうち「日付として有効な部分」（数字と区切り記号）だけを抽出してパースする。
		// 曜日やカッコなどの装飾はここで無視される。
		const trimmed = raw.trim();
		const match = trimmed.match(/^[0-9０-９./-]+/);
		return match ? match[0] : trimmed;
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
	const calendarId = $derived(`${id}-calendar`);
	const currentLocaleConfig = $derived(localeConfig[resolvedLocale]);
	const finalFormat = $derived(
		format ||
			(mode === 'range' ? currentLocaleConfig.rangeFormat : currentLocaleConfig.defaultFormat)
	);
	const placeholderText = $derived(
		enableTextInput
			? placeholder || currentLocaleConfig.directInputPlaceholder
			: placeholder || currentLocaleConfig.notSelected
	);
</script>

<div
	bind:this={containerElement}
	class="datepicker"
	class:datepicker--full-width={fullWidth}
	data-testid="datepicker"
>
	<Input
		bind:this={inputRef}
		value={displayValue}
		{inline}
		{focusStyle}
		{fullWidth}
		{width}
		{minWidth}
		{maxWidth}
		{rounded}
		{disabled}
		readonly={readonly || !enableTextInput}
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
	position="bottom"
	margin={4}
	onOpen={handlePopupOpen}
	onClose={handlePopupClose}
	id={id ? `${id}-popup` : undefined}
>
	<DatepickerCalendar
		bind:this={datapickerCalendarRef}
		bind:value
		{mode}
		onchange={handleChange}
		{minDate}
		{maxDate}
		locale={resolvedLocale}
		id={calendarId}
	/>
</Popup>

<style lang="scss">
	.datepicker {
		position: relative;
		display: inline-block;
		width: auto;
		vertical-align: top;

		&.datepicker--full-width {
			display: block;
			width: 100%;
		}
	}

	/* Datepicker uses a readonly Input when allowDirectInput is false.
	 * Background behavior for readonly inputs is now handled globally in Input. */
</style>
