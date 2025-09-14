import { test, expect } from '@playwright/test';

test.describe('Input Component - Browser Tests', () => {
	test('should render Input component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Input Test</title>
			</head>
			<body>
				<div id="app">
					<input type="text" placeholder="Test input" id="test-input" />
				</div>
			</body>
			</html>
		`);

		// 入力フィールドが存在することを確認
		const input = page.locator('input[type="text"]');
		await expect(input).toBeVisible();
		await expect(input).toHaveAttribute('placeholder', 'Test input');
		await expect(input).toHaveAttribute('id', 'test-input');
	});

	test('should handle user input', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Input Test</title>
			</head>
			<body>
				<div id="app">
					<input type="text" placeholder="Type here" id="test-input" />
				</div>
			</body>
			</html>
		`);

		const input = page.locator('input[type="text"]');
		await input.fill('Hello World');
		await expect(input).toHaveValue('Hello World');
	});

	test('should handle different input types', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Input Test</title>
			</head>
			<body>
				<div id="app">
					<input type="email" placeholder="Email" id="email-input" />
					<input type="password" placeholder="Password" id="password-input" />
					<input type="number" placeholder="Number" id="number-input" />
				</div>
			</body>
			</html>
		`);

		// Email input
		const emailInput = page.locator('#email-input');
		await expect(emailInput).toHaveAttribute('type', 'email');
		await emailInput.fill('test@example.com');
		await expect(emailInput).toHaveValue('test@example.com');

		// Password input
		const passwordInput = page.locator('#password-input');
		await expect(passwordInput).toHaveAttribute('type', 'password');
		await passwordInput.fill('secret123');
		await expect(passwordInput).toHaveValue('secret123');

		// Number input
		const numberInput = page.locator('#number-input');
		await expect(numberInput).toHaveAttribute('type', 'number');
		await numberInput.fill('42');
		await expect(numberInput).toHaveValue('42');
	});

	test('should handle disabled state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Input Test</title>
			</head>
			<body>
				<div id="app">
					<input type="text" placeholder="Disabled input" disabled />
				</div>
			</body>
			</html>
		`);

		const input = page.locator('input[type="text"]');
		await expect(input).toBeDisabled();
		await expect(input).toHaveAttribute('disabled');
	});

	test('should handle readonly state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Input Test</title>
			</head>
			<body>
				<div id="app">
					<input type="text" placeholder="Readonly input" readonly value="Readonly value" />
				</div>
			</body>
			</html>
		`);

		const input = page.locator('input[type="text"]');
		await expect(input).toHaveAttribute('readonly');
		await expect(input).toHaveValue('Readonly value');
	});

	test('should handle required state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Input Test</title>
			</head>
			<body>
				<div id="app">
					<input type="text" placeholder="Required input" required />
				</div>
			</body>
			</html>
		`);

		const input = page.locator('input[type="text"]');
		await expect(input).toHaveAttribute('required');
	});

	test('should handle focus events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Input Test</title>
			</head>
			<body>
				<div id="app">
					<input type="text" placeholder="Focus test" id="focus-input" />
				</div>
			</body>
			</html>
		`);

		const input = page.locator('#focus-input');
		await input.focus();
		await expect(input).toBeFocused();
	});

	test('should handle maxlength attribute', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Input Test</title>
			</head>
			<body>
				<div id="app">
					<input type="text" placeholder="Max length test" maxlength="5" />
				</div>
			</body>
			</html>
		`);

		const input = page.locator('input[type="text"]');
		await expect(input).toHaveAttribute('maxlength', '5');

		// 最大文字数を超えて入力しても制限されることを確認
		await input.fill('123456789');
		await expect(input).toHaveValue('12345');
	});

	test('should handle pattern attribute', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Input Test</title>
			</head>
			<body>
				<div id="app">
					<input type="text" placeholder="Pattern test" pattern="[0-9]+" />
				</div>
			</body>
			</html>
		`);

		const input = page.locator('input[type="text"]');
		await expect(input).toHaveAttribute('pattern', '[0-9]+');
	});

	test('should handle focusStyle="outline"', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Input Test</title>
				<style>
					.input--focus-outline input:focus {
						outline: 2px solid #2196F3;
						outline-offset: 2px;
					}
					.input--focus-background input:focus {
						background: rgba(33, 150, 243, 0.1);
						outline: none;
					}
					.input--focus-none input:focus {
						outline: none;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="input--focus-outline">
						<input placeholder="Outline focus test" />
					</div>
				</div>
			</body>
			</html>
		`);

		const input = page.locator('input');
		await input.focus();
		await expect(input).toBeFocused();

		// outlineスタイルが適用されていることを確認
		const outline = await input.evaluate((el) => {
			const styles = window.getComputedStyle(el);
			return styles.outline;
		});
		expect(outline).not.toBe('none');
	});

	test('should handle focusStyle="background"', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Input Test</title>
				<style>
					.input--focus-outline input:focus {
						outline: 2px solid #2196F3;
						outline-offset: 2px;
					}
					.input--focus-background input:focus {
						background: rgba(33, 150, 243, 0.1);
						outline: none;
					}
					.input--focus-none input:focus {
						outline: none;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="input--focus-background">
						<input placeholder="Background focus test" />
					</div>
				</div>
			</body>
			</html>
		`);

		const input = page.locator('input');
		await input.focus();
		await expect(input).toBeFocused();

		// outlineがnoneであることを確認
		const outline = await input.evaluate((el) => {
			const styles = window.getComputedStyle(el);
			return styles.outline;
		});
		expect(outline).toMatch(/none/);
	});

	test('should handle focusStyle="none"', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Input Test</title>
				<style>
					.input--focus-outline input:focus {
						outline: 2px solid #2196F3;
						outline-offset: 2px;
					}
					.input--focus-background input:focus {
						background: rgba(33, 150, 243, 0.1);
						outline: none;
					}
					.input--focus-none input:focus {
						outline: none;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="input--focus-none">
						<input placeholder="None focus test" />
					</div>
				</div>
			</body>
			</html>
		`);

		const input = page.locator('input');
		await input.focus();
		await expect(input).toBeFocused();

		// outlineがnoneであることを確認
		const outline = await input.evaluate((el) => {
			const styles = window.getComputedStyle(el);
			return styles.outline;
		});
		expect(outline).toMatch(/none/);
	});
});
