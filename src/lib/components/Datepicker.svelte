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

	dayjs.extend(localeData);
	let {
		value = $bindable(),
		variant = 'default',
		format,
		nullString = '',
		isDateRange = false,
		showIcon = false,
		disabled = false,
		focusStyle = 'border',
		allowDirectInput = false,
		fullWidth = false,
		rounded = false,
		onchange = () => {},
		onfocus = () => {},
		onblur = () => {},
		openIfClicked = true,
		minDate,
		maxDate,
		locale = 'en',
		...restProps
	}: {
		value: Date | { start: Date; end: Date } | undefined;
		variant?: 'default' | 'inline';
		format?: string;
		nullString?: string;
		isDateRange?: boolean;
		showIcon?: boolean;
		disabled?: boolean;
		focusStyle?: 'background' | 'border' | 'none';
		allowDirectInput?: boolean;
		fullWidth?: boolean;
		rounded?: boolean;
		onchange?: Function;
		onfocus?: Function;
		onblur?: Function;
		openIfClicked?: boolean;
		minDate?: Date;
		maxDate?: Date;
		locale?: 'en' | 'ja' | 'fr' | 'de' | 'es' | 'zh-cn';
		[key: string]: any;
	} = $props();
	let inputRef: any = $state();
	let containerElement: HTMLDivElement | undefined = $state();
	let popupRef: SvelteComponent | undefined = $state();
	let datapickerCalendarRef: SvelteComponent | undefined = $state();
	let openedViaKeyboard: boolean = $state(false);
	const calendarId = `datepicker-calendar-${Math.random().toString(36).substring(2, 15)}`;

	// 言語別設定
	const localeConfig = {
		en: {
			defaultFormat: 'MM/DD/YYYY (ddd)',
			selectDateLabel: 'Select a date. Current value:',
			notSelected: 'Not selected',
			directInputPlaceholder: 'Enter date'
		},
		ja: {
			defaultFormat: 'YYYY/M/D（ddd）',
			selectDateLabel: '日付を選択してください。現在の値:',
			notSelected: '未選択',
			directInputPlaceholder: '日付を入力してください'
		},
		fr: {
			defaultFormat: 'DD/MM/YYYY (ddd)',
			selectDateLabel: 'Sélectionnez une date. Valeur actuelle :',
			notSelected: 'Non sélectionné',
			directInputPlaceholder: 'Saisir la date'
		},
		de: {
			defaultFormat: 'DD.MM.YYYY (ddd)',
			selectDateLabel: 'Wählen Sie ein Datum. Aktueller Wert:',
			notSelected: 'Nicht ausgewählt',
			directInputPlaceholder: 'Datum eingeben'
		},
		es: {
			defaultFormat: 'DD/MM/YYYY (ddd)',
			selectDateLabel: 'Seleccione una fecha. Valor actual:',
			notSelected: 'No seleccionado',
			directInputPlaceholder: 'Introducir fecha'
		},
		'zh-cn': {
			defaultFormat: 'YYYY/M/D（ddd）',
			selectDateLabel: '请选择日期。当前值：',
			notSelected: '未选择',
			directInputPlaceholder: '请输入日期'
		}
	};

	// 現在のlocale設定を取得
	const currentLocaleConfig = $derived(localeConfig[locale]);
	const finalFormat = $derived(format || currentLocaleConfig.defaultFormat);

	// dayjsのlocaleを設定
	$effect(() => {
		dayjs.locale(locale);
	});
	const handleChange = () => {
		popupRef?.close();
		onchange();
	};
	const handleClick = () => {
		if (openIfClicked && !disabled) {
			openedViaKeyboard = false;
			open();
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (disabled) return;

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

	// Popupが開いた時のコールバック
	const handlePopupOpen = () => {
		// DatepickerCalendarのイベントハンドラーを有効にする
		datapickerCalendarRef?.handlePopupOpen();
		// キーボードで開いた場合は、最初のキーボード操作時にフォーカス表示が有効になる
	};

	// Popupが閉じた時のコールバック
	const handlePopupClose = () => {
		// DatepickerCalendarのイベントハンドラーを無効にする
		datapickerCalendarRef?.handlePopupClose();
		// 状態をリセット
		openedViaKeyboard = false;
	};

	// 入力欄のフォーカスハンドラー
	const handleFocus = () => {
		// キーボードでのフォーカス時のみPopupを開く
		// クリック時は handleClick で処理
		onfocus();
	};

	// 入力欄のブラーハンドラー
	const handleBlur = () => {
		// Popupのクリックアウト機能に依存するため、ここでは自動クローズしない
		// フォーカスイベントのみをハンドルする
		onblur();
	};

	// 直接入力時のハンドラー
	const handleInputChange = (inputValue: string | number | undefined) => {
		if (!allowDirectInput) return;

		const inputStr = String(inputValue || '');
		if (!inputStr) {
			value = undefined;
			onchange();
			return;
		}

		// 日付の解析を試行
		const parsedDate = dayjs(inputStr, finalFormat, locale, true);
		if (parsedDate.isValid()) {
			value = parsedDate.toDate();
			onchange();
		}
	};
	const displayValue = $derived.by(() => {
		// dayjsインスタンスの作成時にlocaleを適用
		const formatWithLocale = (date: Date) => dayjs(date).locale(locale).format(finalFormat);

		if (isDateRange && value && 'start' in value && 'end' in value) {
			return `${formatWithLocale(value.start)} - ${formatWithLocale(value.end)}`;
		} else if (!isDateRange && value && value instanceof Date) {
			return formatWithLocale(value);
		} else {
			// direct input が許可されている場合は空文字を返す（placeholderのみ表示）
			// そうでない場合は nullString または notSelected を表示
			return allowDirectInput ? '' : nullString || currentLocaleConfig.notSelected;
		}
	});
</script>

<div bind:this={containerElement} class="datepicker-container">
	<Input
		bind:this={inputRef}
		value={displayValue}
		{variant}
		{focusStyle}
		{fullWidth}
		{rounded}
		{disabled}
		readonly={!allowDirectInput}
		placeholder={allowDirectInput
			? nullString || currentLocaleConfig.directInputPlaceholder
			: nullString || currentLocaleConfig.notSelected}
		rightIcon={showIcon ? (isDateRange ? 'date_range' : 'calendar_today') : undefined}
		onRightIconClick={handleClick}
		onclick={handleClick}
		onfocus={handleFocus}
		onblur={handleBlur}
		onchange={handleInputChange}
		onkeydown={handleKeyDown}
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
		{isDateRange}
		{minDate}
		{maxDate}
		{locale}
		onchange={handleChange}
		id={calendarId}
	/>
</Popup>

<style lang="scss">
	.datepicker-container {
		position: relative;
		display: inline-block;
		width: auto;
	}
</style>
