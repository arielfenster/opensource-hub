import { Cloud, Code, CreditCard, Database, Layers, Server, Settings } from 'lucide-react';
import type { ElementType } from 'react';
import type { TechnologyName } from './types';

type TechnologyConfig = {
	icon: ElementType;
	label: string;
	className: string;
};

export const config: Record<TechnologyName, TechnologyConfig> = {
	languages: {
		icon: Code,
		label: 'Language',
		className: 'text-ghost-white bg-chip-1 border-0',
	},
	frameworks: {
		icon: Layers,
		label: 'Framework',
		className: 'text-ghost-white bg-chip-2 border-0',
	},
	databases: {
		icon: Database,
		label: 'Database',
		className: 'text-ghost-white bg-chip-4 border-0',
	},
	infra: {
		icon: Server,
		label: 'Infra',
		className: 'text-ghost-white bg-chip-3 border-0',
	},
	services: {
		icon: CreditCard,
		label: 'Services',
		className: 'text-ghost-white bg-chip-5 border-0',
	},
	developerTools: {
		icon: Settings,
		label: 'Dev Tools',
		className: 'text-ghost-white bg-chip-6 border-0',
	},
	clouds: {
		icon: Cloud,
		label: 'Cloud',
		className: 'text-ghost-white bg-chip-7 border-0',
	},
};
