import { cn } from '$/client/lib/utils';
import type { PropsWithChildren } from 'react';

type CommonProps = PropsWithChildren<{
	className?: string;
}>;

function Table({ className, children }: CommonProps) {
	return (
		<table className={cn('min-w-full text-left text-base text-gray-700', className)}>
			{children}
		</table>
	);
}

function TableHeader({ className, children }: CommonProps) {
	return (
		<thead className={className}>
			<tr>{children}</tr>
		</thead>
	);
}

function TableHead({ className, children }: CommonProps) {
	return (
		<th
			className={cn(
				'border-b border-gray-200 bg-gray-50 px-6 py-3 text-lg font-bold tracking-wider text-blue-700 uppercase',
				className,
			)}
		>
			{children}
		</th>
	);
}

function TableBody({ className, children }: CommonProps) {
	return <tbody className={className}>{children}</tbody>;
}

function TableRow({ className, children }: CommonProps) {
	return (
		<tr
			className={cn(
				'transition-colors duration-150 odd:bg-gray-100 even:bg-white hover:bg-blue-100',
				className,
			)}
		>
			{children}
		</tr>
	);
}

function TableCell({ className, children }: CommonProps) {
	return <td className={cn('px-6 py-4', className)}>{children}</td>;
}

function TablePagination() {}

function TableNavigation() {}

Table.Header = TableHeader;
Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Pagination = TablePagination;
Table.Navigation = TableNavigation;

export { Table };
