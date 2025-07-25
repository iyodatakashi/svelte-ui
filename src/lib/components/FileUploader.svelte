<!-- FileUploader.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import { announceToScreenReader } from '../utils/accessibility';

	let {
		files = $bindable(),
		accept = '',
		id = `fileuploader-${Math.random().toString(36).substring(2, 15)}`,
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = null,
		iconVariant = 'outlined'
	}: {
		files: FileList | undefined;
		accept: string;
		id?: string;
		iconFilled?: boolean;
		iconWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
		iconGrade?: number;
		iconOpticalSize?: number | null;
		iconVariant?: 'outlined' | 'filled' | 'rounded' | 'sharp';
	} = $props();
	let dropAreaRef: HTMLButtonElement;
	let fileInputRef: HTMLInputElement;
	let isHover: boolean = $state(false);

	// ファイル選択時のアナウンス
	$effect(() => {
		if (files && files.length > 0) {
			const fileCount = files.length;
			const fileNames = Array.from(files)
				.map((file) => file.name)
				.join(', ');
			announceToScreenReader(`${fileCount} file${fileCount > 1 ? 's' : ''} selected: ${fileNames}`);
		}
	});

	const handleClick = () => {
		fileInputRef?.click();
	};
	export const reset = () => {
		if (fileInputRef) {
			fileInputRef.value = '';
			files = undefined;
		}
	};
</script>

<button
	bind:this={dropAreaRef}
	class="file-uploader"
	class:hover={isHover}
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
				variant={iconVariant}>draft</Icon
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
				variant={iconVariant}>draft</Icon
			>
			ファイルをドラッグ＆ドロップ<br />またはファイルを選択
		</div>
	{/if}
	<input bind:this={fileInputRef} {accept} class="upload-file-input" {id} type="file" bind:files />
</button>

<style>
	.file-uploader {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 16px;
		width: 100%;
		min-height: 100px;
		padding: 16px;
		background-color: var(--svelte-ui-fileupload-bg);
		border: dashed 1px var(--svelte-ui-border-color);
		border-radius: 4px;
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

	@media (hover: hover) {
		.file-uploader:hover {
			background-color: var(--svelte-ui-fileupload-hover-bg);
		}
	}
</style>
