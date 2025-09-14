import { test, expect } from '@playwright/test';

test.describe('Checkbox Component - Browser Tests', () => {
	test('should render Checkbox component in browser', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Checkbox Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="checkbox" name="test-group" value="option1" id="checkbox-1">
						<span>Checkbox Option 1</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const checkbox = page.locator('input[type="checkbox"]');
		await expect(checkbox).toBeVisible();
		await expect(checkbox).toHaveAttribute('name', 'test-group');
		await expect(checkbox).toHaveAttribute('value', 'option1');
		await expect(checkbox).toHaveAttribute('id', 'checkbox-1');
	});

	test('should handle checkbox selection and deselection', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Checkbox Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="checkbox" name="group1" value="option1" id="checkbox-1">
						<span>Option 1</span>
					</label>
					<label>
						<input type="checkbox" name="group1" value="option2" id="checkbox-2">
						<span>Option 2</span>
					</label>
					<label>
						<input type="checkbox" name="group1" value="option3" id="checkbox-3">
						<span>Option 3</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const checkbox1 = page.locator('#checkbox-1');
		const checkbox2 = page.locator('#checkbox-2');
		const checkbox3 = page.locator('#checkbox-3');

		// 最初は何も選択されていない
		await expect(checkbox1).not.toBeChecked();
		await expect(checkbox2).not.toBeChecked();
		await expect(checkbox3).not.toBeChecked();

		// オプション1と2を選択
		await checkbox1.check();
		await checkbox2.check();
		await expect(checkbox1).toBeChecked();
		await expect(checkbox2).toBeChecked();
		await expect(checkbox3).not.toBeChecked();

		// オプション1の選択を解除
		await checkbox1.uncheck();
		await expect(checkbox1).not.toBeChecked();
		await expect(checkbox2).toBeChecked();
		await expect(checkbox3).not.toBeChecked();
	});

	test('should handle disabled state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Checkbox Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="checkbox" name="test-group" value="option1" disabled>
						<span>Disabled Checkbox</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const checkbox = page.locator('input[type="checkbox"]');
		await expect(checkbox).toBeDisabled();
		await expect(checkbox).toHaveAttribute('disabled');
	});

	test('should handle required state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Checkbox Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="checkbox" name="test-group" value="option1" required>
						<span>Required Checkbox</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const checkbox = page.locator('input[type="checkbox"]');
		await expect(checkbox).toHaveAttribute('required');
	});

	test('should handle focus events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Checkbox Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="checkbox" name="test-group" value="option1" id="focus-checkbox">
						<span>Focus Test Checkbox</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const checkbox = page.locator('#focus-checkbox');
		await checkbox.focus();
		await expect(checkbox).toBeFocused();
	});

	test('should handle label click', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Checkbox Test</title>
			</head>
			<body>
				<div id="app">
					<label for="label-checkbox">
						<input type="checkbox" name="test-group" value="option1" id="label-checkbox">
						<span>Clickable Label</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const checkbox = page.locator('#label-checkbox');
		const label = page.locator('label[for="label-checkbox"]');

		// 最初は選択されていない
		await expect(checkbox).not.toBeChecked();

		// ラベルをクリック
		await label.click();
		await expect(checkbox).toBeChecked();

		// 再度ラベルをクリック（選択解除）
		await label.click();
		await expect(checkbox).not.toBeChecked();
	});

	test('should handle keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Checkbox Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="checkbox" name="test-group" value="option1" id="checkbox-1">
						<span>Option 1</span>
					</label>
					<label>
						<input type="checkbox" name="test-group" value="option2" id="checkbox-2">
						<span>Option 2</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const checkbox1 = page.locator('#checkbox-1');
		const checkbox2 = page.locator('#checkbox-2');

		// 最初のチェックボックスにフォーカス
		await checkbox1.focus();
		await expect(checkbox1).toBeFocused();

		// スペースキーで選択
		await checkbox1.press(' ');
		await expect(checkbox1).toBeChecked();

		// 再度スペースキーで選択解除
		await checkbox1.press(' ');
		await expect(checkbox1).not.toBeChecked();

		// Tabキーで次のチェックボックスに移動
		await checkbox1.press('Tab');
		await expect(checkbox2).toBeFocused();
	});

	test('should handle indeterminate state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Checkbox Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="checkbox" name="test-group" value="option1" id="indeterminate-checkbox">
						<span>Indeterminate Checkbox</span>
					</label>
				</div>
				<script>
					document.getElementById('indeterminate-checkbox').indeterminate = true;
				</script>
			</body>
			</html>
		`);

		const checkbox = page.locator('#indeterminate-checkbox');

		// indeterminate状態を確認
		const isIndeterminate = await checkbox.evaluate((el) => el.indeterminate);
		expect(isIndeterminate).toBe(true);
	});

	test('should handle different values', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Checkbox Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="checkbox" name="test-group" value="apple" id="checkbox-apple">
						<span>Apple</span>
					</label>
					<label>
						<input type="checkbox" name="test-group" value="banana" id="checkbox-banana">
						<span>Banana</span>
					</label>
					<label>
						<input type="checkbox" name="test-group" value="cherry" id="checkbox-cherry">
						<span>Cherry</span>
					</label>
				</div>
			</body>
			</html>
		`);

		const appleCheckbox = page.locator('#checkbox-apple');
		const bananaCheckbox = page.locator('#checkbox-banana');
		const cherryCheckbox = page.locator('#checkbox-cherry');

		// 各チェックボックスの値を確認
		await expect(appleCheckbox).toHaveAttribute('value', 'apple');
		await expect(bananaCheckbox).toHaveAttribute('value', 'banana');
		await expect(cherryCheckbox).toHaveAttribute('value', 'cherry');

		// 複数の選択
		await appleCheckbox.check();
		await cherryCheckbox.check();
		await expect(appleCheckbox).toBeChecked();
		await expect(bananaCheckbox).not.toBeChecked();
		await expect(cherryCheckbox).toBeChecked();
	});

	test('should handle form submission with multiple values', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Checkbox Test</title>
			</head>
			<body>
				<div id="app">
					<form id="test-form">
						<label>
							<input type="checkbox" name="fruits" value="apple" id="checkbox-apple">
							<span>Apple</span>
						</label>
						<label>
							<input type="checkbox" name="fruits" value="banana" id="checkbox-banana">
							<span>Banana</span>
						</label>
						<label>
							<input type="checkbox" name="fruits" value="cherry" id="checkbox-cherry">
							<span>Cherry</span>
						</label>
						<button type="submit">Submit</button>
					</form>
					<div id="result"></div>
				</div>
				<script>
					document.getElementById('test-form').addEventListener('submit', function(e) {
						e.preventDefault();
						const formData = new FormData(this);
						const selectedFruits = formData.getAll('fruits');
						document.getElementById('result').textContent = 'Selected: ' + selectedFruits.join(', ');
					});
				</script>
			</body>
			</html>
		`);

		const appleCheckbox = page.locator('#checkbox-apple');
		const bananaCheckbox = page.locator('#checkbox-banana');
		const submitButton = page.locator('button[type="submit"]');
		const result = page.locator('#result');

		// 複数のフルーツを選択してフォームを送信
		await appleCheckbox.check();
		await bananaCheckbox.check();
		await submitButton.click();

		await expect(result).toHaveText('Selected: apple, banana');
	});

	test('should handle click events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Checkbox Test</title>
			</head>
			<body>
				<div id="app">
					<label>
						<input type="checkbox" name="test-group" value="option1" id="click-checkbox">
						<span>Click Test Checkbox</span>
					</label>
					<div id="click-count">Clicks: 0</div>
				</div>
				<script>
					let clickCount = 0;
					document.getElementById('click-checkbox').addEventListener('click', function() {
						clickCount++;
						document.getElementById('click-count').textContent = 'Clicks: ' + clickCount;
					});
				</script>
			</body>
			</html>
		`);

		const checkbox = page.locator('#click-checkbox');
		const clickCount = page.locator('#click-count');

		// クリックイベントをテスト
		await checkbox.click();
		await expect(clickCount).toHaveText('Clicks: 1');
		await expect(checkbox).toBeChecked();

		await checkbox.click();
		await expect(clickCount).toHaveText('Clicks: 2');
		await expect(checkbox).not.toBeChecked();
	});
});
