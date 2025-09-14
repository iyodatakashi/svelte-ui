import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ButtonWrapper from './helpers/ButtonWrapper.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';

test('renders Button with text content', async () => {
	const screen = render(ButtonWrapper, { buttonText: 'Click me' });
	const button = screen.getByRole('button');
	await expect.element(button).toBeVisible();
	await expect.element(button).toHaveTextContent('Click me');
});

test('disabled Button is not interactable', async () => {
	const screen = render(ButtonWrapper, {
		buttonText: 'Disabled',
		disabled: true,
		id: 'disabled-button-1'
	});
	const button = screen.container.querySelector('#disabled-button-1');
	await expect.element(button).toHaveAttribute('disabled');

	// Try to click and verify it doesn't trigger
	let clicked = false;
	const screen2 = render(ButtonWrapper, {
		buttonText: 'Disabled',
		disabled: true,
		id: 'disabled-button-2',
		onclick: () => {
			clicked = true;
		}
	});
	const button2 = screen2.container.querySelector('#disabled-button-2');
	await button2.click();
	expect(clicked).toBe(false);
});

test('loading Button shows spinner and is disabled', async () => {
	const screen = render(ButtonWrapper, { buttonText: 'Loading', loading: true });
	const button = screen.getByRole('button');
	await expect.element(button).toHaveAttribute('disabled');

	// Check for loading spinner
	const spinner = screen.container.querySelector('.loading-spinner');
	expect(spinner).toBeTruthy();
});

test('Button variants render correctly', async () => {
	// Test ghost variant
	const screenGhost = render(ButtonWrapper, { variant: 'ghost', id: 'button-ghost' });
	const buttonGhost = screenGhost.container.querySelector('#button-ghost');
	expect(buttonGhost).toHaveClass('button--ghost');

	// Test filled variant
	const screenFilled = render(ButtonWrapper, { variant: 'filled', id: 'button-filled' });
	const buttonFilled = screenFilled.container.querySelector('#button-filled');
	expect(buttonFilled).toHaveClass('button--filled');

	// Test outlined variant
	const screenOutlined = render(ButtonWrapper, { variant: 'outlined', id: 'button-outlined' });
	const buttonOutlined = screenOutlined.container.querySelector('#button-outlined');
	expect(buttonOutlined).toHaveClass('button--outlined');

	// Test glass variant
	const screenGlass = render(ButtonWrapper, { variant: 'glass', id: 'button-glass' });
	const buttonGlass = screenGlass.container.querySelector('#button-glass');
	expect(buttonGlass).toHaveClass('button--glass');
});

test('Button sizes render correctly', async () => {
	// Test small size
	const screenSmall = render(ButtonWrapper, { size: 'small', id: 'button-small' });
	const buttonSmall = screenSmall.container.querySelector('#button-small');
	expect(buttonSmall).toHaveClass('button--small');

	// Test medium size
	const screenMedium = render(ButtonWrapper, { size: 'medium', id: 'button-medium' });
	const buttonMedium = screenMedium.container.querySelector('#button-medium');
	expect(buttonMedium).toHaveClass('button--medium');

	// Test large size
	const screenLarge = render(ButtonWrapper, { size: 'large', id: 'button-large' });
	const buttonLarge = screenLarge.container.querySelector('#button-large');
	expect(buttonLarge).toHaveClass('button--large');
});

test('Button with icon renders correctly', async () => {
	const screen = render(ButtonWrapper, { icon: 'home' });
	const button = screen.getByRole('button');

	// Check for icon container
	const iconContainer = screen.container.querySelector('.button__icon');
	expect(iconContainer).toBeTruthy();
});

test('Button click event works correctly', async () => {
	let clicked = false;
	const screen = render(ButtonWrapper, {
		onclick: () => {
			clicked = true;
		}
	});

	const button = screen.getByRole('button');
	await button.click();
	expect(clicked).toBe(true);
});

test('Button focus and blur events work correctly', async () => {
	let focusCalled = false;
	let blurCalled = false;

	const screen = render(ButtonWrapper, {
		onfocus: () => {
			focusCalled = true;
		},
		onblur: () => {
			blurCalled = true;
		}
	});

	const button = screen.getByRole('button');
	(button.element() as HTMLButtonElement).focus();
	expect(focusCalled).toBe(true);

	(button.element() as HTMLButtonElement).blur();
	expect(blurCalled).toBe(true);
});

test('Button with fullWidth renders correctly', async () => {
	const screen = render(ButtonWrapper, { fullWidth: true });
	const button = screen.getByRole('button');
	await expect.element(button).toHaveClass('button--full-width');
});

test('Button with rounded renders correctly', async () => {
	const screen = render(ButtonWrapper, { rounded: true });
	const button = screen.getByRole('button');
	await expect.element(button).toHaveClass('button--rounded');
});

test('Button type attribute works correctly', async () => {
	const screen = render(ButtonWrapper, { type: 'submit' });
	const button = screen.getByRole('button');
	await expect.element(button).toHaveAttribute('type', 'submit');
});

test('Button with popup attribute renders correctly', async () => {
	const screen = render(ButtonWrapper, { popup: true });
	const button = screen.getByRole('button');
	await expect.element(button).toHaveClass('button--popup');
});

test('Button ARIA attributes work correctly', async () => {
	const screen = render(ButtonWrapper, {
		ariaLabel: 'Custom label',
		ariaDescribedby: 'description',
		ariaExpanded: 'true'
	});
	const button = screen.getByRole('button');
	await expect.element(button).toHaveAttribute('aria-label', 'Custom label');
	await expect.element(button).toHaveAttribute('aria-describedby', 'description');
	await expect.element(button).toHaveAttribute('aria-expanded', 'true');
});

test('should not reference undefined CSS variables', async () => {
	const screen = render(ButtonWrapper, {});
	const wrapper = screen.container.querySelector('[data-testid="button"]') as HTMLElement;

	// List of CSS variables to check for Button (only variables that actually exist in variables.scss)
	const cssVariables = [
		'--svelte-ui-button-bg-ghost',
		'--svelte-ui-button-text-ghost',
		'--svelte-ui-button-bg-filled',
		'--svelte-ui-button-text-filled',
		'--svelte-ui-button-bg-glass',
		'--svelte-ui-button-text-glass',
		'--svelte-ui-button-height-sm',
		'--svelte-ui-button-padding-sm',
		'--svelte-ui-button-height',
		'--svelte-ui-button-padding',
		'--svelte-ui-button-height-lg',
		'--svelte-ui-button-padding-lg',
		'--svelte-ui-button-border-radius',
		'--svelte-ui-button-border-radius-rounded',
		'--svelte-ui-button-disabled-opacity',
		'--svelte-ui-button-hover-overlay',
		'--svelte-ui-button-focus-color',
		'--svelte-ui-focus-outline-outer',
		'--svelte-ui-focus-outline-offset-outer',
		'--svelte-ui-hover-overlay'
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
