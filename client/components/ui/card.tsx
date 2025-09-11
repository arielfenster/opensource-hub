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

function CardHeader({
	title,
	subtitle = '',
}: PropsWithChildren<{ title: string; subtitle?: string }>) {
	return (
		<div className='flex flex-col gap-2'>
			<span className='text-royal-blue text-2xl font-semibold'>{title}</span>
			{subtitle && <span className='text-cerise text-lg'>{subtitle}</span>}
		</div>
	);
}

function CardBody({ children }: PropsWithChildren) {
	return <div>{children}</div>;
}

function CardFooter({ children }: PropsWithChildren) {
	return <div>{children}</div>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export { Card };
