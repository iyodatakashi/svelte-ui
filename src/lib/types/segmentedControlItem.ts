export type SegmentedControlItem =
	| {
			label: string; // テキストラベルがある場合
			value: string;
			icon?: string;
			disabled?: boolean;
			ariaLabel?: string;
	  }
	| {
			label?: never; // アイコンのみの場合はlabelを省略
			value: string;
			icon: string; // 必須（アイコンのみの場合）
			disabled?: boolean;
			ariaLabel: string; // 必須（アイコンのみの場合）
	  };
