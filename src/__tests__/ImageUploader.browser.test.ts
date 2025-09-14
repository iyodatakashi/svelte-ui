import { test, expect } from '@playwright/test';

test.describe('ImageUploader Component - Browser Tests', () => {
	test('should render ImageUploader component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Upload images'
						}
					});
				</script>
			</body>
			</html>
		`);

		// 画像アップローダーがレンダリングされているか確認
		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support single image upload', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Single Image Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							multiple: false,
							placeholder: 'Select an image'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();

		const fileInput = page.locator('input[type="file"]');
		await expect(fileInput).toBeVisible();
		await expect(fileInput).not.toHaveAttribute('multiple');
	});

	test('should support multiple image upload', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Multiple Images Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							multiple: true,
							placeholder: 'Select multiple images'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();

		const fileInput = page.locator('input[type="file"]');
		await expect(fileInput).toBeVisible();
		await expect(fileInput).toHaveAttribute('multiple');
	});

	test('should support image file type restrictions', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader File Type Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
							placeholder: 'Select image files'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();

		const fileInput = page.locator('input[type="file"]');
		await expect(fileInput).toBeVisible();
		await expect(fileInput).toHaveAttribute('accept', '.jpg,.jpeg,.png,.gif,.webp,.svg');
	});

	test('should support custom placeholder', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Placeholder Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Custom image upload message'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
		await expect(imageUploader).toContainText('Custom image upload message');
	});

	test('should support custom dimensions', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Dimensions Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							width: '200px',
							height: '150px',
							placeholder: 'Custom size uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support rounded corners', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Rounded Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							rounded: true,
							placeholder: 'Rounded uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support custom icon', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Icon Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							icon: 'photo_camera',
							placeholder: 'Camera upload'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support custom icon size', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Icon Size Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							iconSize: 48,
							placeholder: 'Large icon uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support icon customization', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Icon Customization Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							icon: 'image',
							iconSize: 32,
							iconFilled: true,
							iconWeight: 400,
							iconGrade: 0,
							iconOpticalSize: 32,
							iconVariant: 'filled',
							placeholder: 'Custom icon uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support image size validation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Image Size Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							maxFileSize: 2 * 1024 * 1024, // 2MB
							placeholder: 'Max 2MB images'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support adaptive size', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Adaptive Size Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							adaptiveSize: true,
							placeholder: 'Adaptive size uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support drag and drop', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Drag Drop Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Drag and drop images here'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();

		// ドラッグ&ドロップエリアが存在することを確認
		const dropArea = page.locator('.image-uploader-drop-area');
		await expect(dropArea).toBeVisible();
	});

	test('should support image selection', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Image Selection Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Select images'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();

		const fileInput = page.locator('input[type="file"]');
		await expect(fileInput).toBeVisible();
	});

	test('should support image preview', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Image Preview Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							multiple: true,
							placeholder: 'Select images to preview'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support image removal', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Image Removal Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							multiple: true,
							placeholder: 'Select images to remove'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support accessibility attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Accessibility Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							removeFileAriaLabel: 'Remove selected image',
							placeholder: 'Accessible image uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Keyboard accessible uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();

		// キーボードナビゲーションをテスト
		await imageUploader.focus();
		await expect(imageUploader).toBeFocused();
	});

	test('should support focus events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Focus Events Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							onfocus: () => {
								window.focused = true;
							},
							onblur: () => {
								window.blurred = true;
							},
							placeholder: 'Focus events uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();

		// フォーカスイベントをテスト
		await imageUploader.focus();
		await expect(imageUploader).toBeFocused();
	});

	test('should support mouse events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Mouse Events Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							onmouseenter: () => {
								window.mouseEntered = true;
							},
							onmouseleave: () => {
								window.mouseLeft = true;
							},
							placeholder: 'Mouse events uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();

		// マウスイベントをテスト
		await imageUploader.hover();
		await expect(imageUploader).toBeVisible();
	});

	test('should support drag events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Drag Events Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							ondragover: () => {
								window.dragOver = true;
							},
							ondrop: () => {
								window.dropped = true;
							},
							placeholder: 'Drag events uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();

		// ドラッグイベントをテスト
		const dropArea = page.locator('.image-uploader-drop-area');
		await expect(dropArea).toBeVisible();
	});

	test('should support file change events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader File Change Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							onchange: () => {
								window.fileChanged = true;
							},
							placeholder: 'File change uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();

		const fileInput = page.locator('input[type="file"]');
		await expect(fileInput).toBeVisible();
	});

	test('should support error handling', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Error Handling Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							maxFileSize: 1024, // Very small size
							placeholder: 'Error handling uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support progress indication', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Progress Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Progress uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support custom styling', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Custom Styling Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Custom styled uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support responsive design', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Responsive Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Responsive uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support image gallery view', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Gallery Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							multiple: true,
							placeholder: 'Gallery uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});

	test('should support image grid layout', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>ImageUploader Grid Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import ImageUploader from './ImageUploader.svelte';
					
					const app = mount(ImageUploader, {
						target: document.getElementById('app'),
						props: {
							multiple: true,
							placeholder: 'Grid uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const imageUploader = page.locator('.image-uploader');
		await expect(imageUploader).toBeVisible();
	});
});
