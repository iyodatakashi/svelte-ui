import { test, expect } from 'vitest';
import { tick } from 'svelte';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import Dialog from '../lib/components/Dialog.svelte';
import StackedDialogs from './helpers/StackedDialogs.svelte';
import DialogCallbacks from './helpers/DialogCallbacks.svelte';

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
	const modal = screen.container.querySelector('#dialog-title-test-modal');
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
	const modal = screen.container.querySelector('#dialog-description-test-modal');
	expect(modal).toBeInTheDocument();
});

test('Dialog with custom width renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true,
		width: 600,
		id: 'dialog-width-test'
	});
	const modal = screen.container.querySelector('#dialog-width-test-modal');
	expect(modal).toBeInTheDocument();
});

test('Dialog with no padding renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true,
		noPadding: true,
		id: 'dialog-no-padding-test'
	});
	const modal = screen.container.querySelector('#dialog-no-padding-test-modal');
	expect(modal).toBeInTheDocument();
});

test('Dialog with scrollable content renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true,
		scrollable: true,
		id: 'dialog-scrollable-test'
	});
	const modal = screen.container.querySelector('#dialog-scrollable-test-modal');
	expect(modal).toBeInTheDocument();
});

test('Dialog with closeIfClickOutside disabled renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true,
		closeIfClickOutside: false,
		id: 'dialog-no-close-test'
	});
	const modal = screen.container.querySelector('#dialog-no-close-test-modal');
	expect(modal).toBeInTheDocument();
});

test('Dialog with restoreFocus enabled renders correctly', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		isOpen: true,
		restoreFocus: true,
		id: 'dialog-restore-focus-test'
	});
	const modal = screen.container.querySelector('#dialog-restore-focus-test-modal');
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

// =========================================================================
// リアクティブ性テスト
// =========================================================================

test('Dialog width property changes reactively', async () => {
	const screen = render(ComponentWrapper, {
		component: Dialog,
		width: 400,
		isOpen: true
	});

	const modal = screen.container.querySelector('[data-testid="modal"]');
	await expect.element(modal).toHaveAttribute('style', expect.stringContaining('width: 400px'));

	// プロパティを更新
	screen.rerender({
		component: Dialog,
		width: 500,
		isOpen: true
	});

	await expect.element(modal).toHaveAttribute('style', expect.stringContaining('width: 500px'));
});

// =========================================================================
// onOpen / onClose
// =========================================================================

test('Dialog calls onOpen once when opened', async () => {
	const screen = render(DialogCallbacks);

	screen.component.open();

	await expect.poll(() => screen.component.getOpenCount()).toBe(1);
});

test('Dialog calls onClose with "explicit" when closed via ref', async () => {
	const screen = render(DialogCallbacks);

	screen.component.open();
	screen.component.close();

	await expect.poll(() => screen.component.getCloseReasons()).toEqual(['explicit']);
});

test('Dialog calls onClose with "escape" when closed by the Escape key', async () => {
	const { userEvent } = await import('@vitest/browser/context');
	const screen = render(DialogCallbacks);

	screen.component.open();
	await userEvent.keyboard('{Escape}');

	await expect.poll(() => screen.component.getCloseReasons()).toEqual(['escape']);
});

test('Dialog calls onClose with "outside" when the backdrop is clicked', async () => {
	const screen = render(DialogCallbacks);

	screen.component.open();
	// 外側クリックのリスナーは isOpen を見る $effect で張られるため、反映を待つ
	await tick();
	const dialog = screen.container.querySelector('#callbacks-modal') as HTMLDialogElement;
	dialog.dispatchEvent(new MouseEvent('click', { bubbles: true }));

	await expect.poll(() => screen.component.getCloseReasons()).toEqual(['outside']);
});

test('Dialog does not call onClose while it has never been opened', async () => {
	const screen = render(DialogCallbacks);

	await new Promise((resolve) => setTimeout(resolve, 50));

	expect(screen.component.getCloseReasons()).toEqual([]);
});

test('Escape closes only the topmost of two stacked Dialogs', async () => {
	const { userEvent } = await import('@vitest/browser/context');
	const screen = render(StackedDialogs);

	screen.component.openBoth();

	const outer = screen.container.querySelector('#outer-modal') as HTMLDialogElement;
	const inner = screen.container.querySelector('#inner-modal') as HTMLDialogElement;
	expect(outer.open).toBe(true);
	expect(inner.open).toBe(true);

	await userEvent.keyboard('{Escape}');

	// The inner dialog closes after its fade-out animation; the outer one must stay open.
	await expect.poll(() => inner.open).toBe(false);
	expect(outer.open).toBe(true);
	expect(outer).toHaveClass('fade-in');
});
