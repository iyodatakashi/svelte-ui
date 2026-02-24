// Mock for $app/navigation in browser tests
export const afterNavigate = (callback: () => void) => {
	// In test environment, call immediately
	if (typeof window !== 'undefined') {
		callback();
	}
	return () => {}; // Return unsubscribe function
};

export const beforeNavigate = () => () => {};

export const goto = () => Promise.resolve();

export const invalidate = () => Promise.resolve();

export const invalidateAll = () => Promise.resolve();

export const preloadData = () => Promise.resolve();

export const preloadCode = () => Promise.resolve();

export const preloadRoutes = () => Promise.resolve();
