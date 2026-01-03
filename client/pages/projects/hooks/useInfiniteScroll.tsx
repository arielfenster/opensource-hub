import { useRef, useEffect } from 'react';

type Props = {
	shouldHandleIntersection: boolean;
	onIntersection: () => void;
};

export function useInfiniteScroll({ shouldHandleIntersection, onIntersection }: Props) {
	const observationTargetRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (observationTargetRef.current) {
			const observer = new IntersectionObserver(
				(entries) => {
					const entry = entries[0];
					if (entry.isIntersecting) {
						if (shouldHandleIntersection) {
							onIntersection();
						}
					}
				},
				{
					root: null,
					rootMargin: '0px',
					threshold: 1.0,
				},
			);

			observer.observe(observationTargetRef.current);
		}
	}, [observationTargetRef.current]);

	return observationTargetRef;
}
