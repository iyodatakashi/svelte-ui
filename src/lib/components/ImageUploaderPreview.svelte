<script lang="ts">
	import { onDestroy } from 'svelte';
	import IconButton from './IconButton.svelte';
	import { getStyleFromNumber } from '../utils/style';

	type ImagePreviewProps = {
		file: File;
		width?: string | number;
		height?: string | number;
		adaptiveSize?: boolean;
		rounded?: boolean;
		removeFileAriaLabel?: string;
		onRemove: () => void;
	};

	let {
		file,
		width = '120px',
		height = '120px',
		adaptiveSize = false,
		rounded = false,
		removeFileAriaLabel = 'ファイルを削除',
		onRemove
	}: ImagePreviewProps = $props();

	let imageSizes = $state<Record<string, { width: number; height: number }>>({});

	const getImageUrl = (file: File): string => {
		return URL.createObjectURL(file);
	};

	const getImageSize = (file: File): Promise<{ width: number; height: number }> => {
		return new Promise((resolve) => {
			const fileKey = file.name + file.size;

			if (imageSizes[fileKey]) {
				resolve(imageSizes[fileKey]);
				return;
			}

			const img = new Image();
			img.onload = () => {
				const size = { width: img.naturalWidth, height: img.naturalHeight };
				imageSizes[fileKey] = size;
				resolve(size);
			};
			img.onerror = () => {
				const defaultSize = { width: 120, height: 120 };
				imageSizes[fileKey] = defaultSize;
				resolve(defaultSize);
			};
			img.src = getImageUrl(file);
		});
	};

	const previewWidthStyle = $derived(getStyleFromNumber(width));
	const previewHeightStyle = $derived(getStyleFromNumber(height));

	const getAdaptiveSize = (file: File) => {
		if (!adaptiveSize) {
			return {
				width: previewWidthStyle,
				height: previewHeightStyle
			};
		}

		const fileKey = file.name + file.size;
		const cachedSize = imageSizes[fileKey];
		if (!cachedSize) {
			return {
				width: previewWidthStyle,
				height: previewHeightStyle
			};
		}

		const targetWidth = parseInt(previewWidthStyle?.replace('px', '') || '120');
		const imageWidth = cachedSize.width;
		const imageHeight = cachedSize.height;

		const actualWidth = Math.min(targetWidth, imageWidth);
		const aspectRatio = imageHeight / imageWidth;
		const actualHeight = Math.round(actualWidth * aspectRatio);

		return {
			width: `${actualWidth}px`,
			height: `${actualHeight}px`
		};
	};

	const getFileAdaptiveSize = $derived(() => {
		imageSizes;
		if (!file) {
			return { width: '120px', height: '120px' };
		}
		return getAdaptiveSize(file);
	});

	onDestroy(() => {
		if (file) {
			URL.revokeObjectURL(getImageUrl(file));
		}
	});
</script>

<div class="image-uploader-preview">
	<img
		src={getImageUrl(file)}
		alt="選択された画像: {file.name}"
		class="image-uploader-preview__image"
		class:image-uploader-preview__image--rounded={rounded}
		style="width: {getFileAdaptiveSize().width}; height: {getFileAdaptiveSize().height};"
		onload={() => {
			getImageSize(file);
		}}
	/>
	<div class="image-uploader-preview__delete">
		<IconButton
			iconFilled={true}
			size={24}
			color="var(--svelte-ui-text-color)"
			onclick={(e) => {
				e.stopPropagation();
				onRemove();
			}}
			ariaLabel={removeFileAriaLabel}
			tabindex={-1}
		>
			cancel
		</IconButton>
	</div>
</div>

<style>
	.image-uploader-preview {
		position: relative;
		width: fit-content;
		height: fit-content;
		border-radius: var(--svelte-ui-border-radius);
		background-color: var(--svelte-ui-surface-color);
		overflow: hidden;
	}

	.image-uploader-preview__image {
		display: block;
		object-fit: cover;
		object-position: center;
		border-radius: var(--svelte-ui-border-radius);
	}

	.image-uploader-preview__image--rounded {
		border-radius: var(--svelte-ui-border-radius-rounded);
	}

	.image-uploader-preview__delete {
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
		.image-uploader-preview:hover .image-uploader-preview__delete {
			opacity: 1;
		}
	}
</style>
