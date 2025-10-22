import type { TechnologyData } from '$/shared/types/technologies';
import { create } from 'zustand';

type State = {
	selectedTechnologies: TechnologyData[];
};

type Actions = {
	addTechnology: (technology: TechnologyData) => void;
	removeTechnology: (technology: TechnologyData) => void;
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
