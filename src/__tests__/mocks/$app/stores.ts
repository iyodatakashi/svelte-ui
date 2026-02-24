// Mock for $app/stores in browser tests
export const page = {
	subscribe: (callback: (value: any) => void) => {
		// Return a mock page object
		callback({
			url: new URL('http://localhost/'),
			params: {},
			route: { id: null },
			status: 200,
			error: null,
			data: {},
			form: null
		});
		return () => {}; // Return unsubscribe function
	}
};

export const navigating = {
	subscribe: (callback: (value: any) => void) => {
		callback(null);
		return () => {};
	}
};

export const updated = {
	subscribe: (callback: (value: any) => void) => {
		callback(false);
		return () => {};
	},
	check: () => Promise.resolve(false)
};
