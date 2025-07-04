<script lang="ts">
	import dayjs from 'dayjs';
	import IconButton from './IconButton.svelte';
	import { onMount } from 'svelte';
	import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
	import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
	let {
		value = $bindable(),
		isDateRange = false,
		onchange = () => {},
		minDate,
		maxDate
	}: {
		value: Date | { start: Date; end: Date } | undefined;
		isDateRange?: boolean;
		onchange: Function;
		minDate?: Date;
		maxDate?: Date;
	} = $props();
	let month: dayjs.Dayjs = $state(dayjs());
	dayjs.extend(isSameOrBefore);
	dayjs.extend(isSameOrAfter);
	const startDate = $derived(month.startOf('month').startOf('week'));
	const endDate = $derived(month.endOf('month').endOf('week'));
	const DAY_ARRAY = ['日', '月', '火', '水', '木', '金', '土'];
	let isSelectingStart: boolean = $state(true);
	onMount(() => {
		reset();
	});
	export const reset = () => {
		if (isDateRange && value && 'start' in value && 'end' in value) {
			month = value ? dayjs(value.start).startOf('month') : dayjs().startOf('month');
		} else if (!isDateRange && value && value instanceof Date) {
			month = value ? dayjs(value).startOf('month') : dayjs().startOf('month');
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

<div class="stamp-sheet">
	<div class="header">
		<div class="prev-button-block">
			<IconButton ariaLabel="前の月へ移動" onclick={goPrev}>chevron_left</IconButton>
		</div>
		<div class="month-label-block">
			{month.format('YYYY年M月')}
		</div>
		<div class="next-button-block">
			<IconButton ariaLabel="次の月へ移動" onclick={goNext}>chevron_right</IconButton>
		</div>
	</div>
	<ul class="day-list">
		{#each DAY_ARRAY as day}
			<li class="day-list-item">
				{day}
			</li>
		{/each}
	</ul>
	<ul class="date-list">
		{#each dates as date}
			<li
				class="date-list-item"
				class:is-selected={isSelected(date)}
				class:out-of-month={isOutOfMonth(date)}
				class:out-of-range={isOutOfRange(date)}
				class:today={isToday(date)}
			>
				<button class="date-button" onclick={() => selectDate(date)}>
					{date.format('D')}
				</button>
			</li>
		{/each}
	</ul>
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
	.day-list,
	.date-list {
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
