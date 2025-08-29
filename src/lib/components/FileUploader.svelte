<!-- FileUploader.svelte -->

<script lang="ts">
	import Icon from './Icon.svelte';
	import IconButton from './IconButton.svelte';
	import { announceToScreenReader } from '../utils/accessibility';
	import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '$lib/types/Icon';

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
		icon = 'upload',
		iconSize = 48,
		iconFilled = false,
		iconWeight = 300,
		iconGrade = 0,
		iconOpticalSize = iconSize,
		iconVariant = 'outlined',

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
		files?: FileList;
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
	aria-label="ファイルをアップロード"
	aria-describedby={`${id}-help`}
>
	{#if files && files.length > 0}
		<div class="description with-file">
			<Icon
				size={iconSize}
				filled={iconFilled}
				weight={iconWeight}
				grade={iconGrade}
				opticalSize={iconOpticalSize}
				variant={iconVariant}>{icon}</Icon
			>
			<ul class="file-list">
				{#each files as file, index}
					<li>
						{file.name}
						{#if multiple}
							<IconButton
								size={24}
								iconFilled={true}
								iconWeight={300}
								color="var(--svelte-ui-text-color)"
								onclick={(e) => {
									e.stopPropagation();
									removeFile(index);
								}}
								ariaLabel="ファイルを削除"
								tabindex={-1}
							>
								close
							</IconButton>
						{/if}
					</li>
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
			if (target.files && target.files.length > 0) {
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

	.file-list {
		list-style: none;
		padding: 0;
		margin: 0;
		width: 100%;
	}

	.file-list li {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 4px 0;
	}

	@media (hover: hover) {
		.file-uploader:hover {
			background-color: var(--svelte-ui-fileupload-hover-bg);
		}
	}
</style>
