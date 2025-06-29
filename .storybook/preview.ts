import type { Preview } from '@storybook/sveltekit';
import '../src/lib/assets/styles/import.scss';

const preview: Preview = {
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
