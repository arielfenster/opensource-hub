import { useRef } from 'react';
import { Button } from '../../ui/button';
import { Dialog } from '../../ui/dialog';
import { RequestTechnologyForm } from './form';
import { useRequestTechnology } from './useRequestTechnology';
import { useDialog } from '../../ui/dialog/context';

export function RequestTechnologyDialogContent() {
	const formRef = useRef<HTMLFormElement | null>(null);
	const { submit, loading, error } = useRequestTechnology();
	const { setOpen } = useDialog();

	return (
		<Dialog.Content className='w-[30%]'>
			<Dialog.Header>
				<Dialog.Title>Request New Technology</Dialog.Title>
			</Dialog.Header>
			<Dialog.Body>
				<RequestTechnologyForm ref={formRef} onSubmit={submit} />
				{error && <span className='text-red-600'>Error: {error}</span>}
			</Dialog.Body>
			<Dialog.Actions>
				<Button
					className='w-full justify-center bg-gray-400 hover:bg-gray-400/80'
					onClick={() => setOpen(false)}
				>
					Cancel
				</Button>
				<Button
					className='w-full justify-center'
					onClick={() => formRef.current?.requestSubmit()}
					loading={loading}
				>
					Submit
				</Button>
			</Dialog.Actions>
		</Dialog.Content>
	);
}
