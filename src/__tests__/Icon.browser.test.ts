import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import Icon from '../lib/components/Icon.svelte';

test('renders Icon with basic props', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home'
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect.element(icon).toHaveClass('material-symbols-outlined');
	await expect.element(icon).toHaveTextContent('home');
});

test('renders Icon with custom size', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		size: 32
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect.element(icon).toHaveStyle('width: 32px');
	await expect.element(icon).toHaveStyle('height: 32px');
	await expect.element(icon).toHaveStyle('font-size: 32px');
});

test('renders Icon with custom color', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		color: 'red'
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect.element(icon).toHaveStyle('color: red');
});

test('renders Icon with filled variant', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		variant: 'filled'
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect.element(icon).toHaveClass('material-symbols-filled');
});

test('renders Icon with rounded variant', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		variant: 'rounded'
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect.element(icon).toHaveClass('material-symbols-rounded');
});

test('renders Icon with sharp variant', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		variant: 'sharp'
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect.element(icon).toHaveClass('material-symbols-sharp');
});

test('renders Icon with filled prop', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		filled: true
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect
		.element(icon)
		.toHaveStyle("font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24");
});

test('renders Icon with custom weight', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		weight: 500
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect
		.element(icon)
		.toHaveStyle("font-variation-settings: 'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 24");
});

test('renders Icon with custom grade', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		grade: 200
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect
		.element(icon)
		.toHaveStyle("font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 200, 'opsz' 24");
});

test('renders Icon with custom optical size', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		opticalSize: 48
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect
		.element(icon)
		.toHaveStyle("font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 48");
});

test('renders Icon with title attribute', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		title: 'Home icon'
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect.element(icon).toHaveAttribute('title', 'Home icon');
});

test('renders Icon with custom style', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		customStyle: 'border: 1px solid black;'
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect.element(icon).toHaveStyle('border: 1px solid black');
});

test('renders Icon with aria-label', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		ariaLabel: 'Home icon',
		decorative: false
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect.element(icon).toHaveAttribute('aria-label', 'Home icon');
	await expect.element(icon).toHaveAttribute('role', 'img');
	await expect.element(icon).not.toHaveAttribute('aria-hidden');
});

test('renders Icon as decorative by default', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home'
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect.element(icon).toHaveAttribute('aria-hidden', 'true');
	await expect.element(icon).not.toHaveAttribute('role');
});

test('renders Icon with fallback text', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		fallbackText: '🏠'
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	const fallback = screen.container.querySelector('[data-testid="icon-fallback"]');

	await expect.element(icon).toBeVisible();
	await expect.element(fallback).toBeVisible();
	await expect.element(fallback).toHaveTextContent('🏠');
	await expect.element(fallback).toHaveClass('icon-fallback-text');
});

test('renders Icon with fallback text and custom size', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		fallbackText: '🏠',
		size: 32
	});

	const fallback = screen.container.querySelector('[data-testid="icon-fallback"]');
	await expect.element(fallback).toBeVisible();
	// Fallback text doesn't directly apply size, it inherits from parent or uses customStyle
	// The size is applied to the icon element, not the fallback text
	// Check that fallback is visible and has the correct class
	await expect.element(fallback).toHaveClass('icon-fallback-text');
});

test('renders Icon with fallback text and custom style', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		fallbackText: '🏠',
		customStyle: 'border: 1px solid red;'
	});

	const fallback = screen.container.querySelector('[data-testid="icon-fallback"]');
	await expect.element(fallback).toBeVisible();
	await expect.element(fallback).toHaveStyle('border: 1px solid red');
});

test('renders Icon with additional props', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		id: 'test-icon',
		class: 'custom-class'
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect.element(icon).toHaveAttribute('id', 'test-icon');
	await expect.element(icon).toHaveClass('custom-class');
});

test('renders Icon with complex font variation settings', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home',
		filled: true,
		weight: 600,
		grade: 200,
		opticalSize: 32
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect
		.element(icon)
		.toHaveStyle("font-variation-settings: 'FILL' 1, 'wght' 600, 'GRAD' 200, 'opsz' 32");
});

test('renders Icon with default values', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: () => 'home'
	});

	const icon = screen.container.querySelector('[data-testid="icon"]');
	await expect.element(icon).toBeVisible();
	await expect.element(icon).toHaveClass('material-symbols-outlined');
	await expect.element(icon).toHaveStyle('width: 24px');
	await expect.element(icon).toHaveStyle('height: 24px');
	await expect.element(icon).toHaveStyle('font-size: 24px');
	await expect
		.element(icon)
		.toHaveStyle("font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24");
});

// =========================================================================
// リアクティブ性テスト
// =========================================================================

test('Icon size property changes reactively', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: 'home',
		size: 24
	});

	const icon = screen.container.querySelector('i');
	await expect.element(icon).toHaveAttribute('style', expect.stringContaining('width: 24px'));
	await expect.element(icon).toHaveAttribute('style', expect.stringContaining('height: 24px'));
	await expect.element(icon).toHaveAttribute('style', expect.stringContaining('font-size: 24px'));

	// プロパティを更新
	screen.rerender({
		component: Icon,
		children: 'home',
		size: 32
	});

	await expect.element(icon).toHaveAttribute('style', expect.stringContaining('width: 32px'));
	await expect.element(icon).toHaveAttribute('style', expect.stringContaining('height: 32px'));
	await expect.element(icon).toHaveAttribute('style', expect.stringContaining('font-size: 32px'));
});

test('Icon color property changes reactively', async () => {
	const screen = render(ComponentWrapper, {
		component: Icon,
		children: 'home',
		color: 'red'
	});

	const icon = screen.container.querySelector('i');
	await expect.element(icon).toHaveAttribute('style', expect.stringContaining('color: red'));

	// プロパティを更新
	screen.rerender({
		component: Icon,
		children: 'home',
		color: 'blue'
	});

	await expect.element(icon).toHaveAttribute('style', expect.stringContaining('color: blue'));
});
