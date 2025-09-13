import type { ReactNode } from 'react';
import { Code, Database, Cloud, Layers, Server, Settings, CreditCard } from 'lucide-react';
import type { TechnologyName } from './types';

type TechnologyConfig = {
	icon: ReactNode;
	label: string;
	className: string;
};

export const config: Record<TechnologyName, TechnologyConfig> = {
	languages: {
		icon: <Code />,
		label: 'Language',
		className: 'text-orange-600 bg-orange-100 border-orange-600',
	},
	frameworks: {
		icon: <Layers />,
		label: 'Framework',
		className: 'text-emerald-600 bg-emerald-100 border-emerald-600',
	},
	databases: {
		icon: <Database />,
		label: 'Database',
		className: 'text-yellow-600 bg-yellow-200 border-yellow-600',
	},
	infra: {
		icon: <Server />,
		label: 'Infra',
		className: 'text-blue-600 bg-blue-100 border-blue-600',
	},
	services: {
		icon: <CreditCard />,
		label: 'Services',
		className: 'text-pink-600 bg-pink-100 border-pink-600',
	},
	developerTools: {
		icon: <Settings className='h-5 w-5' />,
		label: 'Dev Tools',
		className: 'text-purple-600 bg-purple-100 border-purple-600',
	},
	clouds: {
		icon: <Cloud />,
		label: 'Cloud',
		className: 'text-cyan-600 bg-cyan-100 border-cyan-600',
	},
};

/**
 *  --category-language: #ea580c;
  --category-framework: #059669;
  --category-database: #eab308;
  --category-infra: #0ea5e9;
  --category-developerTools: #8b5cf6;
  --category-cloud: #0ea5e9;
  --category-services: #ec4899;

	"text-[var(--color-category-language)] bg-[var(--color-category-language)]/10 border-[var(--color-category-language)]320",
 */
