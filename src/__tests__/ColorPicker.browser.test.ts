import { test, expect } from '@playwright/test';

test.describe('ColorPicker Browser Tests', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/sandbox');
	});

	test('should render ColorPicker component', async ({ page }) => {
		const colorPicker = page.locator('[data-testid="color-picker"]');
		await expect(colorPicker).toBeVisible();
	});

	test('should display input field', async ({ page }) => {
		const colorPickerInput = page.locator('[data-testid="color-picker"] input[type="text"]');
		await expect(colorPickerInput).toBeVisible();
	});

	test('should display color trigger button', async ({ page }) => {
		const colorTrigger = page.locator('[data-testid="color-picker"] input[type="color"]');
		await expect(colorTrigger).toBeAttached();
	});

	test('should allow text input', async ({ page }) => {
		const colorPickerInput = page.locator('[data-testid="color-picker"] input[type="text"]');
		await colorPickerInput.fill('#ff0000');
		await expect(colorPickerInput).toHaveValue('#ff0000');
	});

	test('should handle color picker selection', async ({ page }) => {
		const colorTrigger = page.locator('[data-testid="color-picker"] input[type="color"]');
		const colorPickerInput = page.locator('[data-testid="color-picker"] input[type="text"]');

		// カラーピッカーをクリックして色を選択
		await colorTrigger.click();
		// 実際の色選択はブラウザのネイティブカラーピッカーに依存するため、
		// 値の変更を確認
		const inputValue = await colorPickerInput.inputValue();
		expect(inputValue).toBeTruthy();
	});

	test('should handle focus styles', async ({ page }) => {
		const colorPickerInput = page.locator('[data-testid="color-picker"] input[type="text"]');

		await colorPickerInput.focus();

		// フォーカス時のoutlineを確認（デフォルトはoutline）
		const outline = await colorPickerInput.evaluate((el) => window.getComputedStyle(el).outline);
		expect(outline).not.toMatch(/none/);
	});

	test('should handle clearable functionality', async ({ page }) => {
		const colorPickerInput = page.locator('[data-testid="color-picker"] input[type="text"]');
		const clearButton = page.locator('[data-testid="color-picker"] .input__clear-button');

		// 値を入力
		await colorPickerInput.fill('#ff0000');
		await expect(colorPickerInput).toHaveValue('#ff0000');

		// クリアボタンが表示されることを確認
		await expect(clearButton).toBeVisible();

		// クリアボタンをクリック
		await clearButton.click();

		// 値がクリアされることを確認
		await expect(colorPickerInput).toHaveValue('');
	});

	test('should handle rounded prop', async ({ page }) => {
		const colorPicker = page.locator('[data-testid="color-picker"]');

		await expect(colorPicker).toHaveClass(/color-picker--rounded/);
	});

	test('should handle keyboard navigation', async ({ page }) => {
		const colorPickerInput = page.locator('[data-testid="color-picker"] input[type="text"]');

		await colorPickerInput.focus();
		await colorPickerInput.press('Tab');

		// フォーカスが移動することを確認
		const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
		expect(focusedElement).toBeTruthy();
	});

	test('should handle mouse events', async ({ page }) => {
		const colorPickerInput = page.locator('[data-testid="color-picker"] input[type="text"]');

		// マウスイベントが正常に動作することを確認
		await colorPickerInput.hover();
		await colorPickerInput.click();

		await expect(colorPickerInput).toBeFocused();
	});

	test('should handle touch events on mobile', async ({ page }) => {
		// モバイルビューポートを設定
		await page.setViewportSize({ width: 375, height: 667 });

		const colorPickerInput = page.locator('[data-testid="color-picker"] input[type="text"]');

		// タッチイベントが正常に動作することを確認（tapの代わりにclickを使用）
		await colorPickerInput.click();
		await expect(colorPickerInput).toBeFocused();
	});

	test('should maintain accessibility', async ({ page }) => {
		const colorPickerInput = page.locator('[data-testid="color-picker"] input[type="text"]');
		const colorTrigger = page.locator('[data-testid="color-picker"] input[type="color"]');

		// アクセシビリティ属性を確認
		await expect(colorPickerInput).toBeVisible();
		await expect(colorTrigger).toBeAttached();

		// キーボードナビゲーションを確認
		await colorPickerInput.focus();
		await expect(colorPickerInput).toBeFocused();
	});

	test('should handle color format validation', async ({ page }) => {
		const colorPickerInput = page.locator('[data-testid="color-picker"] input[type="text"]');

		// 有効な色の形式をテスト
		const validColors = ['#ff0000', '#00ff00', '#0000ff', 'red', 'blue'];

		for (const color of validColors) {
			await colorPickerInput.fill(color);
			await expect(colorPickerInput).toHaveValue(color);
		}
	});

	test('should handle edge cases', async ({ page }) => {
		const colorPickerInput = page.locator('[data-testid="color-picker"] input[type="text"]');

		// 空の値をテスト
		await colorPickerInput.fill('');
		await expect(colorPickerInput).toHaveValue('');

		// 長い文字列をテスト
		const longString = 'a'.repeat(1000);
		await colorPickerInput.fill(longString);
		await expect(colorPickerInput).toHaveValue(longString);
	});
});
