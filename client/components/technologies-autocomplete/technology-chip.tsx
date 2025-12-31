import type { TechnologyData } from '$/shared/types/technologies';
import { Chip, type ChipProps } from '../ui/chip';
import { config } from './config';

type Props = ChipProps & {
	technology: TechnologyData;
	onClick?: () => void;
};

// TODO: remove to ui folder?
export function TechnologyChip({ technology, ...rest }: Props) {
	return (
		<Chip className={config[technology.group.name].className} outlined {...rest}>
			{technology.name}
		</Chip>
	);
}
