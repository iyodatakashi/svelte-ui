import { test, expect } from '@playwright/test';

test.describe('Datepicker Component - Browser Tests', () => {
	test('should render Datepicker component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		// デートピッカーがレンダリングされているか確認
		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();
	});

	test('should handle open/close state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Open/Close Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();

		// 初期状態ではカレンダーは非表示
		const calendar = page.locator('.datepicker-calendar');
		await expect(calendar).not.toBeVisible();
	});

	test('should support different variants', async ({ page }) => {
		const variants = ['default', 'filled', 'outlined', 'ghost'];

		for (const variant of variants) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Datepicker Variant Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Datepicker from './Datepicker.svelte';
						
						const app = mount(Datepicker, {
							target: document.getElementById('app'),
							props: {
								variant: '${variant}',
								placeholder: 'Select date'
							}
						});
					</script>
				</body>
				</html>
			`);

			const datepicker = page.locator('[data-testid="datepicker"]');
			await expect(datepicker).toBeVisible();
		}
	});

	test('should support different focus styles', async ({ page }) => {
		const focusStyles = ['outline', 'background', 'none'];

		for (const focusStyle of focusStyles) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Datepicker Focus Style Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Datepicker from './Datepicker.svelte';
						
						const app = mount(Datepicker, {
							target: document.getElementById('app'),
							props: {
								focusStyle: '${focusStyle}',
								placeholder: 'Select date'
							}
						});
					</script>
				</body>
				</html>
			`);

			const datepicker = page.locator('[data-testid="datepicker"]');
			await expect(datepicker).toBeVisible();
		}
	});

	test('should support different locales', async ({ page }) => {
		const locales = ['en', 'ja', 'fr', 'de', 'es', 'zh-cn'];

		for (const locale of locales) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>Datepicker Locale Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import Datepicker from './Datepicker.svelte';
						
						const app = mount(Datepicker, {
							target: document.getElementById('app'),
							props: {
								locale: '${locale}',
								placeholder: 'Select date'
							}
						});
					</script>
				</body>
				</html>
			`);

			const datepicker = page.locator('[data-testid="datepicker"]');
			await expect(datepicker).toBeVisible();
		}
	});

	test('should support custom format', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Format Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							format: 'YYYY-MM-DD',
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();
	});

	test('should support placeholder text', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Placeholder Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Custom placeholder text'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();

		const input = page.locator('input');
		await expect(input).toHaveAttribute('placeholder', 'Custom placeholder text');
	});

	test('should support disabled state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Disabled Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							disabled: true,
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();

		const input = page.locator('input');
		await expect(input).toBeDisabled();
	});

	test('should support readonly state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Readonly Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							readonly: true,
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();

		const input = page.locator('input');
		await expect(input).toHaveAttribute('readonly');
	});

	test('should support required state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Required Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							required: true,
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();

		const input = page.locator('input');
		await expect(input).toHaveAttribute('required');
	});

	test('should support full width', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Full Width Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							fullWidth: true,
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();
	});

	test('should support rounded corners', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Rounded Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							rounded: true,
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();
	});

	test('should support icon', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Icon Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							hasIcon: true,
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();
	});

	test('should support icon customization', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Icon Customization Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							hasIcon: true,
							iconFilled: true,
							iconWeight: 400,
							iconGrade: 0,
							iconOpticalSize: 24,
							iconVariant: 'filled',
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();
	});

	test('should support ARIA attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker ARIA Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							ariaLabel: 'Date picker',
							ariaDescribedby: 'datepicker-description',
							ariaInvalid: 'false',
							ariaRequired: 'true',
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();

		const input = page.locator('input');
		await expect(input).toHaveAttribute('aria-label', 'Date picker');
		await expect(input).toHaveAttribute('aria-describedby', 'datepicker-description');
		await expect(input).toHaveAttribute('aria-invalid', 'false');
		await expect(input).toHaveAttribute('aria-required', 'true');
	});

	test('should support keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();

		const input = page.locator('input');
		await input.focus();
		await expect(input).toBeFocused();
	});

	test('should support date input', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Input Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();

		const input = page.locator('input');
		await input.fill('2024-01-01');
		await expect(input).toHaveValue('2024-01-01');
	});

	test('should support calendar popup', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Calendar Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();

		const input = page.locator('input');
		await input.click();

		// カレンダーが表示されることを確認
		const calendar = page.locator('.datepicker-calendar');
		await expect(calendar).toBeVisible();
	});

	test('should support date selection', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Selection Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();

		const input = page.locator('input');
		await input.click();

		// カレンダーが表示されることを確認
		const calendar = page.locator('.datepicker-calendar');
		await expect(calendar).toBeVisible();

		// 日付をクリック
		const dateCell = page.locator('.date-cell').first();
		await dateCell.click();
	});

	test('should support range separator', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Range Separator Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							rangeSeparator: ' to ',
							placeholder: 'Select date range'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();
	});

	test('should support null string', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Null String Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							nullString: 'No date selected',
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();
	});

	test('should support input attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Datepicker Input Attributes Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import Datepicker from './Datepicker.svelte';
					
					const app = mount(Datepicker, {
						target: document.getElementById('app'),
						props: {
							inputAttributes: {
								'data-custom': 'value',
								'data-test': 'test'
							},
							placeholder: 'Select date'
						}
					});
				</script>
			</body>
			</html>
		`);

		const datepicker = page.locator('[data-testid="datepicker"]');
		await expect(datepicker).toBeVisible();

		const input = page.locator('input');
		await expect(input).toHaveAttribute('data-custom', 'value');
		await expect(input).toHaveAttribute('data-test', 'test');
	});
});
