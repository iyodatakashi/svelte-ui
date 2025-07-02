import type { Preview } from '@storybook/sveltekit';
import '../src/lib/assets/styles/import.scss';

const withTheme = (Story, context) => {
	const theme = context.globals.theme || 'light';
	if (typeof document !== 'undefined') {
		document.body.setAttribute('data-theme', theme);
		const main = document.querySelector('.sb-show-main') as HTMLElement | null;
		if (main) {
			main.style.background = theme === 'dark' ? '#232220' : '#fafafa';
		}
	}
	return Story();
};

const preview: Preview = {
	decorators: [withTheme],
	globalTypes: {
		theme: {
			name: 'Theme',
			description: 'Global theme for components',
			defaultValue: 'light',
			toolbar: {
				icon: 'circlehollow',
				items: [
					{ value: 'light', title: 'Light' },
					{ value: 'dark', title: 'Dark' }
				],
				showName: true
			}
		}
	},
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i
			}
		}
	}
};

export default preview;
