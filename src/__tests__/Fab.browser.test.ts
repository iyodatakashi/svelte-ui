import { test, expect } from '@playwright/test';

test.describe('Fab Component - Browser Tests', () => {
	test('should render Fab component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Fab Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Fab from './Fab.svelte';
					
					const app = mount(Fab, {
						target: document.getElementById('app'),
						props: {
							icon: 'add',
							ariaLabel: 'Add button'
						}
					});
				</script>
			</body>
			</html>
		`);

		// FABがレンダリングされているか確認
		const fab = page.locator('button');
		await expect(fab).toBeVisible();
		await expect(fab).toHaveAttribute('aria-label', 'Add button');
	});

	test('should handle click events', async ({ page }) => {
		let clickCount = 0;

		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Fab Click Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Fab from './Fab.svelte';
					
					const app = mount(Fab, {
						target: document.getElementById('app'),
						props: {
							icon: 'add',
							ariaLabel: 'Add button',
							onclick: () => {
								window.clickCount = (window.clickCount || 0) + 1;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const fab = page.locator('button');
		await fab.click();

		const fabClickCount = await page.evaluate(() => window.clickCount);
		expect(fabClickCount).toBe(1);
	});

	test('should support different variants', async ({ page }) => {
		const variants = ['ghost', 'filled', 'outlined', 'glass'];

		for (const variant of variants) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Fab Variant Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Fab from './Fab.svelte';
						
						const app = mount(Fab, {
							target: document.getElementById('app'),
							props: {
								variant: '${variant}',
								icon: 'add',
								ariaLabel: '${variant} fab'
							}
						});
					</script>
				</body>
				</html>
			`);

			const fab = page.locator('button');
			await expect(fab).toBeVisible();
			await expect(fab).toHaveAttribute('aria-label', `${variant} fab`);
		}
	});

	test('should support different positions', async ({ page }) => {
		const positions = ['left', 'right', 'center'];

		for (const position of positions) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Fab Position Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Fab from './Fab.svelte';
						
						const app = mount(Fab, {
							target: document.getElementById('app'),
							props: {
								position: '${position}',
								icon: 'add',
								ariaLabel: '${position} positioned fab'
							}
						});
					</script>
				</body>
				</html>
			`);

			const fab = page.locator('button');
			await expect(fab).toBeVisible();
			await expect(fab).toHaveAttribute('aria-label', `${position} positioned fab`);
		}
	});

	test('should handle disabled state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Fab Disabled Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Fab from './Fab.svelte';
					
					const app = mount(Fab, {
						target: document.getElementById('app'),
						props: {
							disabled: true,
							icon: 'add',
							ariaLabel: 'Disabled fab'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fab = page.locator('button');
		await expect(fab).toBeDisabled();
		await expect(fab).toHaveAttribute('aria-label', 'Disabled fab');
	});

	test('should handle loading state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Fab Loading Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Fab from './Fab.svelte';
					
					const app = mount(Fab, {
						target: document.getElementById('app'),
						props: {
							loading: true,
							icon: 'add',
							ariaLabel: 'Loading fab'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fab = page.locator('button');
		await expect(fab).toBeVisible();
		// ローディングスピナーが表示されているか確認
		const spinner = page.locator('.loading-spinner');
		await expect(spinner).toBeVisible();
	});

	test('should support shadow prop', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Fab Shadow Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Fab from './Fab.svelte';
					
					const app = mount(Fab, {
						target: document.getElementById('app'),
						props: {
							shadow: true,
							icon: 'add',
							ariaLabel: 'Shadowed fab'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fab = page.locator('button');
		await expect(fab).toBeVisible();
		await expect(fab).toHaveAttribute('aria-label', 'Shadowed fab');
	});

	test('should support icons', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Fab Icon Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Fab from './Fab.svelte';
					
					const app = mount(Fab, {
						target: document.getElementById('app'),
						props: {
							icon: 'edit',
							ariaLabel: 'Edit fab'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fab = page.locator('button');
		await expect(fab).toBeVisible();
		await expect(fab).toHaveAttribute('aria-label', 'Edit fab');

		// アイコンが表示されているか確認
		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
	});

	test('should support children snippet', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Fab Children Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Fab from './Fab.svelte';
					
					const app = mount(Fab, {
						target: document.getElementById('app'),
						props: {
							children: () => 'Custom Content',
							ariaLabel: 'Custom fab'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fab = page.locator('button');
		await expect(fab).toBeVisible();
		await expect(fab).toHaveText('Custom Content');
	});

	test('should handle keyboard events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Fab Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Fab from './Fab.svelte';
					
					const app = mount(Fab, {
						target: document.getElementById('app'),
						props: {
							icon: 'add',
							ariaLabel: 'Keyboard fab'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fab = page.locator('button');
		await fab.focus();
		await expect(fab).toBeFocused();

		// Enterキーでクリック
		await fab.press('Enter');
	});

	test('should support ARIA attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Fab ARIA Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Fab from './Fab.svelte';
					
					const app = mount(Fab, {
						target: document.getElementById('app'),
						props: {
							icon: 'add',
							ariaLabel: 'Test Fab',
							ariaDescribedby: 'fab-description'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fab = page.locator('button');
		await expect(fab).toBeVisible();
		await expect(fab).toHaveAttribute('aria-label', 'Test Fab');
		await expect(fab).toHaveAttribute('aria-describedby', 'fab-description');
	});

	test('should support custom styles', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Fab Custom Style Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Fab from './Fab.svelte';
					
					const app = mount(Fab, {
						target: document.getElementById('app'),
						props: {
							icon: 'add',
							ariaLabel: 'Custom style fab',
							customStyle: 'background-color: red; color: white;'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fab = page.locator('button');
		await expect(fab).toBeVisible();
		await expect(fab).toHaveAttribute('aria-label', 'Custom style fab');
	});

	test('should support icon variants', async ({ page }) => {
		const iconVariants = ['outlined', 'filled', 'rounded', 'sharp', 'two-tone'];

		for (const iconVariant of iconVariants) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Fab Icon Variant Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Fab from './Fab.svelte';
						
						const app = mount(Fab, {
							target: document.getElementById('app'),
							props: {
								icon: 'add',
								iconVariant: '${iconVariant}',
								ariaLabel: '${iconVariant} icon fab'
							}
						});
					</script>
				</body>
				</html>
			`);

			const fab = page.locator('button');
			await expect(fab).toBeVisible();
			await expect(fab).toHaveAttribute('aria-label', `${iconVariant} icon fab`);
		}
	});

	test('should support reduced motion', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Fab Reduced Motion Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Fab from './Fab.svelte';
					
					const app = mount(Fab, {
						target: document.getElementById('app'),
						props: {
							icon: 'add',
							ariaLabel: 'Reduced motion fab',
							reducedMotion: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const fab = page.locator('button');
		await expect(fab).toBeVisible();
		await expect(fab).toHaveAttribute('aria-label', 'Reduced motion fab');
	});
});
