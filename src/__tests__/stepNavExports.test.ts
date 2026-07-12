import { describe, it, expect } from 'vitest';
import { StepNav } from '$lib/index';
import type { StepNavProps, StepItem, StepNavOrientation } from '$lib/index';

describe('StepNav public API exports', () => {
	it('StepNav コンポーネントがバレルから公開されている', () => {
		expect(StepNav).toBeDefined();
	});

	it('StepItem / StepNavProps / StepNavOrientation 型がバレルから利用できる', () => {
		const item: StepItem = { label: 'A' };
		const orientation: StepNavOrientation = 'vertical';
		const props: StepNavProps = { items: [item], orientation };
		expect(props.items[0].label).toBe('A');
		expect(props.orientation).toBe('vertical');
	});
});
