const URL_CHANGE_EVENT = 'svelte-ui:urlchange';

let historyPatched = false;

const patchHistory = () => {
	if (historyPatched || typeof window === 'undefined') return;
	historyPatched = true;
	const originalPushState = history.pushState.bind(history);
	const originalReplaceState = history.replaceState.bind(history);
	history.pushState = (...args: Parameters<typeof history.pushState>) => {
		originalPushState(...args);
		window.dispatchEvent(new Event(URL_CHANGE_EVENT));
	};
	history.replaceState = (...args: Parameters<typeof history.replaceState>) => {
		originalReplaceState(...args);
		window.dispatchEvent(new Event(URL_CHANGE_EVENT));
	};
};

export const subscribeUrlChange = (handler: () => void): () => void => {
	if (typeof window === 'undefined') {
		return () => {};
	}

	patchHistory();

	window.addEventListener('popstate', handler);
	window.addEventListener(URL_CHANGE_EVENT, handler);

	return () => {
		window.removeEventListener('popstate', handler);
		window.removeEventListener(URL_CHANGE_EVENT, handler);
	};
};

