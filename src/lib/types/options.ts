// =========================================================================
// Common Option Types
// =========================================================================

export type Option = {
	value: OptionValue;
	label: string;
	disabled?: boolean;
};

export type OptionValue = string | number | boolean | null | undefined;
