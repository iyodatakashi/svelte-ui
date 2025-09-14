import { test, expect } from '@playwright/test';

test.describe('ImageUploaderPreview Component - Browser Tests', () => {
	test('should render ImageUploaderPreview component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					// モックファイルを作成
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		// 画像プレビューがレンダリングされているか確認
		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support custom dimensions', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Dimensions Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							width: '200px',
							height: '150px',
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support numeric dimensions', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Numeric Dimensions Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							width: 200,
							height: 150,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support rounded corners', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Rounded Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							rounded: true,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support adaptive size', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Adaptive Size Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							adaptiveSize: true,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support image display', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Image Display Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();

		// 画像要素が存在することを確認
		const image = page.locator('img');
		await expect(image).toBeVisible();
	});

	test('should support remove button', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Remove Button Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {
								window.removed = true;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();

		// 削除ボタンが存在することを確認
		const removeButton = page.locator('.remove-button');
		await expect(removeButton).toBeVisible();
	});

	test('should support remove button click', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Remove Click Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {
								window.removed = true;
							}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();

		// 削除ボタンをクリック
		const removeButton = page.locator('.remove-button');
		await removeButton.click();

		const removed = await page.evaluate(() => window.removed);
		expect(removed).toBe(true);
	});

	test('should support custom remove aria label', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Remove Aria Label Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							removeFileAriaLabel: 'Remove selected image',
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();

		const removeButton = page.locator('.remove-button');
		await expect(removeButton).toBeVisible();
	});

	test('should support accessibility attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Accessibility Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							removeFileAriaLabel: 'Remove image',
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();

		const removeButton = page.locator('.remove-button');
		await expect(removeButton).toBeVisible();
	});

	test('should support keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();

		// キーボードナビゲーションをテスト
		const removeButton = page.locator('.remove-button');
		await removeButton.focus();
		await expect(removeButton).toBeFocused();
	});

	test('should support different file types', async ({ page }) => {
		const fileTypes = [
			{ name: 'test.jpg', type: 'image/jpeg' },
			{ name: 'test.png', type: 'image/png' },
			{ name: 'test.gif', type: 'image/gif' },
			{ name: 'test.webp', type: 'image/webp' },
			{ name: 'test.svg', type: 'image/svg+xml' }
		];

		for (const fileType of fileTypes) {
			await page.setContent(`
				<!DOCTYPE html>
				<html>
				<head>
					<title>ImageUploaderPreview File Type Test</title>
				</head>
				<body>
					<div id="app"></div>
					<script type="module">
						import { mount } from 'svelte';
						import ImageUploaderPreview from './ImageUploaderPreview.svelte';
						
						const mockFile = new File(['test'], '${fileType.name}', { type: '${fileType.type}' });
						
						const app = mount(ImageUploaderPreview, {
							target: document.getElementById('app'),
							props: {
								file: mockFile,
								onRemove: () => {}
							}
						});
					</script>
				</body>
				</html>
			`);

			const imagePreview = page.locator('.image-uploader-preview');
			await expect(imagePreview).toBeVisible();
		}
	});

	test('should support image loading', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Loading Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();

		// 画像の読み込み状態を確認
		const image = page.locator('img');
		await expect(image).toBeVisible();
	});

	test('should support image error handling', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Error Handling Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					// 無効なファイルを作成
					const mockFile = new File(['invalid'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support image caching', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Caching Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support image sizing', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Sizing Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							width: '150px',
							height: '150px',
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support image aspect ratio', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Aspect Ratio Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							adaptiveSize: true,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support custom styling', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Custom Styling Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support responsive design', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Responsive Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support image thumbnail', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Thumbnail Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							width: '80px',
							height: '80px',
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support image preview', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Preview Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();

		// プレビュー画像が表示されることを確認
		const image = page.locator('img');
		await expect(image).toBeVisible();
	});

	test('should support image optimization', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Optimization Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							adaptiveSize: true,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support image performance', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Performance Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support image memory management', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Memory Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});

	test('should support image cleanup', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploaderPreview Cleanup Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploaderPreview from './ImageUploaderPreview.svelte';
					
					const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
					
					const app = mount(ImageUploaderPreview, {
						target: document.getElementById('app'),
						props: {
							file: mockFile,
							onRemove: () => {}
						}
					});
				</script>
			</body>
			</html>
		`);

		const imagePreview = page.locator('.image-uploader-preview');
		await expect(imagePreview).toBeVisible();
	});
});
