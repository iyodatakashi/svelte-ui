import type { Preview } from '@storybook/sveltekit';
// Core styles (required for components)
import '../src/lib/assets/styles/import.scss';
// Optional styles for Storybook
import '../src/lib/assets/styles/optional/reset.scss';
import '../src/lib/assets/styles/optional/fonts.scss';
// Storybook main styles
import './styles/main.css';
// Dark theme styles for Preview area
import './styles/dark-theme.css';
// Theme plugin
import { withTheme, themeParameters } from './plugins/theme-plugin';

const preview: Preview = {
	decorators: [withTheme],
	parameters: {
		...themeParameters,
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		},
		options: {
			storySort: {
				order: ['Forms', 'UI', 'Navigation']
			}
		}
	}
};

export default preview;
