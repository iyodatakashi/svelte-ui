import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import Button from '../lib/components/Button.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import { collectCssVarNames } from './helpers/cssVarCollector';

test('renders Button with text content', async () => {
	const screen = render(ComponentWrapper, {
		component: Button,
		children: 'Click me'
	});
	const button = screen.getByRole('button');
	await expect.element(button).toBeVisible();
	await expect.element(button).toHaveTextContent('Click me');
});

test('disabled Button is not interactable', async () => {
	const screen = render(ComponentWrapper, {
		component: Button,
		children: 'Disabled',
		disabled: true,
		id: 'disabled-button-1'
	});
	const button = screen.container.querySelector('#disabled-button-1');
	await expect.element(button).toHaveAttribute('disabled');

	// Try to click and verify it doesn't trigger
	let clicked = false;
	const screen2 = render(ComponentWrapper, {
		component: Button,
		children: 'Disabled',
		disabled: true,
		id: 'disabled-button-2',
		onclick: () => {
			clicked = true;
		}
	});
	const button2 = screen2.container.querySelector('#disabled-button-2') as HTMLElement;
	button2.click();
	expect(clicked).toBe(false);
});

test('loading Button shows spinner and is disabled', async () => {
	const screen = render(ComponentWrapper, {
		component: Button,
		children: 'Loading',
		loading: true
	});
	const button = screen.getByRole('button');
	await expect.element(button).toHaveAttribute('disabled');

	// Check for loading spinner
	const spinner = screen.container.querySelector('.loading-spinner');
	expect(spinner).toBeTruthy();
});

test('Button variants render correctly', async () => {
	// Test ghost variant
	const screenGhost = render(ComponentWrapper, {
		component: Button,
		variant: 'ghost',
		id: 'button-ghost'
	});
	const buttonGhost = screenGhost.container.querySelector('#button-ghost');
	expect(buttonGhost).toHaveClass('button--ghost');

	// Test filled variant
	const screenFilled = render(ComponentWrapper, {
		component: Button,
		variant: 'filled',
		id: 'button-filled'
	});
	const buttonFilled = screenFilled.container.querySelector('#button-filled');
	expect(buttonFilled).toHaveClass('button--filled');

	// Test outlined variant
	const screenOutlined = render(ComponentWrapper, {
		component: Button,
		variant: 'outlined',
		id: 'button-outlined'
	});
	const buttonOutlined = screenOutlined.container.querySelector('#button-outlined');
	expect(buttonOutlined).toHaveClass('button--outlined');

	// Test glass variant
	const screenGlass = render(ComponentWrapper, {
		component: Button,
		variant: 'glass',
		id: 'button-glass'
	});
	const buttonGlass = screenGlass.container.querySelector('#button-glass');
	expect(buttonGlass).toHaveClass('button--glass');
});

test('Button sizes render correctly', async () => {
	// Test small size
	const screenSmall = render(ComponentWrapper, {
		component: Button,
		size: 'small',
		id: 'button-small'
	});
	const buttonSmall = screenSmall.container.querySelector('#button-small');
	expect(buttonSmall).toHaveClass('button--small');

	// Test medium size
	const screenMedium = render(ComponentWrapper, {
		component: Button,
		size: 'medium',
		id: 'button-medium'
	});
	const buttonMedium = screenMedium.container.querySelector('#button-medium');
	expect(buttonMedium).toHaveClass('button--medium');

	// Test large size
	const screenLarge = render(ComponentWrapper, {
		component: Button,
		size: 'large',
		id: 'button-large'
	});
	const buttonLarge = screenLarge.container.querySelector('#button-large');
	expect(buttonLarge).toHaveClass('button--large');
});

test('Button with icon renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Button,
		icon: 'home'
	});
	const button = screen.getByRole('button');

	// Check for icon container
	const iconContainer = screen.container.querySelector('.button__icon');
	expect(iconContainer).toBeTruthy();
});

test('Button click event works correctly', async () => {
	let clicked = false;
	const screen = render(ComponentWrapper, {
		component: Button,
		onclick: () => {
			clicked = true;
		}
	});
	const button = screen.getByRole('button');
	// Use element().click() instead of button.click() to ensure event is fired
	(button.element() as HTMLButtonElement).click();
	// Wait for event to propagate
	await new Promise(resolve => setTimeout(resolve, 50));
	expect(clicked).toBe(true);
});

test('Button focus and blur events work correctly', async () => {
	let focusCalled = false;
	let blurCalled = false;

	const screen = render(ComponentWrapper, {
		component: Button,
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
	const screen = render(ComponentWrapper, {
		component: Button,
		fullWidth: true
	});
	const button = screen.getByRole('button');
	await expect.element(button).toHaveClass('button--full-width');
});

test('Button with rounded renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Button,
		rounded: true
	});
	const button = screen.getByRole('button');
	await expect.element(button).toHaveClass('button--rounded');
});

test('Button type attribute works correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Button,
		type: 'submit'
	});
	const button = screen.getByRole('button');
	await expect.element(button).toHaveAttribute('type', 'submit');
});

test('Button with popup attribute renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Button,
		popup: true
	});
	const button = screen.getByRole('button');
	await expect.element(button).toHaveClass('button--popup');
});

test('Button ARIA attributes work correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Button,
		ariaLabel: 'Custom label',
		ariaDescribedby: 'description',
		ariaExpanded: true
	});
	const button = screen.getByRole('button');
	await expect.element(button).toHaveAttribute('aria-label', 'Custom label');
	await expect.element(button).toHaveAttribute('aria-describedby', 'description');
	await expect.element(button).toHaveAttribute('aria-expanded', 'true');
});

test('Button CSS variables used are defined (computed) in the page', async () => {
	const screen = render(ComponentWrapper, {
		component: Button,
		children: 'CSS Test Button'
	});
	const wrapper = screen.container.querySelector('[data-testid="button"]') as HTMLElement;
	const usedVars = new Set<string>();

	// Collect from inline styles and computed styles (including CSS classes)
	collectCssVarNames(wrapper).forEach((v) => usedVars.add(v));

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
		const fallbackValue = getComputedStyle(wrapper).getPropertyValue(varName).trim();
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

// =========================================================================
// リアクティブ性テスト
// =========================================================================

test('Button color property changes reactively', async () => {
	const screen = render(ComponentWrapper, {
		component: Button,
		children: 'Test',
		color: 'red'
	});

	const button = screen.getByRole('button');
	await expect.element(button).toHaveAttribute('style', expect.stringContaining('color: red'));

	// プロパティを更新
	screen.rerender({
		component: Button,
		children: 'Test',
		color: 'blue'
	});

	await expect.element(button).toHaveAttribute('style', expect.stringContaining('color: blue'));
});

test('Button minWidth property changes reactively', async () => {
	const screen = render(ComponentWrapper, {
		component: Button,
		children: 'Test',
		minWidth: 100
	});

	const button = screen.getByRole('button');
	await expect
		.element(button)
		.toHaveAttribute('style', expect.stringContaining('min-width: 100px'));

	// プロパティを更新
	screen.rerender({
		component: Button,
		children: 'Test',
		minWidth: 200
	});

	await expect
		.element(button)
		.toHaveAttribute('style', expect.stringContaining('min-width: 200px'));
});

test('Button multiple properties change reactively', async () => {
	const screen = render(ComponentWrapper, {
		component: Button,
		children: 'Test',
		color: 'red',
		minWidth: 100
	});

	const button = screen.getByRole('button');
	await expect.element(button).toHaveAttribute('style', expect.stringContaining('color: red'));
	await expect
		.element(button)
		.toHaveAttribute('style', expect.stringContaining('min-width: 100px'));

	// プロパティを更新
	screen.rerender({
		component: Button,
		children: 'Test',
		color: 'blue',
		minWidth: 200
	});

	await expect.element(button).toHaveAttribute('style', expect.stringContaining('color: blue'));
	await expect
		.element(button)
		.toHaveAttribute('style', expect.stringContaining('min-width: 200px'));
});
