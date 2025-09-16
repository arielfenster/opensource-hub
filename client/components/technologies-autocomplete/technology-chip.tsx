import { Chip } from '../ui/chip';
import { config } from './config';
import type { TechnologyName, TechnologyOption } from './types';

type Props = {
	technology: TechnologyOption;
	onClick: () => void;
};

export function TechnologyChip({ technology, onClick }: Props) {
	return (
		<Chip
			className={config[technology.groupName as TechnologyName].className}
			outlined
			removable
			onClick={onClick}
		>
			{technology.value}
		</Chip>
	);
}
