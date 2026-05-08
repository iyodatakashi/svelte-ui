/**
 * Common component prop types
 * Exported types for component props with fixed string literal unions
 */

/**
 * Popup position type
 * Used by Popup, PopupMenu, PopupMenuButton components
 */
export type PopupPosition =
	| 'top'
	| 'bottom'
	| 'left'
	| 'right'
	| 'top-left'
	| 'top-center'
	| 'top-right'
	| 'bottom-left'
	| 'bottom-center'
	| 'bottom-right'
	| 'left-top'
	| 'left-center'
	| 'left-bottom'
	| 'right-top'
	| 'right-center'
	| 'right-bottom'
	| 'auto';

/**
 * Snackbar position type (top/bottom)
 * Used by Snackbar, SnackbarItem components
 */
export type SnackbarPosition = 'top' | 'bottom';

/**
 * Fab position type (left/center/right)
 * Used by Fab component
 */
export type FabPosition = 'left' | 'center' | 'right';

/**
 * Button variant type
 * Used by Button, IconButton, Fab components
 */
export type ButtonVariant = 'ghost' | 'filled' | 'outlined' | 'glass';

/**
 * Button size type
 * Used by Button component
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Snackbar type
 * Used by SnackbarItem component
 */
export type SnackbarType = 'info' | 'success' | 'warning' | 'error' | 'default';

/**
 * Snackbar variant type
 * Used by SnackbarItem component
 */
export type SnackbarVariant = 'filled' | 'outlined';

/**
 * Badge variant type
 * Used by IconButton component
 */
export type BadgeVariant = 'dot' | 'count';

/**
 * Datepicker mode type
 * Used by Datepicker component
 */
export type DatepickerMode = 'single' | 'range';

/**
 * Focus style type
 * Used by Input, Textarea, Datepicker components
 */
export type FocusStyle = 'background' | 'outline' | 'none';

/**
 * Nav variant type
 * Used by Nav component
 */
export type NavVariant = 'vertical' | 'horizontal' | 'mobile';

/**
 * Sub-menu display mode for Nav hierarchical menus.
 * - `popup`: child items appear in a floating panel (all variants)
 * - `accordion`: child items expand/collapse inline (vertical only)
 * - `expanded`: child items are always visible inline (vertical only)
 * - `bar`: child items appear in a secondary bar below the nav (horizontal only)
 * - `bottom-sheet`: child items appear in a fixed bottom sheet overlay (mobile only)
 */
export type SubMenuMode = 'popup' | 'accordion' | 'expanded' | 'bar' | 'bottom-sheet';
