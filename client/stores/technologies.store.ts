import { create } from 'zustand';
import type { TechnologyOption } from '../components/technologies-autocomplete/types';

type State = {
	selectedTechnologies: TechnologyOption[];
};

type Actions = {
	addTechnology: (technology: TechnologyOption) => void;
	removeTechnology: (technology: TechnologyOption) => void;
};

export const useTechnologiesStore = create<State & Actions>((set, get) => ({
	selectedTechnologies: [],
	addTechnology(technology) {
		const currentTechnologies = get().selectedTechnologies;
		const isTechnologyAlreadySelected = currentTechnologies.some(
			(tech) => tech.id === technology.id,
		);
		if (!isTechnologyAlreadySelected) {
			set({ selectedTechnologies: [...currentTechnologies, technology] });
		}
	},
	removeTechnology(technology) {
		const currentTechnologies = get().selectedTechnologies;
		set({
			selectedTechnologies: currentTechnologies.filter((tech) => tech.id !== technology.id),
		});
	},
}));
