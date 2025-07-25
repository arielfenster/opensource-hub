import { FieldError } from '$/client/components/form/field-error';
import type { AuthenticatedUser } from '$/shared/types/users';
import { PersonalSettingsForm } from './form';
import { usePersonalSettings } from './hook';

type Props = {
	user: AuthenticatedUser;
};

export function PersonalSettingsContainer({ user }: Props) {
	const { updatePersonalSettings, loading, error } = usePersonalSettings();

	return (
		<div className='flex flex-col gap-2 p-8'>
			<FieldError error={error} />
			<PersonalSettingsForm onSubmit={updatePersonalSettings} loading={loading} user={user} />
		</div>
	);
}
