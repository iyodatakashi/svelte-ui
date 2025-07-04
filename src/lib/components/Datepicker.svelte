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
	const handleChange = () => {
		close();
		onchange();
	};
	const handleClick = () => {
		if (openIfClicked) {
			toggle();
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
	onclick={handleClick}
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
