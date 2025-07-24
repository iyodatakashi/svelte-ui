# Svelte UI

A modern, accessible Svelte component library with built-in TypeScript support and Material Design-inspired styling.

## Features

- 🎨 **Material Design-inspired** components
- ♿ **Accessibility-first** design with ARIA support
- 📱 **Mobile-responsive** with touch-optimized interactions
- 🌙 **Dark mode** support
- 🔧 **TypeScript** ready
- 🎯 **Zero dependencies** (except peer dependencies)
- 📦 **Tree-shakeable** exports

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
	let inputValue = '';
</script>

<Input bind:value={inputValue} placeholder="Enter your name" />

<Button onclick={() => dialogRef.open()}>Open Dialog</Button>

<Dialog bind:this={dialogRef}>
	<h2>Hello {inputValue}!</h2>
	<p>Welcome to Svelte UI Component Library.</p>
</Dialog>
```

## Available Components

### Form Components

- `Button` - Various button styles and states
- `Input` - Text input with validation support
- `Textarea` - Multi-line text input
- `Checkbox` - Checkbox with custom styling
- `Radio` - Radio button groups
- `Select` - Dropdown selection
- `Combobox` - Searchable dropdown
- `ColorPicker` - Color selection input
- `Datepicker` - Date selection with calendar
- `FileUploader` - File upload with drag & drop
- `ImageUploader` - Image upload with preview

### Layout & Navigation

- `Tab` / `TabItem` - Tab navigation
- `Pagination` - Page navigation
- `Fab` - Floating Action Button

### Feedback & Overlays

- `Dialog` - Modal dialogs
- `Drawer` - Side panel
- `Popup` - Popover content
- `PopupMenu` / `PopupMenuButton` - Context menus
- `ConfirmDialog` - Confirmation dialogs
- `LoadingSpinner` - Loading indicators

### Utilities

- `Icon` - Material Symbols icons
- `IconButton` - Icon-based buttons
- `Modal` - Base modal component

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

	let email = '';
	let password = '';
	let agreed = false;

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

<Button variant="outlined" color="var(--svelte-ui-error-color)" onclick={handleDelete}>
	Delete Item
</Button>

<ConfirmDialog
	bind:this={confirmDialogRef}
	title="Confirm Delete"
	message="Are you sure you want to delete this item? This action cannot be undone."
	onconfirm={onConfirm}
	oncancel={() => confirmDialogRef.close()}
/>
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

### Dark Mode

```css
[data-theme='dark'] {
	--svelte-ui-surface-color: #121212;
	--svelte-ui-text-color: #ffffff;
	/* ... other dark mode colors */
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

## Development

### Prerequisites

- Node.js 18+
- npm/pnpm/yarn

### Setup

```bash
git clone <repository-url>
cd svelte-ui
npm install
```

### Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run package      # Build library package
npm run storybook    # Start Storybook
npm run test         # Run tests
npm run lint         # Lint code
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### v0.0.1

- Initial release
- Core component library with 25+ components
- Material Design-inspired styling
- Full TypeScript support
- Accessibility features
