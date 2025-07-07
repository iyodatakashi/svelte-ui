import type { Meta, StoryObj } from '@storybook/sveltekit';
import FileUpload from '../components/FileUpload.svelte';

const meta: Meta<FileUpload> = {
	title: 'Forms/FileUpload',
	component: FileUpload,
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
type Story = StoryObj<typeof meta>;

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
