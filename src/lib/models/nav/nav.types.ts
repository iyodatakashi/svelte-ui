import type {
	IconGrade,
	IconOpticalSize,
	IconVariant,
	IconWeight
} from '#lib/models/icon/icon.types';
import type { MenuItem } from '#lib/models/menu/menu.types';

/**
 * Nav variant type
 * Used by Nav component
 */
export type NavVariant = 'vertical' | 'horizontal' | 'mobile';

/**
 * Display variant for Nav hierarchical (children) menus.
 * - `popup`: child items appear in a floating panel (all variants)
 * - `accordion`: child items expand/collapse inline (vertical only)
 * - `expanded`: child items are always visible inline (vertical only)
 * - `bar`: child items appear in a secondary bar below the nav (horizontal only)
 */
export type ChildrenVariant = 'popup' | 'accordion' | 'expanded' | 'bar';

export type NavProps = (
	| {
			/** Layout variant. @default 'horizontal' */
			variant?: 'horizontal';
			/** Visual style for the selected item. */
			selectedVariant?: NavItemSelectedVariant;
	  }
	| {
			variant: Exclude<NavVariant, 'horizontal'>;
			/** Visual style for the selected item. `underline` is only available with `horizontal`. */
			selectedVariant?: Exclude<NavItemSelectedVariant, 'underline'>;
	  }
) & {
	// 基本プロパティ
	/** `{ label, href, icon?, children?, disabled? }[]` */
	navItems?: MenuItem[];
	/** `navItems` のエイリアス。両方指定された場合は `navItems` が優先。 */
	items?: MenuItem[];
	/** Prepended to each item's href for active-state matching. */
	pathPrefix?: string;
	/** Custom function to determine if an item is active. */
	customPathMatcher?: (currentPath: string, itemHref: string, item: MenuItem) => boolean;
	/** Overrides the auto-detected current path. */
	currentPath?: string;

	// HTML属性
	id?: string;

	// アイコン関連
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;

	// スタイル/レイアウト
	/** Custom CSS color for item labels. */
	textColor?: string;
	/** Custom CSS color for the selected item label. */
	selectedTextColor?: string;
	/** Custom CSS color for the selected underline bar (underline variant). */
	selectedBarColor?: string;
	gap?: number | string;
	/** How child items are displayed. Defaults to `accordion` (vertical), `bar` (horizontal), `popup` (mobile). */
	childrenVariant?: ChildrenVariant;
	/** On mobile, displays the popup submenu as a sheet that slides up from the bottom. @default false */
	mobileFullscreen?: boolean;
	/** Show chevron icon on parent items. @default true */
	chevron?: boolean;
	/** Inline style applied to the nav container element. */
	customContainerStyle?: string;
	/** Inline style applied to each nav item element. */
	customItemStyle?: string;
	/** Inline style applied to each child nav item element. */
	customChildrenItemStyle?: string;
	/** Inline style applied to the children container (accordion/expanded list, bar row). */
	customChildrenContainerStyle?: string;

	// ARIA/アクセシビリティ
	ariaLabel?: string;
	ariaLabelledby?: string;
};

export type NavItemSelectedVariant = 'color' | 'filled' | 'tonal' | 'underline';

export type NavItemProps = {
	// 基本プロパティ
	item: MenuItem;
	variant?: NavVariant;
	pathPrefix?: string;
	/** Current URL path passed from Nav for computing child selected state. */
	resolvedCurrentPath?: string;
	/** Custom function to determine if a child item is active. */
	customPathMatcher?: (currentPath: string, itemHref: string, item: MenuItem) => boolean;

	// アイコン関連
	iconFilled?: boolean;
	iconWeight?: IconWeight;
	iconGrade?: IconGrade;
	iconOpticalSize?: IconOpticalSize;
	iconVariant?: IconVariant;

	// スタイル/レイアウト
	/** Show chevron icon on parent items. @default true */
	chevron?: boolean;
	selectedVariant?: NavItemSelectedVariant;
	/** Custom CSS color for the item label. */
	textColor?: string;
	/** Custom CSS color for the selected item label. */
	selectedTextColor?: string;
	/** Custom CSS color for the selected underline bar (underline variant). */
	selectedBarColor?: string;
	/** How child items are displayed. Defaults to `accordion` (vertical), `bar` (horizontal), `popup` (mobile). */
	childrenVariant?: ChildrenVariant;
	/** On mobile, displays the popup as a sheet that slides up from the bottom. @default false */
	mobileFullscreen?: boolean;
	/** Inline style applied to this nav item element. */
	customStyle?: string;
	/** Inline style applied to each child nav item element. */
	customChildrenStyle?: string;
	/** Inline style applied to the children container (accordion/expanded list). */
	customChildrenContainerStyle?: string;

	// 状態/動作
	isSelected?: boolean;
	isDisabled?: boolean;
	/** When true, this item does not render its own children (prevents infinite recursion). */
	isChild?: boolean;
	/** Whether this item's children are currently visible. */
	isChildrenVisible?: boolean;
};
