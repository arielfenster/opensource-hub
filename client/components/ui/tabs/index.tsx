import { useState, type PropsWithChildren } from 'react';
import { TabsContext, useTabs } from './context';
import { cn } from '$/client/lib/utils';

type CommonProps = PropsWithChildren<{ className?: string }>;
type CommonPropsWithName = CommonProps & { name: string };

function Tabs({ defaultTab, children }: PropsWithChildren<{ defaultTab: string }>) {
	const [activeTab, setActiveTab] = useState(defaultTab);

	return (
		<TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>
	);
}

function TabsList({ className, children }: CommonProps) {
	return <div className={className}>{children}</div>;
}

function TabsTrigger({ name, className, children }: CommonPropsWithName) {
	const { activeTab, setActiveTab } = useTabs();
	const isActive = name === activeTab;

	return (
		<button
			onClick={() => setActiveTab(name)}
			className={cn(
				'cursor-pointer rounded-md px-4 py-2 hover:bg-gray-200',
				isActive
					? 'bg-celestial-blue hover:bg-celestial-blue-hover text-white'
					: 'text-eerie-black',
				className,
			)}
		>
			{children}
		</button>
	);
}

function TabsContentContainer({ className, children }: CommonProps) {
	return <div className={className}>{children}</div>;
}

function TabsContent({ name, className, children }: CommonPropsWithName) {
	const { activeTab } = useTabs();

	return name === activeTab ? <div className={className}>{children}</div> : null;
}

Tabs.List = TabsList;
Tabs.Trigger = TabsTrigger;
Tabs.ContentContainer = TabsContentContainer;
Tabs.Content = TabsContent;

export { Tabs };
