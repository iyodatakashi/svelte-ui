import type { MenuItem } from '$lib/types/menuItem';

export const getCurrentPath = (currentPath?: string): string => {
	if (currentPath && currentPath !== '') return currentPath;
	if (typeof window !== 'undefined') return window.location.pathname;
	return '';
};

export const normalizePath = (path: string, pathPrefix: string): string => {
	if (!pathPrefix) return path;
	if (path.startsWith(pathPrefix)) {
		const normalized = path.substring(pathPrefix.length);
		return normalized.startsWith('/') ? normalized : '/' + normalized;
	}
	return path;
};

export const matchPath = (
	currentPath: string,
	itemHref: string,
	item: MenuItem,
	pathPrefix: string,
	customPathMatcher?: (currentPath: string, itemHref: string, item: MenuItem) => boolean
): boolean => {
	if (customPathMatcher) return customPathMatcher(currentPath, itemHref, item);
	const normalizedCurrentPath = normalizePath(currentPath, pathPrefix);
	if (item.matchingPath?.some((href) => normalizedCurrentPath.startsWith(href))) return true;
	if (item.strictMatch) return normalizedCurrentPath === itemHref;
	if (itemHref === '/') return normalizedCurrentPath === '/';
	return normalizedCurrentPath !== '' && normalizedCurrentPath.startsWith(itemHref);
};
