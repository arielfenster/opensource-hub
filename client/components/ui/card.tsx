import { cn } from '$/client/lib/utils';
import type { PropsWithChildren } from 'react';

type CommonProps = PropsWithChildren<{
	className?: string;
}>;

function Card({ className, children }: CommonProps) {
	return (
		<article
			className={cn(
				'flex flex-col justify-between gap-6 rounded-2xl p-6 shadow-lg',
				className,
			)}
		>
			{children}
		</article>
	);
}

function CardHeader({ children }: CommonProps) {
	return <div className='flex flex-col gap-2'>{children}</div>;
}

function CardTitle({ children }: CommonProps) {
	return <span className='text-eerie-black text-xl font-semibold'>{children}</span>;
}

function CardDescription({ children }: CommonProps) {
	return <span className='text-md text-eerie-black line-clamp-4'>{children}</span>;
}

function CardBody({ className, children }: CommonProps) {
	return <div className={cn(className)}>{children}</div>;
}

function CardFooter({ separator, className, children }: CommonProps & { separator?: boolean }) {
	return (
		<div
			className={cn(
				'mt-auto flex w-full justify-between',
				separator && 'w-full border-t border-black pt-4',
				className,
			)}
		>
			{children}
		</div>
	);
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
