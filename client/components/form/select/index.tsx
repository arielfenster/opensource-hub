import { cn } from '$/client/lib/utils';
import { useMemo, type ComponentPropsWithoutRef, type ReactNode, useState } from 'react';
import type { Items, SelectItem } from './types';
import { buildSelectItems, getMultiSelectTriggerText } from './utils';
import { CheckIcon, ChevronDown } from 'lucide-react';

type SelectProps = Omit<ComponentPropsWithoutRef<'select'>, 'onSelect'> & {
	items: Items;
	emptyItem?: ReactNode;
	onSelect: (value: string) => void;
};

type SelectImplementationProps = Omit<SelectProps, 'items'> & {
	items: SelectItem[];
};

export function Select({ items, multiple, ...rest }: SelectProps) {
	const selectItems: SelectItem[] = useMemo(() => buildSelectItems(items), [items]);

	return multiple ? (
		<MultiSelect items={selectItems} {...rest} />
	) : (
		<SingleSelect items={selectItems} {...rest} />
	);
}

function SingleSelect({
	className,
	emptyItem,
	onSelect,
	items,
	name,
	...rest
}: SelectImplementationProps) {
	return (
		<select
			className='text-md bg-ghost-white rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
			name={name}
			id={name}
			onChange={(e) => {
				if (e.target.value) {
					onSelect(e.target.value);
				}
			}}
			{...rest}
		>
			{emptyItem && (
				<option key={name} value=''>
					{emptyItem}
				</option>
			)}
			{items.map((item) => (
				<option key={item.value} value={item.value}>
					{item.label}
				</option>
			))}
		</select>
	);
}

function MultiSelect({ emptyItem, onSelect, items }: SelectImplementationProps) {
	const [open, setOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	function handleSelectItem(item: string) {
		setSelectedItems((prev) =>
			prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
		);
		onSelect(item);
	}

	const triggerText = getMultiSelectTriggerText(selectedItems, emptyItem);

	return (
		<div className='relative w-64'>
			<button
				onClick={() => setOpen(!open)}
				className='bg-ghost-white flex h-14 w-full items-center justify-between rounded-lg border border-gray-300 px-3 py-2 text-sm overflow-ellipsis text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
			>
				{triggerText}
				<ChevronDown className='h-4 w-4 text-gray-700' />
			</button>

			{open && (
				<ul className='bg-ghost-white absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg shadow-lg'>
					{items.map((item) => {
						const isSelected = selectedItems.includes(item.value);

						return (
							<li
								key={item.value}
								onClick={() => handleSelectItem(item.value)}
								className={cn(
									'cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-gray-100',
								)}
							>
								<label className='flex cursor-pointer items-center gap-2 px-3'>
									<span
										className={cn(
											'flex h-4 w-4 items-center justify-center rounded border border-gray-300',
											isSelected &&
												'text-ghost-white border-blue-500 bg-blue-500',
										)}
									>
										{isSelected && <CheckIcon className='h-3 w-3' />}
									</span>
									{item.label}
								</label>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
