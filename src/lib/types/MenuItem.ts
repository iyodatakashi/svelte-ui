export type MenuItem = {
	title: string;
	href?: string;
	callback?: () => void;
	icon?: string;
	matchingPath?: string[];
	strictMatch?: boolean;
};
