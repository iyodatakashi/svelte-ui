<script lang="ts">
	import { type SvelteComponent } from 'svelte';
	import dayjs from 'dayjs';
	import localeData from 'dayjs/plugin/localeData';
	import 'dayjs/locale/ja';
	import 'dayjs/locale/en';
	import 'dayjs/locale/ko';
	import 'dayjs/locale/zh-cn';
	import Popup from './Popup.svelte';
	import DatepickerCalendar from './DatepickerCalendar.svelte';
	import Icon from './Icon.svelte';

	dayjs.extend(localeData);
	let {
		value = $bindable(),
		variant = 'default',
		format,
		nullString = '',
		isDateRange = false,
		showCalendarIcon = false,
		showPopupIcon = false,
		disabled = false,
		onchange = () => {},
		openIfClicked = true,
		minDate,
		maxDate,
		locale = 'ja'
	}: {
		value: Date | { start: Date; end: Date } | undefined;
		variant?: 'default' | 'inline';
		format?: string;
		nullString?: string;
		isDateRange?: boolean;
		showCalendarIcon?: boolean;
		showPopupIcon?: boolean;
		disabled?: boolean;
		onchange?: Function;
		openIfClicked?: boolean;
		minDate?: Date;
		maxDate?: Date;
		locale?: 'ja' | 'en' | 'ko' | 'zh-cn';
	} = $props();
	let displayElement: HTMLButtonElement | undefined = $state();
	let anchorElement: HTMLDivElement | undefined = $state();
	let popupRef: SvelteComponent | undefined = $state();
	let datapickerCalendarRef: SvelteComponent | undefined = $state();
	let isCalendarOpen: boolean = $state(false);
	let openedViaKeyboard: boolean = $state(false);
	const calendarId = `datepicker-calendar-${Math.random().toString(36).substr(2, 9)}`;

	// 言語別設定
	const localeConfig = {
		ja: {
			defaultFormat: 'YYYY/M/D（ddd）',
			selectDateLabel: '日付を選択してください。現在の値:',
			notSelected: '未選択'
		},
		en: {
			defaultFormat: 'MM/DD/YYYY (ddd)',
			selectDateLabel: 'Select a date. Current value:',
			notSelected: 'Not selected'
		},
		ko: {
			defaultFormat: 'YYYY/M/D (ddd)',
			selectDateLabel: '날짜를 선택하세요. 현재 값:',
			notSelected: '선택되지 않음'
		},
		'zh-cn': {
			defaultFormat: 'YYYY/M/D（ddd）',
			selectDateLabel: '请选择日期。当前值：',
			notSelected: '未选择'
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
		isCalendarOpen = false;
		popupRef?.close();
		// 状態をリセット
		openedViaKeyboard = false;
		onchange();
	};
	const handleClick = () => {
		if (openIfClicked) {
			openedViaKeyboard = false;
			toggle();
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'Enter':
			case ' ':
			case 'ArrowDown':
				event.preventDefault();
				openedViaKeyboard = true;
				open();
				break;
			case 'Escape':
				if (isCalendarOpen) {
					event.preventDefault();
					close();
				}
				break;
		}
	};
	export const open = () => {
		datapickerCalendarRef?.reset();
		popupRef?.open();
		isCalendarOpen = true;
		// キーボードで開いた場合のみカレンダーにフォーカスを移動
		if (openedViaKeyboard) {
			setTimeout(() => {
				datapickerCalendarRef?.focusCalendar();
			}, 100);
		}
	};
	export const close = () => {
		popupRef?.close();
		isCalendarOpen = false;
		// キーボードで開いた場合のみボタンにフォーカスを戻す
		if (openedViaKeyboard) {
			displayElement?.focus();
		}
		// 状態をリセット
		openedViaKeyboard = false;
	};
	export const toggle = () => {
		if (isCalendarOpen) {
			close();
		} else {
			datapickerCalendarRef?.reset();
			popupRef?.toggle();
			isCalendarOpen = true;
			// キーボードで開いた場合のみカレンダーにフォーカスを移動
			if (openedViaKeyboard) {
				setTimeout(() => {
					datapickerCalendarRef?.focusCalendar();
				}, 100);
			}
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
			return nullString || currentLocaleConfig.notSelected;
		}
	});
</script>

<button
	class:inline={variant === 'inline'}
	bind:this={displayElement}
	{disabled}
	role="combobox"
	aria-haspopup="grid"
	aria-expanded={isCalendarOpen}
	aria-controls={calendarId}
	aria-label={`${currentLocaleConfig.selectDateLabel} ${displayValue || currentLocaleConfig.notSelected}`}
	onclick={handleClick}
	onkeydown={handleKeyDown}
>
	{#if showCalendarIcon}
		<div class="icon-block">
			<Icon fill={true}>calendar_today</Icon>
		</div>
	{/if}
	<div class="label-block">
		{displayValue}
	</div>
	{#if showPopupIcon}
		<div class="popup-icon-block">
			<Icon>arrow_drop_down</Icon>
		</div>
	{/if}
</button>
<div bind:this={anchorElement} class="calendar-container"></div>
<Popup bind:this={popupRef} anchorElement={displayElement}>
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
	button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 4px;
		position: relative;
		padding: inherit;
		background-color: transparent;
		font-size: inherit;
		color: inherit;
		line-height: normal;
		overflow: hidden;
	}
	button:not(.inline) {
		min-height: 36px;
		max-width: 100%;
		padding: 6px 12px;
		background-color: var(--svelte-ui-form-bg);
		box-shadow: 0 0 0 1px inset var(--svelte-ui-border-weak-color);
		border-radius: 4px;
		color: var(--svelte-ui-text-color);
		line-height: normal;
	}
	button > * {
		z-index: 1;
	}
	button:before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--svelte-ui-hover-overlay);
		opacity: 0;
		transition-property: opacity;
		transition-duration: 0.3s;
		z-index: 0;
	}
	button:hover:before {
		opacity: 1;
	}
	button:hover {
		cursor: pointer;
	}
	button[disabled] {
		opacity: 0.5;
		pointer-events: none;
	}
	.icon-block {
		margin-left: -4px;
	}
	.label-block {
		width: 100%;
	}
	.popup-icon-block {
		margin-right: -4px;
	}
	.calendar-container {
		position: absolute;
	}
	@media (width < 768px) {
		:global(.note-detail-title) {
			width: 160px;
			font-size: 1.5rem;
		}
	}
</style>
