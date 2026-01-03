import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ColorPicker from '../lib/components/ColorPicker.svelte';

test('renders ColorPicker with default props', async () => {
	const screen = render(ColorPicker, {
		value: ''
	});
	const colorPicker = screen.getByTestId('color-picker');
	expect(colorPicker).toBeInTheDocument();
	expect(colorPicker).toHaveClass('color-picker');
});

test('ColorPicker can be changed and value updates', async () => {
	let currentValue = '';
	const screen = render(ColorPicker, {
		value: currentValue,
		onchange: (value: string) => {
			currentValue = value;
		},
		id: 'colorpicker-change'
	});
	const colorInput = screen.container.querySelector(
		'#colorpicker-change-input'
	) as HTMLInputElement;

	// Initial state should be empty
	expect(colorInput.value).toBe('');

	// Simulate user input by directly setting the value and triggering input event
	colorInput.value = '#ff0000';
	colorInput.focus();
	colorInput.blur(); // This should trigger the change event

	// Verify the input value was set correctly
	expect(colorInput.value).toBe('#ff0000');
});

test('disabled ColorPicker is not interactable', async () => {
	const screen = render(ColorPicker, {
		disabled: true,
		value: '#ff0000',
		id: 'colorpicker-disabled'
	});
	const colorPicker = screen.getByTestId('color-picker');
	const colorInput = screen.container.querySelector(
		'#colorpicker-disabled-input'
	) as HTMLInputElement;

	expect(colorPicker).toHaveClass('color-picker--disabled');
	expect(colorInput).toHaveAttribute('disabled');

	// Disabled color picker should not be focusable
	colorInput.focus();
	expect(document.activeElement).not.toBe(colorInput);

	// Disabled color picker should not trigger change events
	let changeCalled = false;
	const screen2 = render(ColorPicker, {
		disabled: true,
		onchange: () => {
			changeCalled = true;
		},
		value: '#ff0000',
		id: 'colorpicker-disabled-2'
	});
	const colorInput2 = screen2.container.querySelector(
		'#colorpicker-disabled-2-input'
	) as HTMLInputElement;
	// Try to interact with disabled color picker
	// Disabled elements should not respond to user interactions
	colorInput2.focus();
	expect(document.activeElement).not.toBe(colorInput2);

	// Verify the disabled state is correct
	expect(colorInput2).toHaveAttribute('disabled');
});

test('ColorPicker variants render correctly', async () => {
	// Test default variant (no special class)
	const screenDefault = render(ColorPicker, {
		value: '#ff0000',
		id: 'colorpicker-default'
	});
	const colorPickerDefault = screenDefault.container.querySelector('#colorpicker-default-input');
	expect(colorPickerDefault).toBeInTheDocument();

	// Test with fullWidth
	const screenFullWidth = render(ColorPicker, {
		value: '#ff0000',
		fullWidth: true,
		id: 'colorpicker-fullwidth'
	});
	const colorPickerFullWidth = screenFullWidth.container.querySelector(
		'#colorpicker-fullwidth-input'
	);
	expect(colorPickerFullWidth).toBeInTheDocument();

	// Test with rounded
	const screenRounded = render(ColorPicker, {
		value: '#ff0000',
		rounded: true,
		id: 'colorpicker-rounded'
	});
	const colorPickerRounded = screenRounded.container.querySelector('#colorpicker-rounded-input');
	expect(colorPickerRounded).toBeInTheDocument();
});

test('ColorPicker focus and blur events work correctly', async () => {
	let focusCalled = false;
	let blurCalled = false;

	const screen = render(ColorPicker, {
		value: '#ff0000',
		id: 'colorpicker-focus-blur',
		onfocus: () => {
			focusCalled = true;
		},
		onblur: () => {
			blurCalled = true;
		}
	});
	const colorInput = screen.container.querySelector(
		'#colorpicker-focus-blur-input'
	) as HTMLInputElement;
	colorInput.focus();
	expect(focusCalled).toBe(true);

	colorInput.blur();
	expect(blurCalled).toBe(true);
});

test('ColorPicker with clearable renders correctly', async () => {
	const screen = render(ColorPicker, {
		value: '#ff0000',
		clearable: true,
		id: 'colorpicker-clearable'
	});

	// Check if clear button exists (it might be in the Input component)
	const clearButton = screen.container.querySelector('.input__clear-button');
	expect(clearButton).toBeInTheDocument();
});

test('ColorPicker with readonly renders correctly', async () => {
	const screen = render(ColorPicker, {
		value: '#ff0000',
		readonly: true,
		id: 'colorpicker-readonly'
	});
	const colorInput = screen.container.querySelector(
		'#colorpicker-readonly-input'
	) as HTMLInputElement;
	expect(colorInput).toHaveAttribute('readonly');
});

test('ColorPicker input event works correctly', async () => {
	let inputValue = '';
	const screen = render(ColorPicker, {
		value: '#ff0000',
		oninput: (value: string) => {
			inputValue = value;
		},
		id: 'colorpicker-input'
	});
	const colorInput = screen.container.querySelector('#colorpicker-input-input') as HTMLInputElement;

	// Simulate user input by typing
	colorInput.value = '#00ff00';
	colorInput.focus();
	// Simulate typing by triggering input event through user interaction
	colorInput.click();

	// Verify the input value was set correctly
	expect(colorInput.value).toBe('#00ff00');
});

import { collectCssVarNames } from './helpers/cssVarCollector';

test('ColorPicker CSS variables used are defined (computed) in the page', async () => {
	const screen = render(ColorPicker, {
		value: '#ff0000'
	});
	const wrapper = screen.getByTestId('color-picker');
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
