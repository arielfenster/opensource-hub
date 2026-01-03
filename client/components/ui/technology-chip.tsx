import type { TechnologyData } from '$/shared/types/technologies';
import { config } from '../technologies-autocomplete/config';
import { Chip, type ChipProps } from './chip';

type Props = ChipProps & {
	technology: TechnologyData;
	onClick?: () => void;
};

export function TechnologyChip({ technology, ...rest }: Props) {
	return (
		<Chip className={config[technology.group.name].className} outlined {...rest}>
			{technology.name}
		</Chip>
	);
}
