<!-- FileUploader.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import { announceToScreenReader } from '../utils/accessibility';

	// =========================================================================
	// Props, States & Constants
	// =========================================================================
	let {
		// 基本プロパティ
		files = $bindable(),
		multiple = false,
		maxFileSize = 5 * 1024 * 1024,
		placeholder = 'ファイルをドラッグ＆ドロップ<br />またはファイルを選択',

		// HTML属性系
		id = `fileuploader-${Math.random().toString(36).substring(2, 15)}`,
		accept = '',

		// スタイル/レイアウト
		width = undefined,
		height = undefined,
		rounded = false,

		// アイコン系
		icon = 'draft',
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = null,
		iconVariant = 'outlined'
	}: {
		// 基本プロパティ
		files: FileList | undefined;
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
		iconFilled?: boolean;
		iconWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
		iconGrade?: number;
		iconOpticalSize?: number | null;
		iconVariant?: 'outlined' | 'filled' | 'rounded' | 'sharp';
	} = $props();

	let dropAreaRef: HTMLButtonElement;
	let fileInputRef: HTMLInputElement;
	let isHover: boolean = $state(false);
	let errorMessage: string = $state('');

	// =========================================================================
	// Effects
	// =========================================================================
	$effect(() => {
		if (files && files.length > 0) {
			const fileCount = files.length;
			const fileNames = Array.from(files)
				.map((file) => file.name)
				.join(', ');
			announceToScreenReader(`${fileCount} file${fileCount > 1 ? 's' : ''} selected: ${fileNames}`);
		}
	});

	// =========================================================================
	// Methods
	// =========================================================================
	const handleClick = () => {
		fileInputRef?.click();
	};

	const validateFile = (file: File): boolean => {
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
				return;
			}
		}

		const dt = new DataTransfer();
		validFiles.forEach((file) => dt.items.add(file));
		files = dt.files;
	};

	export const reset = () => {
		if (fileInputRef) {
			fileInputRef.value = '';
			files = undefined;
			errorMessage = '';
		}
	};
</script>

<button
	bind:this={dropAreaRef}
	class="file-uploader"
	class:hover={isHover}
	class:rounded
	style="
		--file-uploader-width: {typeof width === 'number' ? `${width}px` : width || '100%'};
		--file-uploader-height: {height}px
	"
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
		if (typeof fileList !== 'undefined') {
			files = fileList;
		}
	}}
	aria-label="ファイルをアップロード"
	aria-describedby={`${id}-help`}
>
	{#if files && files.length > 0}
		<div class="description with-file">
			<Icon
				size={48}
				filled={iconFilled}
				weight={iconWeight}
				grade={iconGrade}
				opticalSize={iconOpticalSize}
				variant={iconVariant}>{icon}</Icon
			>
			<ul class="file-list">
				{#each files as file}
					<li>{file.name}</li>
				{/each}
			</ul>
		</div>
	{:else}
		<div class="description">
			<Icon
				size={48}
				filled={iconFilled}
				weight={iconWeight}
				grade={iconGrade}
				opticalSize={iconOpticalSize}
				variant={iconVariant}>{icon}</Icon
			>
			{@html placeholder}
		</div>
	{/if}

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
		{id}
		type="file"
		onchange={(event) => {
			const target = event.target as HTMLInputElement;
			if (target.files) {
				handleFileChange(target.files);
			}
		}}
	/>
</button>

<style>
	.file-uploader {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16px;
		width: var(--file-uploader-width, 100%);
		height: var(--file-uploader-height);
		min-height: 100px;
		padding: 16px;
		background-color: var(--svelte-ui-fileupload-bg);
		border: dashed 1px var(--svelte-ui-border-color);
		border-radius: var(--svelte-ui-border-radius);
	}

	.file-uploader.rounded {
		border-radius: var(--svelte-ui-border-radius-rounded);
	}

	.file-uploader:hover {
		background-color: var(--svelte-ui-fileupload-hover-bg);
		border-color: var(--svelte-ui-primary-color);
	}

	.file-uploader:focus-visible {
		outline: var(--svelte-ui-focus-outline-inner);
		outline-offset: var(--svelte-ui-focus-outline-offset-inner);
	}
	.hover {
		background-color: var(--svelte-ui-fileupload-hover-bg);
		border-color: var(--svelte-ui-primary-color);
	}
	.description {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;
		color: var(--svelte-ui-text-subtle-color);
	}
	.description.with-file {
		color: var(--svelte-ui-text-color);
	}
	.upload-file-input {
		display: none;
	}
	.file-uploader.hover::before {
		border-color: var(--svelte-ui-primary-color);
	}

	.error-message {
		margin-top: 8px;
		padding: 8px 12px;
		background-color: var(--svelte-ui-error-container-color);
		color: var(--svelte-ui-error-color);
		border-radius: var(--svelte-ui-border-radius);
		font-size: var(--svelte-ui-font-size-sm);
	}

	@media (hover: hover) {
		.file-uploader:hover {
			background-color: var(--svelte-ui-fileupload-hover-bg);
		}
	}
</style>
