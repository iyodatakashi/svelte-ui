import type { Meta, StoryObj } from '@storybook/sveltekit';
import FileUploader from '../lib/components/FileUploader.svelte';
import type { IconVariant, IconWeight, IconGrade, IconOpticalSize } from '../lib/types/icon';

interface FileUploaderArgs {
	value: FileList | undefined;
	multiple?: boolean;
	maxFileSize?: number;
	placeholder?: string;
	accept?: string;
	width?: string | number;
	height?: number;
	rounded?: boolean;
	icon?: string;
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;
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

const meta: Meta<FileUploaderArgs> = {
	title: 'Forms/FileUploader',
	component: FileUploader,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'ファイルのドラッグ＆ドロップおよび選択機能を提供するコンポーネントです。アクセシビリティ、バリデーション、エラーハンドリングが組み込まれています。'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		accept: {
			control: 'text',
			description: 'Accepted file types (e.g. ".jpg,.png,.pdf")'
		},
		value: {
			control: false,
			description: 'Selected file list (bindable)'
		},
		multiple: {
			control: 'boolean',
			description: 'Allow selecting multiple files'
		},
		maxFileSize: {
			control: 'number',
			description: 'Maximum allowed file size in bytes'
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder text (HTML allowed)'
		},
		width: {
			control: 'text',
			description: 'Component width (number for px, or CSS length string)'
		},
		height: {
			control: 'text',
			description: 'Component height in pixels'
		},
		rounded: {
			control: 'boolean',
			description: 'Apply rounded style'
		},
		icon: {
			control: 'text',
			description: 'Material Symbols icon name'
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
			control: 'radio',
			options: ['outlined', 'rounded', 'sharp'],
			description: 'Icon variant'
		},
		// 新しいイベントハンドラのargTypes
		onfocus: {
			action: 'focused',
			description: 'Focus event'
		},
		onblur: {
			action: 'blurred',
			description: 'Blur event'
		},
		onkeydown: {
			action: 'keydown',
			description: 'Keydown event'
		},
		onkeyup: {
			action: 'keyup',
			description: 'Keyup event'
		},
		onmouseenter: {
			action: 'mouseenter',
			description: 'Mouseenter event'
		},
		onmouseleave: {
			action: 'mouseleave',
			description: 'Mouseleave event'
		},
		ontouchstart: {
			action: 'touchstart',
			description: 'Touch start event'
		},
		ontouchend: {
			action: 'touchend',
			description: 'Touch end event'
		},
		onpointerenter: {
			action: 'pointerenter',
			description: 'Pointer enter event'
		},
		onpointerleave: {
			action: 'pointerleave',
			description: 'Pointer leave event'
		}
	}
};

export default meta;
type Story = StoryObj<FileUploaderArgs>;

export const Default: Story = {
	args: {}
};

export const MultipleFiles: Story = {
	args: {
		multiple: true,
		placeholder: 'ファイルを複数選択できます<br />ドラッグ＆ドロップも可能です'
	}
};

export const CustomSize: Story = {
	args: {
		width: '300px',
		height: 200
	}
};

export const Rounded: Story = {
	args: {
		rounded: true
	}
};

export const CustomPlaceholder: Story = {
	args: {
		placeholder: 'Click or drop files here<br />Max 10MB'
	}
};
