import { test, expect } from '@playwright/test';

test.describe('Dialog Component - Browser Tests', () => {
	test('should render Dialog component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							children: () => 'Dialog Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		// ダイアログがレンダリングされているか確認
		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog).toContainText('Test Dialog');
		await expect(dialog).toContainText('Dialog Content');
	});

	test('should handle open/close state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Open/Close Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							children: () => 'Dialog Content',
							isOpen: false
						}
					});
				</script>
			</body>
			</html>
		`);

		// 初期状態ではダイアログは非表示
		const dialog = page.locator('.dialog');
		await expect(dialog).not.toBeVisible();
	});

	test('should support title', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Title Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Custom Dialog Title',
							children: () => 'Dialog Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog).toContainText('Custom Dialog Title');
	});

	test('should support description', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Description Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							description: 'This is a test dialog description',
							children: () => 'Dialog Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog).toContainText('This is a test dialog description');
	});

	test('should support custom width', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Width Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							children: () => 'Dialog Content',
							isOpen: true,
							width: 500
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
	});

	test('should support no padding', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog No Padding Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							children: () => 'Dialog Content',
							isOpen: true,
							noPadding: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
	});

	test('should support scrollable content', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Scrollable Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							children: () => 'Long content that might need scrolling...'.repeat(20),
							isOpen: true,
							scrollable: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
	});

	test('should support ARIA attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog ARIA Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							children: () => 'Dialog Content',
							isOpen: true,
							ariaLabel: 'Test Dialog',
							ariaDescribedby: 'dialog-description'
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog).toHaveAttribute('aria-label', 'Test Dialog');
		await expect(dialog).toHaveAttribute('aria-describedby', 'dialog-description');
	});

	test('should support header snippet', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Header Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							header: () => 'Custom Header',
							children: () => 'Dialog Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog).toContainText('Custom Header');
	});

	test('should support footer snippet', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Footer Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							children: () => 'Dialog Content',
							footer: () => 'Custom Footer',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog).toContainText('Custom Footer');
	});

	test('should support body style', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Body Style Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							children: () => 'Dialog Content',
							isOpen: true,
							bodyStyle: 'background-color: red;'
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
	});

	test('should handle click outside behavior', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Click Outside Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							children: () => 'Dialog Content',
							isOpen: true,
							closeIfClickOutside: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();

		// バックドロップをクリック
		const backdrop = page.locator('.modal-backdrop');
		await backdrop.click();
	});

	test('should support keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							children: () => 'Dialog Content',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();

		// ESCキーでダイアログを閉じる
		await page.keyboard.press('Escape');
	});

	test('should support focus management', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Focus Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							children: () => 'Dialog Content',
							isOpen: true,
							restoreFocus: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();

		// ダイアログ内の要素にフォーカス
		const dialogContent = page.locator('.dialog-content');
		await dialogContent.focus();
		await expect(dialogContent).toBeFocused();
	});

	test('should support dialog lifecycle callbacks', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Dialog Lifecycle Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Dialog from './Dialog.svelte';
					
					const app = mount(Dialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Dialog',
							children: () => 'Dialog Content',
							isOpen: true,
							onOpen: () => {
								window.dialogOpened = true;
							},
							onClose: () => {
								window.dialogClosed = true;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();

		// ダイアログが開かれたことを確認
		const dialogOpened = await page.evaluate(() => window.dialogOpened);
		expect(dialogOpened).toBe(true);
	});
});
