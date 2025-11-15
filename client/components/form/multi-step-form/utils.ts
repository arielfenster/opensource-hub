import { Children, type PropsWithChildren, type ReactElement, type ReactNode } from 'react';

export function getTypedChildren(children: ReactNode) {
	return Children.toArray(children) as ReactElement[];
}

export function filterChildren<T>(
	children: ReactElement[],
	target: T,
): (T & ReactElement<PropsWithChildren>)[] {
	return children.filter((child) => child.type === target) as any;
}

export function buildFormId(currentStep: number) {
	return `multi-step-form-step-${currentStep}`;
}
