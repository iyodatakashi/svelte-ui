# Svelte UI

A Svelte component library with TypeScript support and Material Design-inspired styling.

> **⚠️ Preview Release**: This library is in preview. APIs may change before the stable 1.0 release.

## Features

- Material Design-inspired components
- ARIA support and keyboard navigation
- Touch-optimized for mobile devices
- Dark mode and high contrast mode support
- TypeScript definitions included
- Tree-shakeable ES modules
- Built with Svelte 5 runes API

## Installation

```bash
npm install @14ch/svelte-ui
# or
pnpm add @14ch/svelte-ui
# or
yarn add @14ch/svelte-ui
```

## Setup

### 1. Import Styles

**Important**: You must import the CSS styles for the components to work properly.

Add this to your main app file (e.g., `app.html`, `+layout.svelte`, or `main.js`):

```javascript
// Import all necessary styles (recommended)
import '@14ch/svelte-ui/styles';
```

Or import individual style files:

```javascript
// Core styles (required)
import '@14ch/svelte-ui/styles/variables.scss';
import '@14ch/svelte-ui/styles/core.scss';

// Optional styles
import '@14ch/svelte-ui/styles/optional/fonts.scss'; // Material Symbols font
import '@14ch/svelte-ui/styles/optional/reset.scss'; // CSS reset
```

### 2. Basic Usage

```svelte
<script>
	import { Button, Input, Dialog } from '@14ch/svelte-ui';

	let dialogRef;
	let inputValue = $state('');
</script>

<Input bind:value={inputValue} placeholder="Enter your name" />

<Button onclick={() => dialogRef.open()}>Open Dialog</Button>

<Dialog bind:this={dialogRef} title="Greeting">
	<p>Hello {inputValue}!</p>
	<p>Welcome to Svelte UI Component Library.</p>
	{#snippet footer()}
		<Button onclick={() => dialogRef.close()}>Close</Button>
	{/snippet}
</Dialog>
```

## Available Components

### Form Components

- `Button` - Various button styles and states
- `Input` - Text input with validation support
- `Textarea` - Multi-line text input
- `Checkbox` - Checkbox with custom styling
- `CheckboxGroup` - Multiple checkbox selection group
- `Radio` - Radio button groups
- `RadioGroup` - Radio button group wrapper
- `Select` - Dropdown selection
- `Combobox` - Searchable dropdown
- `Slider` - Range slider input
- `Switch` - Toggle switch
- `ColorPicker` - Color selection input
- `Datepicker` - Date selection with calendar
- `FileUploader` - File upload with drag & drop
- `ImageUploader` - Image upload with preview

### Layout & Navigation

- `Tab` / `TabItem` - Tab navigation
- `Pagination` - Page navigation

### Modals

- `Dialog` - Modal dialogs
- `ConfirmDialog` - Confirmation dialogs
- `Drawer` - Side drawer

### Popups & Menus

- `Popup` - Popover content
- `PopupMenu` / `PopupMenuButton` - Context menus

### Notifications & Feedback

- `Snackbar` / `SnackbarItem` - Toast notifications
- `LoadingSpinner` - Loading indicators

### Skeleton Loaders

- `Skeleton` - Loading placeholders with preset patterns

### Icons & Buttons

- `Icon` - Material Symbols icons
- `IconButton` - Icon-based buttons
- `Fab` - Floating Action Button

## Component Examples

### Button Variants

```svelte
<script>
	import { Button } from '@14ch/svelte-ui';
</script>

<!-- Different variants -->
<Button variant="filled">Filled Button</Button>
<Button variant="outlined">Outlined Button</Button>
<Button variant="text">Text Button</Button>

<!-- With icons -->
<Button icon="add">Add Item</Button>

<!-- Different sizes -->
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>

<!-- States -->
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>
```

### Form Validation

```svelte
<script>
	import { Input, Checkbox, Button } from '@14ch/svelte-ui';

	let email = $state('');
	let password = $state('');
	let agreed = $state(false);

	const handleSubmit = () => {
		if (!email || !password || !agreed) {
			alert('Please fill all fields');
			return;
		}
		// Handle form submission
	};
</script>

<Input bind:value={email} type="email" placeholder="Email" required />

<Input bind:value={password} type="password" placeholder="Password" required />

<Checkbox bind:value={agreed}>I agree to the terms and conditions</Checkbox>

<Button onclick={handleSubmit} disabled={!agreed}>Sign Up</Button>
```

### Checkbox & Radio Groups

```svelte
<script>
	import { CheckboxGroup, RadioGroup } from '@14ch/svelte-ui';

	const options = [
		{ label: 'Option 1', value: 'opt1' },
		{ label: 'Option 2', value: 'opt2' },
		{ label: 'Option 3', value: 'opt3' }
	];

	let selectedCheckboxes = $state([]);
	let selectedRadio = $state(null);
</script>

<CheckboxGroup bind:value={selectedCheckboxes} {options} direction="vertical" gap="16px" />

<RadioGroup bind:value={selectedRadio} {options} direction="horizontal" gap="24px" />
```

### Skeleton Loaders

```svelte
<script>
	import { Skeleton, SkeletonBox, SkeletonText, SkeletonAvatar } from '@14ch/svelte-ui';
</script>

<!-- Using preset patterns -->
<Skeleton patterns={[{ type: 'article-list' }]} repeat={3} />
<Skeleton patterns={[{ type: 'product-list' }]} repeat={4} />

<!-- Using individual components for custom layouts -->
<div>
	<SkeletonAvatar showName={true} />
	<SkeletonBox width="100%" height="200px" />
	<SkeletonText lines={3} />
</div>
```

### Dialog with Confirmation

```svelte
<script>
	import { Button, ConfirmDialog } from '@14ch/svelte-ui';

	let confirmDialogRef;

	const handleDelete = () => {
		confirmDialogRef.open();
	};

	const onConfirm = () => {
		// Delete logic here
		console.log('Item deleted');
		confirmDialogRef.close();
	};
</script>

<Button variant="outlined" onclick={handleDelete}>Delete Item</Button>

<ConfirmDialog
	bind:this={confirmDialogRef}
	title="Confirm Delete"
	message="Are you sure you want to delete this item? This action cannot be undone."
	onconfirm={onConfirm}
	oncancel={() => confirmDialogRef.close()}
/>
```

## Dark Theme

Apply dark mode by setting the `data-theme` attribute:

```svelte
<script>
	import { Button } from '@14ch/svelte-ui';
	import { onMount } from 'svelte';

	let theme = $state('light');

	const toggleTheme = () => {
		theme = theme === 'light' ? 'dark' : 'light';
		document.body.setAttribute('data-theme', theme);
	};

	onMount(() => {
		document.body.setAttribute('data-theme', theme);
	});
</script>

<Button onclick={toggleTheme}>Toggle Theme</Button>
```

You can also apply dark mode to specific sections:

```svelte
<div data-theme="dark">
	<!-- This section and its children will use dark mode -->
	<Button>Dark Mode Button</Button>
</div>
```

## Customization

### CSS Custom Properties

The library uses CSS custom properties for easy theming:

```css
:root {
	--svelte-ui-primary-color: #1976d2;
	--svelte-ui-surface-color: #ffffff;
	--svelte-ui-text-color: #1f1f1f;
	--svelte-ui-border-radius: 8px;
	/* ... and many more */
}
```

### Customizing Dark Mode Colors

You can customize dark mode colors by overriding CSS variables:

```css
[data-theme='dark'] {
	--svelte-ui-primary-color: #90caf9;
	--svelte-ui-surface-color: #121212;
	--svelte-ui-text-color: #ffffff;
	/* ... customize other colors as needed */
}
```

## TypeScript Support

All components come with full TypeScript definitions:

```typescript
import type { MenuItem } from '@14ch/svelte-ui';

const menuItems: MenuItem[] = [
	{ title: 'Home', href: '/' },
	{ title: 'About', href: '/about' },
	{ title: 'Contact', href: '/contact' }
];
```

## Accessibility

This library is built with accessibility in mind:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader announcements
- Focus management
- High contrast mode support

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v0.0.3

- Improved text vertical alignment in Button, Fab, TabItem, Checkbox, and Radio components using `text-box-trim`
- Text labels now appear more visually centered within their containers

### v0.0.2

(Previous release notes...)

### v0.0.1

- Initial release
- 40+ components (Button, Input, Dialog, Skeleton loaders, etc.)
- CheckboxGroup and RadioGroup
- Skeleton component with preset patterns
- Material Design-inspired styling
- TypeScript support
- ARIA, keyboard navigation, screen reader support
- High contrast mode support
- Svelte 5 runes API
