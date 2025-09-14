import { test, expect } from '@playwright/test';

test.describe('IconButton Component - Browser Tests', () => {
	test('should render IconButton component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>IconButton Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import IconButton from './IconButton.svelte';
					
					const app = mount(IconButton, {
						target: document.getElementById('app'),
						props: {
							icon: 'home',
							ariaLabel: 'Home button'
						}
					});
				</script>
			</body>
			</html>
		`);

		// ボタンがレンダリングされているか確認
		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveAttribute('aria-label', 'Home button');
	});

	test('should handle click events', async ({ page }) => {
		let clickCount = 0;

		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>IconButton Click Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import IconButton from './IconButton.svelte';
					
					const app = mount(IconButton, {
						target: document.getElementById('app'),
						props: {
							icon: 'home',
							ariaLabel: 'Home button',
							onclick: () => {
								window.clickCount = (window.clickCount || 0) + 1;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await button.click();

		const iconButtonClickCount = await page.evaluate(() => window.clickCount);
		expect(iconButtonClickCount).toBe(1);
	});

	test('should support different variants', async ({ page }) => {
		const variants = ['ghost', 'filled', 'outlined', 'glass'];

		for (const variant of variants) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>IconButton Variant Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import IconButton from './IconButton.svelte';
						
						const app = mount(IconButton, {
							target: document.getElementById('app'),
							props: {
								variant: '${variant}',
								icon: 'home',
								ariaLabel: '${variant} button'
							}
						});
					</script>
				</body>
				</html>
			`);

			const button = page.locator('button');
			await expect(button).toBeVisible();
			await expect(button).toHaveAttribute('aria-label', `${variant} button`);
		}
	});

	test('should support different sizes', async ({ page }) => {
		const sizes = [24, 32, 40, 48];

		for (const size of sizes) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>IconButton Size Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import IconButton from './IconButton.svelte';
						
						const app = mount(IconButton, {
							target: document.getElementById('app'),
							props: {
								size: ${size},
								icon: 'home',
								ariaLabel: 'Size ${size} button'
							}
						});
					</script>
				</body>
				</html>
			`);

			const button = page.locator('button');
			await expect(button).toBeVisible();
			await expect(button).toHaveAttribute('aria-label', `Size ${size} button`);
		}
	});

	test('should handle disabled state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>IconButton Disabled Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import IconButton from './IconButton.svelte';
					
					const app = mount(IconButton, {
						target: document.getElementById('app'),
						props: {
							disabled: true,
							icon: 'home',
							ariaLabel: 'Disabled button'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeDisabled();
		await expect(button).toHaveAttribute('aria-label', 'Disabled button');
	});

	test('should handle loading state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>IconButton Loading Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import IconButton from './IconButton.svelte';
					
					const app = mount(IconButton, {
						target: document.getElementById('app'),
						props: {
							loading: true,
							icon: 'home',
							ariaLabel: 'Loading button'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
		// ローディングスピナーが表示されているか確認
		const spinner = page.locator('.loading-spinner');
		await expect(spinner).toBeVisible();
	});

	test('should handle pressed state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>IconButton Pressed Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import IconButton from './IconButton.svelte';
					
					const app = mount(IconButton, {
						target: document.getElementById('app'),
						props: {
							pressed: true,
							icon: 'home',
							ariaLabel: 'Pressed button'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveAttribute('aria-pressed', 'true');
	});

	test('should support badges', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>IconButton Badge Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import IconButton from './IconButton.svelte';
					
					const app = mount(IconButton, {
						target: document.getElementById('app'),
						props: {
							icon: 'notifications',
							ariaLabel: 'Notifications',
							hasBadge: true,
							badgeCount: 5,
							badgeVariant: 'count'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveAttribute('aria-label', 'Notifications');

		// バッジが表示されているか確認
		const badge = page.locator('.badge');
		await expect(badge).toBeVisible();
		await expect(badge).toHaveText('5');
	});

	test('should support dot badges', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>IconButton Dot Badge Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import IconButton from './IconButton.svelte';
					
					const app = mount(IconButton, {
						target: document.getElementById('app'),
						props: {
							icon: 'notifications',
							ariaLabel: 'Notifications',
							hasBadge: true,
							badgeVariant: 'dot'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();

		// ドットバッジが表示されているか確認
		const badge = page.locator('.badge--dot');
		await expect(badge).toBeVisible();
	});

	test('should support rounded prop', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>IconButton Rounded Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import IconButton from './IconButton.svelte';
					
					const app = mount(IconButton, {
						target: document.getElementById('app'),
						props: {
							rounded: true,
							icon: 'home',
							ariaLabel: 'Rounded button'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveAttribute('aria-label', 'Rounded button');
	});

	test('should handle keyboard events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>IconButton Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import IconButton from './IconButton.svelte';
					
					const app = mount(IconButton, {
						target: document.getElementById('app'),
						props: {
							icon: 'home',
							ariaLabel: 'Keyboard button'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await button.focus();
		await expect(button).toBeFocused();

		// Enterキーでクリック
		await button.press('Enter');
	});

	test('should support ARIA attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>IconButton ARIA Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import IconButton from './IconButton.svelte';
					
					const app = mount(IconButton, {
						target: document.getElementById('app'),
						props: {
							icon: 'home',
							ariaLabel: 'Test IconButton',
							ariaDescribedby: 'button-description',
							ariaExpanded: 'false'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveAttribute('aria-label', 'Test IconButton');
		await expect(button).toHaveAttribute('aria-describedby', 'button-description');
		await expect(button).toHaveAttribute('aria-expanded', 'false');
	});

	test('should support custom styles', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>IconButton Custom Style Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import IconButton from './IconButton.svelte';
					
					const app = mount(IconButton, {
						target: document.getElementById('app'),
						props: {
							icon: 'home',
							ariaLabel: 'Custom style button',
							customStyle: 'background-color: red; color: white;'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveAttribute('aria-label', 'Custom style button');
	});

	test('should support icon variants', async ({ page }) => {
		const iconVariants = ['outlined', 'filled', 'rounded', 'sharp', 'two-tone'];

		for (const iconVariant of iconVariants) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>IconButton Icon Variant Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import IconButton from './IconButton.svelte';
						
						const app = mount(IconButton, {
							target: document.getElementById('app'),
							props: {
								icon: 'home',
								iconVariant: '${iconVariant}',
								ariaLabel: '${iconVariant} icon button'
							}
						});
					</script>
				</body>
				</html>
			`);

			const button = page.locator('button');
			await expect(button).toBeVisible();
			await expect(button).toHaveAttribute('aria-label', `${iconVariant} icon button`);
		}
	});
});
