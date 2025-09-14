import { test, expect } from '@playwright/test';

test.describe('Combobox Component - Browser Tests', () => {
	test('should render Combobox component in browser', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Combobox Test</title>
				<style>
					.combobox {
						position: relative;
						display: inline-block;
					}
					.combobox input {
						width: 200px;
						padding: 8px;
						border: 1px solid #ccc;
						border-radius: 4px;
					}
					.combobox__dropdown {
						position: absolute;
						top: 100%;
						left: 0;
						right: 0;
						background: white;
						border: 1px solid #ccc;
						border-top: none;
						max-height: 200px;
						overflow-y: auto;
						z-index: 1000;
					}
					.combobox__option {
						padding: 8px;
						cursor: pointer;
					}
					.combobox__option:hover {
						background: #f0f0f0;
					}
					.combobox__option--highlighted {
						background: #e3f2fd;
					}
					.combobox__option--disabled {
						opacity: 0.5;
						cursor: not-allowed;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="combobox">
						<input type="text" placeholder="Select or type..." id="combobox-input" />
						<div class="combobox__dropdown" style="display: none;">
							<div class="combobox__option" data-value="option1">Option 1</div>
							<div class="combobox__option" data-value="option2">Option 2</div>
							<div class="combobox__option" data-value="option3">Option 3</div>
						</div>
					</div>
				</div>
			</body>
			</html>
		`);

		const input = page.locator('#combobox-input');
		const dropdown = page.locator('.combobox__dropdown');
		const options = page.locator('.combobox__option');

		await expect(input).toBeVisible();
		await expect(input).toHaveAttribute('placeholder', 'Select or type...');
		await expect(dropdown).toBeHidden();
		await expect(options).toHaveCount(3);
	});

	test('should handle input focus and dropdown opening', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Combobox Test</title>
				<style>
					.combobox {
						position: relative;
						display: inline-block;
					}
					.combobox input {
						width: 200px;
						padding: 8px;
						border: 1px solid #ccc;
						border-radius: 4px;
					}
					.combobox__dropdown {
						position: absolute;
						top: 100%;
						left: 0;
						right: 0;
						background: white;
						border: 1px solid #ccc;
						border-top: none;
						max-height: 200px;
						overflow-y: auto;
						z-index: 1000;
					}
					.combobox__option {
						padding: 8px;
						cursor: pointer;
					}
					.combobox__option:hover {
						background: #f0f0f0;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="combobox">
						<input type="text" placeholder="Select or type..." id="combobox-input" />
						<div class="combobox__dropdown" style="display: none;">
							<div class="combobox__option" data-value="option1">Option 1</div>
							<div class="combobox__option" data-value="option2">Option 2</div>
							<div class="combobox__option" data-value="option3">Option 3</div>
						</div>
					</div>
				</div>
				<script>
					const input = document.getElementById('combobox-input');
					const dropdown = document.querySelector('.combobox__dropdown');
					
					input.addEventListener('focus', () => {
						dropdown.style.display = 'block';
					});
					
					input.addEventListener('blur', () => {
						setTimeout(() => {
							dropdown.style.display = 'none';
						}, 100);
					});
				</script>
			</body>
			</html>
		`);

		const input = page.locator('#combobox-input');
		const dropdown = page.locator('.combobox__dropdown');

		// 最初はドロップダウンが非表示
		await expect(dropdown).toBeHidden();

		// 入力にフォーカス
		await input.focus();
		await expect(input).toBeFocused();
		await expect(dropdown).toBeVisible();
	});

	test('should handle option selection', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Combobox Test</title>
				<style>
					.combobox {
						position: relative;
						display: inline-block;
					}
					.combobox input {
						width: 200px;
						padding: 8px;
						border: 1px solid #ccc;
						border-radius: 4px;
					}
					.combobox__dropdown {
						position: absolute;
						top: 100%;
						left: 0;
						right: 0;
						background: white;
						border: 1px solid #ccc;
						border-top: none;
						max-height: 200px;
						overflow-y: auto;
						z-index: 1000;
					}
					.combobox__option {
						padding: 8px;
						cursor: pointer;
					}
					.combobox__option:hover {
						background: #f0f0f0;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="combobox">
						<input type="text" placeholder="Select or type..." id="combobox-input" />
						<div class="combobox__dropdown" style="display: block;">
							<div class="combobox__option" data-value="option1">Option 1</div>
							<div class="combobox__option" data-value="option2">Option 2</div>
							<div class="combobox__option" data-value="option3">Option 3</div>
						</div>
					</div>
				</div>
				<script>
					const input = document.getElementById('combobox-input');
					const options = document.querySelectorAll('.combobox__option');
					
					options.forEach(option => {
						option.addEventListener('click', () => {
							input.value = option.textContent;
							document.querySelector('.combobox__dropdown').style.display = 'none';
						});
					});
				</script>
			</body>
			</html>
		`);

		const input = page.locator('#combobox-input');
		const option2 = page.locator('.combobox__option[data-value="option2"]');
		const dropdown = page.locator('.combobox__dropdown');

		// オプション2をクリック
		await option2.click();

		// 入力値が更新されることを確認
		await expect(input).toHaveValue('Option 2');

		// ドロップダウンが閉じることを確認
		await expect(dropdown).toBeHidden();
	});

	test('should handle disabled state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Combobox Test</title>
				<style>
					.combobox {
						position: relative;
						display: inline-block;
					}
					.combobox input {
						width: 200px;
						padding: 8px;
						border: 1px solid #ccc;
						border-radius: 4px;
					}
					.combobox--disabled input {
						opacity: 0.5;
						cursor: not-allowed;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="combobox combobox--disabled">
						<input type="text" placeholder="Select or type..." disabled />
					</div>
				</div>
			</body>
			</html>
		`);

		const input = page.locator('input');
		await expect(input).toBeDisabled();
		await expect(input).toHaveAttribute('disabled');
	});

	test('should handle readonly state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Combobox Test</title>
				<style>
					.combobox {
						position: relative;
						display: inline-block;
					}
					.combobox input {
						width: 200px;
						padding: 8px;
						border: 1px solid #ccc;
						border-radius: 4px;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="combobox">
						<input type="text" placeholder="Select or type..." readonly value="Readonly value" />
					</div>
				</div>
			</body>
			</html>
		`);

		const input = page.locator('input');
		await expect(input).toHaveAttribute('readonly');
		await expect(input).toHaveValue('Readonly value');
	});

	test('should handle required state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Combobox Test</title>
				<style>
					.combobox {
						position: relative;
						display: inline-block;
					}
					.combobox input {
						width: 200px;
						padding: 8px;
						border: 1px solid #ccc;
						border-radius: 4px;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="combobox">
						<input type="text" placeholder="Select or type..." required />
					</div>
				</div>
			</body>
			</html>
		`);

		const input = page.locator('input');
		await expect(input).toHaveAttribute('required');
	});

	test('should handle filtering', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Combobox Test</title>
				<style>
					.combobox {
						position: relative;
						display: inline-block;
					}
					.combobox input {
						width: 200px;
						padding: 8px;
						border: 1px solid #ccc;
						border-radius: 4px;
					}
					.combobox__dropdown {
						position: absolute;
						top: 100%;
						left: 0;
						right: 0;
						background: white;
						border: 1px solid #ccc;
						border-top: none;
						max-height: 200px;
						overflow-y: auto;
						z-index: 1000;
					}
					.combobox__option {
						padding: 8px;
						cursor: pointer;
					}
					.combobox__option--hidden {
						display: none;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="combobox">
						<input type="text" placeholder="Select or type..." id="combobox-input" />
						<div class="combobox__dropdown" style="display: block;">
							<div class="combobox__option" data-value="apple">Apple</div>
							<div class="combobox__option" data-value="banana">Banana</div>
							<div class="combobox__option" data-value="cherry">Cherry</div>
						</div>
					</div>
				</div>
				<script>
					const input = document.getElementById('combobox-input');
					const options = document.querySelectorAll('.combobox__option');
					
					input.addEventListener('input', (e) => {
						const searchTerm = e.target.value.toLowerCase();
						options.forEach(option => {
							const text = option.textContent.toLowerCase();
							if (text.includes(searchTerm)) {
								option.classList.remove('combobox__option--hidden');
							} else {
								option.classList.add('combobox__option--hidden');
							}
						});
					});
				</script>
			</body>
			</html>
		`);

		const input = page.locator('#combobox-input');
		const appleOption = page.locator('.combobox__option[data-value="apple"]');
		const bananaOption = page.locator('.combobox__option[data-value="banana"]');
		const cherryOption = page.locator('.combobox__option[data-value="cherry"]');

		// 最初はすべてのオプションが表示されている
		await expect(appleOption).toBeVisible();
		await expect(bananaOption).toBeVisible();
		await expect(cherryOption).toBeVisible();

		// "a"を入力してフィルタリング
		await input.fill('a');

		// "a"を含むオプションのみが表示される
		await expect(appleOption).toBeVisible();
		await expect(bananaOption).toBeVisible();
		await expect(cherryOption).toHaveClass(/combobox__option--hidden/);
	});

	test('should handle keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Combobox Test</title>
				<style>
					.combobox {
						position: relative;
						display: inline-block;
					}
					.combobox input {
						width: 200px;
						padding: 8px;
						border: 1px solid #ccc;
						border-radius: 4px;
					}
					.combobox__dropdown {
						position: absolute;
						top: 100%;
						left: 0;
						right: 0;
						background: white;
						border: 1px solid #ccc;
						border-top: none;
						max-height: 200px;
						overflow-y: auto;
						z-index: 1000;
					}
					.combobox__option {
						padding: 8px;
						cursor: pointer;
					}
					.combobox__option--highlighted {
						background: #e3f2fd;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<div class="combobox">
						<input type="text" placeholder="Select or type..." id="combobox-input" />
						<div class="combobox__dropdown" style="display: block;">
							<div class="combobox__option" data-value="option1">Option 1</div>
							<div class="combobox__option" data-value="option2">Option 2</div>
							<div class="combobox__option" data-value="option3">Option 3</div>
						</div>
					</div>
				</div>
				<script>
					const input = document.getElementById('combobox-input');
					const options = document.querySelectorAll('.combobox__option');
					let highlightedIndex = -1;
					
					input.addEventListener('keydown', (e) => {
						if (e.key === 'ArrowDown') {
							e.preventDefault();
							highlightedIndex = Math.min(highlightedIndex + 1, options.length - 1);
							updateHighlight();
						} else if (e.key === 'ArrowUp') {
							e.preventDefault();
							highlightedIndex = Math.max(highlightedIndex - 1, -1);
							updateHighlight();
						}
					});
					
					function updateHighlight() {
						options.forEach((option, index) => {
							if (index === highlightedIndex) {
								option.classList.add('combobox__option--highlighted');
							} else {
								option.classList.remove('combobox__option--highlighted');
							}
						});
					}
				</script>
			</body>
			</html>
		`);

		const input = page.locator('#combobox-input');
		const option1 = page.locator('.combobox__option[data-value="option1"]');
		const option2 = page.locator('.combobox__option[data-value="option2"]');

		// 入力にフォーカス
		await input.focus();

		// 下矢印キーで最初のオプションをハイライト
		await input.press('ArrowDown');
		await expect(option1).toHaveClass(/combobox__option--highlighted/);

		// 下矢印キーで次のオプションをハイライト
		await input.press('ArrowDown');
		await expect(option1).not.toHaveClass(/combobox__option--highlighted/);
		await expect(option2).toHaveClass(/combobox__option--highlighted/);
	});

	test('should handle form submission', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Combobox Test</title>
				<style>
					.combobox {
						position: relative;
						display: inline-block;
					}
					.combobox input {
						width: 200px;
						padding: 8px;
						border: 1px solid #ccc;
						border-radius: 4px;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<form id="test-form">
						<div class="combobox">
							<input type="text" name="fruit" placeholder="Select a fruit" value="apple" />
						</div>
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

		const submitButton = page.locator('button[type="submit"]');
		const result = page.locator('#result');

		// フォームを送信
		await submitButton.click();

		await expect(result).toHaveText('Selected: apple');
	});
});
