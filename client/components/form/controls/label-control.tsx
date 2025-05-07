import type { PropsWithChildren } from 'react';
import { Label, type LabelProps } from '../label';

type Props = PropsWithChildren<LabelProps>;

export function LabelControl({ children, ...rest }: Props) {
	return (
		<>
			<Label {...rest} />
			{children}
		</>
	);
}
