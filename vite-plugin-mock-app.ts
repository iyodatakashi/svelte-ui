import type { Plugin } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite plugin to mock SvelteKit $app modules for browser tests
 * This plugin intercepts $app module imports and redirects them to mock files
 */
export function mockAppModules(): Plugin {
	return {
		name: 'mock-app-modules',
		enforce: 'pre', // Run before other plugins
		resolveId(id, importer) {
			// Intercept $app module imports
			if (id.startsWith('$app/')) {
				const moduleName = id.replace('$app/', '');
				const mockPath = path.resolve(__dirname, `./src/__tests__/mocks/$app/${moduleName}.ts`);
				// Return the resolved path - Vite will use this to resolve the module
				return mockPath;
			}
			return null; // Let other plugins handle this
		}
	};
}
