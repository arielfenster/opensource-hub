import { cn } from '$/client/lib/utils';
import { useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import type { Items, SelectItem } from './types';
import { buildSelectItems } from './utils';

type SelectProps = ComponentPropsWithoutRef<'select'> & {
	items: Items;
	emptyItem?: ReactNode;
	onSelect?: (item: SelectItem) => void;
	renderItem?: (item: SelectItem) => ReactNode;
};

export function Select({
	items,
	emptyItem,
	onSelect,
	renderItem = DefaultRenderItem,
	className,
	name,
	...rest
}: SelectProps) {
	const selectItems = useMemo(() => buildSelectItems(items), [items]);

	return (
		<select className={cn('', className)} name={name} id={name} onChange={onSelect} {...rest}>
			{emptyItem && (
				<option key={name} value=''>
					{emptyItem}
				</option>
			)}
			{selectItems.map(renderItem)}
		</select>
	);
}

function DefaultRenderItem(item: SelectItem) {
	return (
		<option key={item.value} value={item.value}>
			{item.label}
		</option>
	);
}
