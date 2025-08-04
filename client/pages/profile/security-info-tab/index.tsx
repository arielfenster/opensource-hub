import { FieldError } from '$/client/components/form/field-error';
import { SecurityInfoForm } from './form';
import { useSecurityInfo } from './hook';

export function SecurityInfoTab() {
	const { updateSecurityInfo, loading, error } = useSecurityInfo();

	return (
		<div className='flex flex-col gap-2 p-8'>
			<FieldError error={error} />
			<SecurityInfoForm onSubmit={updateSecurityInfo} loading={loading} />
		</div>
	);
}
