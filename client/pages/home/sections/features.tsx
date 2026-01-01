import { getImagePath } from '$/client/lib/images';
import { cn } from '$/client/lib/utils';

export function FeaturesSection() {
	return (
		<div className='container mx-auto flex flex-col px-16'>
			<FeatureHighlight
				heading='Have an awesome idea for a project?'
				subheading='Are you looking for more collaborators to work with you? Create your project and search for your dream team!'
				image={getImagePath('bookshelf.svg')}
			/>
			<FeatureHighlight
				heading='Expand your knowledge!'
				subheading='Want to expand your knowledge and tech stack? Looking to dive deep into a framework but never had the opportunity? Search for projects by specific technologies to find exactly what you want!'
				image={getImagePath('bookshelf.svg')}
				orientation='flip'
			/>
			<FeatureHighlight
				heading='Various 3rd-party tools integrations!'
				subheading='Create your project with your favorite source control, chat and project management tools to bootstrap and kickstart your project!'
				image={getImagePath('bookshelf.svg')}
			/>
		</div>
	);
}

type FeatureHighlightProps = {
	heading: string;
	subheading: string;
	image: string;
	orientation?: 'regular' | 'flip';
	className?: string;
};

export function FeatureHighlight({
	heading,
	subheading,
	image,
	orientation = 'regular',
	className = '',
}: FeatureHighlightProps) {
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
