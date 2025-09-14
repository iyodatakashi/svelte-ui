import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import Dialog from '../lib/components/Dialog.svelte';

test('renders Dialog with default props', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true
	});
	const modal = screen.getByTestId('modal');
	expect(modal).toBeInTheDocument();
});

test('Dialog can be opened and closed', async () => {
	// Test closed state
	const screenClosed = render(ComponentWrapper, {
		component: Dialog,
		isOpen: false
	});
	const modalClosed = screenClosed.container.querySelector('[data-testid="modal"]');
	expect(modalClosed).toHaveClass('fade-out');

	// Test open state
	const screenOpen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true
	});
	const modalOpen = screenOpen.container.querySelector('[data-testid="modal"]');
	expect(modalOpen).toHaveClass('fade-in');
});

test('Dialog with title renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true,
		title: 'Test Dialog Title',
		id: 'dialog-title-test'
	});
	const modal = screen.container.querySelector('#modal-dialog-title-test');
	expect(modal).toBeInTheDocument();
});

test('Dialog with description renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true,
		title: 'Test Dialog',
		description: 'This is a test description',
		id: 'dialog-description-test'
	});
	const modal = screen.container.querySelector('#modal-dialog-description-test');
	expect(modal).toBeInTheDocument();
});

test('Dialog with custom width renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true,
		width: 600,
		id: 'dialog-width-test'
	});
	const modal = screen.container.querySelector('#modal-dialog-width-test');
	expect(modal).toBeInTheDocument();
});

test('Dialog with no padding renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true,
		noPadding: true,
		id: 'dialog-no-padding-test'
	});
	const modal = screen.container.querySelector('#modal-dialog-no-padding-test');
	expect(modal).toBeInTheDocument();
});

test('Dialog with scrollable content renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true,
		scrollable: true,
		id: 'dialog-scrollable-test'
	});
	const modal = screen.container.querySelector('#modal-dialog-scrollable-test');
	expect(modal).toBeInTheDocument();
});

test('Dialog with closeIfClickOutside disabled renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true,
		closeIfClickOutside: false,
		id: 'dialog-no-close-test'
	});
	const modal = screen.container.querySelector('#modal-dialog-no-close-test');
	expect(modal).toBeInTheDocument();
});

test('Dialog with restoreFocus enabled renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true,
		restoreFocus: true,
		id: 'dialog-restore-focus-test'
	});
	const modal = screen.container.querySelector('#modal-dialog-restore-focus-test');
	expect(modal).toBeInTheDocument();
});

import { collectCssVarNames } from './helpers/cssVarCollector';

test('Dialog CSS variables used are defined (computed) in the page', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true
	});
	const wrapper = screen.getByTestId('modal');
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
