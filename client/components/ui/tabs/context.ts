import { createContext, useContext } from 'react';

const TabsContext = createContext<{
	activeTab: string;
	setActiveTab: (tab: string) => void;
} | null>(null);

function useTabs() {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error('useTabsState must be used within a TabsProvider');
	}
	return context;
}

export { TabsContext, useTabs };

// const TabItemStateContext = createContext<{
// 	tab: number;
// 	isActive: boolean;
// 	onClick: () => void;
// } | null>(null);

// function useTabItemState() {
// 	const context = useContext(TabItemStateContext);
// 	if (!context) {
// 		throw new Error('useTabItemState must be used within a TabItemProvider');
// 	}
// 	return context;
// }

// export { TabsStateContext, useTabsState, TabItemStateContext, useTabItemState };
