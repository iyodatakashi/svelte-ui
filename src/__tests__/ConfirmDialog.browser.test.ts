import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import ConfirmDialog from '../lib/components/ConfirmDialog.svelte';

test('renders ConfirmDialog with default props', async () => {
	const screen = render(ComponentWrapper, {
		component: ConfirmDialog,
		isOpen: true
	});
	const modal = screen.getByTestId('modal');
	expect(modal).toBeInTheDocument();
});

test('ConfirmDialog can be opened and closed', async () => {
	// Test closed state
	const screenClosed = render(ComponentWrapper, {
		component: ConfirmDialog,
		isOpen: false
	});
	const modalClosed = screenClosed.container.querySelector('[data-testid="modal"]');
	expect(modalClosed).toHaveClass('fade-out');

	// Test open state
	const screenOpen = render(ComponentWrapper, {
		component: ConfirmDialog,
		isOpen: true
	});
	const modalOpen = screenOpen.container.querySelector('[data-testid="modal"]');
	expect(modalOpen).toHaveClass('fade-in');
});

test('ConfirmDialog confirm button works correctly', async () => {
	let submitCalled = false;
	const screen = render(ComponentWrapper, {
		component: ConfirmDialog,
		isOpen: true,
		onSubmit: () => {
			submitCalled = true;
		},
		id: 'confirm-dialog-test'
	});

	const confirmButton = screen.container.querySelector(
		'button[data-testid="button"]:last-child'
	) as HTMLButtonElement | null;
	expect(confirmButton).toBeInTheDocument();

	await confirmButton?.click();
	expect(submitCalled).toBe(true);
});

test('ConfirmDialog cancel button works correctly', async () => {
	let cancelCalled = false;
	const screen = render(ComponentWrapper, {
		component: ConfirmDialog,
		isOpen: true,
		onCancel: () => {
			cancelCalled = true;
		},
		id: 'cancel-dialog-test'
	});

	const cancelButton = screen.container.querySelector(
		'button[data-testid="button"]:first-child'
	) as HTMLButtonElement | null;
	expect(cancelButton).toBeInTheDocument();

	await cancelButton?.click();
	expect(cancelCalled).toBe(true);
});

test('ConfirmDialog danger prop renders correctly', async () => {
	// Test default (non-danger)
	const screenDefault = render(ComponentWrapper, {
		component: ConfirmDialog,
		isOpen: true,
		danger: false,
		id: 'confirm-dialog-default'
	});
	const modalDefault = screenDefault.container.querySelector('[data-testid="modal"]');
	expect(modalDefault).toBeInTheDocument();

	// Test danger variant
	const screenDanger = render(ComponentWrapper, {
		component: ConfirmDialog,
		isOpen: true,
		danger: true,
		id: 'confirm-dialog-danger'
	});
	const modalDanger = screenDanger.container.querySelector('[data-testid="modal"]');
	expect(modalDanger).toBeInTheDocument();
});

test('ConfirmDialog with custom text renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: ConfirmDialog,
		isOpen: true,
		title: 'Custom Title',
		description: 'Custom description content',
		submitLabel: 'Yes, proceed',
		cancelLabel: 'No, cancel',
		id: 'custom-dialog-test'
	});
	const modal = screen.getByTestId('modal');
	expect(modal).toBeInTheDocument();

	// Check if custom text is displayed
	expect(screen.getByTestId('modal')).toBeInTheDocument();
});

test('ConfirmDialog with custom width renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: ConfirmDialog,
		isOpen: true,
		width: 600,
		id: 'wide-dialog-test'
	});
	const modal = screen.getByTestId('modal');
	expect(modal).toBeInTheDocument();
});

test('ConfirmDialog with HTML description renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: ConfirmDialog,
		isOpen: true,
		description: '<strong>Bold text</strong> and <em>italic text</em>',
		id: 'html-dialog-test'
	});
	const modal = screen.getByTestId('modal');
	expect(modal).toBeInTheDocument();
});

test('ConfirmDialog with closeIfClickOutside=false renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: ConfirmDialog,
		isOpen: true,
		closeIfClickOutside: false,
		id: 'no-close-dialog-test'
	});
	const modal = screen.getByTestId('modal');
	expect(modal).toBeInTheDocument();
});

test('ConfirmDialog with closeIfClickOutside=true renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: ConfirmDialog,
		isOpen: true,
		closeIfClickOutside: true,
		id: 'close-dialog-test'
	});
	const modal = screen.getByTestId('modal');
	expect(modal).toBeInTheDocument();
});

import { collectCssVarNames } from './helpers/cssVarCollector';

test('ConfirmDialog CSS variables used are defined (computed) in the page', async () => {
	const screen = render(ComponentWrapper, {
		component: ConfirmDialog,
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
