import { cn } from '$/client/lib/utils';

type Props = {
	heading: string;
	subheading: string;
	image: string;
	orientation?: 'regular' | 'flip';
	className?: string;
};

export function PageSection({
	heading,
	subheading,
	image,
	orientation = 'regular',
	className = '',
}: Props) {
	return (
		<section
			className={cn('flex w-full items-center justify-between', {
				'flex-row-reverse': orientation === 'flip',
				className,
			})}
		>
			<div className='flex w-1/2 flex-col gap-4 text-left'>
				<h3 className='text-royal-blue text-3xl font-semibold'>{heading}</h3>
				<p className='text-eerie-black text-lg'>{subheading}</p>
			</div>
			<img
				className='self-end rounded-lg shadow-md'
				src={image}
				alt=''
				width={400}
				height={300}
			/>
		</section>
	);
}
