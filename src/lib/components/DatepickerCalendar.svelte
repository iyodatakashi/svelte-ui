<script lang="ts">
	import dayjs from 'dayjs';
	import localeData from 'dayjs/plugin/localeData';
	import 'dayjs/locale/ja';
	import 'dayjs/locale/en';
	import 'dayjs/locale/ko';
	import 'dayjs/locale/zh-cn';
	import IconButton from './IconButton.svelte';
	import { onMount } from 'svelte';
	import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
	import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

	dayjs.extend(localeData);
	let {
		value = $bindable(),
		isDateRange = false,
		onchange = () => {},
		minDate,
		maxDate,
		id,
		locale = 'ja'
	}: {
		value: Date | { start: Date; end: Date } | undefined;
		isDateRange?: boolean;
		onchange: Function;
		minDate?: Date;
		maxDate?: Date;
		id?: string;
		locale?: 'ja' | 'en' | 'ko' | 'zh-cn';
	} = $props();
	let month: dayjs.Dayjs = $state(dayjs());
	let focusedDate: dayjs.Dayjs = $state(dayjs());
	let isCalendarFocused: boolean = $state(false);

	dayjs.extend(isSameOrBefore);
	dayjs.extend(isSameOrAfter);

	// 言語別設定
	const localeConfig = {
		ja: {
			monthFormat: 'YYYY年M月',
			calendarLabel: 'のカレンダー',
			prevMonthLabel: '前の月へ移動',
			nextMonthLabel: '次の月へ移動',
			todayLabel: ' 今日',
			selectedLabel: ' 選択済み'
		},
		en: {
			monthFormat: 'MMMM YYYY',
			calendarLabel: ' calendar',
			prevMonthLabel: 'Previous month',
			nextMonthLabel: 'Next month',
			todayLabel: ' today',
			selectedLabel: ' selected'
		},
		ko: {
			monthFormat: 'YYYY년 M월',
			calendarLabel: ' 달력',
			prevMonthLabel: '이전 달',
			nextMonthLabel: '다음 달',
			todayLabel: ' 오늘',
			selectedLabel: ' 선택됨'
		},
		'zh-cn': {
			monthFormat: 'YYYY年M月',
			calendarLabel: '日历',
			prevMonthLabel: '上个月',
			nextMonthLabel: '下个月',
			todayLabel: ' 今天',
			selectedLabel: ' 已选择'
		}
	};

	const currentLocaleConfig = $derived(localeConfig[locale]);

	// dayjsのlocaleを設定
	$effect(() => {
		dayjs.locale(locale);
	});

	const startDate = $derived(month.startOf('month').startOf('week'));
	const endDate = $derived(month.endOf('month').endOf('week'));

	// 曜日配列を動的に生成
	const DAY_ARRAY = $derived.by(() => {
		dayjs.locale(locale);
		return dayjs.weekdaysMin();
	});

	let isSelectingStart: boolean = $state(true);
	let calendarRef: HTMLDivElement | undefined = $state();
	onMount(() => {
		reset();
		// 初期フォーカス日を設定
		if (value) {
			if (isDateRange && value && 'start' in value && 'end' in value) {
				focusedDate = dayjs(value.start);
			} else if (!isDateRange && value instanceof Date) {
				focusedDate = dayjs(value);
			}
		} else {
			focusedDate = dayjs();
		}
	});

	export const reset = () => {
		if (isDateRange && value && 'start' in value && 'end' in value) {
			month = value ? dayjs(value.start).startOf('month') : dayjs().startOf('month');
			focusedDate = value ? dayjs(value.start) : dayjs();
		} else if (!isDateRange && value && value instanceof Date) {
			month = value ? dayjs(value).startOf('month') : dayjs().startOf('month');
			focusedDate = value ? dayjs(value) : dayjs();
		} else {
			month = dayjs().startOf('month');
			focusedDate = dayjs();
		}
	};

	// フォーカス管理
	export const focusCalendar = () => {
		isCalendarFocused = true;
		calendarRef?.focus();
	};

	// キーボードナビゲーション関数
	const moveDay = (direction: number) => {
		const newDate = focusedDate.add(direction, 'day');
		focusedDate = newDate;

		// 月が変わった場合は表示月も変更
		if (newDate.month() !== month.month()) {
			month = newDate.startOf('month');
		}
	};

	const moveWeek = (direction: number) => {
		const newDate = focusedDate.add(direction * 7, 'day');
		focusedDate = newDate;

		// 月が変わった場合は表示月も変更
		if (newDate.month() !== month.month()) {
			month = newDate.startOf('month');
		}
	};

	const moveToStartOfWeek = () => {
		focusedDate = focusedDate.startOf('week');
	};

	const moveToEndOfWeek = () => {
		focusedDate = focusedDate.endOf('week');
	};

	const moveMonth = (direction: number) => {
		const newDate = focusedDate.add(direction, 'month');
		focusedDate = newDate;
		month = newDate.startOf('month');
	};

	const selectFocusedDate = () => {
		if (isOutOfRange(focusedDate)) return;
		selectDate(focusedDate);
	};

	// キーボードイベントハンドラ
	const handleKeyDown = (event: KeyboardEvent) => {
		if (!isCalendarFocused) return;

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
			case 'Home':
				event.preventDefault();
				moveToStartOfWeek();
				break;
			case 'End':
				event.preventDefault();
				moveToEndOfWeek();
				break;
			case 'PageUp':
				event.preventDefault();
				moveMonth(-1);
				break;
			case 'PageDown':
				event.preventDefault();
				moveMonth(1);
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				selectFocusedDate();
				break;
			case 'Escape':
				event.preventDefault();
				isCalendarFocused = false;
				// 親コンポーネントでカレンダーを閉じる処理を想定
				break;
		}
	};

	const handleFocus = () => {
		isCalendarFocused = true;
	};

	const handleBlur = () => {
		isCalendarFocused = false;
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
	const dates: dayjs.Dayjs[] = $derived(generateDateArray(startDate, endDate));

	// 週ごとにグループ化した日付配列
	const weekRows = $derived.by(() => {
		const weeks: dayjs.Dayjs[][] = [];
		for (let i = 0; i < dates.length; i += 7) {
			weeks.push(dates.slice(i, i + 7));
		}
		return weeks;
	});
	const goPrev = () => {
		month = month.subtract(1, 'month');
	};
	const goNext = () => {
		month = month.add(1, 'month');
	};
	const isSelected = (date: dayjs.Dayjs) => {
		if (isDateRange && value && 'start' in value && 'end' in value) {
			return (
				dayjs(date).isSameOrAfter(dayjs(value.start).startOf('day')) &&
				dayjs(date).isSameOrBefore(dayjs(value.end).startOf('day'))
			);
		} else if (!isDateRange && value && value instanceof Date) {
			return dayjs(date).isSame(dayjs(value).startOf('day'));
		}
		return false;
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
		return isCalendarFocused && date.startOf('day').isSame(focusedDate.startOf('day'));
	};

	const getDateTabIndex = (date: dayjs.Dayjs) => {
		// フォーカスされた日付のみtabindex="0"、その他は"-1"
		return isFocused(date) ? 0 : -1;
	};

	const getDateId = (date: dayjs.Dayjs) => {
		return `calendar-date-${date.format('YYYY-MM-DD')}`;
	};
	const selectDate = (date: dayjs.Dayjs) => {
		if (isDateRange) {
			if (value && 'start' in value && 'end' in value) {
				// 既存の日付範囲がある場合
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
					onchange();
				}
			} else {
				// 初回選択または値がundefinedの場合
				value = { start: date.toDate(), end: date.toDate() };
				isSelectingStart = false;
			}
		} else {
			// 単一日付選択モード
			value = date.toDate();
			onchange();
		}
	};
</script>

<div
	bind:this={calendarRef}
	class="stamp-sheet"
	role="grid"
	aria-label={`${month.locale(locale).format(currentLocaleConfig.monthFormat)}${currentLocaleConfig.calendarLabel}`}
	tabindex="-1"
	onkeydown={handleKeyDown}
	onfocus={handleFocus}
	onblur={handleBlur}
	{id}
>
	<div class="header">
		<div class="prev-button-block">
			<IconButton ariaLabel={currentLocaleConfig.prevMonthLabel} onclick={goPrev}
				>chevron_left</IconButton
			>
		</div>
		<div class="month-label-block" aria-live="polite" aria-atomic="true">
			{month.locale(locale).format(currentLocaleConfig.monthFormat)}
		</div>
		<div class="next-button-block">
			<IconButton ariaLabel={currentLocaleConfig.nextMonthLabel} onclick={goNext}
				>chevron_right</IconButton
			>
		</div>
	</div>
	<div class="calendar-grid" role="grid" aria-labelledby="month-label">
		<div class="day-list" role="row">
			{#each DAY_ARRAY as day}
				<div class="day-list-item" role="columnheader">
					{day}
				</div>
			{/each}
		</div>
		<div class="date-grid">
			{#each weekRows as week}
				<div class="date-row" role="row">
					{#each week as date}
						<div
							class="date-list-item"
							class:is-selected={isSelected(date)}
							class:out-of-month={isOutOfMonth(date)}
							class:out-of-range={isOutOfRange(date)}
							class:today={isToday(date)}
							class:is-focused={isFocused(date)}
							role="gridcell"
						>
							<button
								id={getDateId(date)}
								class="date-button"
								tabindex={getDateTabIndex(date)}
								aria-current={isToday(date) ? 'date' : undefined}
								aria-pressed={isSelected(date)}
								aria-label={`${date.locale(locale).format('LL')}${isToday(date) ? currentLocaleConfig.todayLabel : ''}${isSelected(date) ? currentLocaleConfig.selectedLabel : ''}`}
								aria-disabled={isOutOfRange(date)}
								onclick={() => selectDate(date)}
								onfocus={() => {
									focusedDate = date;
								}}
							>
								{date.format('D')}
							</button>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.stamp-sheet {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 320px;
		padding: 16px;
	}
	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
	}
	.month-label-block {
		font-size: 1.4rem;
		font-weight: bold;
	}
	.day-list {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		place-items: center stretch;
	}

	.date-grid {
		display: flex;
		flex-direction: column;
	}

	.date-row {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
		place-items: center stretch;
	}
	.day-list-item,
	.date-list-item {
		display: flex;
		justify-content: center;
		padding: 2px 0;
		font-size: 1rem;
	}
	.day-list-item {
		color: var(--svelte-ui-text-subtle-color);
	}
	.date-list-item.out-of-month .date-button {
		color: var(--svelte-ui-text-subtle-color);
	}
	.date-list-item.today .date-button {
		font-weight: bold;
		color: var(--svelte-ui-primary-color);
	}
	.date-list-item.is-selected .date-button {
		background-color: var(--primary-color);
		color: var(--svelte-ui-text-reverse-color);
	}
	.date-list-item.out-of-range {
		background: var(--base-50);
		pointer-events: none;
		.date-button {
			color: var(--svelte-ui-text-subtle-color);
		}
	}

	.date-list-item.is-focused .date-button {
		outline: 2px solid var(--svelte-ui-primary-color);
		outline-offset: 2px;
	}
	.date-button {
		width: 36px;
		height: 36px;
		padding: 0;
		background: transparent;
		border: none;
		border-radius: 18px;
	}
	.date-button:hover {
		background: var(--svelte-ui-hover-overlay);
	}
</style>
