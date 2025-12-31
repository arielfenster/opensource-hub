import { Tabs } from '$/client/components/ui/tabs';
import { useAuth } from '$/client/providers/auth-provider';
import { BellIcon, LockIcon, ShieldIcon, User2 } from 'lucide-react';
import { PersonalInfoTab } from './personal-info-tab';
import { SecurityInfoTab } from './security-info-tab';

const TabsType = {
	PERSONAL: 'personal',
	SECURITY: 'security',
	NOTIFICATIONS: 'notifications',
	PRIVACY: 'privacy',
};

// TODO: add the tab to the url, so that the user can share the link to a specific tab,
// either with hash or query parameter
export function ProfilePage() {
	const { user } = useAuth();

	return (
		<div className='flex flex-col gap-8 px-4 py-8'>
			<h1 className='text-royal-blue text-4xl font-semibold'>Profile Settings</h1>
			<div className='flex gap-8'>
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
						<Tabs.Trigger
							name={TabsType.NOTIFICATIONS}
							className='flex gap-2 py-4 pl-8'
						>
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
							<PersonalInfoTab user={user!} />
						</Tabs.Content>
						<Tabs.Content name={TabsType.SECURITY}>
							<SecurityInfoTab />
						</Tabs.Content>
					</Tabs.ContentContainer>
				</Tabs>
			</div>
		</div>
	);
}
