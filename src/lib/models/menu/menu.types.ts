export type MenuItem = {
	label: string;
	href?: string;
	target?: '_blank' | '_self' | '_parent' | '_top';
	callback?: () => void;
	icon?: string;
	/** Makes the item a `menuitemradio` showing a check mark when true. Takes the icon column, so `icon` is not shown. */
	checked?: boolean;
	matchingPath?: string[];
	strictMatch?: boolean;
	disabled?: boolean;
	children?: MenuItem[];
};
