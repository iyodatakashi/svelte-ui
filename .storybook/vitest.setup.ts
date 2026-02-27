import { setProjectAnnotations } from '@storybook/sveltekit';
import * as preview from './preview';

// Storybook の preview 設定を Vitest 側にも適用する
setProjectAnnotations([preview]);

