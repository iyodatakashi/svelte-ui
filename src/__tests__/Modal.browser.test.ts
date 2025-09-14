import { test, expect } from '@playwright/test';

test.describe('Modal Component - Browser Tests', () => {
	test('should render Modal component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Modal Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Modal from './Modal.svelte';
					
					const app = mount(Modal, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Modal Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		// モーダルがレンダリングされているか確認
		const modal = page.locator('.modal');
		await expect(modal).toBeVisible();
	});

	test('should handle open/close state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Modal Open/Close Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Modal from './Modal.svelte';
					
					const app = mount(Modal, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Modal Content',
							isOpen: false
						}
					});
				</script>
			</body>
			</html>
		`);

		// 初期状態ではモーダルは非表示
		const modal = page.locator('.modal');
		await expect(modal).not.toBeVisible();
	});

	test('should support custom class', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Modal Custom Class Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Modal from './Modal.svelte';
					
					const app = mount(Modal, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Modal Content',
							isOpen: true,
							customClass: 'my-custom-modal'
						}
					});
				</script>
			</body>
			</html>
		`);

		const modal = page.locator('.modal');
		await expect(modal).toBeVisible();
		await expect(modal).toHaveClass(/my-custom-modal/);
	});

	test('should support custom styles', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Modal Custom Styles Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Modal from './Modal.svelte';
					
					const app = mount(Modal, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Modal Content',
							isOpen: true,
							customStyles: 'background-color: red;'
						}
					});
				</script>
			</body>
			</html>
		`);

		const modal = page.locator('.modal');
		await expect(modal).toBeVisible();
	});

	test('should support ARIA attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Modal ARIA Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Modal from './Modal.svelte';
					
					const app = mount(Modal, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Modal Content',
							isOpen: true,
							ariaLabel: 'Test Modal',
							ariaLabelledby: 'modal-title',
							ariaDescribedby: 'modal-description'
						}
					});
				</script>
			</body>
			</html>
		`);

		const modal = page.locator('.modal');
		await expect(modal).toBeVisible();
		await expect(modal).toHaveAttribute('aria-label', 'Test Modal');
		await expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
		await expect(modal).toHaveAttribute('aria-describedby', 'modal-description');
	});

	test('should handle click outside behavior', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Modal Click Outside Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Modal from './Modal.svelte';
					
					const app = mount(Modal, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Modal Content',
							isOpen: true,
							closeIfClickOutside: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const modal = page.locator('.modal');
		await expect(modal).toBeVisible();

		// バックドロップをクリック
		const backdrop = page.locator('.modal-backdrop');
		await backdrop.click();
	});

	test('should support keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Modal Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Modal from './Modal.svelte';
					
					const app = mount(Modal, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Modal Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const modal = page.locator('.modal');
		await expect(modal).toBeVisible();

		// ESCキーでモーダルを閉じる
		await page.keyboard.press('Escape');
	});

	test('should support focus management', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Modal Focus Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Modal from './Modal.svelte';
					
					const app = mount(Modal, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Modal Content',
							isOpen: true,
							restoreFocus: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const modal = page.locator('.modal');
		await expect(modal).toBeVisible();

		// モーダル内の要素にフォーカス
		const modalContent = page.locator('.modal-content');
		await modalContent.focus();
		await expect(modalContent).toBeFocused();
	});

	test('should support different component types', async ({ page }) => {
		const componentTypes = ['Modal', 'Dialog', 'Popup'];

		for (const componentType of componentTypes) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Modal Component Type Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Modal from './Modal.svelte';
						
						const app = mount(Modal, {
							target: document.getElementById('app'),
							props: {
								children: () => '${componentType} Content',
								isOpen: true,
								componentType: '${componentType}'
							}
						});
					</script>
				</body>
				</html>
			`);

			const modal = page.locator('.modal');
			await expect(modal).toBeVisible();
		}
	});

	test('should support children content', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Modal Children Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Modal from './Modal.svelte';
					
					const app = mount(Modal, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Custom Modal Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const modal = page.locator('.modal');
		await expect(modal).toBeVisible();
		await expect(modal).toContainText('Custom Modal Content');
	});

	test('should handle backdrop interaction', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Modal Backdrop Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Modal from './Modal.svelte';
					
					const app = mount(Modal, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Modal Content',
							isOpen: true,
							closeIfClickOutside: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const modal = page.locator('.modal');
		await expect(modal).toBeVisible();

		// バックドロップが存在することを確認
		const backdrop = page.locator('.modal-backdrop');
		await expect(backdrop).toBeVisible();
	});

	test('should support modal lifecycle callbacks', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Modal Lifecycle Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Modal from './Modal.svelte';
					
					const app = mount(Modal, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Modal Content',
							isOpen: true,
							onOpen: () => {
								window.modalOpened = true;
							},
							onClose: () => {
								window.modalClosed = true;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const modal = page.locator('.modal');
		await expect(modal).toBeVisible();

		// モーダルが開かれたことを確認
		const modalOpened = await page.evaluate(() => window.modalOpened);
		expect(modalOpened).toBe(true);
	});
});
