import { test, expect } from '@playwright/test';

test.describe('PopupMenuButton Component - Browser Tests', () => {
	test('should render PopupMenuButton component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenuButton Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenuButton from './PopupMenuButton.svelte';
					
					const app = mount(PopupMenuButton, {
						target: document.getElementById('app'),
						props: {
							menuItems: [
								{ label: 'Item 1', value: 'item1' },
								{ label: 'Item 2', value: 'item2' }
							]
						}
					});
				</script>
			</body>
			</html>
		`);

		// PopupMenuButtonがレンダリングされているか確認
		const button = page.locator('button');
		await expect(button).toBeVisible();
	});

	test('should handle click events to open menu', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenuButton Click Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenuButton from './PopupMenuButton.svelte';
					
					const app = mount(PopupMenuButton, {
						target: document.getElementById('app'),
						props: {
							menuItems: [
								{ label: 'Item 1', value: 'item1' },
								{ label: 'Item 2', value: 'item2' }
							]
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await button.click();

		// メニューが表示されているか確認
		const menu = page.locator('.popup-menu');
		await expect(menu).toBeVisible();
	});

	test('should support different variants', async ({ page }) => {
		const variants = ['ghost', 'filled', 'outlined', 'glass'];

		for (const variant of variants) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>PopupMenuButton Variant Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import PopupMenuButton from './PopupMenuButton.svelte';
						
						const app = mount(PopupMenuButton, {
							target: document.getElementById('app'),
							props: {
								variant: '${variant}',
								menuItems: [
									{ label: 'Item 1', value: 'item1' }
								]
							}
						});
					</script>
				</body>
				</html>
			`);

			const button = page.locator('button');
			await expect(button).toBeVisible();
		}
	});

	test('should support different positions', async ({ page }) => {
		const positions = ['top', 'bottom', 'left', 'right'];

		for (const position of positions) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>PopupMenuButton Position Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import PopupMenuButton from './PopupMenuButton.svelte';
						
						const app = mount(PopupMenuButton, {
							target: document.getElementById('app'),
							props: {
								position: '${position}',
								menuItems: [
									{ label: 'Item 1', value: 'item1' }
								]
							}
						});
					</script>
				</body>
				</html>
			`);

			const button = page.locator('button');
			await expect(button).toBeVisible();
		}
	});

	test('should support different sizes', async ({ page }) => {
		const sizes = [24, 32, 40, 48];

		for (const size of sizes) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>PopupMenuButton Size Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import PopupMenuButton from './PopupMenuButton.svelte';
						
						const app = mount(PopupMenuButton, {
							target: document.getElementById('app'),
							props: {
								size: ${size},
								menuItems: [
									{ label: 'Item 1', value: 'item1' }
								]
							}
						});
					</script>
				</body>
				</html>
			`);

			const button = page.locator('button');
			await expect(button).toBeVisible();
		}
	});

	test('should handle disabled state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenuButton Disabled Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenuButton from './PopupMenuButton.svelte';
					
					const app = mount(PopupMenuButton, {
						target: document.getElementById('app'),
						props: {
							disabled: true,
							menuItems: [
								{ label: 'Item 1', value: 'item1' }
							]
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeDisabled();
	});

	test('should support rounded prop', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenuButton Rounded Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenuButton from './PopupMenuButton.svelte';
					
					const app = mount(PopupMenuButton, {
						target: document.getElementById('app'),
						props: {
							rounded: true,
							menuItems: [
								{ label: 'Item 1', value: 'item1' }
							]
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
	});

	test('should support mobile fullscreen', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenuButton Mobile Fullscreen Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenuButton from './PopupMenuButton.svelte';
					
					const app = mount(PopupMenuButton, {
						target: document.getElementById('app'),
						props: {
							mobileFullscreen: true,
							menuItems: [
								{ label: 'Item 1', value: 'item1' }
							]
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
	});

	test('should support different mobile behaviors', async ({ page }) => {
		const mobileBehaviors = ['auto', 'fullscreen', 'popup'];

		for (const behavior of mobileBehaviors) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>PopupMenuButton Mobile Behavior Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import PopupMenuButton from './PopupMenuButton.svelte';
						
						const app = mount(PopupMenuButton, {
							target: document.getElementById('app'),
							props: {
								mobileBehavior: '${behavior}',
								menuItems: [
									{ label: 'Item 1', value: 'item1' }
								]
							}
						});
					</script>
				</body>
				</html>
			`);

			const button = page.locator('button');
			await expect(button).toBeVisible();
		}
	});

	test('should handle keyboard events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenuButton Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenuButton from './PopupMenuButton.svelte';
					
					const app = mount(PopupMenuButton, {
						target: document.getElementById('app'),
						props: {
							menuItems: [
								{ label: 'Item 1', value: 'item1' }
							]
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

	test('should support menu items with icons', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenuButton Menu Items Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenuButton from './PopupMenuButton.svelte';
					
					const app = mount(PopupMenuButton, {
						target: document.getElementById('app'),
						props: {
							menuItems: [
								{ label: 'Home', value: 'home', icon: 'home' },
								{ label: 'Settings', value: 'settings', icon: 'settings' },
								{ label: 'Disabled Item', value: 'disabled', disabled: true }
							]
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();

		// メニューを開く
		await button.click();

		// メニューアイテムが表示されているか確認
		const menuItems = page.locator('.menu-item');
		await expect(menuItems).toHaveCount(3);
	});

	test('should support children snippet', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenuButton Children Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenuButton from './PopupMenuButton.svelte';
					
					const app = mount(PopupMenuButton, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Custom Button',
							menuItems: [
								{ label: 'Item 1', value: 'item1' }
							]
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();
		await expect(button).toHaveText('Custom Button');
	});

	test('should handle menu item selection', async ({ page }) => {
		let selectedValue = null;

		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenuButton Selection Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenuButton from './PopupMenuButton.svelte';
					
					const app = mount(PopupMenuButton, {
						target: document.getElementById('app'),
						props: {
							menuItems: [
								{ label: 'Item 1', value: 'item1' },
								{ label: 'Item 2', value: 'item2' }
							],
							onMenuItemSelect: (value) => {
								window.selectedValue = value;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await button.click();

		// メニューアイテムをクリック
		const menuItem = page.locator('.menu-item').first();
		await menuItem.click();

		const selected = await page.evaluate(() => window.selectedValue);
		expect(selected).toBe('item1');
	});

	test('should support ARIA attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenuButton ARIA Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenuButton from './PopupMenuButton.svelte';
					
					const app = mount(PopupMenuButton, {
						target: document.getElementById('app'),
						props: {
							menuItems: [
								{ label: 'Item 1', value: 'item1' }
							]
						}
					});
				</script>
			</body>
			</html>
		`);

		const button = page.locator('button');
		await expect(button).toBeVisible();

		// ARIA属性が設定されているか確認
		await expect(button).toHaveAttribute('aria-haspopup', 'menu');
	});
});
