import { cn } from '$/client/lib/utils';
import { useMemo, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import type { Items, SelectItem } from './types';
import { buildSelectItems } from './utils';

type SelectProps<TValue> = Omit<ComponentPropsWithoutRef<'select'>, 'onSelect'> & {
	items: Items<TValue>;
	emptyItem?: ReactNode;
	onSelect?: (value: TValue) => void;
	renderItem?: (item: SelectItem) => ReactNode;
};

export function Select<TValue>({
	items,
	emptyItem,
	onSelect,
	renderItem = DefaultRenderItem,
	className,
	name,
	...rest
}: SelectProps<TValue>) {
	const selectItems = useMemo(() => buildSelectItems(items), [items]);

	return (
		<select
			className={cn('border border-black', className)}
			name={name}
			id={name}
			onChange={(e) => {
				if (e.target.value && onSelect) {
					onSelect(e.target.value as TValue);
				}
			}}
			{...rest}
		>
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
