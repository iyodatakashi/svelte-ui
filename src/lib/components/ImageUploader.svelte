<!-- ImageUploader.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import Icon from './Icon.svelte';
	import { announceToScreenReader } from '../utils/accessibility';
	import { onDestroy } from 'svelte';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/Icon';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// 基本プロパティ
		files = $bindable(),
		multiple = false,
		maxFileSize = 5 * 1024 * 1024,
		placeholder = '',

		// HTML属性系
		id = `imageuploader-${Math.random().toString(36).substring(2, 15)}`,
		accept = '.jpg,.jpeg,.png,.gif,.webp',

		// スタイル/レイアウト
		width = undefined,
		height = undefined,
		rounded = false,

		// アイコン系
		icon = 'add_photo_alternate',
		iconSize = 32,
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = iconSize,
		iconVariant = 'outlined',
		removeFileAriaLabel = '画像を削除',

		// フォーカスイベント
		onfocus = (event: FocusEvent) => {},
		onblur = (event: FocusEvent) => {},

		// キーボードイベント
		onkeydown = (event: KeyboardEvent) => {},
		onkeyup = (event: KeyboardEvent) => {},

		// マウスイベント
		onmouseenter = (event: MouseEvent) => {},
		onmouseleave = (event: MouseEvent) => {},

		// タッチイベント
		ontouchstart = (event: TouchEvent) => {},
		ontouchend = (event: TouchEvent) => {},

		// ポインターイベント
		onpointerenter = (event: PointerEvent) => {},
		onpointerleave = (event: PointerEvent) => {}
	}: {
		// 基本プロパティ
		files?: FileList | undefined;
		multiple?: boolean;
		maxFileSize?: number;
		placeholder?: string;

		// HTML属性系
		id?: string;
		accept?: string;

		// スタイル/レイアウト

		width?: string | number;
		height?: number;
		rounded?: boolean;

		// アイコン系
		icon?: string;
		iconSize?: number;
		iconFilled?: boolean;
		iconWeight?: IconWeight;
		iconGrade?: IconGrade;
		iconOpticalSize?: IconOpticalSize;
		iconVariant?: IconVariant;
		removeFileAriaLabel?: string;

		// フォーカスイベント
		onfocus?: (event: FocusEvent) => void;
		onblur?: (event: FocusEvent) => void;

		// キーボードイベント
		onkeydown?: (event: KeyboardEvent) => void;
		onkeyup?: (event: KeyboardEvent) => void;

		// マウスイベント
		onmouseenter?: (event: MouseEvent) => void;
		onmouseleave?: (event: MouseEvent) => void;

		// タッチイベント
		ontouchstart?: (event: TouchEvent) => void;
		ontouchend?: (event: TouchEvent) => void;

		// ポインターイベント
		onpointerenter?: (event: PointerEvent) => void;
		onpointerleave?: (event: PointerEvent) => void;
	} = $props();

	let dropAreaRef: HTMLButtonElement;
	let fileInputRef: HTMLInputElement;
	let isHover: boolean = $state(false);
	let errorMessage: string = $state('');
	let createdUrls: string[] = $state([]);

	// =========================================================================
	// Effects
	// =========================================================================
	$effect(() => {
		if (files && files.length > 0) {
			const fileCount = files.length;
			const fileNames = Array.from(files)
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
		if (!file.type.startsWith('image/')) {
			errorMessage = '画像ファイルを選択してください';
			return false;
		}

		if (file.size > maxFileSize) {
			errorMessage = `ファイルサイズは${(maxFileSize / 1024 / 1024).toFixed(1)}MB以下にしてください`;
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
			if (multiple && files) {
				for (let i = 0; i < files.length; i++) {
					dataTransfer.items.add(files[i]);
				}
			}

			// 新しく選択されたファイルのみを追加
			validFiles.forEach((file) => dataTransfer.items.add(file));
			files = dataTransfer.files;
		}
	};

	const removeFile = (index: number) => {
		if (!files) return;

		const dt = new DataTransfer();
		for (let i = 0; i < files.length; i++) {
			if (i !== index) {
				dt.items.add(files[i]);
			}
		}
		files = dt.files.length > 0 ? dt.files : undefined;
	};

	const createImageUrl = (file: File): string => {
		const url = URL.createObjectURL(file);
		createdUrls.push(url);
		return url;
	};

	const cleanupObjectUrls = () => {
		createdUrls.forEach((url) => URL.revokeObjectURL(url));
		createdUrls = [];
	};

	export const reset = () => {
		if (fileInputRef) {
			fileInputRef.value = '';
			files = undefined;
			errorMessage = '';
			cleanupObjectUrls();
		}
	};

	onDestroy(() => {
		cleanupObjectUrls();
	});
</script>

{#snippet preview(file: File, index: number)}
	<div class="image-uploader__preview">
		<img
			src={createImageUrl(file)}
			alt="選択された画像: {file.name}"
			class="image-uploader__preview-image"
			class:image-uploader__preview-image--rounded={rounded}
		/>
		<div class="image-uploader__delete-button">
			<IconButton
				iconFilled={true}
				size={24}
				color="var(--svelte-ui-text-color)"
				onclick={(e) => {
					e.stopPropagation();
					removeFile(index);
				}}
				ariaLabel={removeFileAriaLabel}
				tabindex={-1}
			>
				cancel
			</IconButton>
		</div>
	</div>
{/snippet}

<div
	class="image-uploader"
	class:image-uploader--multiple={multiple}
	style="
		--image-uploader-width: {typeof width === 'number' ? `${width}px` : width || '100%'};
		{height ? `--image-uploader-height: ${height}px;` : ''}
	"
>
	{#if multiple}
		{#each files as file, index}
			{@render preview(file, index)}
		{/each}
	{/if}
	<button
		bind:this={dropAreaRef}
		class="image-uploader__button"
		class:image-uploader__button--hover={isHover}
		class:image-uploader__button--has-images={files && files.length > 0}
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
		aria-label="画像をアップロード"
	>
		{#if !multiple && files && files.length > 0}
			{@render preview(files[0], 0)}
		{:else}
			<div class="description">
				<Icon
					size={iconSize}
					filled={iconFilled}
					weight={iconWeight}
					grade={iconGrade}
					opticalSize={iconOpticalSize}
					variant={iconVariant}>{icon}</Icon
				>
				{@html placeholder}
			</div>
		{/if}
	</button>

	{#if errorMessage}
		<div class="error-message" role="alert" aria-live="polite">
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

<style>
	.image-uploader {
		position: relative;
		width: var(--image-uploader-width, 100%);
		height: var(--image-uploader-width, 100%);
	}

	.image-uploader--multiple {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.image-uploader__button {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 120px;
		height: 120px;
		min-height: 120px;
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
		border: dashed 1px var(--svelte-ui-border-color);
		border-radius: var(--svelte-ui-border-radius);
		transition: border-color var(--svelte-ui-transition-duration);
	}

	.image-uploader__button--rounded,
	.image-uploader__button--rounded::before {
		border-radius: var(--svelte-ui-border-radius-rounded);
	}

	@media (hover: hover) {
		.image-uploader__button:hover {
			background-color: var(--svelte-ui-fileupload-hover-bg);
		}

		.image-uploader__button:hover::before,
		.image-uploader__button--hover::before {
			border-color: var(--svelte-ui-primary-color);
		}
	}

	.image-uploader:focus-visible {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.image-uploader__button--hover {
		background-color: var(--svelte-ui-fileupload-hover-bg);
		border-color: var(--svelte-ui-primary-color);
	}

	.image-uploader__button--has-images {
		padding: 0;
		min-height: auto;
	}

	.description {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		color: var(--svelte-ui-text-subtle-color);
		text-align: center;
	}

	.image-uploader__preview {
		position: relative;
		width: 120px;
		height: 120px;
		border-radius: var(--svelte-ui-border-radius);
		background-color: var(--svelte-ui-surface-color);
	}

	.image-uploader__preview-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		border-radius: var(--svelte-ui-border-radius);
	}

	.image-uploader__preview-image--rounded {
		border-radius: var(--svelte-ui-border-radius-rounded);
	}

	.image-uploader__delete-button {
		position: absolute;
		top: 4px;
		right: 4px;
		background-color: var(--svelte-ui-surface-color);
		border-radius: var(--svelte-ui-border-radius-rounded);
		opacity: 0;
		transition: opacity var(--svelte-ui-transition-duration);
		z-index: 10;
	}

	@media (hover: hover) {
		.image-uploader__preview:hover .image-uploader__delete-button {
			opacity: 1;
		}
	}

	.error-message {
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
