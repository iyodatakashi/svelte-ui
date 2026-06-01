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
	{ value: 'date', label: 'Date' },
	{ value: 'elderberry', label: 'Elderberry' },
	{ value: 'fig', label: 'Fig' },
	{ value: 'grape', label: 'Grape' },
	{ value: 'honeydew', label: 'Honeydew' },
	{ value: 'kiwi', label: 'Kiwi' },
	{ value: 'lemon', label: 'Lemon' },
	{ value: 'mango', label: 'Mango' },
	{ value: 'nectarine', label: 'Nectarine' },
	{ value: 'orange', label: 'Orange' },
	{ value: 'papaya', label: 'Papaya' },
	{ value: 'quince', label: 'Quince' },
	{ value: 'raspberry', label: 'Raspberry' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'tangerine', label: 'Tangerine' },
	{ value: 'watermelon', label: 'Watermelon' },
	{ value: 'apricot', label: 'Apricot' },
	{ value: 'blueberry', label: 'Blueberry' },
	{ value: 'coconut', label: 'Coconut' },
	{ value: 'dragonfruit', label: 'Dragon Fruit' },
	{ value: 'guava', label: 'Guava' },
	{ value: 'jackfruit', label: 'Jackfruit', disabled: true },
	{ value: 'kumquat', label: 'Kumquat' },
	{ value: 'lychee', label: 'Lychee' },
	{ value: 'mulberry', label: 'Mulberry' },
	{ value: 'passion', label: 'Passion Fruit' },
	{ value: 'yuzu', label: 'Yuzu' }
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
		value: [],
		placeholder: 'Select items'
	}
};

export const WithPreselected = {
	args: {
		options: basicOptions,
		value: ['apple', 'cherry'],
		placeholder: 'Select items'
	}
};

export const Rounded = {
	args: {
		options: basicOptions,
		value: [],
		rounded: true,
		placeholder: 'Rounded multi-select'
	}
};

export const FullWidth = {
	args: {
		options: countryOptions,
		value: [],
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
		value: ['apple'],
		disabled: true,
		placeholder: 'Disabled state'
	}
};
