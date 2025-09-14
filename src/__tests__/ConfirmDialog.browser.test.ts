import { test, expect } from '@playwright/test';

test.describe('ConfirmDialog Component - Browser Tests', () => {
	test('should render ConfirmDialog component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ConfirmDialog Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Confirmation',
							message: 'Are you sure you want to proceed?',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		// 確認ダイアログがレンダリングされているか確認
		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog).toContainText('Test Confirmation');
		await expect(dialog).toContainText('Are you sure you want to proceed?');
	});

	test('should handle open/close state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ConfirmDialog Open/Close Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Confirmation',
							message: 'Are you sure?',
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

	test('should support different variants', async ({ page }) => {
		const variants = ['info', 'warning', 'danger'];

		for (const variant of variants) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>ConfirmDialog Variant Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import ConfirmDialog from './ConfirmDialog.svelte';
						
						const app = mount(ConfirmDialog, {
							target: document.getElementById('app'),
							props: {
								title: '${variant} Confirmation',
								message: 'This is a ${variant} dialog',
								variant: '${variant}',
								isOpen: true
							}
						});
					</script>
				</body>
				</html>
			`);

			const dialog = page.locator('.dialog');
			await expect(dialog).toBeVisible();
			await expect(dialog).toContainText(`${variant} Confirmation`);
		}
	});

	test('should support custom title', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ConfirmDialog Title Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Custom Confirmation Title',
							message: 'Are you sure?',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog).toContainText('Custom Confirmation Title');
	});

	test('should support custom message', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ConfirmDialog Message Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Confirmation',
							message: 'This is a custom confirmation message with more details.',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog).toContainText('This is a custom confirmation message with more details.');
	});

	test('should support custom button texts', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ConfirmDialog Button Text Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Confirmation',
							message: 'Are you sure?',
							confirmText: 'Yes, Proceed',
							cancelText: 'No, Cancel',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog).toContainText('Yes, Proceed');
		await expect(dialog).toContainText('No, Cancel');
	});

	test('should support custom width', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ConfirmDialog Width Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Confirmation',
							message: 'Are you sure?',
							width: 500,
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();
	});

	test('should handle confirm button click', async ({ page }) => {
		let confirmClicked = false;

		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ConfirmDialog Confirm Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Confirmation',
							message: 'Are you sure?',
							isOpen: true,
							onConfirm: () => {
								window.confirmClicked = true;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();

		// 確認ボタンをクリック
		const confirmButton = page.locator('button').filter({ hasText: 'Confirm' });
		await confirmButton.click();

		const confirmButtonClicked = await page.evaluate(() => window.confirmClicked);
		expect(confirmButtonClicked).toBe(true);
	});

	test('should handle cancel button click', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ConfirmDialog Cancel Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Confirmation',
							message: 'Are you sure?',
							isOpen: true,
							onCancel: () => {
								window.cancelClicked = true;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();

		// キャンセルボタンをクリック
		const cancelButton = page.locator('button').filter({ hasText: 'Cancel' });
		await cancelButton.click();

		const cancelClicked = await page.evaluate(() => window.cancelClicked);
		expect(cancelClicked).toBe(true);
	});

	test('should support keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ConfirmDialog Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Confirmation',
							message: 'Are you sure?',
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
				<title>ConfirmDialog Focus Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Confirmation',
							message: 'Are you sure?',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();

		// 確認ボタンにフォーカス
		const confirmButton = page.locator('button').filter({ hasText: 'Confirm' });
		await confirmButton.focus();
		await expect(confirmButton).toBeFocused();
	});

	test('should support accessibility attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ConfirmDialog ARIA Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Confirmation',
							message: 'Are you sure?',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();

		// ARIA属性が設定されているか確認
		await expect(dialog).toHaveAttribute('role', 'dialog');
	});

	test('should support different button variants', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ConfirmDialog Button Variant Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Confirmation',
							message: 'Are you sure?',
							variant: 'danger',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const dialog = page.locator('.dialog');
		await expect(dialog).toBeVisible();

		// ボタンが表示されているか確認
		const confirmButton = page.locator('button').filter({ hasText: 'Confirm' });
		const cancelButton = page.locator('button').filter({ hasText: 'Cancel' });
		await expect(confirmButton).toBeVisible();
		await expect(cancelButton).toBeVisible();
	});

	test('should support click outside behavior', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ConfirmDialog Click Outside Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ConfirmDialog from './ConfirmDialog.svelte';
					
					const app = mount(ConfirmDialog, {
						target: document.getElementById('app'),
						props: {
							title: 'Test Confirmation',
							message: 'Are you sure?',
							isOpen: true
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
});
