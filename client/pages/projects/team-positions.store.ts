import type { ProjectTeamPosition } from '$/shared/types/projects';
import { create } from 'zustand';

type State = {
	selectedPositions: ProjectTeamPosition[];
};

type Actions = {
	togglePosition: (position: ProjectTeamPosition) => void;
};

export const useTeamPositionsStore = create<State & Actions>((set, get) => ({
	selectedPositions: [],
	togglePosition(position) {
		const currentPositions = get().selectedPositions;
		const isPositionAlreadySelected = currentPositions.some((pos) => pos === position);
		if (isPositionAlreadySelected) {
			set({
				selectedPositions: currentPositions.filter((pos) => pos !== position),
			});
		} else {
			set({ selectedPositions: [...currentPositions, position] });
		}
	},
}));
