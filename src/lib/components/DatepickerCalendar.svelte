<!-- DatepickerCalendar.svelte -->

<script lang="ts">
	import dayjs from 'dayjs';
	import localeData from 'dayjs/plugin/localeData';
	import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
	import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
	import 'dayjs/locale/ja';
	import 'dayjs/locale/en';
	import 'dayjs/locale/fr';
	import 'dayjs/locale/de';
	import 'dayjs/locale/es';
	import 'dayjs/locale/zh-cn';
	import IconButton from './IconButton.svelte';
	import { onMount } from 'svelte';

	dayjs.extend(localeData);
	dayjs.extend(isSameOrBefore);
	dayjs.extend(isSameOrAfter);

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// 基本プロパティ
		value = $bindable(),
		locale = 'en',
		minDate,
		maxDate,

		// HTML属性系
		id,

		// 状態/動作
		mode = 'single',

		// 入力イベント
		onchange = () => {}, // No params for type inference
		onOpen,
		onClose
	}: {
		// 基本プロパティ
		value: Date | { start: Date; end: Date } | undefined;
		locale?: 'en' | 'ja' | 'fr' | 'de' | 'es' | 'zh-cn';
		minDate?: Date;
		maxDate?: Date;

		// HTML属性系
		id?: string;

		// 状態/動作
		mode?: 'single' | 'range';

		// 入力イベント
		onchange: (value: Date | { start: Date; end: Date } | undefined) => void;
		onOpen?: Function;
		onClose?: Function;
	} = $props();

	let month: dayjs.Dayjs = $state(dayjs());
	let viewMode: 'date' | 'month' = $state('date');
	let selectedYearMonth: dayjs.Dayjs = $state(dayjs().startOf('month'));
	let focusedDate: dayjs.Dayjs = $state(dayjs());
	let focusedMonth: number = $state(dayjs().month());
	let isKeyboardActive: boolean = $state(false);
	let isSelectingStart: boolean = $state(true);
	let hoveredDate: dayjs.Dayjs | null = $state(null);
	let calendarRef: HTMLDivElement | undefined = $state();

	const localeConfig = {
		en: {
			monthFormat: 'MMMM YYYY',
			yearFormat: 'YYYY',
			calendarLabel: ' calendar',
			prevMonthLabel: 'Previous month',
			nextMonthLabel: 'Next month',
			todayLabel: ' today',
			selectedLabel: ' selected'
		},
		ja: {
			monthFormat: 'YYYY年M月',
			yearFormat: 'YYYY年',
			calendarLabel: 'のカレンダー',
			prevMonthLabel: '前の月へ移動',
			nextMonthLabel: '次の月へ移動',
			todayLabel: ' 今日',
			selectedLabel: ' 選択済み'
		},
		fr: {
			monthFormat: 'MMMM YYYY',
			yearFormat: 'YYYY',
			calendarLabel: ' calendrier',
			prevMonthLabel: 'Mois précédent',
			nextMonthLabel: 'Mois suivant',
			todayLabel: " aujourd'hui",
			selectedLabel: ' sélectionné'
		},
		de: {
			monthFormat: 'MMMM YYYY',
			yearFormat: 'YYYY',
			calendarLabel: ' Kalender',
			prevMonthLabel: 'Vorheriger Monat',
			nextMonthLabel: 'Nächster Monat',
			todayLabel: ' heute',
			selectedLabel: ' ausgewählt'
		},
		es: {
			monthFormat: 'MMMM YYYY',
			yearFormat: 'YYYY',
			calendarLabel: ' calendario',
			prevMonthLabel: 'Mes anterior',
			nextMonthLabel: 'Mes siguiente',
			todayLabel: ' hoy',
			selectedLabel: ' seleccionado'
		},
		'zh-cn': {
			monthFormat: 'YYYY年M月',
			yearFormat: 'YYYY年',
			calendarLabel: '日历',
			prevMonthLabel: '上个月',
			nextMonthLabel: '下个月',
			todayLabel: ' 今天',
			selectedLabel: ' 已选择'
		}
	};

	const generateDateArray = (startDate: dayjs.Dayjs, endDate: dayjs.Dayjs) => {
		let dates = [];
		let currentDate = startDate;
		while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
			dates.push(currentDate);
			currentDate = currentDate.add(1, 'day');
		}
		return dates;
	};

	// =========================================================================
	// Lifecycle
	// =========================================================================
	onMount(() => {
		reset();
		selectedYearMonth = month.startOf('month');
		isKeyboardActive = false;

		if (value) {
			if (mode === 'range' && value && 'start' in value && 'end' in value) {
				focusedDate = dayjs(value.start);
			} else if (mode === 'single' && value instanceof Date) {
				focusedDate = dayjs(value);
			}
		} else {
			focusedDate = dayjs();
		}
	});

	// =========================================================================
	// Effects
	// =========================================================================
	$effect(() => {
		dayjs.locale(locale);
	});

	// =========================================================================
	// Methods
	// =========================================================================
	export const reset = () => {
		if (mode === 'range' && value && 'start' in value && 'end' in value) {
			month = value ? dayjs(value.start).startOf('month') : dayjs().startOf('month');
			focusedDate = value ? dayjs(value.start) : dayjs();
		} else if (mode === 'single' && value && value instanceof Date) {
			month = value ? dayjs(value).startOf('month') : dayjs().startOf('month');
			focusedDate = value ? dayjs(value) : dayjs();
		} else {
			month = dayjs().startOf('month');
			focusedDate = dayjs();
		}
		selectedYearMonth = month.startOf('month');
	};

	export const focusCalendar = () => {
		isKeyboardActive = true;
	};

	const handleCalendarOpen = () => {
		document.addEventListener('keydown', handleKeyDown);
		onOpen?.();
	};

	const handleCalendarClose = () => {
		document.removeEventListener('keydown', handleKeyDown);
		isKeyboardActive = false;
		onClose?.();
	};

	export const handlePopupOpen = handleCalendarOpen;
	export const handlePopupClose = handleCalendarClose;

	const toggleMonthMode = () => {
		viewMode = viewMode === 'month' ? 'date' : 'month';
		if (viewMode === 'month') {
			focusedMonth = month.month();
		}
	};

	const selectMonth = (monthIndex: number) => {
		month = month.month(monthIndex);
		focusedDate = focusedDate.month(monthIndex);
		selectedYearMonth = month.startOf('month');
		viewMode = 'date';
	};

	const changeYearInMonthMode = (direction: number) => {
		month = month.add(direction, 'year');
		focusedDate = focusedDate.add(direction, 'year');
	};

	const moveDay = (direction: number) => {
		const newDate = focusedDate.add(direction, 'day');
		focusedDate = newDate;

		if (newDate.month() !== month.month()) {
			month = newDate.startOf('month');
		}
	};

	const moveWeek = (direction: number) => {
		const newDate = focusedDate.add(direction * 7, 'day');
		focusedDate = newDate;

		if (newDate.month() !== month.month()) {
			month = newDate.startOf('month');
		}
	};

	const moveMonth = (direction: number) => {
		const newDate = focusedDate.add(direction, 'month');
		focusedDate = newDate;
		month = newDate.startOf('month');
	};

	const moveMonthInSelection = (direction: number) => {
		let newMonth = focusedMonth + direction;
		let yearChange = 0;

		if (newMonth < 0) {
			yearChange = Math.floor(newMonth / 12);
			newMonth = newMonth % 12;
			if (newMonth < 0) {
				newMonth = 12 + newMonth;
			}
		} else if (newMonth > 11) {
			yearChange = Math.floor(newMonth / 12);
			newMonth = newMonth % 12;
		}

		focusedMonth = newMonth;

		if (yearChange !== 0) {
			month = month.add(yearChange, 'year');
			focusedDate = focusedDate.add(yearChange, 'year');
		}
	};

	const selectFocusedDate = () => {
		if (isOutOfRange(focusedDate)) return;
		selectDate(focusedDate);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (
			!isKeyboardActive &&
			(event.key === 'ArrowUp' ||
				event.key === 'ArrowDown' ||
				event.key === 'ArrowLeft' ||
				event.key === 'ArrowRight' ||
				event.key === 'PageUp' ||
				event.key === 'PageDown' ||
				event.key === 'Home' ||
				event.key === 'End')
		) {
			isKeyboardActive = true;
		}

		if (viewMode === 'month') {
			switch (event.key) {
				case 'ArrowUp':
					event.preventDefault();
					moveMonthInSelection(-3);
					break;
				case 'ArrowDown':
					event.preventDefault();
					moveMonthInSelection(3);
					break;
				case 'ArrowLeft':
					event.preventDefault();
					moveMonthInSelection(-1);
					break;
				case 'ArrowRight':
					event.preventDefault();
					moveMonthInSelection(1);
					break;
				case 'Enter':
				case ' ':
					event.preventDefault();
					selectMonth(focusedMonth);
					break;
				case 'Escape':
					event.preventDefault();
					viewMode = 'date';
					break;
			}
		} else if (viewMode === 'date') {
			switch (event.key) {
				case 'ArrowUp':
					event.preventDefault();
					moveWeek(-1);
					break;
				case 'ArrowDown':
					event.preventDefault();
					moveWeek(1);
					break;
				case 'ArrowLeft':
					event.preventDefault();
					moveDay(-1);
					break;
				case 'ArrowRight':
					event.preventDefault();
					moveDay(1);
					break;
				case 'PageUp':
					event.preventDefault();
					moveMonth(-1);
					break;
				case 'PageDown':
					event.preventDefault();
					moveMonth(1);
					break;
				case 'Home':
					event.preventDefault();
					focusedDate = focusedDate.startOf('week');
					break;
				case 'End':
					event.preventDefault();
					focusedDate = focusedDate.endOf('week');
					break;
				case 'Enter':
				case ' ':
					event.preventDefault();
					selectFocusedDate();
					break;
				case 'Escape':
					event.preventDefault();
					break;
			}
		}
	};

	const goPrev = () => {
		if (viewMode === 'month') {
			changeYearInMonthMode(-1);
		} else {
			month = month.subtract(1, 'month');
		}
	};

	const goNext = () => {
		if (viewMode === 'month') {
			changeYearInMonthMode(1);
		} else {
			month = month.add(1, 'month');
		}
	};

	const isSelected = (date: dayjs.Dayjs) => {
		if (mode === 'range' && value && 'start' in value && 'end' in value) {
			return (
				dayjs(date).isSameOrAfter(dayjs(value.start).startOf('day')) &&
				dayjs(date).isSameOrBefore(dayjs(value.end).startOf('day'))
			);
		} else if (mode === 'single' && value && value instanceof Date) {
			return dayjs(date).isSame(dayjs(value).startOf('day'));
		}
		return false;
	};

	const isRangeStart = (date: dayjs.Dayjs) => {
		if (mode !== 'range' || !value || !('start' in value && 'end' in value)) return false;
		if (isRangePreviewActive) return false;
		return dayjs(date).isSame(dayjs(value.start).startOf('day'));
	};

	const isRangeEnd = (date: dayjs.Dayjs) => {
		if (mode !== 'range' || !value || !('start' in value && 'end' in value)) return false;
		if (isRangePreviewActive) return false;
		return dayjs(date).isSame(dayjs(value.end).startOf('day'));
	};

	const isRangeMiddle = (date: dayjs.Dayjs) => {
		if (mode !== 'range' || !value || !('start' in value && 'end' in value)) return false;
		if (isRangePreviewActive) return false;
		return isSelected(date) && !isRangeStart(date) && !isRangeEnd(date);
	};

	const isRangeSingle = (date: dayjs.Dayjs) => {
		if (mode !== 'range' || !value || !('start' in value && 'end' in value)) return false;
		if (isRangePreviewActive) return false;
		return isRangeStart(date) && isRangeEnd(date);
	};

	const isRangePreviewStart = (date: dayjs.Dayjs) => {
		if (mode !== 'range' || !hoveredDate || !value || !('start' in value && 'end' in value))
			return false;
		if (isSelectingStart) return false;

		const startDate = dayjs(value.start).startOf('day');
		const endDate = hoveredDate.startOf('day');

		if (startDate.isSame(endDate)) return false;

		const actualStart = startDate.isSameOrBefore(endDate) ? startDate : endDate;

		return dayjs(date).isSame(actualStart);
	};

	const isRangePreviewEnd = (date: dayjs.Dayjs) => {
		if (mode !== 'range' || !hoveredDate || !value || !('start' in value && 'end' in value))
			return false;
		if (isSelectingStart) return false;

		const startDate = dayjs(value.start).startOf('day');
		const endDate = hoveredDate.startOf('day');

		if (startDate.isSame(endDate)) return false;

		const actualEnd = startDate.isSameOrBefore(endDate) ? endDate : startDate;

		return dayjs(date).isSame(actualEnd);
	};

	const isRangePreviewMiddle = (date: dayjs.Dayjs) => {
		if (mode !== 'range' || !hoveredDate || !value || !('start' in value && 'end' in value))
			return false;
		if (isSelectingStart) return false;

		const startDate = dayjs(value.start).startOf('day');
		const endDate = hoveredDate.startOf('day');

		if (startDate.isSame(endDate)) return false;

		const actualStart = startDate.isSameOrBefore(endDate) ? startDate : endDate;
		const actualEnd = startDate.isSameOrBefore(endDate) ? endDate : startDate;

		return dayjs(date).isAfter(actualStart) && dayjs(date).isBefore(actualEnd);
	};

	const isRangePreviewSingle = (date: dayjs.Dayjs) => {
		if (mode !== 'range' || !hoveredDate || !value || !('start' in value && 'end' in value))
			return false;
		if (isSelectingStart) return false;

		const startDate = dayjs(value.start).startOf('day');
		const endDate = hoveredDate.startOf('day');

		return startDate.isSame(endDate) && dayjs(date).isSame(startDate);
	};

	const isOutOfMonth = (date: dayjs.Dayjs) => {
		return date.month() !== month.month();
	};

	const isOutOfRange = (date: dayjs.Dayjs) => {
		return (
			(minDate && date.startOf('day').isBefore(dayjs(minDate).startOf('day'))) ||
			(maxDate && date.startOf('day').isAfter(dayjs(maxDate).startOf('day')))
		);
	};

	const isToday = (date: dayjs.Dayjs) => {
		return date.startOf('day').isSame(dayjs().startOf('day'));
	};

	const isFocused = (date: dayjs.Dayjs) => {
		const dateKey = date.startOf('day').format('YYYY-MM-DD');
		const result = focusedDateKey === dateKey;
		return result;
	};

	const getDateId = (date: dayjs.Dayjs) => {
		return `calendar-date-${date.format('YYYY-MM-DD')}`;
	};

	const handleMouseEnter = (date: dayjs.Dayjs) => {
		if (mode !== 'range' || isOutOfRange(date)) return;
		hoveredDate = date;
	};

	const handleMouseLeave = () => {
		hoveredDate = null;
	};

	const selectDate = (date: dayjs.Dayjs) => {
		if (mode === 'range') {
			if (value && 'start' in value && 'end' in value) {
				if (isSelectingStart) {
					value = { start: date.toDate(), end: date.toDate() };
					isSelectingStart = false;
				} else {
					if (date.isSameOrAfter(value.start)) {
						value = { start: value.start, end: date.toDate() };
					} else {
						value = { start: date.toDate(), end: value.start };
					}
					isSelectingStart = true;
					onchange(value);
				}
			} else {
				value = { start: date.toDate(), end: date.toDate() };
				isSelectingStart = false;
			}
		} else {
			value = date.toDate();
			onchange(value);
		}
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const currentLocaleConfig = $derived(localeConfig[locale]);
	const startDate = $derived(month.startOf('month').startOf('week'));
	const endDate = $derived(month.endOf('month').endOf('week'));
	const dates: dayjs.Dayjs[] = $derived(generateDateArray(startDate, endDate));
	const monthNames = $derived.by(() => {
		dayjs.locale(locale);
		return dayjs.months();
	});
	const DAY_ARRAY = $derived.by(() => {
		dayjs.locale(locale);
		return dayjs.weekdaysMin();
	});
	const isRangePreviewActive = $derived(
		mode === 'range' &&
			!isSelectingStart &&
			hoveredDate &&
			value &&
			'start' in value &&
			'end' in value
	);
	const focusedDateKey = $derived(
		isKeyboardActive ? focusedDate.startOf('day').format('YYYY-MM-DD') : null
	);
</script>

<div
	bind:this={calendarRef}
	class="datepicker-calendar"
	role="grid"
	aria-label={`${month.locale(locale).format(currentLocaleConfig.monthFormat)}${currentLocaleConfig.calendarLabel}`}
	{id}
>
	<div class="datepicker-calendar__header">
		<div class="prev-button-block">
			<IconButton size={36} ariaLabel={currentLocaleConfig.prevMonthLabel} onclick={goPrev}>
				chevron_left
			</IconButton>
		</div>
		<button
			class="datepicker-calendar__month-label-button"
			aria-live="polite"
			aria-atomic="true"
			onclick={(event) => {
				event.stopPropagation();
				isKeyboardActive = false;
				toggleMonthMode();
			}}
		>
			{#if viewMode === 'month'}
				{month.locale(locale).format(currentLocaleConfig.yearFormat)}
			{:else}
				{month.locale(locale).format(currentLocaleConfig.monthFormat)}
			{/if}
		</button>
		<div class="datepicker-calendar__next-button-block">
			<IconButton size={36} ariaLabel={currentLocaleConfig.nextMonthLabel} onclick={goNext}
				>chevron_right</IconButton
			>
		</div>
	</div>

	{#if viewMode === 'month'}
		<div class="datepicker-calendar__month-selection">
			<div class="datepicker-calendar__month-selection-grid">
				{#each monthNames as monthName, index}
					<button
						class="datepicker-calendar__month-button"
						class:datepicker-calendar__month-button--current={index === dayjs().month() &&
							month.year() === dayjs().year()}
						class:datepicker-calendar__month-button--selected={month
							.month(index)
							.startOf('month')
							.isSame(selectedYearMonth, 'month')}
						class:datepicker-calendar__month-button--focused={isKeyboardActive &&
							index === focusedMonth}
						onclick={(event) => {
							event.stopPropagation();
							focusedMonth = index;
							isKeyboardActive = false;
							selectMonth(index);
						}}
					>
						{monthName}
					</button>
				{/each}
			</div>
		</div>
	{:else}
		<div class="datepicker-calendar__calendar-grid" role="grid" aria-labelledby="month-label">
			<div class="datepicker-calendar__day-list" role="row">
				{#each DAY_ARRAY as day}
					<div class="datepicker-calendar__day-list-item" role="columnheader">
						{day}
					</div>
				{/each}
			</div>
			<div class="datepicker-calendar__date-grid">
				{#each dates as date}
					<div
						class="datepicker-calendar__date-item"
						class:datepicker-calendar__date-item--selected={mode === 'single' && isSelected(date)}
						class:datepicker-calendar__date-item--range-start={isRangeStart(date)}
						class:datepicker-calendar__date-item--range-end={isRangeEnd(date)}
						class:datepicker-calendar__date-item--range-middle={isRangeMiddle(date)}
						class:datepicker-calendar__date-item--range-single={isRangeSingle(date)}
						class:datepicker-calendar__date-item--range-preview-start={isRangePreviewStart(date)}
						class:datepicker-calendar__date-item--range-preview-end={isRangePreviewEnd(date)}
						class:datepicker-calendar__date-item--range-preview-middle={isRangePreviewMiddle(date)}
						class:datepicker-calendar__date-item--range-preview-single={isRangePreviewSingle(date)}
						class:datepicker-calendar__date-item--out-of-month={isOutOfMonth(date)}
						class:datepicker-calendar__date-item--out-of-range={isOutOfRange(date)}
						class:datepicker-calendar__date-item--today={isToday(date)}
						class:datepicker-calendar__date-item--focused={focusedDateKey ===
							date.startOf('day').format('YYYY-MM-DD')}
						role="gridcell"
					>
						<button
							id={getDateId(date)}
							class="datepicker-calendar__date-button"
							aria-current={isToday(date) ? 'date' : undefined}
							aria-pressed={isSelected(date)}
							aria-label={`${date.locale(locale).format('YYYY/MM/DD')}${isToday(date) ? currentLocaleConfig.todayLabel : ''}${isSelected(date) ? currentLocaleConfig.selectedLabel : ''}`}
							aria-disabled={isOutOfRange(date)}
							onclick={() => {
								focusedDate = date;
								isKeyboardActive = false;
								selectDate(date);
							}}
							onmouseenter={() => handleMouseEnter(date)}
							onmouseleave={handleMouseLeave}
						>
							{date.format('D')}
						</button>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.datepicker-calendar {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 320px;
		padding: 16px;
	}

	.datepicker-calendar__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
	}

	.datepicker-calendar__month-label-button {
		font-size: 1.4rem;
		font-weight: bold;
		color: var(--svelte-ui-datepicker-date-color);
		background: none;
		border: none;
		padding: 8px 16px;
		border-radius: var(--svelte-ui-border-radius);
		cursor: pointer;
		transition: background-color var(--svelte-ui-transition-duration);

		@media (hover: hover) {
			&:hover {
				background-color: var(--svelte-ui-hover-overlay);
			}
		}

		&:focus-visible {
			outline: var(--svelte-ui-focus-outline);
			outline-offset: var(--svelte-ui-focus-outline-offset);
		}
	}

	.datepicker-calendar__month-selection-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
	}

	.datepicker-calendar__month-button {
		padding: 8px;
		border-radius: var(--svelte-ui-border-radius);
		background-color: var(--svelte-ui-surface-color);
		color: var(--svelte-ui-datepicker-date-color);
		font-size: 1rem;
		cursor: pointer;
		transition: background-color var(--svelte-ui-transition-duration);

		@media (hover: hover) {
			&:hover {
				background-color: var(--svelte-ui-hover-overlay);
			}
		}

		&:focus-visible {
			outline: var(--svelte-ui-focus-outline);
			outline-offset: var(--svelte-ui-focus-outline-offset);
		}

		&--current {
			font-weight: bold;
			color: var(--svelte-ui-datepicker-current-color);
		}

		&--selected {
			background-color: var(--svelte-ui-datepicker-selected-color);
			color: var(--svelte-ui-datepicker-selected-text-color);
			border-color: var(--svelte-ui-datepicker-selected-color);
		}

		&--focused {
			outline: var(--svelte-ui-focus-outline);
			outline-offset: var(--svelte-ui-focus-outline-offset);
		}
	}

	.datepicker-calendar__calendar-grid {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.datepicker-calendar__day-list {
		display: flex;
		place-items: center stretch;
	}

	.datepicker-calendar__date-grid {
		display: flex;
		flex-wrap: wrap;
	}

	.datepicker-calendar__day-list-item,
	.datepicker-calendar__date-item {
		display: flex;
		justify-content: center;
		padding: 2px 0;
		font-size: 1rem;
		width: calc(100% / 7);
	}

	.datepicker-calendar__day-list-item {
		background-color: var(--svelte-ui-datepicker-day-label-bg);
		color: var(--svelte-ui-datepicker-day-label-color);
	}

	.datepicker-calendar__day-list-item:first-of-type {
		border-radius: var(--svelte-ui-datepicker-day-label-border-radius) 0 0
			var(--svelte-ui-datepicker-day-label-border-radius);
	}

	.datepicker-calendar__day-list-item:last-of-type {
		border-radius: 0 var(--svelte-ui-datepicker-day-label-border-radius)
			var(--svelte-ui-datepicker-day-label-border-radius) 0;
	}

	.datepicker-calendar__date-item .datepicker-calendar__date-button {
		color: var(--svelte-ui-datepicker-date-color);
	}

	.datepicker-calendar__date-item--out-of-month .datepicker-calendar__date-button {
		color: var(--svelte-ui-datepicker-out-of-month-text-color);
	}
	.datepicker-calendar__date-item--today .datepicker-calendar__date-button {
		font-weight: bold;
		color: var(--svelte-ui-datepicker-today-color);
	}
	.datepicker-calendar__date-item--selected .datepicker-calendar__date-button {
		background-color: var(--svelte-ui-datepicker-selected-color);
		color: var(--svelte-ui-datepicker-selected-text-color);
	}

	@media (hover: hover) {
		.datepicker-calendar__date-button:hover {
			background: var(--svelte-ui-hover-overlay);
		}
	}

	/* 期間選択の帯状表示 */
	.datepicker-calendar__date-item--range-start,
	.datepicker-calendar__date-item--range-end,
	.datepicker-calendar__date-item--range-middle,
	.datepicker-calendar__date-item--range-single,
	.datepicker-calendar__date-item--range-preview-start,
	.datepicker-calendar__date-item--range-preview-end,
	.datepicker-calendar__date-item--range-preview-middle,
	.datepicker-calendar__date-item--range-preview-single {
		position: relative;
	}

	.datepicker-calendar__date-item--range-start::before,
	.datepicker-calendar__date-item--range-end::before,
	.datepicker-calendar__date-item--range-middle::before,
	.datepicker-calendar__date-item--range-preview-start::before,
	.datepicker-calendar__date-item--range-preview-end::before,
	.datepicker-calendar__date-item--range-preview-middle::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		height: 36px;
		background-color: var(--svelte-ui-select-overlay);
		z-index: 0;
	}

	/* 範囲プレビュー用の背景色調整 */
	.datepicker-calendar__date-item--range-preview-start::before,
	.datepicker-calendar__date-item--range-preview-end::before,
	.datepicker-calendar__date-item--range-preview-middle::before,
	.datepicker-calendar__date-item--range-preview-single::before {
		background-color: var(--svelte-ui-hover-overlay);
	}

	/* 範囲開始日 */
	.datepicker-calendar__date-item--range-start::before,
	.datepicker-calendar__date-item--range-preview-start::before {
		left: 50%;
		right: 0;
	}

	/* 範囲終了日 */
	.datepicker-calendar__date-item--range-end::before,
	.datepicker-calendar__date-item--range-preview-end::before {
		left: 0;
		right: 50%;
	}

	/* 範囲中間日 */
	.datepicker-calendar__date-item--range-middle::before,
	.datepicker-calendar__date-item--range-preview-middle::before {
		left: 0;
		right: 0;
		border-radius: 0;
	}

	/* 単一日選択（開始日と終了日が同じ） */
	.datepicker-calendar__date-item--range-single::before,
	.datepicker-calendar__date-item--range-preview-single::before {
		display: none;
	}

	/* 範囲内の日付ボタンスタイル */
	.datepicker-calendar__date-item--range-start .datepicker-calendar__date-button,
	.datepicker-calendar__date-item--range-end .datepicker-calendar__date-button,
	.datepicker-calendar__date-item--range-single .datepicker-calendar__date-button {
		background-color: var(--svelte-ui-datepicker-range-color);
		color: var(--svelte-ui-datepicker-selected-text-color);
		font-weight: bold;
		z-index: 1;
		position: relative;
	}

	.datepicker-calendar__date-item--range-middle .datepicker-calendar__date-button {
		background-color: transparent;
		color: var(--svelte-ui-datepicker-date-color);
		z-index: 1;
		position: relative;
	}

	/* 範囲プレビュー用のボタンスタイル */
	.datepicker-calendar__date-item--range-preview-start .datepicker-calendar__date-button,
	.datepicker-calendar__date-item--range-preview-end .datepicker-calendar__date-button,
	.datepicker-calendar__date-item--range-preview-single .datepicker-calendar__date-button {
		background-color: var(--svelte-ui-datepicker-range-color);
		color: var(--svelte-ui-datepicker-selected-text-color);
		font-weight: bold;
		z-index: 1;
		position: relative;
	}

	.datepicker-calendar__date-item--range-preview-middle .datepicker-calendar__date-button {
		background-color: transparent;
		z-index: 1;
		position: relative;
	}
	.datepicker-calendar__date-item--out-of-range {
		background: var(--svelte-ui-datepicker-out-of-range-bg);
		pointer-events: none;
		.datepicker-calendar__date-button {
			color: var(--svelte-ui-datepicker-out-of-range-text-color);
		}
	}

	.datepicker-calendar__date-button:focus-visible {
		outline: var(--svelte-ui-focus-outline);
		outline-offset: var(--svelte-ui-focus-outline-offset);
	}

	.datepicker-calendar__date-item--focused .datepicker-calendar__date-button {
		outline: var(--svelte-ui-focus-outline);
		outline-offset: var(--svelte-ui-focus-outline-offset);
	}

	.datepicker-calendar__date-button {
		width: 36px;
		height: 36px;
		padding: 0;
		background: transparent;
		border: none;
		border-radius: 18px;
	}
</style>
