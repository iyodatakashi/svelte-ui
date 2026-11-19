import { test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';
import PopupEscape from './helpers/PopupEscape.svelte';

const isPopoverOpen = (el: Element) => el.matches(':popover-open');

const settle = () => new Promise((r) => setTimeout(r, 20));

test('Escape closes the Popup with reason "escape" while focus stays on the anchor', async () => {
	const onClose = vi.fn();
	await render(PopupEscape, { onClose });
	const popup = document.querySelector<HTMLElement>('#popup-alone')!;
	const anchor = document.querySelector<HTMLElement>('#anchor-alone')!;

	await userEvent.click(anchor);
	await expect.poll(() => isPopoverOpen(popup)).toBe(true);
	expect(document.activeElement).toBe(anchor);

	await userEvent.keyboard('{Escape}');

	await expect.poll(() => isPopoverOpen(popup)).toBe(false);
	await expect.poll(() => onClose.mock.calls).toEqual([['escape']]);
});

test('outside click while the Popup is closed does not leak into the next close reason', async () => {
	const onClose = vi.fn();
	await render(PopupEscape, { onClose });
	const popup = document.querySelector<HTMLElement>('#popup-alone')!;

	await settle();
	await userEvent.click(document.querySelector<HTMLElement>('#neutral')!);
	expect(onClose).not.toHaveBeenCalled();

	await userEvent.click(document.querySelector<HTMLElement>('#anchor-alone')!);
	await expect.poll(() => isPopoverOpen(popup)).toBe(true);
	await userEvent.keyboard('{Escape}');

	await expect.poll(() => isPopoverOpen(popup)).toBe(false);
	await expect.poll(() => onClose.mock.calls).toEqual([['escape']]);
});

test('Escape closes only the Popup when it is open inside a Dialog', async () => {
	const onClose = vi.fn();
	await render(PopupEscape, { onClose });
	const dialog = document.querySelector<HTMLElement>('#dialog-modal') as HTMLDialogElement;
	const popup = document.querySelector<HTMLElement>('#popup-in-dialog')!;

	await userEvent.click(document.querySelector<HTMLElement>('#open-dialog')!);
	await expect.poll(() => dialog.open).toBe(true);
	await userEvent.click(document.querySelector<HTMLElement>('#anchor-in-dialog')!);
	await expect.poll(() => isPopoverOpen(popup)).toBe(true);

	await userEvent.keyboard('{Escape}');

	await expect.poll(() => isPopoverOpen(popup)).toBe(false);
	await expect.poll(() => onClose.mock.calls).toEqual([['escape']]);
	expect(dialog.open).toBe(true);
	expect(dialog).toHaveClass('fade-in');
});
