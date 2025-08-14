import { memo, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

export function Test({ children }: PropsWithChildren) {
	const [_, update] = useState(0);

	const primitiveValue = 'Hello, World!';
	// const refValue = { key: 'value' };
	const refValue = useMemo(() => ({ key: 'value' }), []);

	console.log('State updated');

	return (
		<div>
			<button
				className='cursor-pointer bg-gray-300'
				onClick={() => {
					update((prev) => prev + 1);
				}}
			>
				Click to update state
			</button>
			<h2>Test Component</h2>
			<Primitive value={primitiveValue} />
			<Reference value={refValue} />
			<MemoizedPrimitive value={primitiveValue} />
			<MemoizedReference value={refValue} />
			{children}
			{/* <ExpensiveComponent /> */}
		</div>
	);
}

function Primitive({ value }: { value: string }) {
	useEffect(() => {
		console.log('primitive effect', value);
	}, [value]);
	return <div>primitive: {value}</div>;
}

function Reference({ value }: { value: any }) {
	useEffect(() => {
		console.log('reference effect', value);
	}, [value]);
	return <div>reference: {JSON.stringify(value)}</div>;
}

const MemoizedPrimitive = memo(Primitive);

const MemoizedReference = memo(Reference);

export function ExpensiveComponent() {
	const [isReady, setIsReady] = useState(false);
	console.log({ isReady });

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsReady(true);
		}, 2000);

		return () => clearTimeout(timer);
	}, []);

	if (!isReady) {
		return <div>Loading...</div>;
	}

	return <div>Expensive Component Loaded!</div>;
}
