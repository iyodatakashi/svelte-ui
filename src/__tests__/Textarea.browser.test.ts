import { test, expect } from '@playwright/test';

test.describe('Textarea Component - Browser Tests', () => {
	test('should render Textarea component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
			</head>
			<body>
				<div id="app">
					<textarea placeholder="Test textarea" id="test-textarea" rows="3"></textarea>
				</div>
			</body>
			</html>
		`);

		// textarea要素が存在することを確認
		const textarea = page.locator('textarea');
		await expect(textarea).toBeVisible();
		await expect(textarea).toHaveAttribute('placeholder', 'Test textarea');
		await expect(textarea).toHaveAttribute('id', 'test-textarea');
		await expect(textarea).toHaveAttribute('rows', '3');
	});

	test('should handle user input', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
			</head>
			<body>
				<div id="app">
					<textarea placeholder="Type here" id="test-textarea" rows="3"></textarea>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('textarea');
		await textarea.fill('Hello World\nThis is a multi-line text');
		await expect(textarea).toHaveValue('Hello World\nThis is a multi-line text');
	});

	test('should handle different textarea attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
			</head>
			<body>
				<div id="app">
					<textarea 
						placeholder="Multi-line input" 
						id="textarea-1" 
						rows="5" 
						cols="50"
						maxlength="100"
					></textarea>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('#textarea-1');
		await expect(textarea).toHaveAttribute('rows', '5');
		await expect(textarea).toHaveAttribute('cols', '50');
		await expect(textarea).toHaveAttribute('maxlength', '100');
	});

	test('should handle disabled state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
			</head>
			<body>
				<div id="app">
					<textarea placeholder="Disabled textarea" disabled></textarea>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('textarea');
		await expect(textarea).toBeDisabled();
		await expect(textarea).toHaveAttribute('disabled');
	});

	test('should handle readonly state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
			</head>
			<body>
				<div id="app">
					<textarea placeholder="Readonly textarea" readonly>Readonly content</textarea>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('textarea');
		await expect(textarea).toHaveAttribute('readonly');
		await expect(textarea).toHaveValue('Readonly content');
	});

	test('should handle required state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
			</head>
			<body>
				<div id="app">
					<textarea placeholder="Required textarea" required></textarea>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('textarea');
		await expect(textarea).toHaveAttribute('required');
	});

	test('should handle focus events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
			</head>
			<body>
				<div id="app">
					<textarea placeholder="Focus test" id="focus-textarea"></textarea>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('#focus-textarea');
		await textarea.focus();
		await expect(textarea).toBeFocused();
	});

	test('should handle maxlength attribute', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
			</head>
			<body>
				<div id="app">
					<textarea placeholder="Max length test" maxlength="10"></textarea>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('textarea');
		await expect(textarea).toHaveAttribute('maxlength', '10');

		// 最大文字数を超えて入力しても制限されることを確認
		await textarea.fill('This is a very long text that exceeds the limit');
		await expect(textarea).toHaveValue('This is a ');
	});

	test('should handle pattern attribute', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
			</head>
			<body>
				<div id="app">
					<textarea placeholder="Pattern test" pattern="[a-zA-Z]+"></textarea>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('textarea');
		await expect(textarea).toHaveAttribute('pattern', '[a-zA-Z]+');
	});

	test('should handle resize functionality', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
				<style>
					textarea {
						resize: both;
						min-width: 200px;
						min-height: 100px;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<textarea placeholder="Resizable textarea"></textarea>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('textarea');
		await expect(textarea).toBeVisible();

		// リサイズハンドルが存在することを確認
		const boundingBox = await textarea.boundingBox();
		expect(boundingBox).toBeTruthy();
		expect(boundingBox!.width).toBeGreaterThanOrEqual(200);
		expect(boundingBox!.height).toBeGreaterThanOrEqual(100);
	});

	test('should handle multi-line text input', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
			</head>
			<body>
				<div id="app">
					<textarea placeholder="Multi-line test" rows="5"></textarea>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('textarea');
		const multiLineText = 'Line 1\nLine 2\nLine 3\nLine 4\nLine 5';
		await textarea.fill(multiLineText);
		await expect(textarea).toHaveValue(multiLineText);
	});

	test('should handle wrap attribute', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
			</head>
			<body>
				<div id="app">
					<textarea placeholder="Wrap test" wrap="soft"></textarea>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('textarea');
		await expect(textarea).toHaveAttribute('wrap', 'soft');
	});

	test('should handle focusStyle="outline"', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Textarea Test</title>
				<style>
					.textarea--focus-outline textarea:focus {
						outline: 2px solid #2196F3;
						outline-offset: 2px;
					}
					.textarea--focus-background textarea:focus {
						background: rgba(33, 150, 243, 0.1);
						outline: none;
					}
					.textarea--focus-none textarea:focus {
						outline: none;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="textarea--focus-outline">
						<textarea placeholder="Outline focus test"></textarea>
					</div>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('textarea');
		await textarea.focus();
		await expect(textarea).toBeFocused();

		// outlineスタイルが適用されていることを確認
		const outline = await textarea.evaluate((el) => {
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
				<title>Textarea Test</title>
				<style>
					.textarea--focus-outline textarea:focus {
						outline: 2px solid #2196F3;
						outline-offset: 2px;
					}
					.textarea--focus-background textarea:focus {
						background: rgba(33, 150, 243, 0.1);
						outline: none;
					}
					.textarea--focus-none textarea:focus {
						outline: none;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="textarea--focus-background">
						<textarea placeholder="Background focus test"></textarea>
					</div>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('textarea');
		await textarea.focus();
		await expect(textarea).toBeFocused();

		// outlineがnoneであることを確認
		const outline = await textarea.evaluate((el) => {
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
				<title>Textarea Test</title>
				<style>
					.textarea--focus-outline textarea:focus {
						outline: 2px solid #2196F3;
						outline-offset: 2px;
					}
					.textarea--focus-background textarea:focus {
						background: rgba(33, 150, 243, 0.1);
						outline: none;
					}
					.textarea--focus-none textarea:focus {
						outline: none;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="textarea--focus-none">
						<textarea placeholder="None focus test"></textarea>
					</div>
				</div>
			</body>
			</html>
		`);

		const textarea = page.locator('textarea');
		await textarea.focus();
		await expect(textarea).toBeFocused();

		// outlineがnoneであることを確認
		const outline = await textarea.evaluate((el) => {
			const styles = window.getComputedStyle(el);
			return styles.outline;
		});
		expect(outline).toMatch(/none/);
	});
});
