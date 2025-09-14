import { test, expect } from '@playwright/test';

test.describe('Button Component - Browser Tests', () => {
	test('should render Button component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Button Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Button from './Button.svelte';
					
					const app = mount(Button, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Test Button'
						}
					});
				</script>
			</body>
			</html>
		`);

		// ボタンがレンダリングされているか確認
		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveText('Test Button');
	});

	test('should handle click events', async ({ page }) => {
		let clickCount = 0;

		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Button Click Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Button from './Button.svelte';
					
					const app = mount(Button, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Click Me',
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

		const buttonClickCount = await page.evaluate(() => window.clickCount);
		expect(buttonClickCount).toBe(1);
	});

	test('should support different variants', async ({ page }) => {
		const variants = ['ghost', 'filled', 'outlined', 'glass'];

		for (const variant of variants) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Button Variant Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Button from './Button.svelte';
						
						const app = mount(Button, {
							target: document.getElementById('app'),
							props: {
								variant: '${variant}',
								children: () => '${variant} Button'
							}
						});
					</script>
				</body>
				</html>
			`);

			const button = page.locator('button');
			await expect(button).toBeVisible();
			await expect(button).toHaveText(`${variant} Button`);
		}
	});

	test('should support different sizes', async ({ page }) => {
		const sizes = ['small', 'medium', 'large'];

		for (const size of sizes) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Button Size Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Button from './Button.svelte';
						
						const app = mount(Button, {
							target: document.getElementById('app'),
							props: {
								size: '${size}',
								children: () => '${size} Button'
							}
						});
					</script>
				</body>
				</html>
			`);

			const button = page.locator('button');
			await expect(button).toBeVisible();
			await expect(button).toHaveText(`${size} Button`);
		}
	});

	test('should handle disabled state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Button Disabled Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Button from './Button.svelte';
					
					const app = mount(Button, {
						target: document.getElementById('app'),
						props: {
							disabled: true,
							children: () => 'Disabled Button'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeDisabled();
		await expect(button).toHaveText('Disabled Button');
	});

	test('should handle loading state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Button Loading Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Button from './Button.svelte';
					
					const app = mount(Button, {
						target: document.getElementById('app'),
						props: {
							loading: true,
							children: () => 'Loading Button'
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

	test('should support icons', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Button Icon Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Button from './Button.svelte';
					
					const app = mount(Button, {
						target: document.getElementById('app'),
						props: {
							icon: 'home',
							children: () => 'Icon Button'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveText('Icon Button');

		// アイコンが表示されているか確認
		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
	});

	test('should support fullWidth prop', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Button FullWidth Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Button from './Button.svelte';
					
					const app = mount(Button, {
						target: document.getElementById('app'),
						props: {
							fullWidth: true,
							children: () => 'Full Width Button'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveText('Full Width Button');
	});

	test('should support rounded prop', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Button Rounded Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Button from './Button.svelte';
					
					const app = mount(Button, {
						target: document.getElementById('app'),
						props: {
							rounded: true,
							children: () => 'Rounded Button'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveText('Rounded Button');
	});

	test('should handle keyboard events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Button Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Button from './Button.svelte';
					
					const app = mount(Button, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Keyboard Button'
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
				<title>Button ARIA Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Button from './Button.svelte';
					
					const app = mount(Button, {
						target: document.getElementById('app'),
						props: {
							ariaLabel: 'Test Button',
							ariaDescribedby: 'button-description',
							children: () => 'ARIA Button'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveAttribute('aria-label', 'Test Button');
		await expect(button).toHaveAttribute('aria-describedby', 'button-description');
	});

	test('should support custom styles', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Button Custom Style Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Button from './Button.svelte';
					
					const app = mount(Button, {
						target: document.getElementById('app'),
						props: {
							customStyle: 'background-color: red; color: white;',
							children: () => 'Custom Style Button'
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveText('Custom Style Button');
	});
});
