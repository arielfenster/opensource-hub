import { cn } from '$/client/lib/utils';
import type { TechnologyGroupName } from '$/shared/types/technologies';
import { config } from '../technologies-autocomplete/config';

type TechnologyGroupLabelProps = {
	technologyGroupName: TechnologyGroupName;
};

export function TechnologyGroupLabel({ technologyGroupName }: TechnologyGroupLabelProps) {
	const { icon: Icon, className, label } = config[technologyGroupName];

	return (
		<div
			className={cn(
				'flex w-fit items-center gap-2 rounded-lg border bg-gray-100 px-2 py-1',
				className,
			)}
		>
			<Icon className='h-4 w-4' />
			{label}
		</div>
	);
}
