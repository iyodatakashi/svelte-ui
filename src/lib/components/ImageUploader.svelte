<script lang="ts">
	import Button from './Button.svelte';
	import IconButton from './IconButton.svelte';
	import Icon from './Icon.svelte';

	let {
		files = $bindable(),
		accept = '.jpg,.jpeg,.png,.gif,.webp',
		multiple = false,
		maxSize = 5 * 1024 * 1024 // 5MB
	}: {
		files?: FileList;
		accept?: string;
		multiple?: boolean;
		maxSize?: number;
	} = $props();

	let dropAreaRef: HTMLButtonElement;
	let fileInputRef: HTMLInputElement;
	let isHover: boolean = $state(false);
	let errorMessage: string = $state('');

	const generateId = (): string => {
		return 'imageuploader-' + Math.random().toString(36).substring(2, 15);
	};
	const imageUploaderId = generateId();

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
		if (file.size > maxSize) {
			errorMessage = `ファイルサイズは${(maxSize / 1024 / 1024).toFixed(1)}MB以下にしてください`;
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

<div class="image-uploader-container">
	<button
		bind:this={dropAreaRef}
		class="image-uploader"
		class:hover={isHover}
		class:has-images={files && files.length > 0}
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
						<div class="image-overlay">
							<IconButton
								variant="filled"
								size={24}
								onclick={(e) => {
									e.stopPropagation();
									removeFile(index);
								}}
								ariaLabel="画像を削除"
								tabindex={-1}
							>
								<Icon>close</Icon>
							</IconButton>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="upload-prompt">
				<Icon size={48}>image</Icon>
				<p class="upload-text" id={`${imageUploaderId}-help`}>画像をドラッグ＆ドロップ</p>
				<div class="upload-button-block">
					<Button variant="outlined" tabindex={-1}>または画像を選択</Button>
				</div>
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
		width: 100%;
	}

	.image-uploader {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		min-height: 200px;
		padding: 16px;
		background-color: var(--svelte-ui-form-bg);
		border: dashed 1px var(--svelte-ui-border-color);
		border-radius: var(--svelte-ui-border-radius);
		cursor: pointer;
		transition: all var(--svelte-ui-transition-duration-fast);
		position: relative;
	}

	.image-uploader:focus-visible {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}

	.image-uploader.hover {
		background-color: var(--svelte-ui-hover-overlay);
		border-color: var(--svelte-ui-primary-color);
	}

	.image-uploader.has-images {
		padding: 0;
		min-height: auto;
	}

	.upload-prompt {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		color: var(--svelte-ui-text-subtle-color);
	}

	.upload-text {
		margin: 0;
		font-size: var(--svelte-ui-font-size-lg);
		color: var(--svelte-ui-text-subtle-color);
	}

	.upload-button-block {
		margin-top: 8px;
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
		border: 1px solid var(--svelte-ui-border-color);
	}

	.image-preview-item.single {
		width: 100%;
		height: 300px;
		max-height: 500px;
	}

	.preview-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.image-overlay {
		position: absolute;
		top: 4px;
		right: 4px;
		opacity: 0;
		transition: opacity var(--svelte-ui-transition-duration-fast);
	}

	.image-preview-item:hover .image-overlay {
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
