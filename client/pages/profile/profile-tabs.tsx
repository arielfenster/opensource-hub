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
			<Tabs.List className='flex h-fit flex-1 flex-col gap-4 rounded-md shadow-lg'>
				<Tabs.Trigger name={TabsType.PERSONAL} className='flex gap-2 py-4 pl-8'>
					<User2 />
					<span>Personal Info</span>
				</Tabs.Trigger>
				<Tabs.Trigger name={TabsType.SECURITY} className='flex gap-2 py-4 pl-8'>
					<LockIcon />
					<span>Security</span>
				</Tabs.Trigger>
				<Tabs.Trigger name={TabsType.NOTIFICATIONS} className='flex gap-2 py-4 pl-8'>
					<BellIcon />
					<span>Notifications</span>
				</Tabs.Trigger>
				<Tabs.Trigger name={TabsType.PRIVACY} className='flex gap-2 py-4 pl-8'>
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
