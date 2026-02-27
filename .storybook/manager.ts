import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const theme = create({
	base: 'light', // or 'dark' – Storybook UI theme
	brandTitle: 'Svelte UI' // ロゴ部分に表示するテキスト
	// brandImage は指定しないのでテキストのみ表示される
});

addons.setConfig({
	theme
});
