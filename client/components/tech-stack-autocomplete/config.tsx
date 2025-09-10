import type { ReactNode } from 'react';
import { CodeIcon, Layers, Database, ToolCase, Cloud } from 'lucide-react';

type Category = 'language' | 'framework' | 'database' | 'tool' | 'cloud';

type CategoryConfig = {
	label: ReactNode;
	color: string;
	text: string;
};

export const config: Record<Category, CategoryConfig> = {
	language: { label: <CodeIcon />, color: 'bg-red-200', text: 'Language' },
	framework: { label: <Layers />, color: 'bg-green-200', text: 'Framework' },
	database: { label: <Database />, color: 'bg-yellow-200', text: 'Database' },
	tool: { label: <ToolCase />, color: 'bg-purple-200', text: 'Tool' },
	cloud: { label: <Cloud />, color: 'bg-blue-200', text: 'Cloud' },
};
