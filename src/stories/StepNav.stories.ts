import type { Meta, StoryObj } from '@storybook/sveltekit';
import StepNav from '../lib/components/StepNav.svelte';
import type { StepItem } from '../lib/types/stepItem';

const inPageItems: StepItem[] = [
	{ label: 'アカウント', value: 'account', description: 'メールとパスワード' },
	{ label: '住所', value: 'address', description: '配送先の入力' },
	{ label: '支払い', value: 'payment', description: 'カード情報' },
	{ label: '確認', value: 'confirm', description: '内容の最終確認' }
];

const iconItems: StepItem[] = [
	{ label: 'アカウント', value: 'account', icon: 'person' },
	{ label: '住所', value: 'address', icon: 'home' },
	{ label: '支払い', value: 'payment', icon: 'credit_card' },
	{ label: '確認', value: 'confirm', icon: 'task_alt' }
];

const urlItems: StepItem[] = [
	{ label: 'アカウント', href: '/checkout/account' },
	{ label: '住所', href: '/checkout/address' },
	{ label: '支払い', href: '/checkout/payment' },
	{ label: '確認', href: '/checkout/confirm' }
];

const meta = {
	title: 'Navigation/StepNav',
	component: StepNav,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A step navigation (stepper) component that visualizes progress and the current position of a multi-step flow (wizard, form, onboarding, checkout). Supports both in-page (`bind:value`) and URL (`href`) modes, and separately expresses "progress" (reached point) and "viewing" (active step).'
			}
		}
	},
	tags: ['autodocs'],
	render: (args) => ({
		Component: StepNav,
		props: args
	}),
	argTypes: {
		items: {
			control: 'object',
			description: 'Array of step items ({ label, value?, href?, description?, icon?, error?, disabled? }[])'
		},
		value: {
			control: 'text',
			description: 'Value of the viewing step (in-page mode, bindable)'
		},
		progress: {
			control: 'number',
			description: 'Zero-based index of the furthest reached step (progress axis)'
		},
		orientation: {
			control: 'radio',
			options: ['horizontal', 'vertical'],
			description: 'Layout orientation'
		},
		size: {
			control: 'radio',
			options: ['small', 'medium', 'large'],
			description: 'Size of markers and font'
		},
		color: {
			control: 'color',
			description: 'Accent color for current/completed steps (overrides theme)'
		},
		showIcon: {
			control: 'boolean',
			description: 'Show each step icon instead of the number'
		},
		clickable: {
			control: 'boolean',
			description: 'Allow click navigation in in-page mode'
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the entire component'
		},
		reducedMotion: {
			control: 'boolean',
			description: 'Disable animations for reduced motion'
		},
		pathPrefix: {
			control: 'text',
			description: 'Path prefix for URL-mode active matching'
		},
		currentPath: {
			control: 'text',
			description: 'Override the auto-detected current path (URL mode)'
		},
		ariaLabel: {
			control: 'text',
			description: 'Accessible label for the navigation landmark'
		},
		onchange: {
			action: 'changed',
			description: 'Called when the viewing step changes (in-page mode)'
		}
	}
} satisfies Meta<typeof StepNav>;

export default meta;
type Story = StoryObj<typeof meta>;

// 水平（既定）
export const Horizontal: Story = {
	args: {
		items: inPageItems,
		value: 'address',
		progress: 1,
		ariaLabel: '登録手順'
	}
};

// 垂直
export const Vertical: Story = {
	args: {
		items: inPageItems,
		value: 'address',
		progress: 1,
		orientation: 'vertical',
		ariaLabel: '登録手順'
	}
};

// サイズ: 小
export const Small: Story = {
	args: {
		items: inPageItems,
		value: 'address',
		progress: 1,
		size: 'small',
		ariaLabel: '登録手順'
	}
};

// サイズ: 中
export const Medium: Story = {
	args: {
		items: inPageItems,
		value: 'address',
		progress: 1,
		size: 'medium',
		ariaLabel: '登録手順'
	}
};

// サイズ: 大
export const Large: Story = {
	args: {
		items: inPageItems,
		value: 'address',
		progress: 1,
		size: 'large',
		ariaLabel: '登録手順'
	}
};

// アイコン表示
export const WithIcons: Story = {
	args: {
		items: iconItems,
		value: 'address',
		progress: 1,
		showIcon: true,
		ariaLabel: '登録手順'
	}
};

// エラー状態
export const WithError: Story = {
	args: {
		items: [
			{ label: 'アカウント', value: 'account' },
			{ label: '住所', value: 'address', error: true, description: '郵便番号が不正です' },
			{ label: '支払い', value: 'payment' },
			{ label: '確認', value: 'confirm' }
		],
		value: 'address',
		progress: 1,
		ariaLabel: '登録手順'
	}
};

// 進捗と表示中がズレたケース（過去ステップを閲覧）
export const ProgressAheadOfViewing: Story = {
	args: {
		items: inPageItems,
		value: 'account',
		progress: 3,
		ariaLabel: '登録手順'
	},
	parameters: {
		docs: {
			description: {
				story:
					'進捗はステップ4まで到達（progress=3）しつつ、表示中はステップ1（value=account）。完了表示と表示中強調が同一ステップ上で両立する。'
			}
		}
	}
};

// クリック遷移可能（インページ方式）
export const Clickable: Story = {
	args: {
		items: inPageItems,
		value: 'payment',
		progress: 2,
		clickable: true,
		ariaLabel: '登録手順'
	}
};

// カスタム色
export const CustomColor: Story = {
	args: {
		items: inPageItems,
		value: 'address',
		progress: 1,
		color: '#e91e63',
		ariaLabel: '登録手順'
	}
};

// URL 方式
export const UrlMode: Story = {
	args: {
		items: urlItems,
		currentPath: '/checkout/address',
		progress: 1,
		ariaLabel: 'チェックアウト手順'
	},
	parameters: {
		docs: {
			description: {
				story:
					'各ステップが href を持つ URL 方式。現在パス（currentPath）とのマッチングで表示中ステップを判定する。'
			}
		}
	}
};
