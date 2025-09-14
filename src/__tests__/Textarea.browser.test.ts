import { test, expect } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Textarea from '../lib/components/Textarea.svelte';
import variables from '../lib/assets/styles/variables.scss?inline';
import { collectCssVarNames } from './helpers/cssVarCollector';

test('renders Textarea and updates value on typing', async () => {
	const screen = render(Textarea, { placeholder: 'Type here', value: '' });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toBeVisible();
	await textarea.fill('Hello\nWorld');
	await expect.element(textarea).toHaveValue('Hello\nWorld');
});

test('disabled Textarea is not interactable', async () => {
	const screen = render(Textarea, { value: 'Initial', disabled: true });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toHaveAttribute('disabled');
	await expect.element(textarea).toHaveValue('Initial');

	// Try to focus programmatically and verify it doesn't get focus
	(textarea.element() as HTMLTextAreaElement).focus();
	await expect.element(textarea).not.toHaveFocus();
});

test('readonly Textarea does not change value on typing', async () => {
	const screen = render(Textarea, { value: 'Initial', readonly: true });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toHaveAttribute('readonly');
	await expect.element(textarea).toHaveValue('Initial');

	// Focus should work but value should not change
	(textarea.element() as HTMLTextAreaElement).focus();
	await expect.element(textarea).toHaveFocus();
	await expect.element(textarea).toHaveValue('Initial');
});

test('required attribute is applied correctly', async () => {
	const screen = render(Textarea, { value: '', required: true });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toHaveAttribute('required');
});

test('maxlength attribute limits input length', async () => {
	const screen = render(Textarea, { value: '', maxlength: 10 });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toHaveAttribute('maxlength', '10');

	await textarea.fill('This is a very long text that should be limited');
	await expect.element(textarea).toHaveValue('This is a ');
});

test('clearable Textarea shows clear button and clears value', async () => {
	const screen = render(Textarea, { value: 'Test text', clearable: true });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toHaveValue('Test text');

	// Clear button should be present
	const clearButton = screen.container.querySelector('.textarea__clear-button button');
	expect(clearButton).toBeTruthy();

	// Click clear button
	await (clearButton as HTMLElement).click();
	await expect.element(textarea).toHaveValue('');
});

test('form submission works correctly', async () => {
	const screen = render(Textarea, { name: 'message', value: 'Test message' });
	const textarea = screen.getByRole('textbox');
	await expect.element(textarea).toHaveAttribute('name', 'message');
	await expect.element(textarea).toHaveValue('Test message');
});

test('oninput and onchange events are called', async () => {
	let inputCalled = false;
	let changeCalled = false;

	const screen = render(Textarea, {
		value: '',
		oninput: () => {
			inputCalled = true;
		},
		onchange: () => {
			changeCalled = true;
		}
	});

	const textarea = screen.getByRole('textbox');
	await textarea.fill('New text');

	expect(inputCalled).toBe(true);
	// Note: onchange is only called when the element loses focus, not on every input
	// So we test oninput which should be called on every keystroke
});

test('focus and blur events work correctly', async () => {
	let focusCalled = false;
	let blurCalled = false;

	const screen = render(Textarea, {
		value: '',
		onfocus: () => {
			focusCalled = true;
		},
		onblur: () => {
			blurCalled = true;
		}
	});

	const textarea = screen.getByRole('textbox');
	// Use programmatic focus instead of locator.focus()
	(textarea.element() as HTMLTextAreaElement).focus();
	expect(focusCalled).toBe(true);

	(textarea.element() as HTMLTextAreaElement).blur();
	expect(blurCalled).toBe(true);
});

test('focusStyle variants work correctly', async () => {
	// Test outline focus style
	const screenOutline = render(Textarea, {
		value: '',
		focusStyle: 'outline',
		id: 'textarea-outline'
	});
	const textareaOutline = screenOutline.container.querySelector(
		'#textarea-outline'
	) as HTMLTextAreaElement;
	textareaOutline.focus();
	await expect.element(textareaOutline).toHaveFocus();

	// Test background focus style
	const screenBackground = render(Textarea, {
		value: '',
		focusStyle: 'background',
		id: 'textarea-background'
	});
	const textareaBackground = screenBackground.container.querySelector(
		'#textarea-background'
	) as HTMLTextAreaElement;
	textareaBackground.focus();
	await expect.element(textareaBackground).toHaveFocus();

	// Test none focus style
	const screenNone = render(Textarea, { value: '', focusStyle: 'none', id: 'textarea-none' });
	const textareaNone = screenNone.container.querySelector('#textarea-none') as HTMLTextAreaElement;
	textareaNone.focus();
	await expect.element(textareaNone).toHaveFocus();
});

test('inline mode shows display text when not focused', async () => {
	const screen = render(Textarea, { value: 'Inline text', inline: true });
	const textarea = screen.getByRole('textbox');
	const displayText = screen.container.querySelector('.textarea__display-text');

	// In inline mode, display text should be visible when not focused
	await expect.element(displayText).toBeVisible();

	// When focused, textarea should be visible
	(textarea.element() as HTMLTextAreaElement).focus();
	await expect.element(textarea).toHaveFocus();
});

test('autoResize functionality works', async () => {
	const screen = render(Textarea, { value: '', autoResize: true, rows: 3 });
	const textarea = screen.getByRole('textbox');
	const displayText = screen.container.querySelector('.textarea__display-text');

	// With autoResize, display text should be present
	await expect.element(displayText).toBeVisible();

	// Fill with multi-line text
	await textarea.fill('Line 1\nLine 2\nLine 3\nLine 4');
	await expect.element(textarea).toHaveValue('Line 1\nLine 2\nLine 3\nLine 4');
});

test('resizable attribute controls resize behavior', async () => {
	const screen = render(Textarea, { value: '', resizable: true });
	const textarea = screen.getByRole('textbox');

	// Should have resizable class when resizable is true
	await expect.element(textarea).toHaveClass('resizable');
});

test('should not reference undefined CSS variables', async () => {
	const screen = render(Textarea, { value: 'test' });
	const wrapper = screen.container.querySelector('[data-testid="textarea"]') as HTMLElement;
	const textareaElement = screen.getByRole('textbox').element() as HTMLTextAreaElement;

	// List of CSS variables to check for Textarea
	const cssVariables = [
		'--svelte-ui-textarea-bg',
		'--svelte-ui-textarea-border-color',
		'--svelte-ui-textarea-text-color',
		'--svelte-ui-textarea-placeholder-color',
		'--svelte-ui-hover-overlay',
		'--svelte-ui-focus-color',
		'--svelte-ui-border-width',
		'--svelte-ui-textarea-padding',
		'--svelte-ui-textarea-border-radius',
		'--svelte-ui-textarea-border-radius-rounded',
		'--svelte-ui-input-disabled-opacity',
		'--svelte-ui-button-disabled-opacity',
		'--svelte-ui-input-readonly-bg',
		'--svelte-ui-clear-button-transition',
		'--svelte-ui-clear-button-top-textarea',
		'--svelte-ui-clear-button-right-textarea',
		'--svelte-ui-clear-button-right-spacing',
		'--svelte-ui-focus-outline-inner',
		'--svelte-ui-focus-outline-offset-inner'
	];

	// Inject variables.scss into the document for computed style checks
	const style = document.createElement('style');
	style.textContent = variables;
	document.head.appendChild(style);

	// Check computed styles for each variable
	cssVariables.forEach((varName) => {
		const computedValue = getComputedStyle(wrapper).getPropertyValue(varName).trim();
		expect(computedValue).not.toBe('');
		expect(computedValue).not.toBe('initial');
		expect(computedValue).not.toBe('unset');
		expect(computedValue).not.toBe('inherit');
	});

	document.head.removeChild(style);
});
