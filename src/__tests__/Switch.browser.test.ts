import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import Switch from '../lib/components/Switch.svelte';
import { collectCssVarNames } from './helpers/cssVarCollector';

test('renders Switch with default props', async () => {
	const screen = render(ComponentWrapper, {
		component: Switch,
		children: 'Test Switch'
	});
	const switchElement = screen.getByTestId('switch');
	expect(switchElement).toBeInTheDocument();
	expect(switchElement).toHaveClass('switch');
});

test('Switch can be toggled and value changes', async () => {
	let currentValue = false;
	const screen = render(ComponentWrapper, {
		component: Switch,
		value: currentValue,
		onchange: (value: boolean) => {
			currentValue = value;
		},
		children: 'Toggle Switch',
		id: 'switch-toggle'
	});
	const switchInput = screen.container.querySelector('#switch-toggle') as HTMLInputElement;

	// Initial state should be unchecked
	expect(switchInput.checked).toBe(false);

	// Click to toggle
	switchInput.click();
	expect(switchInput.checked).toBe(true);
});

test('disabled Switch is not interactable', async () => {
	const screen = render(ComponentWrapper, {
		component: Switch,
		disabled: true,
		children: 'Disabled Switch',
		id: 'switch-disabled'
	});
	const switchElement = screen.getByTestId('switch');
	const switchInput = screen.container.querySelector('#switch-disabled') as HTMLInputElement;

	expect(switchElement).toHaveClass('switch--disabled');
	expect(switchInput).toHaveAttribute('disabled');

	// Disabled switch should not be focusable
	switchInput.focus();
	expect(document.activeElement).not.toBe(switchInput);

	// Disabled switch should not trigger change events
	let changeCalled = false;
	const screen2 = render(ComponentWrapper, {
		component: Switch,
		disabled: true,
		onchange: () => {
			changeCalled = true;
		},
		children: 'Disabled Switch 2',
		id: 'switch-disabled-2'
	});
	const switchInput2 = screen2.container.querySelector('#switch-disabled-2') as HTMLInputElement;
	// Try to trigger change event (should not work for disabled switch)
	switchInput2.dispatchEvent(new Event('change'));
	expect(changeCalled).toBe(false);
});

test('Switch variants render correctly', async () => {
	// Test default variant (no special class)
	const screenDefault = render(ComponentWrapper, {
		component: Switch,
		children: 'Default Switch',
		id: 'switch-default'
	});
	const switchDefault = screenDefault.container.querySelector('#switch-default');
	expect(switchDefault).toBeInTheDocument();

	// Test small size
	const screenSmall = render(ComponentWrapper, {
		component: Switch,
		size: 'small',
		children: 'Small Switch',
		id: 'switch-small'
	});
	const switchSmall = screenSmall.container.querySelector('#switch-small');
	expect(switchSmall).toBeInTheDocument();

	// Test medium size
	const screenMedium = render(ComponentWrapper, {
		component: Switch,
		size: 'medium',
		children: 'Medium Switch',
		id: 'switch-medium'
	});
	const switchMedium = screenMedium.container.querySelector('#switch-medium');
	expect(switchMedium).toBeInTheDocument();

	// Test large size
	const screenLarge = render(ComponentWrapper, {
		component: Switch,
		size: 'large',
		children: 'Large Switch',
		id: 'switch-large'
	});
	const switchLarge = screenLarge.container.querySelector('#switch-large');
	expect(switchLarge).toBeInTheDocument();
});

test('Switch focus and blur events work correctly', async () => {
	let focusCalled = false;
	let blurCalled = false;

	const screen = render(ComponentWrapper, {
		component: Switch,
		children: 'Focus Test Switch',
		id: 'switch-focus-blur',
		onfocus: () => {
			focusCalled = true;
		},
		onblur: () => {
			blurCalled = true;
		}
	});
	const switchInput = screen.container.querySelector('#switch-focus-blur') as HTMLInputElement;
	switchInput.focus();
	expect(focusCalled).toBe(true);

	switchInput.blur();
	expect(blurCalled).toBe(true);
});

test('Switch required attribute works correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Switch,
		children: 'Required Switch',
		required: true,
		id: 'switch-required'
	});
	const switchInput = screen.container.querySelector('#switch-required');
	expect(switchInput).toHaveAttribute('required');
});

test('Switch with reduced motion renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Switch,
		children: 'Reduced Motion Switch',
		reducedMotion: true,
		id: 'switch-reduced-motion'
	});
	const switchElement = screen.getByTestId('switch');
	expect(switchElement).toHaveClass('switch--reduced-motion');
});

test('Switch with checked state renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Switch,
		children: 'Checked Switch',
		value: true,
		id: 'switch-checked'
	});
	const switchInput = screen.container.querySelector('#switch-checked') as HTMLInputElement;
	expect(switchInput.checked).toBe(true);
});

test('Switch CSS variables used are defined (computed) in the page', async () => {
	const screen = render(ComponentWrapper, {
		component: Switch,
		children: 'CSS Test Switch'
	});
	const wrapper = screen.getByTestId('switch');
	const usedVars = new Set<string>();

	// Collect from inline styles and descendants
	collectCssVarNames(wrapper.element()).forEach((v) => usedVars.add(v));

	// Only test variables that are actually used in the component
	// The collectCssVarNames function already found the used variables

	// Validate each variable resolves to a non-empty value
	const root = document.documentElement;
	for (const varName of usedVars) {
		const value = getComputedStyle(root).getPropertyValue(varName).trim();
		// Some variables might be resolved on elements; try wrapper as fallback
		const fallbackValue = getComputedStyle(wrapper.element()).getPropertyValue(varName).trim();
		const finalValue = value || fallbackValue;

		expect(finalValue).not.toBe('');
		expect(finalValue).not.toBe('initial');
		expect(finalValue).not.toBe('unset');
		expect(finalValue).not.toBe('inherit');
	}
});
