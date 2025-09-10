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

	// 画像サイズを取得してキャッシュに保存
	const loadImageSize = (file: File) => {
		const fileKey = file.name + file.size;

		if (imageSizes[fileKey]) {
			return; // 既にキャッシュされている
		}

		const img = new Image();
		img.onload = () => {
			imageSizes[fileKey] = { width: img.naturalWidth, height: img.naturalHeight };
		};
		img.onerror = () => {
			imageSizes[fileKey] = { width: 120, height: 120 };
		};
		img.src = getImageUrl(file);
	};

	// adaptiveSizeによる分岐を最初に行う
	const imageSizeStyle = $derived.by(() => {
		if (adaptiveSize) {
			return `
			  width: 100%;
        height: auto;
				max-width:  '100%';
			`;
		} else {
			return `
				width: ${getStyleFromNumber(width)};
				height: ${getStyleFromNumber(height)};
			`;
		}
	});

	onDestroy(() => {
		if (file) {
			URL.revokeObjectURL(getImageUrl(file));
		}
	});
</script>

<div
	class="image-uploader-preview"
	class:image-uploader-preview--rounded={rounded}
	class:image-uploader-preview--adaptive={adaptiveSize}
	style={imageSizeStyle}
>
	<img
		src={getImageUrl(file)}
		alt={file.name}
		class="image-uploader-preview__image"
		class:image-uploader-preview__image--rounded={rounded}
		onload={() => {
			loadImageSize(file);
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
	}

	.image-uploader-preview__image {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		border-radius: var(--svelte-ui-image-uploader-preview-border-radius);
	}

	.image-uploader-preview--adaptive .image-uploader-preview__image {
		object-fit: contain;
	}

	.image-uploader-preview::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: var(--svelte-ui-image-uploader-preview-border-radius);
		box-shadow: inset 0 0 0 var(--svelte-ui-border-width) var(--svelte-ui-border-weak-color);
	}

	.image-uploader-preview--rounded::after,
	.image-uploader-preview__image--rounded {
		border-radius: var(--svelte-ui-image-uploader-preview-border-radius-rounded);
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
