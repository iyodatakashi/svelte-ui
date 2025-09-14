import { test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Input from '../lib/components/Input.svelte';

test('renders Input and updates value on typing', async () => {
	const screen = render(Input, { placeholder: 'Type here', value: '' });
	const textbox = screen.getByRole('textbox');

	await expect.element(textbox).toBeVisible();
	await expect.element(textbox).toHaveAttribute('placeholder', 'Type here');

	await textbox.fill('Hello World');
	await expect.element(textbox).toHaveValue('Hello World');
});

test('disabled Input is not interactable', async () => {
	const screen = render(Input, { disabled: true, value: '' });
	const textbox = screen.getByRole('textbox');

	await expect.element(textbox).toBeDisabled();
	// Disabled inputs should not gain focus programmatically
	(textbox.element() as HTMLInputElement).focus();
	await expect.element(textbox).not.toHaveFocus();
});

test('readonly Input is focusable but not editable', async () => {
	const screen = render(Input, { readonly: true, value: 'Initial' });
	const textbox = screen.getByRole('textbox');

	await expect.element(textbox).toHaveAttribute('readonly');
	(textbox.element() as HTMLInputElement).focus();
	await expect.element(textbox).toHaveFocus();
	await expect.element(textbox).toHaveValue('Initial');
});

// Required attribute
test('required Input is marked as required', async () => {
	const screen = render(Input, { required: true, value: '' });
	const textbox = screen.getByRole('textbox');
	await expect.element(textbox).toBeRequired();
});

// Maxlength enforcement
test('maxlength limits typed characters', async () => {
	const screen = render(Input, { maxlength: 3, value: '' });
	const textbox = screen.getByRole('textbox');
	await textbox.fill('Hello');
	await expect.element(textbox).toHaveValue('Hel');
});

// Clearable behavior
test('clearable resets value when clear button is clicked', async () => {
	const screen = render(Input, { clearable: true, value: 'ABC' });
	const textbox = screen.getByRole('textbox');
	await expect.element(textbox).toHaveValue('ABC');

	// Find clear button inside the input wrapper
	const clearButton = screen.container.querySelector(
		'.input__clear-button button'
	) as HTMLButtonElement | null;
	if (!clearButton) throw new Error('Clear button not found');
	clearButton.click();

	await expect.element(textbox).toHaveValue('');
});

// Submit handler receives current value
test('onsubmit receives current value', async () => {
	const onsubmit = vi.fn();
	const screen = render(Input, { value: 'SubmitMe', onsubmit });
	const form = screen.container.querySelector('form') as HTMLFormElement | null;
	if (!form) throw new Error('Form not found');

	form.requestSubmit();
	// onsubmit is called synchronously in handler
	expect(onsubmit).toHaveBeenCalledWith('SubmitMe');
});

// input/change events
test('oninput and onchange receive latest value', async () => {
	const oninput = vi.fn();
	const onchange = vi.fn();
	const screen = render(Input, { value: '', oninput, onchange });
	const textbox = screen.getByRole('textbox');

	await textbox.fill('A');
	expect(oninput).toHaveBeenCalledWith('A');

	// Trigger change by blurring the input
	(textbox.element() as HTMLInputElement).blur();
	expect(onchange).toHaveBeenCalledWith('A');
});

// Icon click handlers
test('left and right icon click handlers are called', async () => {
	const onLeftIconClick = vi.fn();
	const onRightIconClick = vi.fn();
	const screen = render(Input, {
		leftIcon: 'search',
		rightIcon: 'close',
		leftIconAriaLabel: 'Left',
		rightIconAriaLabel: 'Right',
		onLeftIconClick,
		onRightIconClick,
		value: ''
	});

	await screen.getByRole('button', { name: 'Left' }).click();
	await screen.getByRole('button', { name: 'Right' }).click();

	expect(onLeftIconClick).toHaveBeenCalledTimes(1);
	expect(onRightIconClick).toHaveBeenCalledTimes(1);
});

// Focus class toggles on wrapper
test('focus toggles input--focused class on wrapper', async () => {
	const screen = render(Input, { value: '' });
	const textbox = screen.getByRole('textbox');
	const wrapper = screen.getByTestId('input');

	await textbox.click();
	await expect.element(wrapper).toHaveClass(/input--focused/);
});
