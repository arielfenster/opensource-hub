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
		className: 'text-orange-600 bg-orange-100 border-orange-600',
	},
	frameworks: {
		icon: Layers,
		label: 'Framework',
		className: 'text-emerald-600 bg-emerald-100 border-emerald-600',
	},
	databases: {
		icon: Database,
		label: 'Database',
		className: 'text-yellow-600 bg-yellow-200 border-yellow-600',
	},
	infra: {
		icon: Server,
		label: 'Infra',
		className: 'text-blue-600 bg-blue-100 border-blue-600',
	},
	services: {
		icon: CreditCard,
		label: 'Services',
		className: 'text-pink-600 bg-pink-100 border-pink-600',
	},
	developerTools: {
		icon: Settings,
		label: 'Dev Tools',
		className: 'text-purple-600 bg-purple-100 border-purple-600',
	},
	clouds: {
		icon: Cloud,
		label: 'Cloud',
		className: 'text-cyan-600 bg-cyan-100 border-cyan-600',
	},
};
