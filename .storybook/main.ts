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
		'@storybook/addon-vitest'
	],
	framework: {
		name: '@storybook/sveltekit',
		options: {}
	}
};
export default config;
