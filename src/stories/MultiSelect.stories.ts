import MultiSelect from '../lib/components/MultiSelect.svelte';

const meta = {
	title: 'Forms/MultiSelect',
	component: MultiSelect,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A multi-select component that displays selected items space-separated and opens a checkbox list popup.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		values: {
			control: { type: 'object' },
			description: 'Array of selected values'
		},
		options: {
			control: { type: 'object' },
			description: 'Array of selectable options'
		},
		placeholder: {
			control: { type: 'text' },
			description: 'Placeholder text shown when nothing is selected'
		},
		inline: {
			control: { type: 'boolean' },
			description: 'Display as inline editable text'
		},
		focusStyle: {
			control: { type: 'radio' },
			options: ['background', 'outline', 'none'],
			description: 'Focus style'
		},
		fullWidth: {
			control: { type: 'boolean' },
			description: 'Whether the component takes full width'
		},
		rounded: {
			control: { type: 'boolean' },
			description: 'Use rounded corners'
		},
		disabled: {
			control: { type: 'boolean' },
			description: 'Whether the component is disabled'
		},
		required: {
			control: { type: 'boolean' },
			description: 'Mark the field as required'
		},
		onchange: {
			action: 'changed',
			description: 'Fires when selection changes'
		}
	}
};

export default meta;

const basicOptions = [
	{ value: 'apple', label: 'Apple' },
	{ value: 'banana', label: 'Banana' },
	{ value: 'cherry', label: 'Cherry' },
	{ value: 'durian', label: 'Durian', disabled: true },
	{ value: 'elderberry', label: 'Elderberry' }
];

const countryOptions = [
	{ value: 'jp', label: 'Japan' },
	{ value: 'us', label: 'United States' },
	{ value: 'uk', label: 'United Kingdom' },
	{ value: 'fr', label: 'France' },
	{ value: 'de', label: 'Germany' }
];

export const Default = {
	args: {
		options: basicOptions,
		values: [],
		placeholder: 'Select items'
	}
};

export const WithPreselected = {
	args: {
		options: basicOptions,
		values: ['apple', 'cherry'],
		placeholder: 'Select items'
	}
};

export const Rounded = {
	args: {
		options: basicOptions,
		values: [],
		rounded: true,
		placeholder: 'Rounded multi-select'
	}
};

export const FullWidth = {
	args: {
		options: countryOptions,
		values: [],
		fullWidth: true,
		placeholder: 'Select countries'
	},
	parameters: {
		layout: 'padded'
	}
};

export const Disabled = {
	args: {
		options: basicOptions,
		values: ['apple'],
		disabled: true,
		placeholder: 'Disabled state'
	}
};
