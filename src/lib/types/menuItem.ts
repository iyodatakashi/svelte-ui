export type MenuItem = {
	label: string;
	href?: string;
	callback?: () => void;
	icon?: string;
	matchingPath?: string[];
	strictMatch?: boolean;
	disabled?: boolean;
};
