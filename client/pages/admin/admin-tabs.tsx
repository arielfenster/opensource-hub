import { Tabs } from '$/client/components/ui/tabs';
import { InboxIcon, SettingsIcon, UsersIcon } from 'lucide-react';

type AdminTabsProps = {
	techRequests: any;
	users: any;
	settings: any;
};

const TabsType = {
	TECH_REQUESTS: 'techRequests',
	USERS: 'users',
	SETTINGS: 'settings',
};

export function AdminTabs({ techRequests, users, settings }: AdminTabsProps) {
	return (
		<Tabs defaultTab={TabsType.TECH_REQUESTS}>
			<Tabs.List className='tabs_list'>
				<Tabs.Trigger name={TabsType.TECH_REQUESTS} className='tabs_trigger'>
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
				<Tabs.Content name={TabsType.TECH_REQUESTS}>
					<div>Tech Requests Content</div>
				</Tabs.Content>
				<Tabs.Content name={TabsType.USERS}>
					<div>Users Content</div>
				</Tabs.Content>
				<Tabs.Content name={TabsType.SETTINGS}>
					<div>Settings Content</div>
				</Tabs.Content>
			</Tabs.ContentContainer>
		</Tabs>
	);
}
