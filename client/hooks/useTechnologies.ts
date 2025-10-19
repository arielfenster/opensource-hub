import type { TechnologyData } from '$/shared/types/technologies';
import { useState } from 'react';
import type { TechnologiesAutoCompleteProps } from '../components/technologies-autocomplete';

// TODO: should the selectedTechnologies state be in a global store?

// TODO: maybe rename this to useTechnologiesState?

type Props = Pick<TechnologiesAutoCompleteProps, 'onSelect' | 'onRemove'>;

export function useTechnologies({ onSelect, onRemove }: Props = {}) {
	const [selectedTechnologies, setSelectedTechnologies] = useState<TechnologyData[]>([]);

	function addTechnology(technology: TechnologyData) {
		setSelectedTechnologies((prev) => {
			if (prev.find((tech) => tech.id === technology.id)) {
				return prev;
			}

			if (onSelect) {
				onSelect(technology);
			}
			return [...prev, technology];
		});
	}

	function removeTechnology(technology: TechnologyData) {
		setSelectedTechnologies((prev) => prev.filter((tech) => tech.id !== technology.id));
		if (onRemove) {
			onRemove(technology);
		}
	}

	return {
		selectedTechnologies,
		addTechnology,
		removeTechnology,
	};
}
