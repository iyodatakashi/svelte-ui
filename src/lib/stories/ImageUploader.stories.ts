import type { Meta, StoryObj } from '@storybook/sveltekit';
import ImageUploader from '../components/ImageUploader.svelte';

interface ImageUploaderArgs {
	files?: FileList;
	accept?: string;
	multiple?: boolean;
	maxFileSize?: number;
	width?: string | number;
	height?: number;
	rounded?: boolean;
	icon?: string;
	placeholder?: string;
	// 新しいイベントハンドラ
	onfocus?: (event: FocusEvent) => void;
	onblur?: (event: FocusEvent) => void;
	onkeydown?: (event: KeyboardEvent) => void;
	onkeyup?: (event: KeyboardEvent) => void;
	onmouseenter?: (event: MouseEvent) => void;
	onmouseleave?: (event: MouseEvent) => void;
	ontouchstart?: (event: TouchEvent) => void;
	ontouchend?: (event: TouchEvent) => void;
	onpointerenter?: (event: PointerEvent) => void;
	onpointerleave?: (event: PointerEvent) => void;
}

const meta: Meta<ImageUploaderArgs> = {
	title: 'Forms/ImageUploader',
	component: ImageUploader,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: 'An image uploader component with drag & drop support and preview functionality.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		files: {
			control: false,
			description: 'Selected files (bindable)'
		},
		accept: {
			control: 'text',
			description: 'Accepted file types'
		},
		multiple: {
			control: 'boolean',
			description: 'Allow multiple file selection'
		},
		maxFileSize: {
			control: 'number',
			description: 'Maximum file size in bytes'
		},
		width: {
			control: 'text',
			description: 'Fixed width in pixels or a percentage'
		},
		height: {
			control: 'number',
			description: 'Fixed height in pixels'
		},
		rounded: {
			control: 'boolean',
			description: 'Make the component circular'
		},
		icon: {
			control: 'text',
			description: 'Icon name to display'
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder text (supports HTML)'
		},
		// 新しいイベントハンドラのargTypes
		onfocus: {
			action: 'focused',
			description: 'フォーカスイベント'
		},
		onblur: {
			action: 'blurred',
			description: 'ブラーイベント'
		},
		onkeydown: {
			action: 'keydown',
			description: 'キーダウンイベント'
		},
		onkeyup: {
			action: 'keyup',
			description: 'キーアップイベント'
		},
		onmouseenter: {
			action: 'mouseenter',
			description: 'マウスエンターイベント'
		},
		onmouseleave: {
			action: 'mouseleave',
			description: 'マウスリーブイベント'
		},
		ontouchstart: {
			action: 'touchstart',
			description: 'タッチ開始イベント'
		},
		ontouchend: {
			action: 'touchend',
			description: 'タッチ終了イベント'
		},
		onpointerenter: {
			action: 'pointerenter',
			description: 'ポインターエンターイベント'
		},
		onpointerleave: {
			action: 'pointerleave',
			description: 'ポインターリーブイベント'
		}
	}
};

export default meta;
type Story = StoryObj<ImageUploaderArgs>;

export const Default: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024
	}
};

export const Multiple: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp',
		multiple: true,
		maxFileSize: 5 * 1024 * 1024
	}
};

export const WithSize: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: 200,
		height: 200,
		placeholder: '画像をドラッグ＆ドロップ<br />または画像を選択'
	}
};

export const SmallSize: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: 120,
		height: 120,
		placeholder: '画像を選択'
	}
};

export const Rectangle: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: 300,
		height: 200,
		placeholder: '画像をドラッグ＆ドロップ<br />または画像を選択'
	}
};

export const Rounded: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: 150,
		height: 150,
		rounded: true,
		placeholder: '画像を選択'
	}
};

export const CustomIcon: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		icon: 'photo_camera',
		placeholder: '写真を撮影または選択'
	}
};

export const CustomPlaceholder: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		icon: 'add_photo_alternate',
		placeholder: '<strong>画像をアップロード</strong><br />JPG, PNG, GIF対応'
	}
};

export const AvatarUploader: Story = {
	args: {
		accept: '.jpg,.jpeg,.png',
		multiple: false,
		maxFileSize: 2 * 1024 * 1024,
		width: 120,
		height: 120,
		rounded: true,
		icon: 'person',
		placeholder: 'アバター画像'
	}
};

export const DocumentUploader: Story = {
	args: {
		accept: '.pdf,.doc,.docx',
		multiple: true,
		maxFileSize: 10 * 1024 * 1024,
		icon: 'description',
		placeholder: 'ドキュメントを選択<br />PDF, DOC, DOCX対応'
	}
};

export const CustomAccept: Story = {
	args: {
		accept: '.jpg,.jpeg,.png',
		multiple: false,
		maxFileSize: 2 * 1024 * 1024,
		icon: 'image',
		placeholder: 'JPG, PNG画像のみ'
	}
};

export const SmallMaxSize: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp',
		multiple: false,
		maxFileSize: 1 * 1024 * 1024, // 1MB
		icon: 'image',
		placeholder: '画像を選択<br />最大1MB'
	}
};

export const Playground: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: undefined,
		height: undefined,
		rounded: false,
		icon: 'image',
		placeholder: '画像をドラッグ＆ドロップ<br />または画像を選択'
	}
};

export const SVGSupport: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		icon: 'image',
		placeholder: '画像をドラッグ＆ドロップ<br />または画像を選択<br /><small>SVG対応</small>'
	}
};

export const SVGOnly: Story = {
	args: {
		accept: '.svg',
		multiple: false,
		maxFileSize: 2 * 1024 * 1024,
		icon: 'code',
		placeholder: 'SVGファイルを選択'
	}
};

// Responsive width examples
export const ResponsiveWidth: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: 'calc(100vw - 80px)',
		height: 200,
		icon: 'image',
		placeholder: 'レスポンシブ幅<br />calc(100vw - 80px)'
	}
};

export const PercentageWidth: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: '80%',
		height: 150,
		icon: 'image',
		placeholder: 'パーセント幅<br />80%'
	}
};

export const AllImageFormats: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.tiff,.ico',
		multiple: true,
		maxFileSize: 10 * 1024 * 1024,
		icon: 'collections',
		placeholder: '全画像形式対応<br />JPG, PNG, GIF, WebP, SVG, BMP, TIFF, ICO'
	}
};
