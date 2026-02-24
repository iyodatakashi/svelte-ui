import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import FileUploader from '../lib/components/FileUploader.svelte';
import ComponentWrapper from './helpers/ComponentWrapper.svelte';

test('FileUploader - レンダリング', async () => {
	const { container } = await render(ComponentWrapper, {
		component: FileUploader,
		id: 'file-uploader-test'
	});

	const uploader = container.querySelector('[data-testid="file-uploader"]');
	expect(uploader).toBeInTheDocument();
});

test('FileUploader - カスタムサイズ', async () => {
	const { container } = await render(ComponentWrapper, {
		component: FileUploader,
		id: 'file-uploader-size-test',
		width: '300px',
		height: 200
	});

	const uploader = container.querySelector('[data-testid="file-uploader"]') as HTMLElement;
	// CSS変数はgetComputedStyleで確認
	const computedStyle = getComputedStyle(uploader);
	expect(computedStyle.getPropertyValue('--svelte-ui-file-uploader-width').trim()).toBe('300px');
	expect(computedStyle.getPropertyValue('--svelte-ui-file-uploader-height').trim()).toBe('200px');
});

test('FileUploader - 角丸', async () => {
	const { container } = await render(ComponentWrapper, {
		component: FileUploader,
		id: 'file-uploader-rounded-test',
		rounded: true
	});

	const uploader = container.querySelector('[data-testid="file-uploader"]');
	expect(uploader).toHaveClass('rounded');
});

test('FileUploader - 複数ファイル対応', async () => {
	const { container } = await render(ComponentWrapper, {
		component: FileUploader,
		id: 'file-uploader-multiple-test',
		multiple: true
	});

	const input = container.querySelector('input[type="file"]');
	expect(input).toHaveAttribute('multiple');
});

test('FileUploader - ファイル形式制限', async () => {
	const { container } = await render(ComponentWrapper, {
		component: FileUploader,
		id: 'file-uploader-accept-test',
		accept: '.pdf,.doc,.docx'
	});

	const input = container.querySelector('input[type="file"]');
	expect(input).toHaveAttribute('accept', '.pdf,.doc,.docx');
});

test('FileUploader - カスタムアイコン', async () => {
	const { container } = await render(ComponentWrapper, {
		component: FileUploader,
		id: 'file-uploader-icon-test',
		icon: 'cloud_upload',
		iconSize: 48
	});

	const icon = container.querySelector('.material-symbols-outlined');
	expect(icon).toBeInTheDocument();
});

test('FileUploader - プレースホルダー', async () => {
	const { container } = await render(ComponentWrapper, {
		component: FileUploader,
		id: 'file-uploader-placeholder-test',
		placeholder: 'カスタムプレースホルダー'
	});

	const description = container.querySelector('.file-uploader__description');
	expect(description).toBeInTheDocument();
});

test('FileUploader - フォーカス', async () => {
	const { container } = await render(ComponentWrapper, {
		component: FileUploader,
		id: 'file-uploader-focus-test'
	});

	const button = container.querySelector('[data-testid="file-uploader"]') as HTMLButtonElement;
	expect(button).toBeInTheDocument();

	button.focus();
	expect(document.activeElement).toBe(button);
});

test('FileUploader - ファイルサイズ制限', async () => {
	const { container } = await render(ComponentWrapper, {
		component: FileUploader,
		id: 'file-uploader-size-limit-test',
		maxFileSize: 1024 * 1024 // 1MB
	});

	const uploader = container.querySelector('[data-testid="file-uploader"]');
	expect(uploader).toBeInTheDocument();
});

test('FileUploader - ドラッグ&ドロップ', async () => {
	const { container } = await render(ComponentWrapper, {
		component: FileUploader,
		id: 'file-uploader-drag-test'
	});

	const uploader = container.querySelector('[data-testid="file-uploader"]');
	expect(uploader).toBeInTheDocument();

	// ドラッグ&ドロップ機能の存在確認
	expect(uploader).toHaveAttribute('aria-label');
});

test('FileUploader - エラーメッセージ', async () => {
	const { container } = await render(ComponentWrapper, {
		component: FileUploader,
		id: 'file-uploader-error-test'
	});

	const uploader = container.querySelector('[data-testid="file-uploader"]');
	expect(uploader).toBeInTheDocument();

	// エラーメッセージは初期状態では表示されない
	const errorMessage = container.querySelector('.file-uploader__error-message');
	expect(errorMessage).not.toBeInTheDocument();
});

test('FileUploader - CSS変数', async () => {
	const { container } = await render(ComponentWrapper, {
		component: FileUploader,
		id: 'file-uploader-css-test'
	});

	const uploader = container.querySelector('[data-testid="file-uploader"]');
	expect(uploader).toBeInTheDocument();

	// CSS変数の存在確認
	const computedStyle = getComputedStyle(uploader!);
	expect(computedStyle.getPropertyValue('--svelte-ui-file-uploader-width')).toBeTruthy();
});

// =========================================================================
// リアクティブ性テスト
// =========================================================================

test('FileUploader width property changes reactively', async () => {
	const screen = render(ComponentWrapper, {
		component: FileUploader,
		width: 200
	});

	const uploader = screen.getByTestId('file-uploader');
	await expect
		.element(uploader)
		.toHaveAttribute('style', expect.stringContaining('--svelte-ui-file-uploader-width: 200px'));

	// プロパティを更新
	screen.rerender({
		component: FileUploader,
		width: 300
	});

	await expect
		.element(uploader)
		.toHaveAttribute('style', expect.stringContaining('--svelte-ui-file-uploader-width: 300px'));
});
