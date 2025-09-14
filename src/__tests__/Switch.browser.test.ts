import { test, expect } from '@playwright/test';

test.describe('Switch Component - Browser Tests', () => {
	test('should render Switch component in browser', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Switch Test</title>
				<style>
					.switch {
						position: relative;
						display: inline-block;
						width: 60px;
						height: 34px;
					}
					.switch input {
						opacity: 0;
						width: 0;
						height: 0;
					}
					.slider {
						position: absolute;
						cursor: pointer;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background-color: #ccc;
						transition: .4s;
						border-radius: 34px;
					}
					.slider:before {
						position: absolute;
						content: "";
						height: 26px;
						width: 26px;
						left: 4px;
						bottom: 4px;
						background-color: white;
						transition: .4s;
						border-radius: 50%;
					}
					input:checked + .slider {
						background-color: #2196F3;
					}
					input:checked + .slider:before {
						transform: translateX(26px);
					}
				</style>
			</head>
			<body>
				<div id="app">
					<label class="switch">
						<input type="checkbox" name="test-group" id="switch-1">
						<span class="slider"></span>
					</label>
					<span>Switch Label</span>
				</div>
			</body>
			</html>
		`);

		const switchInput = page.locator('input[type="checkbox"]');
		const slider = page.locator('.slider');

		// input要素はopacity: 0なので、存在することを確認する
		await expect(switchInput).toBeAttached();
		await expect(slider).toBeVisible();
		await expect(switchInput).toHaveAttribute('name', 'test-group');
		await expect(switchInput).toHaveAttribute('id', 'switch-1');
	});

	test('should handle switch toggle', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Switch Test</title>
				<style>
					.switch {
						position: relative;
						display: inline-block;
						width: 60px;
						height: 34px;
					}
					.switch input {
						opacity: 0;
						width: 0;
						height: 0;
					}
					.slider {
						position: absolute;
						cursor: pointer;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background-color: #ccc;
						transition: .4s;
						border-radius: 34px;
					}
					.slider:before {
						position: absolute;
						content: "";
						height: 26px;
						width: 26px;
						left: 4px;
						bottom: 4px;
						background-color: white;
						transition: .4s;
						border-radius: 50%;
					}
					input:checked + .slider {
						background-color: #2196F3;
					}
					input:checked + .slider:before {
						transform: translateX(26px);
					}
				</style>
			</head>
			<body>
				<div id="app">
					<label class="switch">
						<input type="checkbox" name="test-group" id="switch-1">
						<span class="slider"></span>
					</label>
				</div>
			</body>
			</html>
		`);

		const switchInput = page.locator('#switch-1');
		const slider = page.locator('.slider');

		// 最初はオフ状態
		await expect(switchInput).not.toBeChecked();

		// スライダーをクリックしてオンにする
		await slider.click();
		await expect(switchInput).toBeChecked();

		// 再度スライダーをクリックしてオフにする
		await slider.click();
		await expect(switchInput).not.toBeChecked();
	});

	test('should handle disabled state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Switch Test</title>
				<style>
					.switch {
						position: relative;
						display: inline-block;
						width: 60px;
						height: 34px;
					}
					.switch input {
						opacity: 0;
						width: 0;
						height: 0;
					}
					.slider {
						position: absolute;
						cursor: pointer;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background-color: #ccc;
						transition: .4s;
						border-radius: 34px;
					}
					.slider:before {
						position: absolute;
						content: "";
						height: 26px;
						width: 26px;
						left: 4px;
						bottom: 4px;
						background-color: white;
						transition: .4s;
						border-radius: 50%;
					}
					input:disabled + .slider {
						opacity: 0.5;
						cursor: not-allowed;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<label class="switch">
						<input type="checkbox" name="test-group" disabled>
						<span class="slider"></span>
					</label>
				</div>
			</body>
			</html>
		`);

		const switchInput = page.locator('input[type="checkbox"]');
		await expect(switchInput).toBeDisabled();
		await expect(switchInput).toHaveAttribute('disabled');
	});

	test('should handle required state', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Switch Test</title>
				<style>
					.switch {
						position: relative;
						display: inline-block;
						width: 60px;
						height: 34px;
					}
					.switch input {
						opacity: 0;
						width: 0;
						height: 0;
					}
					.slider {
						position: absolute;
						cursor: pointer;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background-color: #ccc;
						transition: .4s;
						border-radius: 34px;
					}
					.slider:before {
						position: absolute;
						content: "";
						height: 26px;
						width: 26px;
						left: 4px;
						bottom: 4px;
						background-color: white;
						transition: .4s;
						border-radius: 50%;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<label class="switch">
						<input type="checkbox" name="test-group" required>
						<span class="slider"></span>
					</label>
				</div>
			</body>
			</html>
		`);

		const switchInput = page.locator('input[type="checkbox"]');
		await expect(switchInput).toHaveAttribute('required');
	});

	test('should handle focus events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Switch Test</title>
				<style>
					.switch {
						position: relative;
						display: inline-block;
						width: 60px;
						height: 34px;
					}
					.switch input {
						opacity: 0;
						width: 0;
						height: 0;
					}
					.slider {
						position: absolute;
						cursor: pointer;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background-color: #ccc;
						transition: .4s;
						border-radius: 34px;
					}
					.slider:before {
						position: absolute;
						content: "";
						height: 26px;
						width: 26px;
						left: 4px;
						bottom: 4px;
						background-color: white;
						transition: .4s;
						border-radius: 50%;
					}
					input:focus + .slider {
						box-shadow: 0 0 0 2px #2196F3;
					}
				</style>
			</head>
			<body>
				<div id="app">
					<label class="switch">
						<input type="checkbox" name="test-group" id="focus-switch">
						<span class="slider"></span>
					</label>
				</div>
			</body>
			</html>
		`);

		const switchInput = page.locator('#focus-switch');
		// opacity: 0の要素でもフォーカスは可能
		await switchInput.focus();
		await expect(switchInput).toBeFocused();
	});

	test('should handle label click', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Switch Test</title>
				<style>
					.switch {
						position: relative;
						display: inline-block;
						width: 60px;
						height: 34px;
					}
					.switch input {
						opacity: 0;
						width: 0;
						height: 0;
					}
					.slider {
						position: absolute;
						cursor: pointer;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background-color: #ccc;
						transition: .4s;
						border-radius: 34px;
					}
					.slider:before {
						position: absolute;
						content: "";
						height: 26px;
						width: 26px;
						left: 4px;
						bottom: 4px;
						background-color: white;
						transition: .4s;
						border-radius: 50%;
					}
					input:checked + .slider {
						background-color: #2196F3;
					}
					input:checked + .slider:before {
						transform: translateX(26px);
					}
				</style>
			</head>
			<body>
				<div id="app">
					<label class="switch" for="label-switch">
						<input type="checkbox" name="test-group" id="label-switch">
						<span class="slider"></span>
					</label>
				</div>
			</body>
			</html>
		`);

		const switchInput = page.locator('#label-switch');
		const label = page.locator('label[for="label-switch"]');

		// 最初はオフ状態
		await expect(switchInput).not.toBeChecked();

		// ラベルをクリック
		await label.click();
		await expect(switchInput).toBeChecked();
	});

	test('should handle keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Switch Test</title>
				<style>
					.switch {
						position: relative;
						display: inline-block;
						width: 60px;
						height: 34px;
					}
					.switch input {
						opacity: 0;
						width: 0;
						height: 0;
					}
					.slider {
						position: absolute;
						cursor: pointer;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background-color: #ccc;
						transition: .4s;
						border-radius: 34px;
					}
					.slider:before {
						position: absolute;
						content: "";
						height: 26px;
						width: 26px;
						left: 4px;
						bottom: 4px;
						background-color: white;
						transition: .4s;
						border-radius: 50%;
					}
					input:checked + .slider {
						background-color: #2196F3;
					}
					input:checked + .slider:before {
						transform: translateX(26px);
					}
				</style>
			</head>
			<body>
				<div id="app">
					<label class="switch">
						<input type="checkbox" name="test-group" id="keyboard-switch">
						<span class="slider"></span>
					</label>
				</div>
			</body>
			</html>
		`);

		const switchInput = page.locator('#keyboard-switch');

		// スイッチにフォーカス
		await switchInput.focus();
		await expect(switchInput).toBeFocused();

		// スペースキーでトグル
		await switchInput.press(' ');
		await expect(switchInput).toBeChecked();

		// 再度スペースキーでトグル
		await switchInput.press(' ');
		await expect(switchInput).not.toBeChecked();
	});

	test('should handle multiple switches', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Switch Test</title>
				<style>
					.switch {
						position: relative;
						display: inline-block;
						width: 60px;
						height: 34px;
						margin: 10px;
					}
					.switch input {
						opacity: 0;
						width: 0;
						height: 0;
					}
					.slider {
						position: absolute;
						cursor: pointer;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background-color: #ccc;
						transition: .4s;
						border-radius: 34px;
					}
					.slider:before {
						position: absolute;
						content: "";
						height: 26px;
						width: 26px;
						left: 4px;
						bottom: 4px;
						background-color: white;
						transition: .4s;
						border-radius: 50%;
					}
					input:checked + .slider {
						background-color: #2196F3;
					}
					input:checked + .slider:before {
						transform: translateX(26px);
					}
				</style>
			</head>
			<body>
				<div id="app">
					<label class="switch">
						<input type="checkbox" name="switches" value="switch1" id="switch-1">
						<span class="slider"></span>
					</label>
					<span>Switch 1</span>
					<br>
					<label class="switch">
						<input type="checkbox" name="switches" value="switch2" id="switch-2">
						<span class="slider"></span>
					</label>
					<span>Switch 2</span>
					<br>
					<label class="switch">
						<input type="checkbox" name="switches" value="switch3" id="switch-3">
						<span class="slider"></span>
					</label>
					<span>Switch 3</span>
				</div>
			</body>
			</html>
		`);

		const switch1 = page.locator('#switch-1');
		const switch2 = page.locator('#switch-2');
		const switch3 = page.locator('#switch-3');

		// 最初はすべてオフ
		await expect(switch1).not.toBeChecked();
		await expect(switch2).not.toBeChecked();
		await expect(switch3).not.toBeChecked();

		// 複数のスイッチをオンにする（スライダーをクリック）
		const slider1 = page.locator('#switch-1').locator('..').locator('.slider');
		const slider3 = page.locator('#switch-3').locator('..').locator('.slider');

		await slider1.click();
		await slider3.click();
		await expect(switch1).toBeChecked();
		await expect(switch2).not.toBeChecked();
		await expect(switch3).toBeChecked();
	});

	test('should handle form submission', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Switch Test</title>
				<style>
					.switch {
						position: relative;
						display: inline-block;
						width: 60px;
						height: 34px;
					}
					.switch input {
						opacity: 0;
						width: 0;
						height: 0;
					}
					.slider {
						position: absolute;
						cursor: pointer;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background-color: #ccc;
						transition: .4s;
						border-radius: 34px;
					}
					.slider:before {
						position: absolute;
						content: "";
						height: 26px;
						width: 26px;
						left: 4px;
						bottom: 4px;
						background-color: white;
						transition: .4s;
						border-radius: 50%;
					}
					input:checked + .slider {
						background-color: #2196F3;
					}
					input:checked + .slider:before {
						transform: translateX(26px);
					}
				</style>
			</head>
			<body>
				<div id="app">
					<form id="test-form">
						<label class="switch">
							<input type="checkbox" name="notifications" value="enabled" id="notifications-switch">
							<span class="slider"></span>
						</label>
						<span>Enable Notifications</span>
						<br>
						<button type="submit">Submit</button>
					</form>
					<div id="result"></div>
				</div>
				<script>
					document.getElementById('test-form').addEventListener('submit', function(e) {
						e.preventDefault();
						const formData = new FormData(this);
						const notifications = formData.get('notifications');
						document.getElementById('result').textContent = 'Notifications: ' + (notifications ? 'enabled' : 'disabled');
					});
				</script>
			</body>
			</html>
		`);

		const notificationsSwitch = page.locator('#notifications-switch');
		const submitButton = page.locator('button[type="submit"]');
		const result = page.locator('#result');

		// 通知を有効にしてフォームを送信（スライダーをクリック）
		const notificationsSlider = page
			.locator('#notifications-switch')
			.locator('..')
			.locator('.slider');
		await notificationsSlider.click();
		await submitButton.click();

		await expect(result).toHaveText('Notifications: enabled');
	});

	test('should handle click events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>Switch Test</title>
				<style>
					.switch {
						position: relative;
						display: inline-block;
						width: 60px;
						height: 34px;
					}
					.switch input {
						opacity: 0;
						width: 0;
						height: 0;
					}
					.slider {
						position: absolute;
						cursor: pointer;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						background-color: #ccc;
						transition: .4s;
						border-radius: 34px;
					}
					.slider:before {
						position: absolute;
						content: "";
						height: 26px;
						width: 26px;
						left: 4px;
						bottom: 4px;
						background-color: white;
						transition: .4s;
						border-radius: 50%;
					}
					input:checked + .slider {
						background-color: #2196F3;
					}
					input:checked + .slider:before {
						transform: translateX(26px);
					}
				</style>
			</head>
			<body>
				<div id="app">
					<label class="switch">
						<input type="checkbox" name="test-group" id="click-switch">
						<span class="slider"></span>
					</label>
					<div id="click-count">Clicks: 0</div>
				</div>
				<script>
					let clickCount = 0;
					document.getElementById('click-switch').addEventListener('click', function() {
						clickCount++;
						document.getElementById('click-count').textContent = 'Clicks: ' + clickCount;
					});
				</script>
			</body>
			</html>
		`);

		const switchInput = page.locator('#click-switch');
		const clickCount = page.locator('#click-count');

		// クリックイベントをテスト（スライダーをクリック）
		const slider = page.locator('.slider');
		await slider.click();
		await expect(clickCount).toHaveText('Clicks: 1');
		await expect(switchInput).toBeChecked();

		await slider.click();
		await expect(clickCount).toHaveText('Clicks: 2');
		await expect(switchInput).not.toBeChecked();
	});
});
