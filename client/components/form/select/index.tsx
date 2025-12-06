import { cn } from '$/client/lib/utils';
import {
	useMemo,
	type ComponentPropsWithoutRef,
	type ReactNode,
	useState,
	forwardRef,
	type ForwardedRef,
} from 'react';
import type { Items, SelectItem } from './types';
import { buildSelectItems, getMultiSelectTriggerText } from './utils';
import { CheckIcon, ChevronDown } from 'lucide-react';
import { Dropdown } from '../../ui/dropdown';

type SelectProps = Omit<ComponentPropsWithoutRef<'select'>, 'onSelect'> &
	Omit<ComponentPropsWithoutRef<'input'>, 'onSelect'> & {
		items: Items;
		onSelect: (value: string) => void;
		emptyItem?: ReactNode;
	};

export const Select = forwardRef<HTMLSelectElement | HTMLInputElement, SelectProps>(function Select(
	{ items, multiple, value, ...rest },
	ref,
) {
	const selectItems: SelectItem[] = useMemo(() => buildSelectItems(items), [items]);

	return multiple ? (
		<MultiSelect
			items={selectItems}
			ref={ref as ForwardedRef<HTMLInputElement>}
			value={value as MultiSelectProps['value']}
			{...rest}
		/>
	) : (
		<SingleSelect
			items={selectItems}
			ref={ref as ForwardedRef<HTMLSelectElement>}
			value={value}
			{...rest}
		/>
	);
});

type SingleSelectProps = Omit<SelectProps, 'items'> & {
	items: SelectItem[];
};

const SingleSelect = forwardRef<HTMLSelectElement, SingleSelectProps>(function SingleSelect(
	{ className, emptyItem, onSelect, items, name, ...rest },
	ref,
) {
	return (
		<select
			className='text-md bg-ghost-white cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
			name={name}
			id={name}
			onChange={(e) => {
				if (e.target.value) {
					onSelect(e.target.value);
				}
			}}
			ref={ref}
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
});

type MultiSelectProps = Omit<SingleSelectProps, 'value'> & {
	value?: string[];
};

const MultiSelect = forwardRef<HTMLInputElement, MultiSelectProps>(function MultiSelect(
	{ emptyItem, onSelect, items, value, className, ...rest },
	ref,
) {
	const [selectedItems, setSelectedItems] = useState<string[]>(value ?? []);

	function handleSelectItem(item: string) {
		setSelectedItems((prev) =>
			prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
		);
		onSelect(item);
	}

	const triggerText = getMultiSelectTriggerText(selectedItems, emptyItem);

	return (
		<Dropdown className={cn('w-64', className)}>
			<Dropdown.Trigger>
				<button
					type='button'
					className='bg-ghost-white text-md flex h-14 w-full items-center justify-between rounded-lg border border-gray-300 px-3 py-2 overflow-ellipsis text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
				>
					{triggerText}
					<ChevronDown className='h-4 w-4 text-gray-700' />
				</button>
			</Dropdown.Trigger>
			<input type='hidden' className='hidden' ref={ref} {...rest} />
			<Dropdown.Content className='bg-ghost-white mt-1 max-h-48 w-full overflow-y-auto rounded-lg shadow-lg'>
				{items.map((item) => {
					const isSelected = selectedItems.includes(item.value);

					return (
						<Dropdown.Item
							key={item.value}
							onClick={() => handleSelectItem(item.value)}
							className='text-md cursor-pointer px-4 py-3 text-gray-700 hover:bg-gray-200'
						>
							<label className='flex cursor-pointer items-center gap-2'>
								<span
									className={cn(
										'flex h-5 w-5 items-center justify-center rounded border border-gray-300',
										isSelected &&
											'text-ghost-white border-blue-500 bg-blue-500',
									)}
								>
									{isSelected && <CheckIcon className='h-3 w-3' />}
								</span>
								{item.label}
							</label>
						</Dropdown.Item>
					);
				})}
			</Dropdown.Content>
		</Dropdown>
	);
});
