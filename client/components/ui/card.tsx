import { cn } from '$/client/lib/utils';
import type { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
	className?: string;
}>;

function Card({ className, children }: CardProps) {
	return (
		<div className={cn('flex flex-col gap-6 rounded-2xl p-6 shadow-lg', className)}>
			{children}
		</div>
	);
}

function CardHeader({ children }: PropsWithChildren) {
	return <div className='flex flex-col gap-2'>{children}</div>;
}

function CardTitle({ children }: PropsWithChildren) {
	return <span className='text-royal-blue text-2xl font-semibold'>{children}</span>;
}

function CardBody({ children }: PropsWithChildren) {
	return <div>{children}</div>;
}

function CardFooter({ separator, children }: PropsWithChildren<{ separator?: boolean }>) {
	return (
		<div
			className={cn(
				'flex w-full justify-between',
				separator && 'w-full border-t border-black pt-4',
			)}
		>
			{children}
		</div>
	);
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
