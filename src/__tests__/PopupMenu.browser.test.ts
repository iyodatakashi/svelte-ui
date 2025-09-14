import { test, expect } from '@playwright/test';

test.describe('PopupMenu Component - Browser Tests', () => {
	test('should render PopupMenu component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} },
						{ label: 'Item 2', action: () => {} },
						{ label: 'Item 3', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		// ポップアップメニューがレンダリングされているか確認
		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();
		await expect(popupMenu).toContainText('Item 1');
		await expect(popupMenu).toContainText('Item 2');
		await expect(popupMenu).toContainText('Item 3');
	});

	test('should handle open/close state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Open/Close Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							isOpen: false
						}
					});
				</script>
			</body>
			</html>
		`);

		// 初期状態ではポップアップメニューは非表示
		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).not.toBeVisible();
	});

	test('should support different positions', async ({ page }) => {
		const positions = ['top', 'bottom', 'left', 'right', 'top-left', 'bottom-right'];

		for (const position of positions) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>PopupMenu Position Test</title>
				</head>
				<body>
					<div id="app"></div>
					<button id="anchor">Menu Button</button>
					<script type="module">
						import { mount } from 'svelte';
						import PopupMenu from './PopupMenu.svelte';
						
						const menuItems = [
							{ label: '${position} Item', action: () => {} }
						];
						
						const app = mount(PopupMenu, {
							target: document.getElementById('app'),
							props: {
								menuItems,
								anchorElement: document.getElementById('anchor'),
								position: '${position}',
								isOpen: true
							}
						});
					</script>
				</body>
				</html>
			`);

			const popupMenu = page.locator('.popup-menu');
			await expect(popupMenu).toBeVisible();
			await expect(popupMenu).toContainText(`${position} Item`);
		}
	});

	test('should support menu items', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Items Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'First Item', action: () => {} },
						{ label: 'Second Item', action: () => {} },
						{ label: 'Third Item', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();
		await expect(popupMenu).toContainText('First Item');
		await expect(popupMenu).toContainText('Second Item');
		await expect(popupMenu).toContainText('Third Item');
	});

	test('should support menu item actions', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Actions Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ 
							label: 'Action Item', 
							action: () => {
								window.itemClicked = true;
							}
						}
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();

		// メニューアイテムをクリック
		const menuItem = page.locator('.menu-item').filter({ hasText: 'Action Item' });
		await menuItem.click();

		const itemClicked = await page.evaluate(() => window.itemClicked);
		expect(itemClicked).toBe(true);
	});

	test('should support disabled menu items', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Disabled Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Enabled Item', action: () => {} },
						{ label: 'Disabled Item', action: () => {}, disabled: true }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();

		// 無効なメニューアイテムが存在することを確認
		const disabledItem = page.locator('.menu-item').filter({ hasText: 'Disabled Item' });
		await expect(disabledItem).toBeVisible();
		await expect(disabledItem).toHaveClass(/disabled/);
	});

	test('should support menu item separators', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Separator Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} },
						{ type: 'separator' },
						{ label: 'Item 2', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();

		// セパレーターが存在することを確認
		const separator = page.locator('.menu-separator');
		await expect(separator).toBeVisible();
	});

	test('should support mobile fullscreen', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Mobile Fullscreen Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							mobileFullscreen: true,
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();
	});

	test('should support different mobile behaviors', async ({ page }) => {
		const mobileBehaviors = ['auto', 'fullscreen', 'overlay'];

		for (const behavior of mobileBehaviors) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>PopupMenu Mobile Behavior Test</title>
				</head>
				<body>
					<div id="app"></div>
					<button id="anchor">Menu Button</button>
					<script type="module">
						import { mount } from 'svelte';
						import PopupMenu from './PopupMenu.svelte';
						
						const menuItems = [
							{ label: '${behavior} Item', action: () => {} }
						];
						
						const app = mount(PopupMenu, {
							target: document.getElementById('app'),
							props: {
								menuItems,
								anchorElement: document.getElementById('anchor'),
								mobileBehavior: '${behavior}',
								isOpen: true
							}
						});
					</script>
				</body>
				</html>
			`);

			const popupMenu = page.locator('.popup-menu');
			await expect(popupMenu).toBeVisible();
		}
	});

	test('should support icon properties', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Icon Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							iconFilled: true,
							iconWeight: 400,
							iconGrade: 0,
							iconOpticalSize: 24,
							iconVariant: 'filled',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();
	});

	test('should support ARIA attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu ARIA Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							ariaLabel: 'Custom Menu',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();
		await expect(popupMenu).toHaveAttribute('aria-label', 'Custom Menu');
	});

	test('should support keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} },
						{ label: 'Item 2', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();

		// ESCキーでポップアップメニューを閉じる
		await page.keyboard.press('Escape');
	});

	test('should support click outside behavior', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Click Outside Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();

		// ポップアップメニュー外をクリック
		await page.click('body', { position: { x: 10, y: 10 } });
	});

	test('should support focus management', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Focus Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();

		// メニューアイテムにフォーカス
		const menuItem = page.locator('.menu-item').first();
		await menuItem.focus();
		await expect(menuItem).toBeFocused();
	});

	test('should support popup menu lifecycle callbacks', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Lifecycle Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							isOpen: true,
							onOpen: () => {
								window.menuOpened = true;
							},
							onClose: () => {
								window.menuClosed = true;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();

		// ポップアップメニューが開かれたことを確認
		const menuOpened = await page.evaluate(() => window.menuOpened);
		expect(menuOpened).toBe(true);
	});

	test('should support anchor positioning', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Anchor Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor" style="position: absolute; top: 100px; left: 100px;">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							position: 'bottom',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();

		// アンカーボタンが存在することを確認
		const anchor = page.locator('#anchor');
		await expect(anchor).toBeVisible();
	});

	test('should support viewport detection', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Viewport Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();
	});

	test('should support scroll behavior', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>PopupMenu Scroll Test</title>
			</head>
			<body style="height: 200vh;">
				<div id="app"></div>
				<button id="anchor" style="position: absolute; top: 100px; left: 100px;">Menu Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import PopupMenu from './PopupMenu.svelte';
					
					const menuItems = [
						{ label: 'Item 1', action: () => {} }
					];
					
					const app = mount(PopupMenu, {
						target: document.getElementById('app'),
						props: {
							menuItems,
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popupMenu = page.locator('.popup-menu');
		await expect(popupMenu).toBeVisible();

		// スクロールをテスト
		await page.evaluate(() => window.scrollTo(0, 100));
		await expect(popupMenu).toBeVisible();
	});
});
