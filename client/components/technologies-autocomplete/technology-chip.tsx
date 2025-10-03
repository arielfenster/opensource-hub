import { Chip, type ChipProps } from '../ui/chip';
import { config } from './config';
import type { TechnologyName, TechnologyOption } from './types';

type Props = ChipProps & {
	technology: TechnologyOption;
	onClick?: () => void;
};

export function TechnologyChip({ technology, ...rest }: Props) {
	return (
		<Chip
			className={config[technology.groupName as TechnologyName].className}
			outlined
			{...rest}
		>
			{technology.value}
		</Chip>
	);
}
