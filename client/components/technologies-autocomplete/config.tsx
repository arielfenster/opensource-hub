import type { ReactNode } from 'react';
import { Cloud, Code, Database, Layers, Wrench } from "lucide-react";
import type { TechnologyName } from './types';

type TechnologyConfig = {
	icon: ReactNode;
	color: string;
	text: string;
};

export const config: Record<TechnologyName, TechnologyConfig> = {
	languages: { icon: <Code />, color: 'bg-red-200', text: 'Language' },
	frameworks: { icon: <Layers />, color: 'bg-green-200', text: 'Framework' },
	databases: { icon: <Database />, color: 'bg-yellow-200', text: 'Database' },
	tools: { icon: <Wrench />, color: 'bg-purple-200', text: 'Tool' },
	clouds: { icon: <Cloud />, color: 'bg-blue-200', text: 'Cloud' },
};
