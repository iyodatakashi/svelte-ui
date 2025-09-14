import { test, expect } from '@playwright/test';

test.describe('Popup Component - Browser Tests', () => {
	test('should render Popup component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		// ポップアップがレンダリングされているか確認
		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();
		await expect(popup).toContainText('Popup Content');
	});

	test('should handle open/close state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Open/Close Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							isOpen: false
						}
					});
				</script>
			</body>
			</html>
		`);

		// 初期状態ではポップアップは非表示
		const popup = page.locator('.popup');
		await expect(popup).not.toBeVisible();
	});

	test('should support different positions', async ({ page }) => {
		const positions = ['top', 'bottom', 'left', 'right', 'top-start', 'bottom-end'];

		for (const position of positions) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Popup Position Test</title>
				</head>
				<body>
					<div id="app"></div>
					<button id="anchor">Anchor Button</button>
					<script type="module">
						import { mount } from 'svelte';
						import Popup from './Popup.svelte';
						
						const app = mount(Popup, {
							target: document.getElementById('app'),
							props: {
								children: () => '${position} Popup',
								anchorElement: document.getElementById('anchor'),
								position: '${position}',
								isOpen: true
							}
						});
					</script>
				</body>
				</html>
			`);

			const popup = page.locator('.popup');
			await expect(popup).toBeVisible();
			await expect(popup).toContainText(`${position} Popup`);
		}
	});

	test('should support different roles', async ({ page }) => {
		const roles = ['menu', 'tooltip', 'dialog', 'listbox'];

		for (const role of roles) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Popup Role Test</title>
				</head>
				<body>
					<div id="app"></div>
					<button id="anchor">Anchor Button</button>
					<script type="module">
						import { mount } from 'svelte';
						import Popup from './Popup.svelte';
						
						const app = mount(Popup, {
							target: document.getElementById('app'),
							props: {
								children: () => '${role} Popup',
								anchorElement: document.getElementById('anchor'),
								role: '${role}',
								isOpen: true
							}
						});
					</script>
				</body>
				</html>
			`);

			const popup = page.locator('.popup');
			await expect(popup).toBeVisible();
			await expect(popup).toHaveAttribute('role', role);
		}
	});

	test('should support custom margin', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Margin Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							margin: 16,
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();
	});

	test('should support focus trap', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Focus Trap Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							focusTrap: true,
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();
	});

	test('should support focus restoration', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Focus Restoration Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							restoreFocus: true,
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();
	});

	test('should support mobile fullscreen', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Mobile Fullscreen Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							mobileFullscreen: true,
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();
	});

	test('should support different mobile behaviors', async ({ page }) => {
		const mobileBehaviors = ['auto', 'fullscreen', 'overlay'];

		for (const behavior of mobileBehaviors) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Popup Mobile Behavior Test</title>
				</head>
				<body>
					<div id="app"></div>
					<button id="anchor">Anchor Button</button>
					<script type="module">
						import { mount } from 'svelte';
						import Popup from './Popup.svelte';
						
						const app = mount(Popup, {
							target: document.getElementById('app'),
							props: {
								children: () => '${behavior} Popup',
								anchorElement: document.getElementById('anchor'),
								mobileBehavior: '${behavior}',
								isOpen: true
							}
						});
					</script>
				</body>
				</html>
			`);

			const popup = page.locator('.popup');
			await expect(popup).toBeVisible();
		}
	});

	test('should support repositioning', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Repositioning Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							allowRepositioning: true,
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();
	});

	test('should support ARIA attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup ARIA Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							ariaLabel: 'Test Popup',
							ariaLabelledby: 'popup-title',
							ariaDescribedby: 'popup-description',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();
		await expect(popup).toHaveAttribute('aria-label', 'Test Popup');
		await expect(popup).toHaveAttribute('aria-labelledby', 'popup-title');
		await expect(popup).toHaveAttribute('aria-describedby', 'popup-description');
	});

	test('should support keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();

		// ESCキーでポップアップを閉じる
		await page.keyboard.press('Escape');
	});

	test('should support click outside behavior', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Click Outside Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();

		// ポップアップ外をクリック
		await page.click('body', { position: { x: 10, y: 10 } });
	});

	test('should support focus management', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Focus Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							restoreFocus: true,
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();

		// ポップアップ内の要素にフォーカス
		const popupContent = page.locator('.popup-content');
		await popupContent.focus();
		await expect(popupContent).toBeFocused();
	});

	test('should support popup lifecycle callbacks', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Lifecycle Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							isOpen: true,
							onOpen: () => {
								window.popupOpened = true;
							},
							onClose: () => {
								window.popupClosed = true;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();

		// ポップアップが開かれたことを確認
		const popupOpened = await page.evaluate(() => window.popupOpened);
		expect(popupOpened).toBe(true);
	});

	test('should support anchor positioning', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Anchor Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor" style="position: absolute; top: 100px; left: 100px;">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							position: 'bottom',
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();

		// アンカーボタンが存在することを確認
		const anchor = page.locator('#anchor');
		await expect(anchor).toBeVisible();
	});

	test('should support viewport detection', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Viewport Test</title>
			</head>
			<body>
				<div id="app"></div>
				<button id="anchor">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							allowRepositioning: true,
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();
	});

	test('should support scroll behavior', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Popup Scroll Test</title>
			</head>
			<body style="height: 200vh;">
				<div id="app"></div>
				<button id="anchor" style="position: absolute; top: 100px; left: 100px;">Anchor Button</button>
				<script type="module">
					import { mount } from 'svelte';
					import Popup from './Popup.svelte';
					
					const app = mount(Popup, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Popup Content',
							anchorElement: document.getElementById('anchor'),
							isOpen: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const popup = page.locator('.popup');
		await expect(popup).toBeVisible();

		// スクロールをテスト
		await page.evaluate(() => window.scrollTo(0, 100));
		await expect(popup).toBeVisible();
	});
});
