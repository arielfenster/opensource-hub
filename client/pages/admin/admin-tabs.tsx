import { Tabs } from '$/client/components/ui/tabs';
import { InboxIcon, SettingsIcon, UsersIcon } from 'lucide-react';
import { TechnologyRequestsTab } from './technology-requests-tab';
import { UsersTab } from './users-tab';
import { SettingsTab } from './settings-tab';
import type { TechnologyRequest } from '$/shared/types/technology-requests';

type AdminTabsProps = {
	technologyRequests: TechnologyRequest[];
	users: any;
	settings: any;
};

const TabsType = {
	TECHNOLOGY_REQUESTS: 'technologyRequests',
	USERS: 'users',
	SETTINGS: 'settings',
};

export function AdminTabs({ technologyRequests, users, settings }: AdminTabsProps) {
	return (
		<Tabs defaultTab={TabsType.TECHNOLOGY_REQUESTS}>
			<Tabs.List className='tabs_list'>
				<Tabs.Trigger name={TabsType.TECHNOLOGY_REQUESTS} className='tabs_trigger'>
					<InboxIcon />
					<span>Tech Requests</span>
				</Tabs.Trigger>
				<Tabs.Trigger name={TabsType.USERS} className='tabs_trigger'>
					<UsersIcon />
					<span>Users</span>
				</Tabs.Trigger>
				<Tabs.Trigger name={TabsType.SETTINGS} className='tabs_trigger'>
					<SettingsIcon />
					<span>Settings</span>
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.ContentContainer className='flex-3 shadow-lg'>
				<Tabs.Content name={TabsType.TECHNOLOGY_REQUESTS}>
					<TechnologyRequestsTab technologyRequests={technologyRequests} />
				</Tabs.Content>
				<Tabs.Content name={TabsType.USERS}>
					<UsersTab users={users} />
				</Tabs.Content>
				<Tabs.Content name={TabsType.SETTINGS}>
					<SettingsTab settings={settings} />
				</Tabs.Content>
			</Tabs.ContentContainer>
		</Tabs>
	);
}
