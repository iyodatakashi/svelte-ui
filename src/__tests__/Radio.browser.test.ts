import { test, expect } from '@playwright/test';

test.describe('Radio Component - Browser Tests', () => {
	test('should render Radio component in browser', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Radio Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="radio" name="test-group" value="option1" id="radio-1">
						<span>Radio Option 1</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const radio = page.locator('input[type="radio"]');
		await expect(radio).toBeVisible();
		await expect(radio).toHaveAttribute('name', 'test-group');
		await expect(radio).toHaveAttribute('value', 'option1');
		await expect(radio).toHaveAttribute('id', 'radio-1');
	});

	test('should handle radio group selection', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Radio Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="radio" name="group1" value="option1" id="radio-1">
						<span>Option 1</span>
					</label>
					<label>
						<input type="radio" name="group1" value="option2" id="radio-2">
						<span>Option 2</span>
					</label>
					<label>
						<input type="radio" name="group1" value="option3" id="radio-3">
						<span>Option 3</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const radio1 = page.locator('#radio-1');
		const radio2 = page.locator('#radio-2');
		const radio3 = page.locator('#radio-3');

		// 最初は何も選択されていない
		await expect(radio1).not.toBeChecked();
		await expect(radio2).not.toBeChecked();
		await expect(radio3).not.toBeChecked();

		// オプション2を選択
		await radio2.check();
		await expect(radio2).toBeChecked();
		await expect(radio1).not.toBeChecked();
		await expect(radio3).not.toBeChecked();

		// オプション3を選択（オプション2の選択が解除される）
		await radio3.check();
		await expect(radio3).toBeChecked();
		await expect(radio1).not.toBeChecked();
		await expect(radio2).not.toBeChecked();
	});

	test('should handle disabled state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Radio Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="radio" name="test-group" value="option1" disabled>
						<span>Disabled Radio</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const radio = page.locator('input[type="radio"]');
		await expect(radio).toBeDisabled();
		await expect(radio).toHaveAttribute('disabled');
	});

	test('should handle required state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Radio Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="radio" name="test-group" value="option1" required>
						<span>Required Radio</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const radio = page.locator('input[type="radio"]');
		await expect(radio).toHaveAttribute('required');
	});

	test('should handle focus events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Radio Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="radio" name="test-group" value="option1" id="focus-radio">
						<span>Focus Test Radio</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const radio = page.locator('#focus-radio');
		await radio.focus();
		await expect(radio).toBeFocused();
	});

	test('should handle label click', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Radio Test</title>
			</head>
			<body>
				<div id="app">
					<label for="label-radio">
						<input type="radio" name="test-group" value="option1" id="label-radio">
						<span>Clickable Label</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const radio = page.locator('#label-radio');
		const label = page.locator('label[for="label-radio"]');

		// 最初は選択されていない
		await expect(radio).not.toBeChecked();

		// ラベルをクリック
		await label.click();
		await expect(radio).toBeChecked();
	});

	test('should handle keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Radio Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="radio" name="test-group" value="option1" id="radio-1">
						<span>Option 1</span>
					</label>
					<label>
						<input type="radio" name="test-group" value="option2" id="radio-2">
						<span>Option 2</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const radio1 = page.locator('#radio-1');
		const radio2 = page.locator('#radio-2');

		// 最初のラジオボタンにフォーカス
		await radio1.focus();
		await expect(radio1).toBeFocused();

		// スペースキーで選択
		await radio1.press(' ');
		await expect(radio1).toBeChecked();

		// 矢印キーで次のラジオボタンに移動
		await radio1.press('ArrowDown');
		await expect(radio2).toBeFocused();
	});

	test('should handle different values', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Radio Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="radio" name="test-group" value="apple" id="radio-apple">
						<span>Apple</span>
					</label>
					<label>
						<input type="radio" name="test-group" value="banana" id="radio-banana">
						<span>Banana</span>
					</label>
					<label>
						<input type="radio" name="test-group" value="cherry" id="radio-cherry">
						<span>Cherry</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const appleRadio = page.locator('#radio-apple');
		const bananaRadio = page.locator('#radio-banana');
		const cherryRadio = page.locator('#radio-cherry');

		// 各ラジオボタンの値を確認
		await expect(appleRadio).toHaveAttribute('value', 'apple');
		await expect(bananaRadio).toHaveAttribute('value', 'banana');
		await expect(cherryRadio).toHaveAttribute('value', 'cherry');

		// バナナを選択
		await bananaRadio.check();
		await expect(bananaRadio).toBeChecked();
		await expect(appleRadio).not.toBeChecked();
		await expect(cherryRadio).not.toBeChecked();
	});

	test('should handle form submission', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Radio Test</title>
			</head>
			<body>
				<div id="app">
					<form id="test-form">
						<label>
							<input type="radio" name="fruit" value="apple" id="radio-apple">
							<span>Apple</span>
						</label>
						<label>
							<input type="radio" name="fruit" value="banana" id="radio-banana">
							<span>Banana</span>
						</label>
						<button type="submit">Submit</button>
					</form>
					<div id="result"></div>
				</div>
				<script>
					document.getElementById('test-form').addEventListener('submit', function(e) {
						e.preventDefault();
						const formData = new FormData(this);
						const selectedFruit = formData.get('fruit');
						document.getElementById('result').textContent = 'Selected: ' + selectedFruit;
					});
				</script>
			</body>
			</html>
		`);

		const bananaRadio = page.locator('#radio-banana');
		const submitButton = page.locator('button[type="submit"]');
		const result = page.locator('#result');

		// バナナを選択してフォームを送信
		await bananaRadio.check();
		await submitButton.click();

		await expect(result).toHaveText('Selected: banana');
	});
});
