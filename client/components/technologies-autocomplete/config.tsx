import type { TechnologyGroupName } from '$/shared/types/technologies';
import { Cloud, Code, CreditCard, Database, Layers, Server, Settings } from 'lucide-react';
import type { ElementType } from 'react';

type TechnologyConfig = {
	icon: ElementType;
	label: string;
	className: string;
};

export const config: Record<TechnologyGroupName, TechnologyConfig> = {
	Languages: {
		icon: Code,
		label: 'Language',
		className: 'text-ghost-white bg-chip-1 border-0',
	},
	Frameworks: {
		icon: Layers,
		label: 'Framework',
		className: 'text-ghost-white bg-chip-2 border-0',
	},
	Databases: {
		icon: Database,
		label: 'Database',
		className: 'text-ghost-white bg-chip-4 border-0',
	},
	Infra: {
		icon: Server,
		label: 'Infra',
		className: 'text-ghost-white bg-chip-3 border-0',
	},
	Services: {
		icon: CreditCard,
		label: 'Services',
		className: 'text-ghost-white bg-chip-5 border-0',
	},
	'Developer Tools': {
		icon: Settings,
		label: 'Dev Tools',
		className: 'text-ghost-white bg-chip-6 border-0',
	},
	Clouds: {
		icon: Cloud,
		label: 'Cloud',
		className: 'text-ghost-white bg-chip-7 border-0',
	},
};
