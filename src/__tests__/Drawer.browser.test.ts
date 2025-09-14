import { test, expect } from '@playwright/test';

test.describe('Drawer Component - Browser Tests', () => {
	test('should render Drawer component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		// ドロワーがレンダリングされているか確認
		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();
		await expect(drawer).toContainText('Test Drawer');
		await expect(drawer).toContainText('Drawer Content');
	});

	test('should handle open/close state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Open/Close Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							isOpen: false
						}
					});
				</script>
			</body>
			</html>
		`);

		// 初期状態ではドロワーは非表示
		const drawer = page.locator('.drawer');
		await expect(drawer).not.toBeVisible();
	});

	test('should support different positions', async ({ page }) => {
		const positions = ['left', 'right', 'top', 'bottom'];

		for (const position of positions) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Drawer Position Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Drawer from './Drawer.svelte';
						
						const app = mount(Drawer, {
							target: document.getElementById('app'),
							props: {
								title: '${position} Drawer',
								children: () => 'Drawer Content',
								position: '${position}',
								isOpen: true
							}
						});
					</script>
				</body>
				</html>
			`);

			const drawer = page.locator('.drawer');
			await expect(drawer).toBeVisible();
			await expect(drawer).toContainText(`${position} Drawer`);
		}
	});

	test('should support custom title', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Title Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Custom Drawer Title',
							children: () => 'Drawer Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();
		await expect(drawer).toContainText('Custom Drawer Title');
	});

	test('should support description', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Description Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							description: 'This is a test drawer description',
							children: () => 'Drawer Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();
		await expect(drawer).toContainText('This is a test drawer description');
	});

	test('should support custom width', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Width Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							width: 300,
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();
	});

	test('should support no padding', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer No Padding Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							isOpen: true,
							noPadding: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();
	});

	test('should support scrollable content', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Scrollable Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Long content that might need scrolling...'.repeat(20),
							isOpen: true,
							scrollable: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();
	});

	test('should support ARIA attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer ARIA Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							isOpen: true,
							ariaLabel: 'Test Drawer',
							ariaDescribedby: 'drawer-description'
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();
		await expect(drawer).toHaveAttribute('aria-label', 'Test Drawer');
		await expect(drawer).toHaveAttribute('aria-describedby', 'drawer-description');
	});

	test('should support header snippet', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Header Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							header: () => 'Custom Header',
							children: () => 'Drawer Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();
		await expect(drawer).toContainText('Custom Header');
	});

	test('should support footer snippet', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Footer Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							footer: () => 'Custom Footer',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();
		await expect(drawer).toContainText('Custom Footer');
	});

	test('should support body style', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Body Style Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							isOpen: true,
							bodyStyle: 'background-color: red;'
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();
	});

	test('should handle click outside behavior', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Click Outside Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							isOpen: true,
							closeIfClickOutside: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();

		// バックドロップをクリック
		const backdrop = page.locator('.modal-backdrop');
		await backdrop.click();
	});

	test('should support keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();

		// ESCキーでドロワーを閉じる
		await page.keyboard.press('Escape');
	});

	test('should support focus management', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Focus Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							isOpen: true,
							restoreFocus: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();

		// ドロワー内の要素にフォーカス
		const drawerContent = page.locator('.drawer-content');
		await drawerContent.focus();
		await expect(drawerContent).toBeFocused();
	});

	test('should support drawer lifecycle callbacks', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Lifecycle Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							isOpen: true,
							onOpen: () => {
								window.drawerOpened = true;
							},
							onClose: () => {
								window.drawerClosed = true;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();

		// ドロワーが開かれたことを確認
		const drawerOpened = await page.evaluate(() => window.drawerOpened);
		expect(drawerOpened).toBe(true);
	});

	test('should support slide animations', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Animation Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							position: 'left',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();

		// アニメーションクラスが適用されているか確認
		await expect(drawer).toHaveClass(/drawer--left/);
	});

	test('should support overlay behavior', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Drawer Overlay Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Drawer from './Drawer.svelte';
					
					const app = mount(Drawer, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Drawer',
							children: () => 'Drawer Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const drawer = page.locator('.drawer');
		await expect(drawer).toBeVisible();

		// オーバーレイが表示されているか確認
		const overlay = page.locator('.modal-backdrop');
		await expect(overlay).toBeVisible();
	});
});
