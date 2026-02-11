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
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/icon';
	import type {
		BivariantValueHandler,
		FocusHandler,
		KeyboardHandler,
		MouseHandler,
		TouchHandler,
		PointerHandler
	} from '$lib/types/eventHandlers';

	dayjs.extend(localeData);

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	export type DatepickerProps = {
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
		inline?: boolean;
		focusStyle?: 'background' | 'outline' | 'none';
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
		/** テキスト入力を許可するか */
		allowTextInput?: boolean;
		/** クリック時にポップアップを開くか */
		openOnClick?: boolean;
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
		nullString = '',
		locale = 'en',
		rangeSeparator = ' - ',

		// HTML属性系
		id = `datepicker-${Math.random().toString(36).substring(2, 15)}`,
		inputAttributes,

		// スタイル/レイアウト
		inline = false,
		focusStyle = 'outline',
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
		allowTextInput = false,
		openOnClick = true,
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

	const calendarId = `${id}-calendar`;

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
		if (openOnClick) {
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
				// テキスト入力が許可されている場合はEnterキーで入力を確定
				if (allowTextInput && event.key === 'Enter') {
					return; // Inputコンポーネントの処理に任せる
				}
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
		if (disabled) return;
		onkeyup(event);
	};

	const handleInput = (inputValue: string | number) => {
		if (disabled) return;
		oninput?.(String(inputValue));
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
		// Popupの外側クリック機能に依存するため、ここでは自動クローズしない
		// フォーカスイベントのみをハンドルする
		onblur(event);
	};

	const handleInputChange = (inputValue: string | number | undefined) => {
		if (disabled) return;
		if (!allowTextInput) return;

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
		allowTextInput
			? nullString || currentLocaleConfig.directInputPlaceholder
			: nullString || currentLocaleConfig.notSelected
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
		{rounded}
		{disabled}
		readonly={!allowTextInput}
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
		{locale}
		id={calendarId}
	/>
</Popup>

<style lang="scss">
	.datepicker {
		position: relative;
		display: inline-block;
		width: auto;

		&.datepicker--full-width {
			display: block;
			width: 100%;
		}
	}

	/* Datepicker uses a readonly Input when allowDirectInput is false.
	 * Background behavior for readonly inputs is now handled globally in Input. */
</style>
