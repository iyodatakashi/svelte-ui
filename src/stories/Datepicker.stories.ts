import type { Meta, StoryObj } from '@storybook/sveltekit';
import type { IconWeight } from '../lib/types/icon';
import Datepicker from '../lib/components/Datepicker.svelte';

const meta = {
	title: 'Forms/Datepicker',
	component: Datepicker,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'A datepicker component that supports both single-date and range selection, with customizable formats and an optional calendar icon.'
			}
		}
	},
	tags: ['autodocs'],
	argTypes: {
		value: {
			control: false,
			description: 'Selected date (single) or date range object'
		},
		inline: {
			control: 'boolean',
			description: 'Display calendar inline'
		},
		format: {
			control: 'text',
			description: 'Date format string (dayjs style)'
		},
		placeholder: {
			control: 'text',
			description: 'Placeholder text to show when no date is selected'
		},
		mode: {
			control: 'radio',
			options: ['single', 'range'],
			description: 'Selection mode (single or range)'
		},
		hasIcon: {
			control: 'boolean',
			description: 'Show calendar icon'
		},
		disabled: {
			control: 'boolean',
			description: 'Whether the datepicker is disabled'
		},
		focusStyle: {
			control: 'radio',
			options: ['background', 'outline', 'none'],
			description: 'Focus style (background, outline, or none)'
		},
		enableTextInput: {
			control: 'boolean',
			description: 'Allow direct text input in the field'
		},
		fullWidth: {
			control: 'boolean',
			description: 'Whether the control takes full width'
		},
		iconWeight: {
			control: 'select',
			options: [100, 200, 300, 400, 500, 600, 700],
			description: 'Icon weight (thickness of the calendar icon strokes)'
		},
		width: {
			control: 'text',
			description: 'Width (number in px or CSS length string, e.g. "320", "50%", "24rem")'
		},
		minWidth: {
			control: 'text',
			description: 'Minimum width (number in px or CSS length string, e.g. "200", "50%", "16rem")'
		},
		maxWidth: {
			control: 'text',
			description: 'Maximum width (number in px or CSS length string, e.g. "400", "80%", "32rem")'
		},
		rounded: {
			control: 'boolean',
			description: 'Use rounded corners'
		},
		enableClickToOpen: {
			control: 'boolean',
			description: 'Open calendar on click for selection'
		},
		minDate: {
			control: 'date',
			description: 'Minimum selectable date'
		},
		maxDate: {
			control: 'date',
			description: 'Maximum selectable date'
		},
		locale: {
			control: 'select',
			options: ['en', 'ja', 'fr', 'de', 'es', 'zh-cn'],
			description: 'Locale used for display'
		},
		onchange: {
			control: false,
			action: 'changed',
			description: 'Callback when the value changes'
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
		onclick: {
			action: 'clicked',
			description: 'Click event'
		},
		onmousedown: {
			action: 'mousedown',
			description: 'Mousedown event'
		},
		onmouseup: {
			action: 'mouseup',
			description: 'Mouseup event'
		},
		onmouseenter: {
			action: 'mouseenter',
			description: 'Mouseenter event'
		},
		onmouseleave: {
			action: 'mouseleave',
			description: 'Mouseleave event'
		},
		onmouseover: {
			action: 'mouseover',
			description: 'Mouseover event'
		},
		onmouseout: {
			action: 'mouseout',
			description: 'Mouseout event'
		},
		oncontextmenu: {
			action: 'contextmenu',
			description: 'Context menu event'
		},
		onauxclick: {
			action: 'auxclick',
			description: 'Auxiliary button click event'
		},
		ontouchstart: {
			action: 'touchstart',
			description: 'Touch start event'
		},
		ontouchend: {
			action: 'touchend',
			description: 'Touch end event'
		},
		ontouchmove: {
			action: 'touchmove',
			description: 'Touch move event'
		},
		ontouchcancel: {
			action: 'touchcancel',
			description: 'Touch cancel event'
		},
		onpointerdown: {
			action: 'pointerdown',
			description: 'Pointer down event'
		},
		onpointerup: {
			action: 'pointerup',
			description: 'Pointer up event'
		},
		onpointerenter: {
			action: 'pointerenter',
			description: 'Pointer enter event'
		},
		onpointerleave: {
			action: 'pointerleave',
			description: 'Pointer leave event'
		},
		onpointermove: {
			action: 'pointermove',
			description: 'Pointer move event'
		},
		onpointercancel: {
			action: 'pointercancel',
			description: 'Pointer cancel event'
		},
		oninput: {
			action: 'input',
			description: 'Input event'
		}
	}
} satisfies Meta<typeof Datepicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default (single date selection)
export const Default: Story = {
	args: {
		// Use component defaults: single mode, locale from config, default format/placeholder
		value: undefined
	}
};

// Date Range (date range selection)
export const DateRange: Story = {
	args: {
		value: undefined,
		mode: 'range'
	}
};

// With Icon (with calendar icon)
export const WithIcon: Story = {
	args: {
		value: undefined,
		hasIcon: true
	}
};

// With Icon and Date Range (range selection with calendar icon)
export const WithIconAndDateRange: Story = {
	args: {
		value: undefined,
		mode: 'range',
		hasIcon: true
	}
};

// Inline
export const Inline: Story = {
	args: {
		value: new Date(),
		inline: true
	},
	parameters: {
		layout: 'padded'
	}
};

// Custom Format (custom date format)
export const CustomFormat: Story = {
	args: {
		value: new Date(),
		format: 'MM/DD/YYYY',
		hasIcon: true
	}
};

// Disabled State
export const Disabled: Story = {
	args: {
		value: new Date(),
		hasIcon: true,
		disabled: true
	}
};

// With Min/Max Date (min/max date constraints)
export const WithMinMaxDate: Story = {
	args: {
		value: undefined,
		hasIcon: true,
		minDate: new Date(2024, 0, 1),
		maxDate: new Date(2024, 11, 31)
	}
};

// Enable text input (enableTextInput=true)
export const EnableTextInput: Story = {
	args: {
		value: undefined,
		enableTextInput: true,
		hasIcon: true
	},
	parameters: {
		docs: {
			description: {
				story: 'When direct input is allowed, if there is no value only the placeholder is shown.'
			}
		}
	}
};

// Full Width
export const FullWidth: Story = {
	args: {
		value: undefined,
		fullWidth: true,
		hasIcon: true
	},
	parameters: {
		layout: 'padded'
	}
};
// Rounded
export const Rounded: Story = {
	args: {
		value: undefined,
		hasIcon: true,
		rounded: true
	}
};
