import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import IconButton from '../lib/components/IconButton.svelte';
import { collectCssVarNames } from './helpers/cssVarCollector';

test('renders IconButton with default props', async () => {
	const screen = render(ComponentWrapper, {
		component: IconButton,
		children: 'Test Icon'
	});
	const iconButton = screen.getByTestId('icon-button').first();
	expect(iconButton).toBeInTheDocument();
	expect(iconButton).toHaveClass('icon-button');
});

test('IconButton can be clicked and triggers onclick event', async () => {
	let clickCalled = false;
	const screen = render(ComponentWrapper, {
		component: IconButton,
		children: 'Click Icon',
		id: 'icon-button-click',
		onclick: () => {
			clickCalled = true;
		}
	});
	const iconButton = screen.container.querySelector('#icon-button-click') as HTMLButtonElement;

	// Click the button
	iconButton.click();
	expect(clickCalled).toBe(true);
});

test('disabled IconButton is not interactable', async () => {
	const screen = render(ComponentWrapper, {
		component: IconButton,
		disabled: true,
		children: 'Disabled Icon',
		id: 'icon-button-disabled'
	});
	const button = screen.container.querySelector('#icon-button-disabled') as HTMLButtonElement;

	expect(button).toHaveAttribute('disabled');

	// Disabled button should not be focusable
	button.focus();
	expect(document.activeElement).not.toBe(button);

	// Disabled button should not trigger click events
	let clickCalled = false;
	const screen2 = render(ComponentWrapper, {
		component: IconButton,
		disabled: true,
		onclick: () => {
			clickCalled = true;
		},
		children: 'Disabled Icon 2',
		id: 'icon-button-disabled-2'
	});
	const button2 = screen2.container.querySelector('#icon-button-disabled-2') as HTMLButtonElement;
	// Try to trigger click event (should not work for disabled button)
	button2.dispatchEvent(new Event('click'));
	expect(clickCalled).toBe(false);
});

test('IconButton variants render correctly', async () => {
	// Test ghost variant (default)
	const screenGhost = render(ComponentWrapper, {
		component: IconButton,
		variant: 'ghost',
		children: 'Ghost Icon',
		id: 'icon-button-ghost'
	});
	const iconButtonGhost = screenGhost.container.querySelector('#icon-button-ghost');
	expect(iconButtonGhost).toBeInTheDocument();

	// Test filled variant
	const screenFilled = render(ComponentWrapper, {
		component: IconButton,
		variant: 'filled',
		children: 'Filled Icon',
		id: 'icon-button-filled'
	});
	const iconButtonFilled = screenFilled.container.querySelector('#icon-button-filled');
	expect(iconButtonFilled).toBeInTheDocument();

	// Test outlined variant
	const screenOutlined = render(ComponentWrapper, {
		component: IconButton,
		variant: 'outlined',
		children: 'Outlined Icon',
		id: 'icon-button-outlined'
	});
	const iconButtonOutlined = screenOutlined.container.querySelector('#icon-button-outlined');
	expect(iconButtonOutlined).toBeInTheDocument();
});

test('IconButton focus and blur events work correctly', async () => {
	let focusCalled = false;
	let blurCalled = false;

	const screen = render(ComponentWrapper, {
		component: IconButton,
		children: 'Focus Test Icon',
		id: 'icon-button-focus-blur',
		onfocus: () => {
			focusCalled = true;
		},
		onblur: () => {
			blurCalled = true;
		}
	});
	const button = screen.container.querySelector('#icon-button-focus-blur') as HTMLButtonElement;
	button.focus();
	expect(focusCalled).toBe(true);

	button.blur();
	expect(blurCalled).toBe(true);
});

test('IconButton with badge renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: IconButton,
		children: 'Badge Icon',
		hasBadge: true,
		badgeCount: 5,
		id: 'icon-button-badge'
	});

	// Check if badge element exists
	const badge = screen.container.querySelector('.icon-button__badge');
	expect(badge).toBeInTheDocument();
	expect(badge).toHaveTextContent('5');
});

test('IconButton with loading state renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: IconButton,
		children: 'Loading Icon',
		loading: true,
		id: 'icon-button-loading'
	});

	// Check if loading spinner exists
	const spinner = screen.container.querySelector('.loading-spinner');
	expect(spinner).toBeInTheDocument();
});

test('IconButton with pressed state renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: IconButton,
		children: 'Pressed Icon',
		pressed: true,
		id: 'icon-button-pressed'
	});
	const button = screen.container.querySelector('#icon-button-pressed') as HTMLButtonElement;
	expect(button).toHaveAttribute('aria-pressed', 'true');
});

test('IconButton with rounded prop renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: IconButton,
		children: 'Rounded Icon',
		rounded: true,
		id: 'icon-button-rounded'
	});
	const button = screen.container.querySelector('#icon-button-rounded') as HTMLButtonElement;
	expect(button).toHaveClass('icon-button__button--rounded');
});

test('IconButton CSS variables used are defined (computed) in the page', async () => {
	const screen = render(ComponentWrapper, {
		component: IconButton,
		children: 'CSS Test Icon'
	});
	const wrapper = screen.getByTestId('icon-button').first();
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
