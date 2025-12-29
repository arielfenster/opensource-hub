import { cn } from '$/client/lib/utils';
import {
	Children,
	cloneElement,
	useEffect,
	useState,
	type HTMLProps,
	type MouseEvent,
	type PropsWithChildren,
	type ReactElement,
} from 'react';
import { createPortal } from 'react-dom';
import { DialogContext, useDialog } from './context';

type CommonProps = PropsWithChildren<{
	className?: string;
}>;

type DialogProps = CommonProps & {
	closeable?: boolean;
};

function Dialog({ closeable = true, children }: DialogProps) {
	const [open, setOpen] = useState(false);

	return (
		<DialogContext.Provider value={{ open, setOpen, closeable }}>
			{children}
		</DialogContext.Provider>
	);
}

function DialogTrigger({ children }: CommonProps) {
	const { setOpen } = useDialog();

	const child = Children.only(children) as ReactElement<HTMLProps<Element>>;

	return cloneElement(child, {
		className: cn(child.props.className, 'cursor-pointer'),
		onClick: (event: MouseEvent) => {
			setOpen(true);
			if (child.props.onClick) {
				child.props.onClick(event);
			}
		},
	});
}

function DialogPortal({ children }: CommonProps) {
	const [mounted, setMounted] = useState(false);
	const { open } = useDialog();

	useEffect(() => {
		setMounted(true);
	}, []);

	return mounted && open ? createPortal(children, document.getElementById('app')!) : null;
}

function DialogOverlay({ children }: CommonProps) {
	return <div className={cn('animate-fade absolute inset-0 bg-neutral-400/70')}>{children}</div>;
}

function DialogContent({ className, children }: CommonProps) {
	return (
		<DialogPortal>
			<DialogOverlay>
				<dialog
					className={cn(
						'animate-fade fixed top-1/2 left-1/2 flex translate-x-[-50%] translate-y-[-50%] flex-col justify-between gap-3 rounded-lg border-2',
						className,
					)}
				>
					{children}
				</dialog>
			</DialogOverlay>
		</DialogPortal>
	);
}

function DialogHeader({ className, children }: CommonProps) {
	const { setOpen } = useDialog();

	return (
		<div className={cn('flex justify-between border-b-[1] p-4', className)}>
			{children}
			<button
				className='text-eerie-black text-md cursor-pointer font-normal'
				onClick={() => setOpen(false)}
			>
				X
			</button>
		</div>
	);
}

function DialogTitle({ children }: CommonProps) {
	return <span className={'text-eerie-black text-xl font-semibold'}>{children}</span>;
}

function DialogBody({ className, children }: CommonProps) {
	return <div className={cn('flex flex-col gap-2 p-4', className)}>{children}</div>;
}

function DialogActions({ className, children }: CommonProps) {
	return <div className={cn('flex w-full gap-3 border-t-[1] p-4', className)}>{children}</div>;
}

Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Title = DialogTitle;
Dialog.Body = DialogBody;
Dialog.Actions = DialogActions;

export { Dialog };
