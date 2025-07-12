<!-- ImageUploader.svelte -->

<script lang="ts">
	import IconButton from './IconButton.svelte';
	import Icon from './Icon.svelte';
	import { announceToScreenReader } from '$lib/utils/accessibility';

	let {
		files = $bindable(),
		accept = '.jpg,.jpeg,.png,.gif,.webp',
		multiple = false,
		maxFileSize = 5 * 1024 * 1024, // 5MB
		width = undefined,
		height = undefined,
		rounded = false,
		icon = 'image',
		placeholder = '画像をドラッグ＆ドロップ<br />または画像を選択'
	}: {
		files?: FileList;
		accept?: string;
		multiple?: boolean;
		maxFileSize?: number;
		width?: number;
		height?: number;
		rounded?: boolean;
		icon?: string;
		placeholder?: string;
	} = $props();

	let dropAreaRef: HTMLButtonElement;
	let fileInputRef: HTMLInputElement;
	let isHover: boolean = $state(false);
	let errorMessage: string = $state('');

	const imageUploaderId = `imageuploader-${Math.random().toString(36).substring(2, 15)}`;

	// ファイル選択時のアナウンス
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

	const handleClick = () => {
		fileInputRef?.click();
	};

	const validateFile = (file: File): boolean => {
		// 画像ファイルかチェック
		if (!file.type.startsWith('image/')) {
			errorMessage = '画像ファイルを選択してください';
			return false;
		}

		// ファイルサイズチェック
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
			} else {
				return; // エラーがあった場合は処理を停止
			}
		}

		// FileListを再構築
		const dt = new DataTransfer();
		validFiles.forEach((file) => dt.items.add(file));
		files = dt.files;
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
		return URL.createObjectURL(file);
	};

	export const reset = () => {
		if (fileInputRef) {
			fileInputRef.value = '';
			files = undefined;
			errorMessage = '';
		}
	};
</script>

<div
	class="image-uploader-container"
	class:rounded
	style="
		--image-uploader-width: {width}px;
		--image-uploader-height: {height}px
	"
>
	<button
		bind:this={dropAreaRef}
		class="image-uploader"
		class:hover={isHover}
		class:has-images={files && files.length > 0}
		class:rounded
		onclick={handleClick}
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
		aria-describedby={`${imageUploaderId}-help`}
	>
		{#if files && files.length > 0}
			<div class="image-preview-container" class:single={!multiple}>
				{#each files as file, index}
					<div class="image-preview-item" class:single={!multiple}>
						<img src={createImageUrl(file)} alt={file.name} class="preview-image" />
						<div class="delete-button-container">
							<IconButton
								iconFilled={true}
								size={24}
								color="var(--svelte-ui-text-color)"
								onclick={(e) => {
									e.stopPropagation();
									removeFile(index);
								}}
								ariaLabel="画像を削除"
								tabindex={-1}
							>
								cancel
							</IconButton>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="description">
				<Icon size={48}>{icon}</Icon>
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
		class="upload-file-input"
		id={imageUploaderId}
		type="file"
		onchange={(event) => {
			const target = event.target as HTMLInputElement;
			if (target.files) {
				handleFileChange(target.files);
			}
		}}
	/>
</div>

<style>
	.image-uploader-container {
		position: relative;
		width: var(--image-uploader-width, 100%);
		height: var(--image-uploader-width, 100%);
	}

	.image-uploader-container.rounded {
		border-radius: var(--svelte-ui-border-radius-rounded);
	}

	.image-uploader {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
		width: 100%;
		height: 100%;
		min-height: 120px;
		padding: 16px;
		background-color: var(--svelte-ui-form-bg);
		border-radius: var(--svelte-ui-border-radius);
		cursor: pointer;
		transition: background-color var(--svelte-ui-transition-duration);
		overflow: hidden;
	}

	.image-uploader.rounded {
		border-radius: var(--svelte-ui-border-radius-rounded);
	}

	.image-uploader::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: calc(100% - 2px);
		height: calc(100% - 2px);
		border: dashed 1px var(--svelte-ui-border-color);
		border-radius: var(--svelte-ui-border-radius);
		transition: border-color var(--svelte-ui-transition-duration);
	}

	.image-uploader.rounded::before {
		border-radius: var(--svelte-ui-border-radius-rounded);
	}

	.image-uploader:hover {
		background-color: var(--svelte-ui-fileupload-hover-bg);
	}

	.image-uploader:focus-visible {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.image-uploader.hover {
		background-color: var(--svelte-ui-fileupload-hover-bg);
		border-color: var(--svelte-ui-primary-color);
	}

	.image-uploader:hover::before,
	.image-uploader.hover::before {
		border-color: var(--svelte-ui-primary-color);
	}

	.image-uploader.has-images {
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

	.image-preview-container {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		width: 100%;
		justify-content: center;
	}

	.image-preview-container.single {
		height: 100%;
	}

	.image-preview-item {
		position: relative;
		width: 120px;
		height: 120px;
		border-radius: var(--svelte-ui-border-radius);
		overflow: hidden;
		background-color: var(--svelte-ui-surface-color);
	}

	.image-preview-item.single {
		width: 100%;
		height: auto;
	}

	.image-uploader.rounded .image-preview-item {
		border-radius: var(--image-uploader-border-radius);
	}

	.image-uploader.rounded .image-preview-item.single {
		border-radius: var(--image-uploader-border-radius);
	}

	.preview-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.delete-button-container {
		position: absolute;
		top: 4px;
		right: 4px;
		opacity: 0;
		transition: opacity var(--svelte-ui-transition-duration);
	}

	.image-preview-item:hover .delete-button-container {
		opacity: 1;
	}

	.error-message {
		margin-top: 8px;
		padding: 8px 12px;
		background-color: var(--svelte-ui-error-container-color);
		color: var(--svelte-ui-error-color);
		border-radius: var(--svelte-ui-border-radius);
		font-size: var(--svelte-ui-font-size-sm);
	}

	.upload-file-input {
		display: none;
	}
</style>
