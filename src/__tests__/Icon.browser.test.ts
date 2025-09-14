import { test, expect } from '@playwright/test';

test.describe('Icon Component - Browser Tests', () => {
	test('should render Icon component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★'
						}
					});
				</script>
			</body>
			</html>
		`);

		// アイコンがレンダリングされているか確認
		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
		await expect(icon).toContainText('★');
	});

	test('should support different sizes', async ({ page }) => {
		const sizes = [16, 24, 32, 48, 64];

		for (const size of sizes) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Icon Size Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Icon from './Icon.svelte';
						
						const app = mount(Icon, {
							target: document.getElementById('app'),
							props: {
								children: () => '★',
								size: ${size}
							}
						});
					</script>
				</body>
				</html>
			`);

			const icon = page.locator('.icon');
			await expect(icon).toBeVisible();
		}
	});

	test('should support different colors', async ({ page }) => {
		const colors = ['red', 'blue', 'green', '#ff0000', 'rgb(255, 0, 0)'];

		for (const color of colors) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Icon Color Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Icon from './Icon.svelte';
						
						const app = mount(Icon, {
							target: document.getElementById('app'),
							props: {
								children: () => '★',
								color: '${color}'
							}
						});
					</script>
				</body>
				</html>
			`);

			const icon = page.locator('.icon');
			await expect(icon).toBeVisible();
		}
	});

	test('should support different variants', async ({ page }) => {
		const variants = ['outlined', 'filled', 'rounded', 'sharp', 'two-tone'];

		for (const variant of variants) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Icon Variant Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Icon from './Icon.svelte';
						
						const app = mount(Icon, {
							target: document.getElementById('app'),
							props: {
								children: () => '★',
								variant: '${variant}'
							}
						});
					</script>
				</body>
				</html>
			`);

			const icon = page.locator('.icon');
			await expect(icon).toBeVisible();
		}
	});

	test('should support different weights', async ({ page }) => {
		const weights = [100, 200, 300, 400, 500, 600, 700];

		for (const weight of weights) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Icon Weight Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Icon from './Icon.svelte';
						
						const app = mount(Icon, {
							target: document.getElementById('app'),
							props: {
								children: () => '★',
								weight: ${weight}
							}
						});
					</script>
				</body>
				</html>
			`);

			const icon = page.locator('.icon');
			await expect(icon).toBeVisible();
		}
	});

	test('should support different grades', async ({ page }) => {
		const grades = [-25, 0, 200];

		for (const grade of grades) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Icon Grade Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Icon from './Icon.svelte';
						
						const app = mount(Icon, {
							target: document.getElementById('app'),
							props: {
								children: () => '★',
								grade: ${grade}
							}
						});
					</script>
				</body>
				</html>
			`);

			const icon = page.locator('.icon');
			await expect(icon).toBeVisible();
		}
	});

	test('should support different optical sizes', async ({ page }) => {
		const opticalSizes = [20, 24, 40, 48];

		for (const opticalSize of opticalSizes) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Icon Optical Size Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Icon from './Icon.svelte';
						
						const app = mount(Icon, {
							target: document.getElementById('app'),
							props: {
								children: () => '★',
								opticalSize: ${opticalSize}
							}
						});
					</script>
				</body>
				</html>
			`);

			const icon = page.locator('.icon');
			await expect(icon).toBeVisible();
		}
	});

	test('should support filled property', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Filled Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							filled: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
	});

	test('should support custom style', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Custom Style Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							customStyle: 'background-color: yellow; border-radius: 4px;'
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
	});

	test('should support title attribute', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Title Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							title: 'Star Icon'
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
		await expect(icon).toHaveAttribute('title', 'Star Icon');
	});

	test('should support fallback text', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Fallback Text Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							fallbackText: 'Star'
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
	});

	test('should support ARIA label', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon ARIA Label Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							ariaLabel: 'Star icon'
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
		await expect(icon).toHaveAttribute('aria-label', 'Star icon');
	});

	test('should support decorative property', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Decorative Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							decorative: false
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
	});

	test('should support reduced motion', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Reduced Motion Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							reducedMotion: true
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
	});

	test('should support accessibility attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Accessibility Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							ariaLabel: 'Star icon',
							decorative: false
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
		await expect(icon).toHaveAttribute('aria-label', 'Star icon');
	});

	test('should support children content', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Children Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '🎉'
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
		await expect(icon).toContainText('🎉');
	});

	test('should support different icon content', async ({ page }) => {
		const iconContents = ['★', '♥', '♦', '♣', '🎉', '🔥', '💡'];

		for (const content of iconContents) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Icon Content Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Icon from './Icon.svelte';
						
						const app = mount(Icon, {
							target: document.getElementById('app'),
							props: {
								children: () => '${content}'
							}
						});
					</script>
				</body>
				</html>
			`);

			const icon = page.locator('.icon');
			await expect(icon).toBeVisible();
			await expect(icon).toContainText(content);
		}
	});

	test('should support combined properties', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Combined Properties Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							size: 32,
							color: 'red',
							variant: 'filled',
							weight: 500,
							grade: 0,
							opticalSize: 32,
							filled: true,
							title: 'Red Star',
							ariaLabel: 'Red star icon',
							decorative: false,
							reducedMotion: false,
							customStyle: 'border: 1px solid black;'
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
		await expect(icon).toContainText('★');
		await expect(icon).toHaveAttribute('title', 'Red Star');
		await expect(icon).toHaveAttribute('aria-label', 'Red star icon');
	});

	test('should support rest props', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Rest Props Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							'data-testid': 'custom-icon',
							'data-custom': 'value',
							class: 'custom-class'
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();
		await expect(icon).toHaveAttribute('data-testid', 'custom-icon');
		await expect(icon).toHaveAttribute('data-custom', 'value');
		await expect(icon).toHaveClass('custom-class');
	});

	test('should support focus management', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Focus Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							tabindex: 0
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();

		// アイコンにフォーカス
		await icon.focus();
		await expect(icon).toBeFocused();
	});

	test('should support click interactions', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Click Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							onclick: () => {
								window.iconClicked = true;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();

		// アイコンをクリック
		await icon.click();

		const iconClicked = await page.evaluate(() => window.iconClicked);
		expect(iconClicked).toBe(true);
	});

	test('should support hover interactions', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Hover Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							customStyle: 'transition: color 0.2s;'
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();

		// アイコンにホバー
		await icon.hover();
		await expect(icon).toBeVisible();
	});

	test('should support keyboard interactions', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Icon Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Icon from './Icon.svelte';
					
					const app = mount(Icon, {
						target: document.getElementById('app'),
						props: {
							children: () => '★',
							tabindex: 0,
							onkeydown: (event) => {
								if (event.key === 'Enter') {
									window.iconEnterPressed = true;
								}
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const icon = page.locator('.icon');
		await expect(icon).toBeVisible();

		// アイコンにフォーカス
		await icon.focus();
		await expect(icon).toBeFocused();

		// Enterキーを押す
		await page.keyboard.press('Enter');

		const iconEnterPressed = await page.evaluate(() => window.iconEnterPressed);
		expect(iconEnterPressed).toBe(true);
	});
});
