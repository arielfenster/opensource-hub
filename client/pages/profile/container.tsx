import { Tabs } from '$/client/components/ui/tabs';
import { useAuth } from '$/client/providers/auth-provider';

const TabsType = {
	PERSONAL: 'personal',
	SECURITY: 'security',
	NOTIFICATIONS: 'notifications',
	PRIVACY: 'privacy',
};

export function ProfileContainer() {
	const user = useAuth().user!;

	return (
		<div className='flex flex-col gap-8 px-4 py-8'>
			<h1 className='text-royal-blue text-4xl font-semibold'>Profile Settings</h1>
			<div className='flex gap-8'>
				<Tabs defaultTab={TabsType.PERSONAL}>
					<Tabs.List className='flex flex-1 flex-col'>
						<Tabs.Trigger name={TabsType.PERSONAL}>PERSONAL INFO</Tabs.Trigger>
						<Tabs.Trigger name={TabsType.SECURITY}>SECURITY INFO</Tabs.Trigger>
					</Tabs.List>
					<Tabs.ContentContainer className='h-60 w-60 flex-3 bg-purple-300'>
						<Tabs.Content name={TabsType.PERSONAL}>im personal info</Tabs.Content>
						<Tabs.Content name={TabsType.SECURITY}>im security info</Tabs.Content>
					</Tabs.ContentContainer>
				</Tabs>
			</div>
		</div>
	);
}
