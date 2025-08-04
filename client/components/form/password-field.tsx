import { forwardRef, useState } from 'react';
import { TextField, type TextFieldProps } from './textfield';
import { MIN_PASSWORD_LENGTH } from '$/shared/schemas/auth/password.schema';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type Props = Partial<TextFieldProps>;

export const PasswordField = forwardRef<HTMLInputElement, Props>(function PasswordField(
	{ label = 'Password', name = 'password', ...rest },
	ref,
) {
	const [showPassword, setShowPassword] = useState(false);

	function handleEyeClick() {
		setShowPassword(!showPassword);
	}

	const PasswordIcon = showPassword ? EyeIcon : EyeOffIcon;

	return (
		<div className='relative flex w-full flex-row justify-between'>
			<TextField
				label={label}
				name={name}
				ref={ref}
				type={showPassword ? 'text' : 'password'}
				placeholder={`Minimum ${MIN_PASSWORD_LENGTH} characters`}
				{...rest}
				endIcon={
					<PasswordIcon
						className='h-5 w-5 cursor-pointer'
						width={20}
						height={20}
						onClick={handleEyeClick}
					/>
				}
			/>
		</div>
	);
});
