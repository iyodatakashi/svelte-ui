import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { userEvent } from 'vitest/browser';
import TooltipScene from './helpers/TooltipScene.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const setup = async (props: Record<string, unknown> = {}) => {
	const screen = await render(TooltipScene, props);
	const target = screen.container.querySelector<HTMLButtonElement>('#target')!;
	const tooltip = screen.container.querySelector<HTMLElement>('#tooltip-label')!;
	const isOpen = () => tooltip.matches(':popover-open');
	return { screen, target, tooltip, isOpen };
};

test('the text is the description of the target', async () => {
	const { target, tooltip } = await setup();

	expect(tooltip).toHaveAttribute('role', 'tooltip');
	expect(tooltip).toHaveTextContent('Bold (⌘B)');
	expect(target).toHaveAttribute('aria-describedby', 'tooltip-label');
	await expect.element(target).toHaveAccessibleDescription('Bold (⌘B)');
});

test('keeps the description the target already has', async () => {
	const { target } = await setup({ ariaDescribedby: 'existing' });

	expect(target.getAttribute('aria-describedby')?.split(' ')).toEqual([
		'existing',
		'tooltip-label'
	]);
});

test('the wrapper does not change the layout of the target', async () => {
	const { screen } = await setup();

	expect(getComputedStyle(screen.getByTestId('tooltip').element()).display).toBe('contents');
});

test('hover shows the tooltip after the delay and leaving hides it', async () => {
	const { target, isOpen } = await setup({ delay: 200 });

	await userEvent.hover(target);
	await wait(50);
	expect(isOpen()).toBe(false);

	await expect.poll(isOpen).toBe(true);

	await userEvent.unhover(target);
	expect(isOpen()).toBe(false);
});

test('waits 0.4 seconds by default before showing on hover', async () => {
	const { target, isOpen } = await setup();

	await userEvent.hover(target);
	await wait(250);
	expect(isOpen()).toBe(false);

	await expect.poll(isOpen).toBe(true);
});

test('leaving before the delay cancels the tooltip', async () => {
	const { target, isOpen } = await setup({ delay: 100 });

	await userEvent.hover(target);
	await userEvent.unhover(target);
	await wait(200);
	expect(isOpen()).toBe(false);
});

test('keyboard focus shows the tooltip at once and moving focus away hides it', async () => {
	const { screen, target, isOpen } = await setup();
	screen.container.querySelector<HTMLButtonElement>('#before')!.focus();

	await userEvent.keyboard('{Tab}');
	expect(document.activeElement).toBe(target);
	expect(isOpen()).toBe(true);

	await userEvent.keyboard('{Tab}');
	expect(isOpen()).toBe(false);
});

test('Escape hides the tooltip', async () => {
	const { screen, isOpen } = await setup();
	screen.container.querySelector<HTMLButtonElement>('#before')!.focus();

	await userEvent.keyboard('{Tab}');
	expect(isOpen()).toBe(true);

	await userEvent.keyboard('{Escape}');
	expect(isOpen()).toBe(false);
});

test('pressing the target hides the tooltip', async () => {
	const { target, isOpen } = await setup({ delay: 0 });

	await userEvent.hover(target);
	await expect.poll(isOpen).toBe(true);

	await userEvent.click(target);
	expect(isOpen()).toBe(false);
});

const showByKeyboard = async (props: Record<string, unknown>) => {
	const result = await setup(props);
	result.screen.container.querySelector<HTMLButtonElement>('#before')!.focus();
	await userEvent.keyboard('{Tab}');
	return {
		target: result.target.getBoundingClientRect(),
		tooltip: result.tooltip.getBoundingClientRect()
	};
};

test.each([
	['bottom', (t: DOMRect, r: DOMRect) => expect(r.top).toBeCloseTo(t.bottom + 4, 0)],
	['top', (t: DOMRect, r: DOMRect) => expect(r.bottom).toBeCloseTo(t.top - 4, 0)],
	['right', (t: DOMRect, r: DOMRect) => expect(r.left).toBeCloseTo(t.right + 4, 0)],
	['left', (t: DOMRect, r: DOMRect) => expect(r.right).toBeCloseTo(t.left - 4, 0)]
] as const)('position="%s" shows the tooltip on that side', async (position, check) => {
	const { target, tooltip } = await showByKeyboard({ position });

	check(target, tooltip);
});

test('shows below by default', async () => {
	const { target, tooltip } = await showByKeyboard({});

	expect(tooltip.top).toBeCloseTo(target.bottom + 4, 0);
	expect(tooltip.left + tooltip.width / 2).toBeCloseTo(target.left + target.width / 2, 0);
});

test('flips to the opposite side when there is no room', async () => {
	const { target, tooltip } = await showByKeyboard({
		position: 'top',
		targetStyle: 'position: fixed; top: 0; left: 200px;'
	});

	expect(tooltip.top).toBeCloseTo(target.bottom + 4, 0);
});

test('stays inside the screen near its edge', async () => {
	const { tooltip } = await showByKeyboard({
		text: 'A long description near the left edge',
		targetStyle: 'position: fixed; top: 100px; left: 0;'
	});

	expect(tooltip.left).toBeGreaterThanOrEqual(4);
});

test('uses the inverse colors of the theme', async () => {
	const style = document.createElement('style');
	style.textContent = variables;
	document.head.appendChild(style);
	try {
		const { tooltip } = await setup();
		const probe = document.createElement('div');
		probe.style.background = 'var(--svelte-ui-surface-inverse-color)';
		probe.style.color = 'var(--svelte-ui-text-inverse-color)';
		document.body.appendChild(probe);

		expect(getComputedStyle(tooltip).backgroundColor).toBe(getComputedStyle(probe).backgroundColor);
		expect(getComputedStyle(tooltip).color).toBe(getComputedStyle(probe).color);
		probe.remove();
	} finally {
		style.remove();
	}
});
