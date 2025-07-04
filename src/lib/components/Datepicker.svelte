<script lang="ts">
	import { type SvelteComponent } from 'svelte';
	import dayjs from 'dayjs';
	import Popup from './Popup.svelte';
	import DatepickerCalendar from './DatepickerCalendar.svelte';
	import Icon from './Icon.svelte';
	let {
		value = $bindable(),
		variant = 'default',
		format = 'YYYY/M/D（ddd）',
		nullString = '',
		isDateRange = false,
		showCalendarIcon = false,
		showPopupIcon = false,
		disabled = false,
		onchange = () => {},
		openIfClicked = true,
		minDate,
		maxDate
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
	} = $props();
	let displayElement: HTMLButtonElement | undefined = $state();
	let anchorElement: HTMLDivElement | undefined = $state();
	let popupRef: SvelteComponent | undefined = $state();
	let datapickerCalendarRef: SvelteComponent | undefined = $state();
	let isCalendarOpen: boolean = $state(false);
	let openedViaKeyboard: boolean = $state(false);
	const calendarId = `datepicker-calendar-${Math.random().toString(36).substr(2, 9)}`;
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
		if (isDateRange && value && 'start' in value && 'end' in value) {
			return `${dayjs(value.start).format(format)} - ${dayjs(value.end).format(format)}`;
		} else if (!isDateRange && value && value instanceof Date) {
			return dayjs(value).format(format);
		} else {
			return nullString;
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
	aria-label={`日付を選択してください。現在の値: ${displayValue || '未選択'}`}
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
