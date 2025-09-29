import type { Items, SelectItem } from './types';

export function buildSelectItems(input: Items): SelectItem[] {
	if (Array.isArray(input)) {
		return input;
	}

	return Object.entries(input).map(([key, value]) => ({ label: key, value: value }));
}
