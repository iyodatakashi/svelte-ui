/**
 * Style utility functions
 */

/**
 * Converts a number or string value to a CSS style value.
 * If the value is a number, it appends 'px' to it.
 * If the value is already a string, it returns as is.
 *
 * @param value - The value to convert (number or string)
 * @returns CSS style value as string
 *
 * @example
 * getStyleFromNumber(100) // "100px"
 * getStyleFromNumber("50%") // "50%"
 * getStyleFromNumber("2rem") // "2rem"
 */
export const getStyleFromNumber = (
	value: string | number | undefined,
	defaultValue?: string
): string => {
	if (value === undefined || value === null) {
		return defaultValue || '';
	}
	return typeof value === 'number' ? `${value}px` : value;
};
