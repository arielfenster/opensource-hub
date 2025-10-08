import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function objectValues<TObj extends Record<string, string>>(
	obj: TObj,
): [TObj[keyof TObj], ...TObj[keyof TObj][]] {
	return Object.values(obj) as any;
}

export function objectValues2<TObj extends Record<string, string>>(obj: TObj): (keyof TObj)[] {
	return Object.values(obj) as any;
}

export function parseDate(date: Date) {
	return date.toLocaleDateString().split('/').reverse().join('/');
}
