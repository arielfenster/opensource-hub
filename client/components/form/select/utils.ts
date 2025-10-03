import type { ReactNode } from 'react';
import type { Items, SelectItem } from './types';

export function buildSelectItems(input: Items): SelectItem[] {
	if (Array.isArray(input)) {
		return input;
	}

	return Object.entries(input).map(([key, value]) => ({ label: key, value: value }));
}

const MAX_ITEMS_DISPLAYED = 4;

export function getMultiSelectTriggerText(selectedItems: string[], emptyItem?: ReactNode) {
	if (selectedItems.length > 0) {
		if (selectedItems.length > MAX_ITEMS_DISPLAYED) {
			return `${selectedItems.join(', ')} +${selectedItems.length - MAX_ITEMS_DISPLAYED} more`;
		}

		return `${selectedItems.join(', ')}`;
	}

	if (emptyItem) {
		return emptyItem;
	}

	return 'Select values';
}
