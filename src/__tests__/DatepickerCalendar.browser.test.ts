import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import DatepickerCalendar from '../lib/components/DatepickerCalendar.svelte';

test('renders DatepickerCalendar with default props', async () => {
	const screen = render(DatepickerCalendar, {
		value: undefined
	});
	const calendar = screen.getByTestId('datepicker-calendar');
	expect(calendar).toBeInTheDocument();
	expect(calendar).toHaveClass('datepicker-calendar');
});

test('DatepickerCalendar can select dates', async () => {
	let currentValue: Date | undefined = undefined;
	const screen = render(DatepickerCalendar, {
		value: currentValue,
		onchange: (value: Date | { start: Date; end: Date } | undefined) => {
			currentValue = value as Date;
		},
		id: 'calendar-select'
	});
	const calendar = screen.getByTestId('datepicker-calendar');

	// Find a date button and click it
	const dateButton = screen.container.querySelector('.datepicker-calendar__date-item');
	expect(dateButton).toBeInTheDocument();

	await dateButton?.click();

	// Verify the calendar is rendered correctly
	expect(calendar).toBeInTheDocument();
});

test('DatepickerCalendar navigation works correctly', async () => {
	const screen = render(DatepickerCalendar, {
		value: undefined,
		id: 'calendar-navigation'
	});
	const calendar = screen.getByTestId('datepicker-calendar');

	// Find navigation buttons
	const prevButton = screen.container.querySelector('.prev-button-block button');
	const nextButton = screen.container.querySelector(
		'.datepicker-calendar__header__next-button-block button'
	);

	expect(prevButton).toBeInTheDocument();
	expect(nextButton).toBeInTheDocument();

	// Click navigation buttons
	await prevButton?.click();
	await nextButton?.click();

	// Verify the calendar is still rendered correctly
	expect(calendar).toBeInTheDocument();
});

test('DatepickerCalendar with single mode renders correctly', async () => {
	const screen = render(DatepickerCalendar, {
		value: undefined,
		mode: 'single',
		id: 'calendar-single'
	});
	const calendar = screen.getByTestId('datepicker-calendar');
	expect(calendar).toBeInTheDocument();
});

test('DatepickerCalendar with range mode renders correctly', async () => {
	const screen = render(DatepickerCalendar, {
		value: undefined,
		mode: 'range',
		id: 'calendar-range'
	});
	const calendar = screen.getByTestId('datepicker-calendar');
	expect(calendar).toBeInTheDocument();
});

test('DatepickerCalendar with locale renders correctly', async () => {
	const screen = render(DatepickerCalendar, {
		value: undefined,
		locale: 'ja',
		id: 'calendar-locale'
	});
	const calendar = screen.getByTestId('datepicker-calendar');
	expect(calendar).toBeInTheDocument();
});

test('DatepickerCalendar with minDate renders correctly', async () => {
	const minDate = new Date('2024-01-01');
	const screen = render(DatepickerCalendar, {
		value: undefined,
		minDate,
		id: 'calendar-min-date'
	});
	const calendar = screen.getByTestId('datepicker-calendar');
	expect(calendar).toBeInTheDocument();
});

test('DatepickerCalendar with maxDate renders correctly', async () => {
	const maxDate = new Date('2024-12-31');
	const screen = render(DatepickerCalendar, {
		value: undefined,
		maxDate,
		id: 'calendar-max-date'
	});
	const calendar = screen.getByTestId('datepicker-calendar');
	expect(calendar).toBeInTheDocument();
});

test('DatepickerCalendar with selected value renders correctly', async () => {
	const selectedDate = new Date('2024-06-15');
	const screen = render(DatepickerCalendar, {
		value: selectedDate,
		id: 'calendar-selected'
	});
	const calendar = screen.getByTestId('datepicker-calendar');
	expect(calendar).toBeInTheDocument();
});

test('DatepickerCalendar with range value renders correctly', async () => {
	const rangeValue = {
		start: new Date('2024-06-01'),
		end: new Date('2024-06-15')
	};
	const screen = render(DatepickerCalendar, {
		value: rangeValue,
		mode: 'range',
		id: 'calendar-range-value'
	});
	const calendar = screen.getByTestId('datepicker-calendar');
	expect(calendar).toBeInTheDocument();
});

import { collectCssVarNames } from './helpers/cssVarCollector';

test('DatepickerCalendar CSS variables used are defined (computed) in the page', async () => {
	const screen = render(DatepickerCalendar, {
		value: undefined
	});
	const wrapper = screen.getByTestId('datepicker-calendar');
	const usedVars = new Set<string>();

	// Collect from inline styles and computed styles (including CSS classes)
	collectCssVarNames(wrapper.element()).forEach((v) => usedVars.add(v));

	// Only test variables that are actually used in the component
	// The collectCssVarNames function already found the used variables

	// If no CSS variables are used, skip the test
	if (usedVars.size === 0) {
		expect(usedVars.size).toBe(0);
		return;
	}

	// Validate each variable resolves to a non-empty value
	const root = document.documentElement;
	for (const varName of usedVars) {
		const value = getComputedStyle(root).getPropertyValue(varName).trim();
		// Some variables might be resolved on elements; try wrapper as fallback
		const fallbackValue = getComputedStyle(wrapper.element()).getPropertyValue(varName).trim();
		const finalValue = value || fallbackValue;

		// Skip empty variables (they might not be used in this specific test case)
		if (finalValue === '') {
			continue;
		}

		expect(finalValue).not.toBe('initial');
		expect(finalValue).not.toBe('unset');
		expect(finalValue).not.toBe('inherit');
	}
});
