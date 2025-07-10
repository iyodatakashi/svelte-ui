<script lang="ts">
	import dayjs from 'dayjs';
	import localeData from 'dayjs/plugin/localeData';
	import 'dayjs/locale/ja';
	import 'dayjs/locale/en';
	import 'dayjs/locale/fr';
	import 'dayjs/locale/de';
	import 'dayjs/locale/es';
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
		onOpen,
		onClose,
		minDate,
		maxDate,
		id,
		locale = 'en'
	}: {
		value: Date | { start: Date; end: Date } | undefined;
		isDateRange?: boolean;
		onchange: Function;
		onOpen?: Function;
		onClose?: Function;
		minDate?: Date;
		maxDate?: Date;
		id?: string;
		locale?: 'en' | 'ja' | 'fr' | 'de' | 'es' | 'zh-cn';
	} = $props();
	let month: dayjs.Dayjs = $state(dayjs());
	let viewMode: 'date' | 'month' = $state('date');
	let selectedYearMonth: dayjs.Dayjs = $state(dayjs().startOf('month'));
	let focusedDate: dayjs.Dayjs = $state(dayjs());
	let focusedMonth: number = $state(dayjs().month());
	let isKeyboardActive: boolean = $state(false);

	dayjs.extend(isSameOrBefore);
	dayjs.extend(isSameOrAfter);

	// 言語別設定
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
	let hoveredDate: dayjs.Dayjs | null = $state(null);
	let calendarRef: HTMLDivElement | undefined = $state();
	onMount(() => {
		reset();
		selectedYearMonth = month.startOf('month');
		isKeyboardActive = false; // 初期状態はキーボード非アクティブ

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
		selectedYearMonth = month.startOf('month');
		// isKeyboardActiveはhandleCalendarCloseでリセットされるため、ここではリセットしない
	};

	// フォーカス管理（キーボードで開かれた場合）
	export const focusCalendar = () => {
		isKeyboardActive = true; // キーボードで開かれた場合はフォーカス表示を有効に
		// documentレベルでキーボードイベントを処理するため、実際のフォーカス移動は不要
	};

	// イベントハンドラー管理
	const handleCalendarOpen = () => {
		// documentレベルでキーボードイベントをリッスン
		document.addEventListener('keydown', handleKeyDown);

		// 親コンポーネントのコールバックを呼び出し
		onOpen?.();
	};

	const handleCalendarClose = () => {
		// documentレベルのキーボードイベントリスナーを削除
		document.removeEventListener('keydown', handleKeyDown);

		// 状態をリセット
		isKeyboardActive = false;

		// 親コンポーネントのコールバックを呼び出し
		onClose?.();
	};

	// 外部から呼び出し可能なメソッドとして公開
	export const handlePopupOpen = handleCalendarOpen;
	export const handlePopupClose = handleCalendarClose;

	// 年月選択モードのロジック
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

	// 月選択モードでの年の変更
	const changeYearInMonthMode = (direction: number) => {
		month = month.add(direction, 'year');
		focusedDate = focusedDate.add(direction, 'year');
	};

	// 月の名前を生成

	const monthNames = $derived.by(() => {
		dayjs.locale(locale);
		return dayjs.months();
	});

	// キーボードナビゲーション関数（document レベル対応）
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

	const moveMonth = (direction: number) => {
		const newDate = focusedDate.add(direction, 'month');
		focusedDate = newDate;
		month = newDate.startOf('month');
	};

	const moveMonthInSelection = (direction: number) => {
		let newMonth = focusedMonth + direction;
		let yearChange = 0;

		// 年の境界を越えた場合の処理
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

		// フォーカスされた月を更新
		focusedMonth = newMonth;

		// 年が変わった場合は表示年も更新
		if (yearChange !== 0) {
			month = month.add(yearChange, 'year');
			focusedDate = focusedDate.add(yearChange, 'year');
		}
	};

	const selectFocusedDate = () => {
		if (isOutOfRange(focusedDate)) return;
		selectDate(focusedDate);
	};

	// キーボードイベントハンドラ（document レベル）
	const handleKeyDown = (event: KeyboardEvent) => {
		// イベントハンドラーが登録されているときのみ有効（PopupMenuと同様）

		// キーボード操作があった時にフォーカス表示を有効にする
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
			// 月選択モード
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
			// 日付選択モード
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
					// 親コンポーネントでカレンダーを閉じる処理を想定
					break;
			}
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

	// 範囲プレビュー中かどうかの判定
	const isRangePreviewActive = $derived(
		isDateRange && !isSelectingStart && hoveredDate && value && 'start' in value && 'end' in value
	);

	// 期間選択の範囲表示用の判定関数（範囲プレビュー中は無効化）
	const isRangeStart = (date: dayjs.Dayjs) => {
		if (!isDateRange || !value || !('start' in value && 'end' in value)) return false;
		if (isRangePreviewActive) return false; // 範囲プレビュー中は無効化
		return dayjs(date).isSame(dayjs(value.start).startOf('day'));
	};

	const isRangeEnd = (date: dayjs.Dayjs) => {
		if (!isDateRange || !value || !('start' in value && 'end' in value)) return false;
		if (isRangePreviewActive) return false; // 範囲プレビュー中は無効化
		return dayjs(date).isSame(dayjs(value.end).startOf('day'));
	};

	const isRangeMiddle = (date: dayjs.Dayjs) => {
		if (!isDateRange || !value || !('start' in value && 'end' in value)) return false;
		if (isRangePreviewActive) return false; // 範囲プレビュー中は無効化
		return isSelected(date) && !isRangeStart(date) && !isRangeEnd(date);
	};

	const isRangeSingle = (date: dayjs.Dayjs) => {
		if (!isDateRange || !value || !('start' in value && 'end' in value)) return false;
		if (isRangePreviewActive) return false; // 範囲プレビュー中は無効化
		return isRangeStart(date) && isRangeEnd(date);
	};

	// 日付範囲プレビュー用の判定関数
	const isRangePreviewStart = (date: dayjs.Dayjs) => {
		if (!isDateRange || !hoveredDate || !value || !('start' in value && 'end' in value))
			return false;
		if (isSelectingStart) return false; // 最初の選択時はプレビューなし

		const startDate = dayjs(value.start).startOf('day');
		const endDate = hoveredDate.startOf('day');

		// プレビューの開始日と終了日が同じ場合は無効化
		if (startDate.isSame(endDate)) return false;

		// 正しい順序で範囲を設定
		const actualStart = startDate.isSameOrBefore(endDate) ? startDate : endDate;

		return dayjs(date).isSame(actualStart);
	};

	const isRangePreviewEnd = (date: dayjs.Dayjs) => {
		if (!isDateRange || !hoveredDate || !value || !('start' in value && 'end' in value))
			return false;
		if (isSelectingStart) return false; // 最初の選択時はプレビューなし

		const startDate = dayjs(value.start).startOf('day');
		const endDate = hoveredDate.startOf('day');

		// プレビューの開始日と終了日が同じ場合は無効化
		if (startDate.isSame(endDate)) return false;

		// 正しい順序で範囲を設定
		const actualEnd = startDate.isSameOrBefore(endDate) ? endDate : startDate;

		return dayjs(date).isSame(actualEnd);
	};

	const isRangePreviewMiddle = (date: dayjs.Dayjs) => {
		if (!isDateRange || !hoveredDate || !value || !('start' in value && 'end' in value))
			return false;
		if (isSelectingStart) return false; // 最初の選択時はプレビューなし

		const startDate = dayjs(value.start).startOf('day');
		const endDate = hoveredDate.startOf('day');

		// プレビューの開始日と終了日が同じ場合は無効化
		if (startDate.isSame(endDate)) return false;

		// 正しい順序で範囲を設定
		const actualStart = startDate.isSameOrBefore(endDate) ? startDate : endDate;
		const actualEnd = startDate.isSameOrBefore(endDate) ? endDate : startDate;

		return dayjs(date).isAfter(actualStart) && dayjs(date).isBefore(actualEnd);
	};

	const isRangePreviewSingle = (date: dayjs.Dayjs) => {
		if (!isDateRange || !hoveredDate || !value || !('start' in value && 'end' in value))
			return false;
		if (isSelectingStart) return false; // 最初の選択時はプレビューなし

		const startDate = dayjs(value.start).startOf('day');
		const endDate = hoveredDate.startOf('day');

		// プレビューの開始日と終了日が同じ場合
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

	// フォーカス表示用の計算プロパティ
	const focusedDateKey = $derived(
		isKeyboardActive ? focusedDate.startOf('day').format('YYYY-MM-DD') : null
	);

	// フォーカス表示関数
	const isFocused = (date: dayjs.Dayjs) => {
		const dateKey = date.startOf('day').format('YYYY-MM-DD');
		const result = focusedDateKey === dateKey;
		return result;
	};

	const getDateId = (date: dayjs.Dayjs) => {
		return `calendar-date-${date.format('YYYY-MM-DD')}`;
	};

	// マウスホバー処理
	const handleMouseEnter = (date: dayjs.Dayjs) => {
		if (!isDateRange || isOutOfRange(date)) return;
		hoveredDate = date;
	};

	const handleMouseLeave = () => {
		hoveredDate = null;
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
	class="datepicker-calendar"
	role="grid"
	aria-label={`${month.locale(locale).format(currentLocaleConfig.monthFormat)}${currentLocaleConfig.calendarLabel}`}
	{id}
>
	<div class="header">
		<div class="prev-button-block">
			<IconButton ariaLabel={currentLocaleConfig.prevMonthLabel} onclick={goPrev}
				>chevron_left</IconButton
			>
		</div>
		<button
			class="month-label-button"
			aria-live="polite"
			aria-atomic="true"
			onclick={(event) => {
				event.stopPropagation();
				isKeyboardActive = false; // マウスクリック時はフォーカス表示をリセット
				toggleMonthMode();
			}}
		>
			{#if viewMode === 'month'}
				{month.locale(locale).format(currentLocaleConfig.yearFormat)}
			{:else}
				{month.locale(locale).format(currentLocaleConfig.monthFormat)}
			{/if}
		</button>
		<div class="next-button-block">
			<IconButton ariaLabel={currentLocaleConfig.nextMonthLabel} onclick={goNext}
				>chevron_right</IconButton
			>
		</div>
	</div>

	{#if viewMode === 'month'}
		<div class="month-selection-container">
			<div class="month-selection-grid">
				{#each monthNames as monthName, index}
					<button
						class="month-button"
						class:is-current={index === dayjs().month() && month.year() === dayjs().year()}
						class:is-selected={month
							.month(index)
							.startOf('month')
							.isSame(selectedYearMonth, 'month')}
						class:is-focused={isKeyboardActive && index === focusedMonth}
						onclick={(event) => {
							event.stopPropagation();
							focusedMonth = index;
							isKeyboardActive = false; // マウスクリック時はフォーカス表示をリセット
							selectMonth(index);
						}}
					>
						{monthName}
					</button>
				{/each}
			</div>
		</div>
	{:else}
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
								class:is-selected={!isDateRange && isSelected(date)}
								class:is-range-start={isRangeStart(date)}
								class:is-range-end={isRangeEnd(date)}
								class:is-range-middle={isRangeMiddle(date)}
								class:is-range-single={isRangeSingle(date)}
								class:is-range-preview-start={isRangePreviewStart(date)}
								class:is-range-preview-end={isRangePreviewEnd(date)}
								class:is-range-preview-middle={isRangePreviewMiddle(date)}
								class:is-range-preview-single={isRangePreviewSingle(date)}
								class:out-of-month={isOutOfMonth(date)}
								class:out-of-range={isOutOfRange(date)}
								class:today={isToday(date)}
								class:is-focused={focusedDateKey === date.startOf('day').format('YYYY-MM-DD')}
								role="gridcell"
							>
								<button
									id={getDateId(date)}
									class="date-button"
									aria-current={isToday(date) ? 'date' : undefined}
									aria-pressed={isSelected(date)}
									aria-label={`${date.locale(locale).format('YYYY/MM/DD')}${isToday(date) ? currentLocaleConfig.todayLabel : ''}${isSelected(date) ? currentLocaleConfig.selectedLabel : ''}`}
									aria-disabled={isOutOfRange(date)}
									onclick={() => {
										focusedDate = date;
										isKeyboardActive = false; // マウスクリック時はフォーカス表示をリセット
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

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16px;
	}

	.month-label-button {
		font-size: 1.4rem;
		font-weight: bold;
		color: var(--svelte-ui-datepicker-date-color);
		background: none;
		border: none;
		padding: 8px 12px;
		border-radius: var(--svelte-ui-border-radius);
		cursor: pointer;
		transition: background-color var(--svelte-ui-transition-duration-fast);

		&:hover {
			background-color: var(--svelte-ui-hover-overlay);
		}

		&:focus-visible {
			outline: var(--svelte-ui-focus-outline);
			outline-offset: var(--svelte-ui-focus-outline-offset);
		}
	}

	.month-selection-container {
		padding: 8px 0;
	}

	.month-selection-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 8px;
	}

	.month-button {
		padding: 12px 8px;
		border-radius: var(--svelte-ui-border-radius);
		background: var(--svelte-ui-surface-color);
		color: var(--svelte-ui-datepicker-date-color);
		font-size: 1rem;
		cursor: pointer;
		transition: all var(--svelte-ui-transition-duration-fast);

		&:hover {
			background-color: var(--svelte-ui-hover-overlay);
		}

		&:focus-visible {
			outline: var(--svelte-ui-focus-outline);
			outline-offset: var(--svelte-ui-focus-outline-offset);
		}

		&.is-current {
			font-weight: bold;
			color: var(--svelte-ui-datepicker-current-color);
		}

		&.is-selected {
			background-color: var(--svelte-ui-datepicker-selected-color);
			color: var(--svelte-ui-datepicker-selected-text-color);
			border-color: var(--svelte-ui-datepicker-selected-color);
		}

		&.is-focused {
			outline: var(--svelte-ui-focus-outline);
			outline-offset: var(--svelte-ui-focus-outline-offset);
		}
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
		color: var(--svelte-ui-datepicker-day-label-color);
	}

	.date-list-item .date-button {
		color: var(--svelte-ui-datepicker-date-color);
	}

	.date-list-item.out-of-month .date-button {
		color: var(--svelte-ui-datepicker-out-of-month-color);
	}
	.date-list-item.today .date-button {
		font-weight: bold;
		color: var(--svelte-ui-datepicker-today-color);
	}
	.date-list-item.is-selected .date-button {
		background-color: var(--svelte-ui-datepicker-selected-color);
		color: var(--svelte-ui-datepicker-selected-text-color);
	}

	/* 期間選択の帯状表示 */
	.date-list-item.is-range-start,
	.date-list-item.is-range-end,
	.date-list-item.is-range-middle,
	.date-list-item.is-range-single,
	.date-list-item.is-range-preview-start,
	.date-list-item.is-range-preview-end,
	.date-list-item.is-range-preview-middle,
	.date-list-item.is-range-preview-single {
		position: relative;
	}

	.date-list-item.is-range-start::before,
	.date-list-item.is-range-end::before,
	.date-list-item.is-range-middle::before,
	.date-list-item.is-range-preview-start::before,
	.date-list-item.is-range-preview-end::before,
	.date-list-item.is-range-preview-middle::before {
		content: '';
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		height: 36px;
		background-color: var(--svelte-ui-select-overlay);
		z-index: 0;
	}

	/* 範囲プレビュー用の背景色調整 */
	.date-list-item.is-range-preview-start::before,
	.date-list-item.is-range-preview-end::before,
	.date-list-item.is-range-preview-middle::before,
	.date-list-item.is-range-preview-single::before {
		background-color: var(--svelte-ui-hover-overlay);
	}

	/* 範囲開始日 */
	.date-list-item.is-range-start::before,
	.date-list-item.is-range-preview-start::before {
		left: 50%;
		right: 0;
	}

	/* 範囲終了日 */
	.date-list-item.is-range-end::before,
	.date-list-item.is-range-preview-end::before {
		left: 0;
		right: 50%;
	}

	/* 範囲中間日 */
	.date-list-item.is-range-middle::before,
	.date-list-item.is-range-preview-middle::before {
		left: 0;
		right: 0;
		border-radius: 0;
	}

	/* 単一日選択（開始日と終了日が同じ） */
	.date-list-item.is-range-single::before,
	.date-list-item.is-range-preview-single::before {
		display: none;
	}

	/* 範囲内の日付ボタンスタイル */
	.date-list-item.is-range-start .date-button,
	.date-list-item.is-range-end .date-button,
	.date-list-item.is-range-single .date-button {
		background-color: var(--svelte-ui-datepicker-range-color);
		color: var(--svelte-ui-datepicker-selected-text-color);
		font-weight: bold;
		z-index: 1;
		position: relative;
	}

	.date-list-item.is-range-middle .date-button {
		background-color: transparent;
		color: var(--svelte-ui-datepicker-date-color); // 今日も黒にする
		z-index: 1;
		position: relative;
	}

	/* 範囲プレビュー用のボタンスタイル */
	.date-list-item.is-range-preview-start .date-button,
	.date-list-item.is-range-preview-end .date-button,
	.date-list-item.is-range-preview-single .date-button {
		background-color: var(--svelte-ui-datepicker-range-color);
		color: var(--svelte-ui-datepicker-selected-text-color);
		font-weight: bold;
		z-index: 1;
		position: relative;
	}

	.date-list-item.is-range-preview-middle .date-button {
		background-color: transparent;
		z-index: 1;
		position: relative;
	}
	.date-list-item.out-of-range {
		background: var(--base-50);
		pointer-events: none;
		.date-button {
			color: var(--svelte-ui-datepicker-out-of-month-color);
		}
	}

	.date-button:focus-visible {
		outline: var(--svelte-ui-focus-outline);
		outline-offset: var(--svelte-ui-focus-outline-offset);
	}

	.date-list-item.is-focused .date-button {
		outline: var(--svelte-ui-focus-outline);
		outline-offset: var(--svelte-ui-focus-outline-offset);
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
