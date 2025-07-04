// src/lib/components/atoms/Select.stories.ts
import Select from '../components/Select.svelte';

const meta = {
	title: 'Forms/Select',
	component: Select,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: 'セレクトボックスコンポーネント。カスタムスタイリングとテーマに対応します。'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: { type: 'text' },
			description: '選択された値'
		},
		options: {
			control: { type: 'object' },
			description: '選択肢の配列'
		},
		variant: {
			control: { type: 'select' },
			options: ['default', 'inline'],
			description: 'バリアント'
		},
		focusStyle: {
			control: { type: 'select' },
			options: ['background', 'border', 'none'],
			description: 'フォーカス時のスタイル'
		},
		placeholder: {
			control: { type: 'text' },
			description: 'プレースホルダーテキスト'
		},
		fullWidth: {
			control: { type: 'boolean' },
			description: '幅100%で表示'
		},
		rounded: {
			control: { type: 'boolean' },
			description: '角丸デザイン'
		},
		disabled: {
			control: { type: 'boolean' },
			description: '無効状態'
		},
		readonly: {
			control: { type: 'boolean' },
			description: '読み取り専用'
		},
		required: {
			control: { type: 'boolean' },
			description: '必須項目'
		}
	}
};

export default meta;

// 基本的な選択肢データ
const basicOptions = [
	{ value: 'option1', label: 'オプション1' },
	{ value: 'option2', label: 'オプション2' },
	{ value: 'option3', label: 'オプション3' }
];

const countryOptions = [
	{ value: 'jp', label: '日本' },
	{ value: 'us', label: 'アメリカ' },
	{ value: 'uk', label: 'イギリス' },
	{ value: 'fr', label: 'フランス' },
	{ value: 'de', label: 'ドイツ' }
];

// Default
export const Default = {
	args: {
		value: '',
		options: basicOptions,
		placeholder: '選択してください'
	}
};

// Inline variant
export const Inline = {
	args: {
		value: '',
		options: basicOptions,
		variant: 'inline',
		placeholder: '選択してください'
	}
};

// Rounded
export const Rounded = {
	args: {
		options: basicOptions,
		rounded: true,
		placeholder: '角丸セレクト'
	}
};

// Full width
export const FullWidth = {
	args: {
		options: countryOptions,
		fullWidth: true,
		placeholder: '国を選択'
	}
};

// Focus styles
export const FocusStyles = {
	render: () => ({
		Component: Select,
		props: {}
	}),
	decorators: [
		() => ({
			template: `
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					<div>
						<label>フォーカス時に背景色変更</label>
						<Select options={basicOptions} focusStyle="background" placeholder="背景色変更" />
					</div>
					<div>
						<label>フォーカス時にボーダー表示</label>
						<Select options={basicOptions} focusStyle="border" placeholder="ボーダー表示" />
					</div>
					<div>
						<label>フォーカススタイルなし</label>
						<Select options={basicOptions} focusStyle="none" placeholder="スタイルなし" />
					</div>
				</div>
			`,
			data() {
				return {
					basicOptions
				};
			}
		})
	]
};

// States
export const States = {
	render: () => ({
		Component: Select,
		props: {}
	}),
	decorators: [
		() => ({
			template: `
				<div style="display: flex; flex-direction: column; gap: 1rem;">
					<div>
						<label>通常状態</label>
						<Select options={basicOptions} placeholder="通常状態" />
					</div>
					<div>
						<label>無効状態</label>
						<Select options={basicOptions} disabled placeholder="無効状態" />
					</div>
					<div>
						<label>読み取り専用</label>
						<Select options={basicOptions} readonly value="option1" placeholder="読み取り専用" />
					</div>
					<div>
						<label>必須項目</label>
						<Select options={basicOptions} required placeholder="必須項目" />
					</div>
				</div>
			`,
			data() {
				return {
					basicOptions
				};
			}
		})
	]
};

// With events
export const WithEvents = {
	args: {
		options: basicOptions,
		placeholder: 'イベントを確認（コンソールをチェック）',
		value: ''
	},
	render: (args: Record<string, unknown>) => ({
		Component: Select,
		props: {
			...args,
			onchange: (value: string | number | undefined) => {
				console.log('onChange:', value);
			},
			onfocus: () => {
				console.log('フォーカスされました');
			},
			onblur: () => {
				console.log('フォーカスが外れました');
			}
		}
	})
};

// Playground (全props操作用)
export const Playground = {
	args: {
		value: '',
		options: basicOptions,
		variant: 'default',
		focusStyle: 'background',
		placeholder: 'Playground',
		fullWidth: false,
		rounded: false,
		disabled: false,
		readonly: false,
		required: false,
		customStyle: '',
		size: 1
	},
	render: (args: Record<string, unknown>) => ({
		Component: Select,
		props: {
			...args,
			onchange: (value: string | number | undefined) => {
				console.log('onChange:', value);
			}
		}
	})
};
