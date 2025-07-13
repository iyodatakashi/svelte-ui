import type { Meta, StoryObj } from '@storybook/sveltekit';
import FileUploader from '../components/FileUploader.svelte';

interface FileUploaderArgs {
	files?: FileList | undefined;
	accept?: string;
	iconFilled?: boolean;
	iconWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
	iconGrade?: number;
	iconOpticalSize?: number | null;
	iconVariant?: 'outlined' | 'filled' | 'rounded' | 'sharp';
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
