import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import Radio from '../lib/components/Radio.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import { collectCssVarNames } from './helpers/cssVarCollector';

test('renders Radio with label content', async () => {
	const screen = render(ComponentWrapper, {
		component: Radio,
		children: 'Option 1',
		value: 'option1'
	});
	const radio = screen.getByRole('radio');
	await expect.element(radio).toBeVisible();

	// Check that label contains the text
	const label = screen.container.querySelector('.radio-label');
	expect(label).toHaveTextContent('Option 1');
});

test('Radio can be selected and deselected', async () => {
	const screen = render(ComponentWrapper, {
		component: Radio,
		children: 'Select me',
		value: 'test',
		name: 'test-group',
		id: 'radio-select'
	});
	const radio = screen.container.querySelector('#radio-select') as HTMLInputElement;

	// Initially unchecked
	expect(radio.checked).toBe(false);

	// Click to select
	radio.click();
	expect(radio.checked).toBe(true);
});

test('disabled Radio is not interactable', async () => {
	const screen = render(ComponentWrapper, {
		component: Radio,
		children: 'Disabled',
		value: 'disabled',
		disabled: true,
		id: 'radio-disabled'
	});
	const radio = screen.container.querySelector('#radio-disabled') as HTMLInputElement;
	expect(radio).toHaveAttribute('disabled');

	// Try to click and verify it doesn't change state
	const initialChecked = radio.checked;
	radio.click();
	expect(radio.checked).toBe(initialChecked);
});

test('Radio sizes render correctly', async () => {
	// Test small size
	const screenSmall = render(ComponentWrapper, {
		component: Radio,
		children: 'Small',
		value: 'small',
		size: 'small',
		id: 'radio-small'
	});
	const containerSmall = screenSmall.container.querySelector('[data-testid="radio"]');
	expect(containerSmall).toHaveClass('radio--small');

	// Test medium size
	const screenMedium = render(ComponentWrapper, {
		component: Radio,
		children: 'Medium',
		value: 'medium',
		size: 'medium',
		id: 'radio-medium'
	});
	const containerMedium = screenMedium.container.querySelector('[data-testid="radio"]');
	expect(containerMedium).toHaveClass('radio--medium');

	// Test large size
	const screenLarge = render(ComponentWrapper, {
		component: Radio,
		children: 'Large',
		value: 'large',
		size: 'large',
		id: 'radio-large'
	});
	const containerLarge = screenLarge.container.querySelector('[data-testid="radio"]');
	expect(containerLarge).toHaveClass('radio--large');
});

test('Radio change event works correctly', async () => {
	let changeCalled = false;
	const screen = render(ComponentWrapper, {
		component: Radio,
		children: 'Change me',
		value: 'change',
		onchange: () => {
			changeCalled = true;
		}
	});
	// Click the label instead of the radio input
	const label = screen.container.querySelector('.radio-label') as HTMLElement;
	label.click();
	expect(changeCalled).toBe(true);
});

test('Radio focus and blur events work correctly', async () => {
	let focusCalled = false;
	let blurCalled = false;

	const screen = render(ComponentWrapper, {
		component: Radio,
		children: 'Focusable',
		value: 'focus',
		onfocus: () => {
			focusCalled = true;
		},
		onblur: () => {
			blurCalled = true;
		}
	});
	const radio = screen.getByRole('radio');
	(radio.element() as HTMLInputElement).focus();
	expect(focusCalled).toBe(true);

	(radio.element() as HTMLInputElement).blur();
	expect(blurCalled).toBe(true);
});

test('Radio required attribute works correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Radio,
		children: 'Required',
		value: 'required',
		required: true
	});
	const radio = screen.getByRole('radio');
	expect(radio).toHaveAttribute('required');
});

test('Radio name attribute works correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Radio,
		children: 'Named',
		value: 'named',
		name: 'test-radio-group'
	});
	const radio = screen.getByRole('radio');
	expect(radio).toHaveAttribute('name', 'test-radio-group');
});

test('Radio value attribute works correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Radio,
		children: 'Valued',
		value: 'test-value'
	});
	const radio = screen.getByRole('radio');
	expect(radio).toHaveAttribute('value', 'test-value');
});

test('should not reference undefined CSS variables', async () => {
	const screen = render(ComponentWrapper, {
		component: Radio,
		value: 'test'
	});
	const wrapper = screen.container.querySelector('[data-testid="radio"]') as HTMLElement;

	// List of CSS variables actually used in Radio.svelte
	const cssVariables = [
		'--svelte-ui-radio-padding',
		'--svelte-ui-radio-min-height',
		'--svelte-ui-radio-size',
		'--svelte-ui-radio-border-width',
		'--svelte-ui-radio-border-color',
		'--svelte-ui-radio-border-radius',
		'--svelte-ui-radio-bg-checked',
		'--svelte-ui-radio-dot-size',
		'--svelte-ui-radio-hover-color',
		'--svelte-ui-radio-padding-sm',
		'--svelte-ui-radio-min-height-sm',
		'--svelte-ui-radio-size-sm',
		'--svelte-ui-radio-dot-size-sm',
		'--svelte-ui-radio-padding-lg',
		'--svelte-ui-radio-min-height-lg',
		'--svelte-ui-radio-size-lg',
		'--svelte-ui-radio-dot-size-lg'
	];

	// Inject variables.scss into the document for computed style checks
	const style = document.createElement('style');
	style.textContent = variables;
	document.head.appendChild(style);

	// Check computed styles for each variable
	cssVariables.forEach((varName) => {
		const computedValue = getComputedStyle(wrapper).getPropertyValue(varName).trim();
		expect(computedValue).not.toBe('');
		expect(computedValue).not.toBe('initial');
		expect(computedValue).not.toBe('unset');
		expect(computedValue).not.toBe('inherit');
	});

	document.head.removeChild(style);
});
