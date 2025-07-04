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
	},
	parameters: {
		layout: 'padded'
	}
};

// Focus styles
export const FocusBackground = {
	args: {
		options: basicOptions,
		focusStyle: 'background',
		placeholder: 'フォーカス時に背景色変更'
	}
};

export const FocusBorder = {
	args: {
		options: basicOptions,
		focusStyle: 'border',
		placeholder: 'フォーカス時にボーダー表示'
	}
};

export const FocusNone = {
	args: {
		options: basicOptions,
		focusStyle: 'none',
		placeholder: 'フォーカススタイルなし'
	}
};

// States
export const Disabled = {
	args: {
		options: basicOptions,
		disabled: true,
		placeholder: '無効状態'
	}
};

export const ReadOnly = {
	args: {
		options: basicOptions,
		readonly: true,
		value: 'option1',
		placeholder: '読み取り専用'
	}
};

export const Required = {
	args: {
		options: basicOptions,
		required: true,
		placeholder: '必須項目'
	}
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

// Comparison - Width
export const WidthComparison = {
	render: () => ({
		template: `
			<div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
				<div>
					<label style="display: block; margin-bottom: 0.5rem;">通常の幅</label>
					<Select options={basicOptions} placeholder="通常の幅" />
				</div>
				<div>
					<label style="display: block; margin-bottom: 0.5rem;">幅100%（fullWidth）</label>
					<Select options={basicOptions} fullWidth placeholder="幅100%の表示" />
				</div>
			</div>
		`,
		data() {
			return {
				basicOptions
			};
		}
	}),
	parameters: {
		layout: 'padded'
	}
};

// Comparison - Variant
export const VariantComparison = {
	render: () => ({
		template: `
			<div style="display: flex; flex-direction: column; gap: 1rem; padding: 1rem;">
				<div>
					<label style="display: block; margin-bottom: 0.5rem;">Default バリアント</label>
					<Select options={basicOptions} placeholder="Default バリアント" />
				</div>
				<div>
					<label style="display: block; margin-bottom: 0.5rem;">Inline バリアント</label>
					<Select options={basicOptions} variant="inline" placeholder="Inline バリアント" />
				</div>
			</div>
		`,
		data() {
			return {
				basicOptions
			};
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
	parameters: {
		layout: 'padded'
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
