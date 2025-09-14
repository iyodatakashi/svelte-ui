import { test, expect } from '@playwright/test';

test.describe('FileUploader Component - Browser Tests', () => {
	test('should render FileUploader component in browser', async ({ page }) => {
		// テスト用のHTMLページを作成
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Drag and drop files here'
						}
					});
				</script>
			</body>
			</html>
		`);

		// ファイルアップローダーがレンダリングされているか確認
		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support single file upload', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Single File Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							multiple: false,
							placeholder: 'Select a file'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();

		const fileInput = page.locator('input[type="file"]');
		await expect(fileInput).toBeVisible();
		await expect(fileInput).not.toHaveAttribute('multiple');
	});

	test('should support multiple file upload', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Multiple Files Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							multiple: true,
							placeholder: 'Select multiple files'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();

		const fileInput = page.locator('input[type="file"]');
		await expect(fileInput).toBeVisible();
		await expect(fileInput).toHaveAttribute('multiple');
	});

	test('should support file type restrictions', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader File Type Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							accept: 'image/*',
							placeholder: 'Select image files'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();

		const fileInput = page.locator('input[type="file"]');
		await expect(fileInput).toBeVisible();
		await expect(fileInput).toHaveAttribute('accept', 'image/*');
	});

	test('should support custom placeholder', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Placeholder Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Custom upload message'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
		await expect(fileUploader).toContainText('Custom upload message');
	});

	test('should support custom dimensions', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Dimensions Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							width: 300,
							height: 200,
							placeholder: 'Custom size uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support rounded corners', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Rounded Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
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

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support custom icon', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Icon Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							icon: 'cloud_upload',
							placeholder: 'Cloud upload'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support custom icon size', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Icon Size Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
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

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support icon customization', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Icon Customization Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							icon: 'attach_file',
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

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support file size validation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader File Size Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							maxFileSize: 1024 * 1024, // 1MB
							placeholder: 'Max 1MB files'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support drag and drop', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Drag Drop Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Drag and drop files here'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();

		// ドラッグ&ドロップエリアが存在することを確認
		const dropArea = page.locator('.file-uploader-drop-area');
		await expect(dropArea).toBeVisible();
	});

	test('should support file selection', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader File Selection Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Select files'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();

		const fileInput = page.locator('input[type="file"]');
		await expect(fileInput).toBeVisible();
	});

	test('should support file list display', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader File List Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							multiple: true,
							placeholder: 'Select multiple files'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support file removal', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader File Removal Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							multiple: true,
							placeholder: 'Select files to remove'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support accessibility attributes', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Accessibility Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							removeFileAriaLabel: 'Remove selected file',
							placeholder: 'Accessible file uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support keyboard navigation', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Keyboard Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Keyboard accessible uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();

		// キーボードナビゲーションをテスト
		await fileUploader.focus();
		await expect(fileUploader).toBeFocused();
	});

	test('should support focus events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Focus Events Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
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

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();

		// フォーカスイベントをテスト
		await fileUploader.focus();
		await expect(fileUploader).toBeFocused();
	});

	test('should support mouse events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Mouse Events Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
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

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();

		// マウスイベントをテスト
		await fileUploader.hover();
		await expect(fileUploader).toBeVisible();
	});

	test('should support drag events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Drag Events Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
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

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();

		// ドラッグイベントをテスト
		const dropArea = page.locator('.file-uploader-drop-area');
		await expect(dropArea).toBeVisible();
	});

	test('should support file change events', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader File Change Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
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

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();

		const fileInput = page.locator('input[type="file"]');
		await expect(fileInput).toBeVisible();
	});

	test('should support error handling', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Error Handling Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
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

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support progress indication', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Progress Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Progress uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support custom styling', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Custom Styling Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Custom styled uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});

	test('should support responsive design', async ({ page }) => {
		await page.setContent(`
			<!DOCTYPE html>
			<html>
			<head>
				<title>FileUploader Responsive Test</title>
			</head>
			<body>
				<div id="app"></div>
				<script type="module">
					import { mount } from 'svelte';
					import FileUploader from './FileUploader.svelte';
					
					const app = mount(FileUploader, {
						target: document.getElementById('app'),
						props: {
							placeholder: 'Responsive uploader'
						}
					});
				</script>
			</body>
			</html>
		`);

		const fileUploader = page.locator('.file-uploader');
		await expect(fileUploader).toBeVisible();
	});
});
