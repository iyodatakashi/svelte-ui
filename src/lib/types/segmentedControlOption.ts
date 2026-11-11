import type { Option } from './options';

export type SegmentedControlOption =
	| (Option & {
			icon?: string;
			ariaLabel?: string;
	  })
	| (Omit<Option, 'label'> & {
			label?: never; // アイコンのみの場合はlabelを省略
			icon: string; // 必須（アイコンのみの場合）
			ariaLabel: string; // 必須（アイコンのみの場合）
	  });

/** @deprecated Use `SegmentedControlOption` instead. Remove in 0.0.100. */
export type SegmentedControlItem = SegmentedControlOption;
