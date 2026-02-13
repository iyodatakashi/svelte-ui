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
