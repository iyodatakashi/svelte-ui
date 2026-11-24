<!-- ImageUploader.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import { t } from '#lib/models/i18n/i18n';
	import { announceToScreenReader } from '#lib/utils/accessibility';
	import { getStyleFromNumber } from '#lib/utils/style';
	import ImageUploaderPreview from './ImageUploaderPreview.svelte';
	import type { ImageUploaderProps } from '#lib/models/uploader/uploader.types';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================

	let {
		// 基本プロパティ
		value = $bindable(),
		multiple = false,
		maxFileSize = 5 * 1024 * 1024,
		placeholder = '',

		// HTML属性系
		id = `image-uploader-${Math.random().toString(36).substring(2, 15)}`,
		accept = '.jpg,.jpeg,.png,.gif,.webp,.svg',

		// スタイル/レイアウト
		width = '120px',
		height = '120px',
		rounded = false,
		previewStyle = 'framed',

		// アイコン系
		icon = 'add_photo_alternate',
		iconSize = 32,
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = iconSize,
		iconVariant = 'outlined',
		removeFileAriaLabel = t('imageUploader.removeFile'),

		// 状態/動作
		previewAdaptive = false,

		// 入力イベント
		onchange = () => {}, // No params for type inference

		// フォーカスイベント
		onfocus = () => {}, // No params for type inference
		onblur = () => {}, // No params for type inference

		// キーボードイベント
		onkeydown = () => {}, // No params for type inference
		onkeyup = () => {}, // No params for type inference

		// マウスイベント
		onmouseenter = () => {}, // No params for type inference
		onmouseleave = () => {}, // No params for type inference

		// タッチイベント
		ontouchstart = () => {}, // No params for type inference
		ontouchend = () => {}, // No params for type inference

		// ポインターイベント
		onpointerenter = () => {}, // No params for type inference
		onpointerleave = () => {} // No params for type inference
	}: ImageUploaderProps = $props();

	let dropAreaRef: HTMLButtonElement;
	let fileInputRef: HTMLInputElement;
	let isHover: boolean = $state(false);
	let errorMessage: string = $state('');

	// =========================================================================
	// Effects
	// =========================================================================
	$effect(() => {
		if (value && value.length > 0) {
			const fileCount = value.length;
			const fileNames = Array.from(value)
				.map((file) => file.name)
				.join(', ');
			announceToScreenReader(
				`${fileCount} image${fileCount > 1 ? 's' : ''} selected: ${fileNames}`
			);
		}
	});

	// =========================================================================
	// Methods
	// =========================================================================
	const handleClick = () => {
		fileInputRef?.click();
	};

	const handleFocus = (event: FocusEvent) => {
		onfocus?.(event);
	};

	const handleBlur = (event: FocusEvent) => {
		onblur?.(event);
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		onkeydown?.(event);
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick();
		}
	};

	const handleKeyUp = (event: KeyboardEvent) => {
		onkeyup?.(event);
	};

	const handleMouseEnter = (event: MouseEvent) => {
		onmouseenter?.(event);
	};

	const handleMouseLeave = (event: MouseEvent) => {
		onmouseleave?.(event);
	};

	const handleTouchStart = (event: TouchEvent) => {
		ontouchstart?.(event);
	};

	const handleTouchEnd = (event: TouchEvent) => {
		ontouchend?.(event);
	};

	const handlePointerEnter = (event: PointerEvent) => {
		onpointerenter?.(event);
	};

	const handlePointerLeave = (event: PointerEvent) => {
		onpointerleave?.(event);
	};

	const validateFile = (file: File): boolean => {
		// サポートされる画像タイプ
		const supportedTypes = [
			'image/jpeg',
			'image/jpg',
			'image/png',
			'image/gif',
			'image/webp',
			'image/svg+xml'
		];

		if (!supportedTypes.includes(file.type)) {
			errorMessage = t('imageUploader.unsupportedFileFormat');
			return false;
		}

		if (file.size > maxFileSize) {
			errorMessage = t('imageUploader.fileSizeExceeded', {
				maxSize: (maxFileSize / 1024 / 1024).toFixed(1)
			});
			return false;
		}

		errorMessage = '';
		return true;
	};

	const handleFileChange = (fileList: FileList | null) => {
		if (!fileList) return;

		const validFiles: File[] = [];
		for (let i = 0; i < fileList.length; i++) {
			const file = fileList[i];
			if (validateFile(file)) {
				validFiles.push(file);
			}
			// 無効なファイルは単純にスキップ
		}

		// 有効なファイルがある場合のみ更新
		if (validFiles.length > 0) {
			const dataTransfer = new DataTransfer();

			// multipleの場合は既存のファイルを保持して追加
			if (multiple && value) {
				for (let i = 0; i < value.length; i++) {
					dataTransfer.items.add(value[i]);
				}
			}

			// 新しく選択されたファイルのみを追加
			validFiles.forEach((file) => dataTransfer.items.add(file));
			value = dataTransfer.files;
			onchange(value);
		}

		// input要素をリセット
		if (fileInputRef) {
			fileInputRef.value = '';
		}
	};

	const removeFile = (index: number) => {
		if (!value) return;

		const dt = new DataTransfer();
		for (let i = 0; i < value.length; i++) {
			if (i !== index) {
				dt.items.add(value[i]);
			}
		}
		if (dt.files.length > 0) {
			value = dt.files;
		} else {
			// 空の場合は空のFileListを作成
			const emptyDt = new DataTransfer();
			value = emptyDt.files;
		}
	};

	export const reset = () => {
		if (fileInputRef) {
			fileInputRef.value = '';
			value = null;
			errorMessage = '';
		}
	};

	// =========================================================================
	// $derived
	// =========================================================================
	const previewWidthStyle = $derived(getStyleFromNumber(width));
	const previewHeightStyle = $derived(getStyleFromNumber(height));
</script>

{#snippet preview(file: File, index: number)}
	<ImageUploaderPreview
		{file}
		{width}
		{height}
		{previewAdaptive}
		{rounded}
		{previewStyle}
		id={id ? `${id}-preview-${index}` : undefined}
		{removeFileAriaLabel}
		onRemove={() => removeFile(index)}
	/>
{/snippet}

<div
	class="image-uploader"
	class:image-uploader--multiple={multiple}
	class:image-uploader--rounded={rounded}
	class:image-uploader--adaptive={previewAdaptive}
	style:--internal-image-uploader-button-width={previewWidthStyle}
	style:--internal-image-uploader-button-height={previewHeightStyle}
	data-testid="image-uploader"
>
	{#if multiple}
		{#if value}
			{#each value as file, index (file)}
				{@render preview(file, index)}
			{/each}
		{/if}
	{/if}
	<button
		bind:this={dropAreaRef}
		class="image-uploader__button"
		class:image-uploader__button--hover={isHover}
		class:image-uploader__button--has-images={!multiple && value && value.length > 0}
		class:image-uploader__button--rounded={rounded}
		onclick={handleClick}
		onfocus={handleFocus}
		onblur={handleBlur}
		onkeydown={handleKeyDown}
		onkeyup={handleKeyUp}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		ontouchstart={handleTouchStart}
		ontouchend={handleTouchEnd}
		onpointerenter={handlePointerEnter}
		onpointerleave={handlePointerLeave}
		ondragover={(event) => {
			event.stopPropagation();
			event.preventDefault();
			isHover = true;
		}}
		ondragleave={(event) => {
			event.stopPropagation();
			event.preventDefault();
			isHover = false;
		}}
		ondrop={(event) => {
			event.stopPropagation();
			event.preventDefault();
			isHover = false;
			const fileList = event.dataTransfer?.files;
			if (fileList) {
				handleFileChange(fileList);
			}
		}}
		aria-label={t('imageUploader.uploadImage')}
	>
		{#if !multiple && value && value.length > 0}
			{@render preview(value[0], 0)}
		{:else}
			<div class="image-uploader__description">
				<Icon
					size={iconSize}
					filled={iconFilled}
					weight={iconWeight}
					grade={iconGrade}
					opticalSize={iconOpticalSize}
					variant={iconVariant}>{icon}</Icon
				>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- placeholder は改行などに HTML を書ける仕様。利用者のコードが渡す文字列で、入力値ではない -->
				{@html placeholder}
			</div>
		{/if}
	</button>

	{#if errorMessage}
		<div class="image-uploader__error-message" role="alert" aria-live="polite">
			{errorMessage}
		</div>
	{/if}

	<input
		bind:this={fileInputRef}
		{accept}
		{multiple}
		class="image-uploader__input"
		{id}
		type="file"
		onchange={(event) => {
			const target = event.target as HTMLInputElement;
			if (target.files && target.files.length > 0) {
				handleFileChange(target.files);
			}
		}}
	/>
</div>

<style lang="scss">
	@use '#lib/assets/styles/component-base' as base;

	@include base.box-sizing;
	@include base.button-reset;

	.image-uploader {
		position: relative;
		width: 100%;
	}

	.image-uploader--multiple {
		display: flex;
		flex-wrap: wrap;
		gap: var(--svelte-ui-image-uploader-preview-gap);
	}

	.image-uploader__button {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		max-width: 100%;
		min-width: var(--internal-image-uploader-button-width);
		min-height: var(--internal-image-uploader-button-height);
		padding: 16px;
		background-color: var(--svelte-ui-form-bg);
		border-radius: var(--svelte-ui-border-radius);
		cursor: pointer;
		transition: background-color var(--svelte-ui-transition-duration);
	}

	.image-uploader__button::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: transparent;
		border: var(--svelte-ui-image-uploader-border-style)
			var(--svelte-ui-image-uploader-border-width) var(--svelte-ui-image-uploader-border-color);
		border-radius: var(--svelte-ui-border-radius);
		transition-property: background-color border-color;
		transition-duration: var(--svelte-ui-transition-duration);
	}

	.image-uploader__button--rounded,
	.image-uploader__button--rounded::before {
		border-radius: var(--svelte-ui-border-radius-rounded);
	}

	@media (hover: hover) {
		.image-uploader__button:hover::before,
		.image-uploader__button--hover::before {
			background-color: var(--svelte-ui-image-uploader-hover-bg);
			border-color: var(--svelte-ui-image-uploader-hover-border-color);
		}
	}

	.image-uploader:focus-visible {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.image-uploader__button--hover {
		background-color: var(--svelte-ui-image-uploader-hover-bg);
		border-color: var(--svelte-ui-primary-color);
	}

	.image-uploader__button--has-images {
		padding: 0;
		background: transparent;

		&::before {
			background: transparent;
			border: none;
		}
	}

	.image-uploader__description {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		color: var(--svelte-ui-text-subtle-color);
		text-align: center;
	}

	@media (hover: hover) {
		.image-uploader__button:hover .image-uploader__description,
		.image-uploader__button--hover .image-uploader__description {
			color: var(--svelte-ui-image-uploader-hover-color);
		}
	}

	.image-uploader__error-message {
		margin-top: 8px;
		padding: 8px 12px;
		background-color: var(--svelte-ui-error-container-color);
		color: var(--svelte-ui-error-color);
		border-radius: var(--svelte-ui-border-radius);
		font-size: var(--svelte-ui-font-size-sm);
	}

	.image-uploader__input {
		display: none;
	}
</style>
