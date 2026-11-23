// Mock for $app/state in browser tests
export const page = {
	url: new URL('http://localhost/'),
	params: {},
	route: { id: null },
	status: 200,
	error: null,
	data: {},
	form: null
};

export const navigating = {
	from: null,
	to: null,
	type: null,
	willUnload: null,
	delta: null,
	complete: null
};

export const updated = {
	current: false,
	check: () => Promise.resolve(false)
};
