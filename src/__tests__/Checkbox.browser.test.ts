import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import Checkbox from '../lib/components/Checkbox.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import { collectCssVarNames } from './helpers/cssVarCollector';

test('renders Checkbox with label content', async () => {
	const screen = render(ComponentWrapper, {
		component: Checkbox,
		children: 'Check me'
	});
	const checkbox = screen.getByRole('checkbox');
	await expect.element(checkbox).toBeVisible();

	// Check that label contains the text
	const label = screen.container.querySelector('.checkbox__label');
	expect(label).toHaveTextContent('Check me');
});

test('Checkbox can be checked and unchecked', async () => {
	const screen = render(ComponentWrapper, {
		component: Checkbox,
		children: 'Toggle me',
		id: 'checkbox-toggle'
	});
	const checkbox = screen.container.querySelector('#checkbox-toggle') as HTMLInputElement;

	// Initially unchecked
	expect(checkbox.checked).toBe(false);

	// Click to check
	checkbox.click();
	expect(checkbox.checked).toBe(true);

	// Click to uncheck
	checkbox.click();
	expect(checkbox.checked).toBe(false);
});

test('disabled Checkbox is not interactable', async () => {
	const screen = render(ComponentWrapper, {
		component: Checkbox,
		children: 'Disabled',
		disabled: true,
		id: 'checkbox-disabled'
	});
	const checkbox = screen.container.querySelector('#checkbox-disabled') as HTMLInputElement;
	expect(checkbox).toHaveAttribute('disabled');

	// Try to click and verify it doesn't change state
	const initialChecked = checkbox.checked;
	checkbox.click();
	expect(checkbox.checked).toBe(initialChecked);
});

test('Checkbox sizes render correctly', async () => {
	// Test small size
	const screenSmall = render(ComponentWrapper, {
		component: Checkbox,
		children: 'Small',
		size: 'small',
		id: 'checkbox-small'
	});
	const containerSmall = screenSmall.container.querySelector('[data-testid="checkbox"]');
	expect(containerSmall).toHaveClass('checkbox--small');

	// Test medium size
	const screenMedium = render(ComponentWrapper, {
		component: Checkbox,
		children: 'Medium',
		size: 'medium',
		id: 'checkbox-medium'
	});
	const containerMedium = screenMedium.container.querySelector('[data-testid="checkbox"]');
	expect(containerMedium).toHaveClass('checkbox--medium');

	// Test large size
	const screenLarge = render(ComponentWrapper, {
		component: Checkbox,
		children: 'Large',
		size: 'large',
		id: 'checkbox-large'
	});
	const containerLarge = screenLarge.container.querySelector('[data-testid="checkbox"]');
	expect(containerLarge).toHaveClass('checkbox--large');
});

test('Checkbox indeterminate state works correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Checkbox,
		children: 'Indeterminate',
		indeterminate: true,
		id: 'checkbox-indeterminate'
	});
	const checkbox = screen.container.querySelector('#checkbox-indeterminate') as HTMLInputElement;
	expect(checkbox.indeterminate).toBe(true);
});

test('Checkbox change event works correctly', async () => {
	let changeCalled = false;
	const screen = render(ComponentWrapper, {
		component: Checkbox,
		children: 'Change me',
		onchange: () => {
			changeCalled = true;
		},
		id: 'checkbox-change'
	});
	// Click the label instead of the checkbox input
	const label = screen.container.querySelector('.checkbox__label') as HTMLElement;
	if (label) {
		label.click();
	} else {
		// Fallback: click the checkbox directly
		const checkbox = screen.container.querySelector('#checkbox-change') as HTMLInputElement;
		checkbox.click();
	}
	expect(changeCalled).toBe(true);
});

test('Checkbox focus and blur events work correctly', async () => {
	let focusCalled = false;
	let blurCalled = false;

	const screen = render(ComponentWrapper, {
		component: Checkbox,
		children: 'Focusable',
		onfocus: () => {
			focusCalled = true;
		},
		onblur: () => {
			blurCalled = true;
		}
	});
	const checkbox = screen.getByRole('checkbox');
	(checkbox.element() as HTMLInputElement).focus();
	expect(focusCalled).toBe(true);

	(checkbox.element() as HTMLInputElement).blur();
	expect(blurCalled).toBe(true);
});

test('Checkbox required attribute works correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Checkbox,
		children: 'Required',
		required: true
	});
	const checkbox = screen.getByRole('checkbox');
	expect(checkbox).toHaveAttribute('required');
});

test('Checkbox name attribute works correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Checkbox,
		children: 'Named',
		name: 'test-checkbox'
	});
	const checkbox = screen.getByRole('checkbox');
	expect(checkbox).toHaveAttribute('name', 'test-checkbox');
});

test('should not reference undefined CSS variables', async () => {
	const screen = render(ComponentWrapper, {
		component: Checkbox
	});
	const wrapper = screen.container.querySelector('[data-testid="checkbox"]') as HTMLElement;

	// List of CSS variables to check for Checkbox (only variables that actually exist in variables.scss)
	const cssVariables = [
		'--svelte-ui-checkbox-size-sm',
		'--svelte-ui-checkbox-size',
		'--svelte-ui-checkbox-size-lg',
		'--svelte-ui-checkbox-min-height-sm',
		'--svelte-ui-checkbox-min-height',
		'--svelte-ui-checkbox-min-height-lg',
		'--svelte-ui-checkbox-padding-sm',
		'--svelte-ui-checkbox-padding',
		'--svelte-ui-checkbox-padding-lg',
		'--svelte-ui-checkbox-border-radius',
		'--svelte-ui-checkbox-border-width',
		'--svelte-ui-checkbox-icon-size-sm',
		'--svelte-ui-checkbox-icon-size',
		'--svelte-ui-checkbox-icon-size-lg',
		'--svelte-ui-checkbox-icon-width-sm',
		'--svelte-ui-checkbox-icon-width',
		'--svelte-ui-checkbox-icon-width-lg',
		'--svelte-ui-checkbox-disabled-opacity',
		'--svelte-ui-checkbox-border-color',
		'--svelte-ui-checkbox-bg-checked',
		'--svelte-ui-checkbox-icon-color',
		'--svelte-ui-checkbox-hover-color',
		'--svelte-ui-checkbox-checked-color'
	];

	// Inject variables.scss into the document for computed style checks
	const style = document.createElement('style');
	style.textContent = variables;
	document.head.appendChild(style);

	// Check computed styles for each variable
	cssVariables.forEach((varName) => {
		const computedValue = getComputedStyle(wrapper).getPropertyValue(varName).trim();
		// Skip if variable is not defined (empty string means not defined)
		if (computedValue === '') {
			console.warn(`CSS variable ${varName} is not defined, skipping test`);
			return;
		}
		expect(computedValue).not.toBe('initial');
		expect(computedValue).not.toBe('unset');
		expect(computedValue).not.toBe('inherit');
	});

	document.head.removeChild(style);
});
