import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Select from '../lib/components/Select.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';

test('renders Select with options', async () => {
	const screen = render(Select, {
		options: [
			{ value: 'option1', label: 'Option 1' },
			{ value: 'option2', label: 'Option 2' },
			{ value: 'option3', label: 'Option 3' }
		]
	});
	const select = screen.getByRole('combobox');
	await expect.element(select).toBeVisible();
});

test('Select can be selected and changed', async () => {
	const screen = render(Select, {
		options: [
			{ value: 'option1', label: 'Option 1' },
			{ value: 'option2', label: 'Option 2' }
		],
		id: 'select-change'
	});
	const select = screen.container.querySelector('#select-change') as HTMLSelectElement;

	// Initially no selection
	expect(select.value).toBe('');

	// Select option
	select.value = 'option1';
	select.dispatchEvent(new Event('change'));
	expect(select.value).toBe('option1');
});

test('disabled Select is not interactable', async () => {
	const screen = render(Select, {
		options: [{ value: 'option1', label: 'Option 1' }],
		disabled: true,
		id: 'select-disabled'
	});
	const select = screen.container.querySelector('#select-disabled') as HTMLSelectElement;
	expect(select).toHaveAttribute('disabled');

	// Disabled select should not be focusable
	select.focus();
	expect(document.activeElement).not.toBe(select);

	// Disabled select should not trigger change events
	let changeCalled = false;
	const screen2 = render(Select, {
		options: [{ value: 'option1', label: 'Option 1' }],
		disabled: true,
		id: 'select-disabled-2',
		onchange: () => {
			changeCalled = true;
		}
	});
	const select2 = screen2.container.querySelector('#select-disabled-2') as HTMLSelectElement;
	// Try to trigger change event (should not work for disabled select)
	select2.dispatchEvent(new Event('change'));
	expect(changeCalled).toBe(false);
});

test('Select variants render correctly', async () => {
	// Test default variant (no special class)
	const screenDefault = render(Select, {
		options: [{ value: 'test', label: 'Test' }],
		variant: 'default',
		id: 'select-default'
	});
	const containerDefault = screenDefault.container.querySelector('[data-testid="select"]');
	expect(containerDefault).toHaveClass('select');
	expect(containerDefault).not.toHaveClass('select--inline');

	// Test inline variant
	const screenInline = render(Select, {
		options: [{ value: 'test', label: 'Test' }],
		variant: 'inline',
		id: 'select-inline'
	});
	const containerInline = screenInline.container.querySelector('[data-testid="select"]');
	expect(containerInline).toHaveClass('select--inline');
});

test('Select focus and blur events work correctly', async () => {
	let focusCalled = false;
	let blurCalled = false;

	const screen = render(Select, {
		options: [{ value: 'test', label: 'Test' }],
		id: 'select-focus-blur',
		onfocus: () => {
			focusCalled = true;
		},
		onblur: () => {
			blurCalled = true;
		}
	});
	const select = screen.container.querySelector('#select-focus-blur') as HTMLSelectElement;
	select.focus();
	expect(focusCalled).toBe(true);

	select.blur();
	expect(blurCalled).toBe(true);
});

test('Select required attribute works correctly', async () => {
	const screen = render(Select, {
		options: [{ value: 'test', label: 'Test' }],
		required: true,
		id: 'select-required'
	});
	const select = screen.container.querySelector('#select-required');
	expect(select).toHaveAttribute('required');
});

test('Select name attribute works correctly', async () => {
	const screen = render(Select, {
		options: [{ value: 'test', label: 'Test' }],
		name: 'test-select',
		id: 'select-name'
	});
	const select = screen.container.querySelector('#select-name');
	expect(select).toHaveAttribute('name', 'test-select');
});

test('Select placeholder works correctly', async () => {
	const screen = render(Select, {
		options: [{ value: 'test', label: 'Test' }],
		placeholder: 'Choose an option'
	});
	// Placeholder is implemented as an option element, not as placeholder attribute
	const placeholderOption = screen.container.querySelector('option[value=""]');
	expect(placeholderOption).toHaveTextContent('Choose an option');
});

test('Select with fullWidth renders correctly', async () => {
	const screen = render(Select, {
		options: [{ value: 'test', label: 'Test' }],
		fullWidth: true
	});
	const container = screen.container.querySelector('[data-testid="select"]');
	expect(container).toHaveClass('select--full-width');
});

test('Select with rounded renders correctly', async () => {
	const screen = render(Select, {
		options: [{ value: 'test', label: 'Test' }],
		rounded: true
	});
	const container = screen.container.querySelector('[data-testid="select"]');
	expect(container).toHaveClass('select--rounded');
});

function collectCssVarNames(element: Element): string[] {
	const vars = new Set<string>();
	const walk = (el: Element) => {
		const style = (el as HTMLElement).style;
		for (let i = 0; i < style.length; i++) {
			const prop = style.item(i);
			const val = style.getPropertyValue(prop);
			const matches = val.match(/var\((--svelte-ui-[^)]+)\)/g) || [];
			matches.forEach((m) => vars.add(m.replace(/var\(|\)/g, '')));
		}
		Array.from(el.children).forEach((c) => walk(c));
	};
	walk(element);
	return Array.from(vars);
}

test('Select CSS variables used are defined (computed) in the page', async () => {
	const screen = render(Select, {
		options: [{ value: 'test', label: 'Test' }]
	});
	const wrapper = screen.getByTestId('select');
	const usedVars = new Set<string>();

	// Collect from inline styles and descendants
	collectCssVarNames(wrapper.element()).forEach((v) => usedVars.add(v));

	// Only test variables that are actually used in the component
	// The collectCssVarNames function already found the used variables

	// Validate each variable resolves to a non-empty value
	const root = document.documentElement;
	for (const varName of usedVars) {
		const value = getComputedStyle(root).getPropertyValue(varName).trim();
		// Some variables might be resolved on elements; try wrapper as fallback
		const fallbackValue = getComputedStyle(wrapper.element()).getPropertyValue(varName).trim();
		const finalValue = value || fallbackValue;

		expect(finalValue).not.toBe('');
		expect(finalValue).not.toBe('initial');
		expect(finalValue).not.toBe('unset');
		expect(finalValue).not.toBe('inherit');
	}
});
