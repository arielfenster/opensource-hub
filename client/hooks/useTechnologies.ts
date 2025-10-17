import type { TechnologyData } from '$/shared/types/technologies';
import { useCallback, useState } from 'react';
import type { TechnologiesAutocompleteProps } from '../components/technologies-autocomplete';

// TODO: should the selectedTechnologies state be in a global store?

// TODO: maybe rename this to useTechnologiesState? useTechnologiesAutocomplete? useTechnologiesState?

type Props = Pick<TechnologiesAutocompleteProps, 'onSelect' | 'onRemove'>;

export function useTechnologies({ onSelect, onRemove }: Props = {}) {
	const [selectedTechnologies, setSelectedTechnologies] = useState<TechnologyData[]>([]);

	const addTechnology = useCallback((technology: TechnologyData) => {
		setSelectedTechnologies((prev) => {
			if (prev.find((tech) => tech.id === technology.id)) {
				return prev;
			}

			if (onSelect) {
				onSelect(technology);
			}
			return [...prev, technology];
		});
	}, []);

	const removeTechnology = useCallback((technology: TechnologyData) => {
		setSelectedTechnologies((prev) => prev.filter((tech) => tech.id !== technology.id));
		if (onRemove) {
			onRemove(technology);
		}
	}, []);

	return {
		selectedTechnologies,
		addTechnology,
		removeTechnology,
	};
}
