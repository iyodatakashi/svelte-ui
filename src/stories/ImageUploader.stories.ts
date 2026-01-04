import type { Meta, StoryObj } from '@storybook/sveltekit';
import ImageUploader from '../lib/components/ImageUploader.svelte';
import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '../lib/types/icon';

interface ImageUploaderArgs {
	value: FileList | undefined;
	accept?: string;
	multiple?: boolean;
	maxFileSize?: number;
	width?: string | number;
	height?: string | number;
	rounded?: boolean;
	previewStyle?: 'plain' | 'framed';
	previewAdaptive?: boolean;
	icon?: string;
	iconSize?: number;
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;
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
				component:
					'An image uploader component with drag & drop support and preview functionality. Supports JPG, PNG, GIF, WebP, and SVG formats.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: false,
			description: 'Selected files (bindable)'
		},
		accept: {
			control: 'text',
			description: 'Accepted file types (supports .jpg, .jpeg, .png, .gif, .webp, .svg)'
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
			description: 'Button and preview width (default: 120px)'
		},
		height: {
			control: 'text',
			description: 'Button and preview height (default: 120px)'
		},
		rounded: {
			control: 'boolean',
			description: 'Make the component circular'
		},
		previewStyle: {
			control: 'select',
			options: ['plain', 'framed'],
			description: 'Preview style: plain (no border/radius) or framed (default)'
		},
		previewAdaptive: {
			control: 'boolean',
			description:
				'Enable adaptive preview sizing based on image aspect ratio. Width uses specified value, height adjusts to maintain aspect ratio. If image width is smaller than specified width, uses original image width.'
		},
		icon: {
			control: 'text',
			description: 'Icon name to display'
		},
		iconSize: {
			control: 'number',
			description: 'Icon size in pixels'
		},
		iconFilled: {
			control: 'boolean',
			description: 'Whether the icon is filled'
		},
		iconWeight: {
			control: 'select',
			options: [100, 200, 300, 400, 500, 600, 700],
			description: 'Icon weight'
		},
		iconGrade: {
			control: 'number',
			description: 'Icon grade'
		},
		iconOpticalSize: {
			control: 'number',
			description: 'Icon optical size'
		},
		iconVariant: {
			control: 'select',
			options: ['outlined', 'rounded', 'sharp'],
			description: 'Icon variant'
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
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024
	}
};

export const Multiple: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: true,
		maxFileSize: 5 * 1024 * 1024
	}
};

export const WithSize: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: 200,
		height: 200
	}
};

export const SmallSize: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: 120,
		height: 120
	}
};

export const Rectangle: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: 300,
		height: 200
	}
};

export const Rounded: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: 150,
		height: 150,
		rounded: true
	}
};

export const CustomIcon: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		icon: 'photo_camera'
	}
};

export const CustomPlaceholder: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		icon: 'add_photo_alternate'
	}
};

export const AvatarUploader: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.svg',
		multiple: false,
		maxFileSize: 2 * 1024 * 1024,
		width: 120,
		height: 120,
		rounded: true,
		icon: 'person'
	}
};

export const CustomAccept: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.svg',
		multiple: false,
		maxFileSize: 2 * 1024 * 1024,
		icon: 'image'
	}
};

export const SmallMaxSize: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 1 * 1024 * 1024, // 1MB
		icon: 'image'
	}
};

export const Playground: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: undefined,
		height: undefined,
		rounded: false,
		icon: 'image'
	}
};

export const SVGSupport: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		icon: 'image'
	}
};

export const SVGOnly: Story = {
	args: {
		accept: '.svg',
		multiple: false,
		maxFileSize: 2 * 1024 * 1024,
		icon: 'code'
	}
};

// Responsive width examples
export const ResponsiveWidth: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: 'calc(100vw - 80px)',
		height: 200,
		icon: 'image'
	}
};

export const PercentageWidth: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: '80%',
		height: 150,
		icon: 'image'
	}
};

export const AllImageFormats: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg,.bmp,.tiff,.ico',
		multiple: true,
		maxFileSize: 10 * 1024 * 1024,
		icon: 'collections'
	}
};

// デバッグ用: 数値サイズテスト
export const NumericSizeTest: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		width: 150,
		height: 100
	}
};

// アダプティブサイズテスト
export const AdaptiveSizeTest: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp,.svg',
		multiple: false,
		maxFileSize: 5 * 1024 * 1024,
		previewAdaptive: true
	}
};
