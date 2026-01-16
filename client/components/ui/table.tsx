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

// const mockData = [
// 	{ name: 'Alice Blaze', score: 99, status: '🔥' },
// 	{ name: 'Bob Ember', score: 87, status: '⚡' },
// 	{ name: 'Charlie Inferno', score: 92, status: '🔥' },
// 	{ name: 'Diana Spark', score: 76, status: '🌊' },
// 	{ name: 'Eve Pyro', score: 88, status: '🔥' },
// 	{ name: 'Frank Storm', score: 81, status: '⚡' },
// 	{ name: 'Grace Frost', score: 73, status: '❄️' },
// 	{ name: 'Hank Quake', score: 85, status: '🌋' },
// ];

// export function FireTable() {
// 	return (
// 		<div className='mx-auto mt-10 max-w-2xl rounded-2xl border border-orange-500/40 bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-2xl backdrop-blur-md'>
// 			<table className='min-w-full text-sm text-gray-200'>
// 				<thead>
// 					<tr>
// 						<th className='bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text px-6 py-3 text-lg font-extrabold tracking-wider text-transparent uppercase shadow-lg'>
// 							Name
// 						</th>
// 						<th className='bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text px-6 py-3 text-lg font-extrabold tracking-wider text-transparent uppercase shadow-lg'>
// 							Score
// 						</th>
// 						<th className='bg-gradient-to-r from-orange-500 via-pink-500 to-yellow-400 bg-clip-text px-6 py-3 text-lg font-extrabold tracking-wider text-transparent uppercase shadow-lg'>
// 							Status
// 						</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{mockData.map((row, idx) => (
// 						<tr
// 							key={row.name}
// 							className={`transition-all duration-200 ${
// 								idx % 2 === 0
// 									? 'bg-black/30'
// 									: 'bg-gradient-to-r from-orange-900/30 to-black/10'
// 							} hover:z-10 hover:scale-105 hover:shadow-[0_0_20px_5px_rgba(255,115,0,0.3)]`}
// 						>
// 							<td className='px-6 py-4 font-semibold'>{row.name}</td>
// 							<td className='px-6 py-4'>{row.score}</td>
// 							<td className='px-6 py-4 text-2xl'>{row.status}</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// }

// export function FireTableWhite() {
// 	return (
// 		<div className='mx-auto mt-10 max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-lg'>
// 			<table className='min-w-full text-left text-base text-gray-700'>
// 				<thead>
// 					<tr>
// 						<th className='border-b border-gray-200 bg-gray-50 px-6 py-3 text-lg font-bold tracking-wider text-blue-700 uppercase'>
// 							Name
// 						</th>
// 						<th className='border-b border-gray-200 bg-gray-50 px-6 py-3 text-lg font-bold tracking-wider text-blue-700 uppercase'>
// 							Score
// 						</th>
// 						<th className='border-b border-gray-200 bg-gray-50 px-6 py-3 text-lg font-bold tracking-wider text-blue-700 uppercase'>
// 							Status
// 						</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{mockData.map((row, idx) => (
// 						<tr
// 							key={row.name}
// 							className={cn(
// 								`transition-colors duration-150 hover:bg-blue-100`,
// 								idx % 2 === 0 ? 'bg-white' : 'bg-gray-100',
// 							)}
// 						>
// 							<td className='px-6 py-4 font-medium'>{row.name}</td>
// 							<td className='px-6 py-4'>{row.score}</td>
// 							<td className='px-6 py-4 text-xl'>{row.status}</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// }
