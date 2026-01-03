import { withThemeByDataAttribute } from '@storybook/addon-themes';

export const withTheme = withThemeByDataAttribute({
	themes: {
		light: 'light',
		dark: 'dark'
	},
	defaultTheme: 'light',
	attributeName: 'data-theme'
});

export const themeParameters = {
	themes: {
		light: {
			name: 'Light',
			class: 'light',
			color: '#ffffff'
		},
		dark: {
			name: 'Dark',
			class: 'dark',
			color: '#232220'
		}
	}
};
