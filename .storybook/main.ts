import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
	stories: [
		'../src/**/*.mdx',
		'../src/**/*.stories.@(js|ts|svelte)',
		'../src/stories/**/*.stories.@(js|jsx|ts|tsx|svelte)'
	],
	addons: [
		'@storybook/addon-svelte-csf',
		'@chromatic-com/storybook',
		'@storybook/addon-docs',
		'@storybook/addon-a11y',
		'@storybook/addon-themes',
		{
			name: '@storybook/addon-vitest',
			options: {
				configFile: './vitest.config.ts'
			}
		}
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	}
};
export default config;
