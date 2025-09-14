import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';
import Skeleton from '../lib/components/skeleton/Skeleton.svelte';
import type { SkeletonPatternConfig } from '../lib/types/skeleton';

test('renders Skeleton with basic box pattern', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'box' }]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
	await expect.element(skeleton).toHaveClass('skeleton');
});

test('renders Skeleton with custom repeat count', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'box' }],
		repeat: 3
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();

	const items = skeleton?.querySelectorAll('.skeleton__item');
	expect(items).toHaveLength(3);
});

test('renders Skeleton with custom className', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'box' }],
		className: 'custom-skeleton'
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
	await expect.element(skeleton).toHaveClass('custom-skeleton');
});

test('renders Skeleton with custom style', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'box' }],
		customStyle: 'border: 1px solid red;'
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
	await expect.element(skeleton).toHaveStyle('border: 1px solid red');
});

test('renders Skeleton with animated disabled', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'box' }],
		animated: false
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with text pattern', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'text', lines: 3 }]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with avatar pattern', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'avatar', showName: true }]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with media pattern', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [
			{
				type: 'media',
				layout: 'horizontal',
				thumbnailConfig: { width: '160px', aspectRatio: '4/3' },
				textConfig: { lines: 3 }
			}
		]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with button pattern', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'button', width: '120px' }]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with heading pattern', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'heading', width: '200px' }]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with multiple patterns', async () => {
	const patterns: SkeletonPatternConfig[] = [
		{ type: 'box', width: '100px', height: '20px' },
		{ type: 'text', lines: 2 },
		{ type: 'avatar', showName: true }
	];

	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with preset article-detail pattern', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'article-detail' }]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with preset article-list pattern', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'article-list' }]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with preset product-list pattern', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'product-list' }]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with preset video-list pattern', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'video-list' }]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with preset user-list pattern', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'user-list' }]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with preset button-group pattern', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'button-group' }]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with custom repeatGap', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'box' }],
		repeat: 2,
		repeatGap: '32px'
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();

	const items = skeleton?.querySelector('.skeleton__items');
	await expect.element(items).toHaveStyle('gap: 32px');
});

test('renders Skeleton with custom itemGap', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'box' }],
		itemGap: '16px'
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();

	const item = skeleton?.querySelector('.skeleton__item');
	await expect.element(item).toHaveStyle('gap: 16px');
});

test('renders Skeleton with pattern repeat', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [{ type: 'box', repeat: 3 }]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
});

test('renders Skeleton with horizontal pattern direction', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [
			{
				type: 'box',
				repeat: 2,
				repeatDirection: 'horizontal'
			}
		]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();

	const pattern = skeleton?.querySelector('.skeleton__pattern--horizontal');
	expect(pattern).toBeInTheDocument();
});

test('renders Skeleton with custom pattern repeatGap', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: [
			{
				type: 'box',
				repeat: 2,
				repeatGap: '20px'
			}
		]
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();

	const pattern = skeleton?.querySelector('.skeleton__pattern');
	await expect.element(pattern).toHaveStyle('gap: 20px');
});

test('renders Skeleton with empty patterns array', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton,
		patterns: []
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	expect(skeleton).toBeInTheDocument();
});

test('renders Skeleton with default values', async () => {
	const screen = render(ComponentWrapper, {
		component: Skeleton
	});

	const skeleton = screen.container.querySelector('[data-testid="skeleton"]');
	await expect.element(skeleton).toBeVisible();
	await expect.element(skeleton).toHaveClass('skeleton');

	const items = skeleton?.querySelectorAll('.skeleton__item');
	expect(items).toHaveLength(1); // default repeat = 1
});
