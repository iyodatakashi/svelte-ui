import type { Meta, StoryObj } from '@storybook/sveltekit';
import FileUploader from '../components/FileUploader.svelte';

interface FileUploaderArgs {
	files?: FileList | undefined;
	multiple?: boolean;
	maxFileSize?: number;
	placeholder?: string;
	accept?: string;
	width?: string | number;
	height?: number;
	rounded?: boolean;
	icon?: string;
	iconFilled?: boolean;
	iconWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
	iconGrade?: number;
	iconOpticalSize?: number | null;
	iconVariant?: 'outlined' | 'filled' | 'rounded' | 'sharp';
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
			description: '受け入れるファイルタイプ'
		},
		files: {
			control: false,
			description: '選択されたファイルのリスト'
		},
		multiple: {
			control: 'boolean',
			description: '複数ファイルの選択を許可するかどうか'
		},
		maxFileSize: {
			control: 'number',
			description: '許可する最大ファイルサイズ（バイト）'
		},
		placeholder: {
			control: 'text',
			description: 'プレースホルダーテキスト（HTMLタグ使用可）'
		},
		width: {
			control: 'text',
			description: 'コンポーネントの幅（数値またはCSS単位付きの文字列）'
		},
		height: {
			control: 'number',
			description: 'コンポーネントの高さ（px）'
		},
		rounded: {
			control: 'boolean',
			description: '角丸スタイルを適用するかどうか'
		},
		icon: {
			control: 'text',
			description: 'アイコン名'
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
type Story = StoryObj<FileUploaderArgs>;

export const Default: Story = {
	args: {}
};

export const WithAcceptFilter: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif'
	}
};

export const MultipleFiles: Story = {
	args: {
		multiple: true,
		placeholder: 'ファイルを複数選択できます<br />ドラッグ＆ドロップも可能です'
	}
};

export const CustomStyle: Story = {
	args: {
		width: '300px',
		height: 200,
		rounded: true,
		icon: 'upload_file'
	}
};

export const ImageOnly: Story = {
	args: {
		accept: '.jpg,.jpeg,.png,.gif,.webp'
	}
};

export const DocumentsOnly: Story = {
	args: {
		accept: '.pdf,.doc,.docx,.txt'
	}
};
