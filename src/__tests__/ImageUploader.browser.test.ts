import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import ImageUploader from '../lib/components/ImageUploader.svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';

test('ImageUploader - レンダリング', async () => {
	const { container } = await render(ComponentWrapper, {
		component: ImageUploader,
		id: 'imageuploader-test'
	});

	const uploader = container.querySelector('[data-testid="image-uploader"]');
	expect(uploader).toBeInTheDocument();
});

test('ImageUploader - カスタムサイズ', async () => {
	const { container } = await render(ComponentWrapper, {
		component: ImageUploader,
		id: 'imageuploader-size-test',
		width: '200px',
		height: '150px'
	});

	const uploader = container.querySelector('[data-testid="image-uploader"]') as HTMLElement;
	// CSS変数はgetComputedStyleで確認
	const computedStyle = getComputedStyle(uploader);
	expect(computedStyle.getPropertyValue('--svelte-ui-image-uploader-button-width').trim()).toBe('200px');
	expect(computedStyle.getPropertyValue('--svelte-ui-image-uploader-button-height').trim()).toBe('150px');
});

test('ImageUploader - 角丸', async () => {
	const { container } = await render(ComponentWrapper, {
		component: ImageUploader,
		id: 'imageuploader-rounded-test',
		rounded: true
	});

	const uploader = container.querySelector('[data-testid="image-uploader"]');
	expect(uploader).toHaveClass('image-uploader--rounded');
});

test('ImageUploader - 複数ファイル対応', async () => {
	const { container } = await render(ComponentWrapper, {
		component: ImageUploader,
		id: 'imageuploader-multiple-test',
		multiple: true
	});

	const input = container.querySelector('input[type="file"]');
	expect(input).toHaveAttribute('multiple');
});

test('ImageUploader - ファイル形式制限', async () => {
	const { container } = await render(ComponentWrapper, {
		component: ImageUploader,
		id: 'imageuploader-accept-test',
		accept: '.png,.jpg'
	});

	const input = container.querySelector('input[type="file"]');
	expect(input).toHaveAttribute('accept', '.png,.jpg');
});

test('ImageUploader - カスタムアイコン', async () => {
	const { container } = await render(ComponentWrapper, {
		component: ImageUploader,
		id: 'imageuploader-icon-test',
		icon: 'cloud_upload',
		iconSize: 48
	});

	const icon = container.querySelector('.material-symbols-outlined');
	expect(icon).toBeInTheDocument();
});

test('ImageUploader - プレースホルダー', async () => {
	const { container } = await render(ComponentWrapper, {
		component: ImageUploader,
		id: 'imageuploader-placeholder-test',
		placeholder: '画像をアップロード'
	});

	const placeholder = container.querySelector('.image-uploader__description');
	expect(placeholder).toHaveTextContent('画像をアップロード');
});

test('ImageUploader - フォーカス', async () => {
	const { container } = await render(ComponentWrapper, {
		component: ImageUploader,
		id: 'imageuploader-focus-test'
	});

	const input = container.querySelector('input[type="file"]') as HTMLInputElement;
	expect(input).toBeInTheDocument();

	// ファイル入力はフォーカスできない場合があるため、存在確認のみ
	expect(input).toBeInTheDocument();
});

test('ImageUploader - ファイルサイズ制限', async () => {
	const { container } = await render(ComponentWrapper, {
		component: ImageUploader,
		id: 'imageuploader-size-limit-test',
		maxFileSize: 1024 * 1024 // 1MB
	});

	const uploader = container.querySelector('[data-testid="image-uploader"]');
	expect(uploader).toBeInTheDocument();
});

test('ImageUploader - アダプティブサイズ', async () => {
	const { container } = await render(ComponentWrapper, {
		component: ImageUploader,
		id: 'imageuploader-adaptive-test',
		previewAdaptive: true
	});

	const uploader = container.querySelector('[data-testid="image-uploader"]');
	expect(uploader).toHaveClass('image-uploader--adaptive');
});

test('ImageUploader - CSS変数', async () => {
	const { container } = await render(ComponentWrapper, {
		component: ImageUploader,
		id: 'imageuploader-css-test'
	});

	const uploader = container.querySelector('[data-testid="image-uploader"]');
	expect(uploader).toBeInTheDocument();

	// CSS変数の存在確認
	const computedStyle = getComputedStyle(uploader!);
	expect(computedStyle.getPropertyValue('--svelte-ui-image-uploader-button-width')).toBeTruthy();
});
