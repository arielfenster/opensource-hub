import { FieldError } from '$/client/components/form/field-error';
import type { UserDetails } from '$/shared/types/users';
import { PersonalInfoForm } from './form';
import { usePersonalInfo } from './hook';

type Props = {
	user: UserDetails;
};

export function PersonalInfoTab({ user }: Props) {
	const { updatePersonalInfo, loading, error } = usePersonalInfo();

	return (
		<div className='flex flex-col gap-2 p-8'>
			<FieldError error={error} />
			<PersonalInfoForm onSubmit={updatePersonalInfo} loading={loading} user={user} />
		</div>
	);
}
