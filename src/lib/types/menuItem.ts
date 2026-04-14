export type MenuItem = {
	label: string;
	href?: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
	callback?: () => void;
	icon?: string;
	matchingPath?: string[];
	strictMatch?: boolean;
	disabled?: boolean;
};
