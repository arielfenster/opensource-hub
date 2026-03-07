import { Tabs } from '$/client/components/ui/tabs';
import { User2, LockIcon, BellIcon, ShieldIcon } from 'lucide-react';
import { PersonalInfoTab } from './personal-info-tab';
import { SecurityInfoTab } from './security-info-tab';
import type { UserDetails } from '$/shared/types/users';

type ProfileTabsProps = {
	user: UserDetails;
};

const TabsType = {
	PERSONAL: 'personal',
	SECURITY: 'security',
	NOTIFICATIONS: 'notifications',
	PRIVACY: 'privacy',
};

export function ProfileTabs({ user }: ProfileTabsProps) {
	return (
		<Tabs defaultTab={TabsType.PERSONAL}>
			<Tabs.List className='tabs_list'>
				<Tabs.Trigger name={TabsType.PERSONAL} className='tabs_trigger'>
					<User2 />
					<span>Personal Info</span>
				</Tabs.Trigger>
				<Tabs.Trigger name={TabsType.SECURITY} className='tabs_trigger'>
					<LockIcon />
					<span>Security</span>
				</Tabs.Trigger>
				<Tabs.Trigger name={TabsType.NOTIFICATIONS} className='tabs_trigger'>
					<BellIcon />
					<span>Notifications</span>
				</Tabs.Trigger>
				<Tabs.Trigger name={TabsType.PRIVACY} className='tabs_trigger'>
					<ShieldIcon />
					<span>Privacy</span>
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.ContentContainer className='flex-3 shadow-lg'>
				<Tabs.Content name={TabsType.PERSONAL}>
					<PersonalInfoTab user={user} />
				</Tabs.Content>
				<Tabs.Content name={TabsType.SECURITY}>
					<SecurityInfoTab />
				</Tabs.Content>
			</Tabs.ContentContainer>
		</Tabs>
	);
}
