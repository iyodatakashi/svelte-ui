import type { Meta, StoryObj } from '@storybook/svelte';
import ImageUploader from '../components/ImageUploader.svelte';

const meta: Meta<ImageUploader> = {
	title: 'Forms/ImageUploader',
	component: ImageUploader,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: '画像ファイルの選択とプレビュー表示機能を持つImageUploaderコンポーネント'
			}
		}
	},
	argTypes: {
		accept: {
			control: 'text',
			description: '受け入れるファイルタイプ'
		},
		multiple: {
			control: 'boolean',
			description: '複数ファイルの選択を許可'
		},
		maxSize: {
			control: 'number',
			description: '最大ファイルサイズ（バイト）'
		},
		files: {
			control: false,
			description: '選択されたファイル'
		}
	}
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {}
};

export const SingleImage: Story = {
	args: {
		multiple: false,
		maxSize: 2 * 1024 * 1024 // 2MB
	}
};

export const MultipleImages: Story = {
	args: {
		multiple: true,
		maxSize: 5 * 1024 * 1024 // 5MB
	}
};

export const SmallSizeLimit: Story = {
	args: {
		multiple: true,
		maxSize: 1024 * 1024 // 1MB
	}
};

export const CustomAccept: Story = {
	args: {
		accept: '.jpg,.jpeg,.png',
		multiple: true
	}
};
