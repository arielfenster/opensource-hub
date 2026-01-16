import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseDate(date: Date | string) {
	return new Date(date).toLocaleDateString().split('/').reverse().join('/');
}

export function capitalize(str: string) {
	return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

export function fromKebabCase(str: string) {
	return str.replace(/([a-z])([A-Z])/g, (_, p1, p2) => `${p1} ${p2}`);
}
