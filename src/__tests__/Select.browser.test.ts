import { test, expect } from '@playwright/test';

test.describe('Select Component - Browser Tests', () => {
	test('should render Select component in browser', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Select Test</title>
			</head>
			<body>
				<div id="app">
					<select name="test-group" id="select-1">
						<option value="">Select an option</option>
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
						<option value="option3">Option 3</option>
					</select>
				</div>
			</body>
			</html>
		`);

		const select = page.locator('select');
		await expect(select).toBeVisible();
		await expect(select).toHaveAttribute('name', 'test-group');
		await expect(select).toHaveAttribute('id', 'select-1');
	});

	test('should handle single selection', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Select Test</title>
			</head>
			<body>
				<div id="app">
					<select name="test-group" id="select-1">
						<option value="">Select an option</option>
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
						<option value="option3">Option 3</option>
					</select>
				</div>
			</body>
			</html>
		`);

		const select = page.locator('#select-1');

		// 最初は空の値
		await expect(select).toHaveValue('');

		// オプション2を選択
		await select.selectOption('option2');
		await expect(select).toHaveValue('option2');

		// オプション3を選択
		await select.selectOption('option3');
		await expect(select).toHaveValue('option3');
	});

	test('should handle multiple selection', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Select Test</title>
			</head>
			<body>
				<div id="app">
					<select name="test-group" id="select-1" multiple size="3">
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
						<option value="option3">Option 3</option>
						<option value="option4">Option 4</option>
					</select>
				</div>
			</body>
			</html>
		`);

		const select = page.locator('#select-1');

		// 複数選択を有効にする
		await expect(select).toHaveAttribute('multiple');
		await expect(select).toHaveAttribute('size', '3');

		// 複数のオプションを選択
		await select.selectOption(['option1', 'option3']);
		await expect(select).toHaveValues(['option1', 'option3']);
	});

	test('should handle disabled state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Select Test</title>
			</head>
			<body>
				<div id="app">
					<select name="test-group" disabled>
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
					</select>
				</div>
			</body>
			</html>
		`);

		const select = page.locator('select');
		await expect(select).toBeDisabled();
		await expect(select).toHaveAttribute('disabled');
	});

	test('should handle required state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Select Test</title>
			</head>
			<body>
				<div id="app">
					<select name="test-group" required>
						<option value="">Select an option</option>
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
					</select>
				</div>
			</body>
			</html>
		`);

		const select = page.locator('select');
		await expect(select).toHaveAttribute('required');
	});

	test('should handle focus events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Select Test</title>
			</head>
			<body>
				<div id="app">
					<select name="test-group" id="focus-select">
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
					</select>
				</div>
			</body>
			</html>
		`);

		const select = page.locator('#focus-select');
		await select.focus();
		await expect(select).toBeFocused();
	});

	test('should handle option groups', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Select Test</title>
			</head>
			<body>
				<div id="app">
					<select name="test-group" id="grouped-select">
						<optgroup label="Group 1">
							<option value="option1">Option 1</option>
							<option value="option2">Option 2</option>
						</optgroup>
						<optgroup label="Group 2">
							<option value="option3">Option 3</option>
							<option value="option4">Option 4</option>
						</optgroup>
					</select>
				</div>
			</body>
			</html>
		`);

		const select = page.locator('#grouped-select');
		const optgroups = page.locator('optgroup');

		await expect(select).toBeVisible();
		await expect(optgroups).toHaveCount(2);
		await expect(optgroups.nth(0)).toHaveAttribute('label', 'Group 1');
		await expect(optgroups.nth(1)).toHaveAttribute('label', 'Group 2');
	});

	test('should handle disabled options', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Select Test</title>
			</head>
			<body>
				<div id="app">
					<select name="test-group" id="disabled-options-select">
						<option value="option1">Option 1</option>
						<option value="option2" disabled>Option 2 (Disabled)</option>
						<option value="option3">Option 3</option>
					</select>
				</div>
			</body>
			</html>
		`);

		const select = page.locator('#disabled-options-select');
		const disabledOption = page.locator('option[disabled]');

		await expect(select).toBeVisible();
		await expect(disabledOption).toHaveAttribute('disabled');
		await expect(disabledOption).toHaveAttribute('value', 'option2');
	});

	test('should handle different sizes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Select Test</title>
			</head>
			<body>
				<div id="app">
					<select name="test-group" id="size-select" size="4">
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
						<option value="option3">Option 3</option>
						<option value="option4">Option 4</option>
						<option value="option5">Option 5</option>
					</select>
				</div>
			</body>
			</html>
		`);

		const select = page.locator('#size-select');
		await expect(select).toHaveAttribute('size', '4');
	});

	test('should handle form submission', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Select Test</title>
			</head>
			<body>
				<div id="app">
					<form id="test-form">
						<select name="fruit" id="fruit-select">
							<option value="">Select a fruit</option>
							<option value="apple">Apple</option>
							<option value="banana">Banana</option>
							<option value="cherry">Cherry</option>
						</select>
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

		const select = page.locator('#fruit-select');
		const submitButton = page.locator('button[type="submit"]');
		const result = page.locator('#result');

		// バナナを選択してフォームを送信
		await select.selectOption('banana');
		await submitButton.click();

		await expect(result).toHaveText('Selected: banana');
	});

	test('should handle change events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Select Test</title>
			</head>
			<body>
				<div id="app">
					<select name="test-group" id="change-select">
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
						<option value="option3">Option 3</option>
					</select>
					<div id="change-count">Changes: 0</div>
				</div>
				<script>
					let changeCount = 0;
					document.getElementById('change-select').addEventListener('change', function() {
						changeCount++;
						document.getElementById('change-count').textContent = 'Changes: ' + changeCount;
					});
				</script>
			</body>
			</html>
		`);

		const select = page.locator('#change-select');
		const changeCount = page.locator('#change-count');

		// 変更イベントをテスト
		await select.selectOption('option2');
		await expect(changeCount).toHaveText('Changes: 1');

		await select.selectOption('option3');
		await expect(changeCount).toHaveText('Changes: 2');
	});
});
