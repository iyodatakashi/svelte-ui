/**
 * Verifies that all files under dist/ that are required for the package to work
 * are included in the npm pack (i.e. listed in package.json "files").
 * Run before publish to catch missing "files" entries (e.g. dist/config.js).
 */
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// Ignore macOS cruft and duplicate files (e.g. "config 2.js")
const IGNORE_PATTERNS = /^\.DS_Store$|\s\d+\.(js|ts|svelte)$/;

function collectDistFiles(dir, base = 'dist') {
	const entries = fs.readdirSync(dir, { withFileTypes: true });
	const files = [];
	for (const e of entries) {
		if (IGNORE_PATTERNS.test(e.name)) continue;
		const rel = path.join(base, e.name);
		if (e.isFile()) {
			files.push(rel);
		} else if (e.isDirectory()) {
			files.push(...collectDistFiles(path.join(dir, e.name), rel));
		}
	}
	return files;
}

function main() {
	const distPath = path.join(root, 'dist');
	if (!fs.existsSync(distPath)) {
		console.error('Error: dist/ not found. Run "npm run package" first.');
		process.exit(1);
	}

	const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
	const tarballName = `${pkg.name.replace('@', '').replace('/', '-')}-${pkg.version}.tgz`;
	const tarballPath = path.join(root, tarballName);

	// Build the list of files that exist under dist/
	const requiredFiles = collectDistFiles(distPath);

	try {
		execSync('npm pack', { cwd: root, stdio: 'pipe' });
	} catch (err) {
		console.error('Error: npm pack failed.');
		process.exit(1);
	}

	let packedList = [];
	try {
		packedList = execSync(`tar -tf "${tarballName}"`, {
			cwd: root,
			encoding: 'utf8'
		})
			.trim()
			.split('\n')
			.map((line) => line.replace(/^package\//, ''));
	} finally {
		if (fs.existsSync(tarballPath)) {
			fs.unlinkSync(tarballPath);
		}
	}

	const packedSet = new Set(packedList);
	const missing = requiredFiles.filter((f) => !packedSet.has(f));

	if (missing.length > 0) {
		console.error(
			'Error: The following dist files exist but are NOT included in the npm package.\n' +
				'Add them to the "files" array in package.json and run "npm run package" again.\n'
		);
		missing.forEach((f) => console.error('  -', f));
		process.exit(1);
	}

	console.log('Package verification passed: all dist files are included in the pack.');
}

main();
