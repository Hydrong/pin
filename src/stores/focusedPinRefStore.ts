import { createStore } from "zustand/vanilla";
import { produce } from "immer";
import type { UUID } from "../utils/uuid";

interface FocusedPinRefStore {
  focusedPinId: UUID | null;
  focusedBoardId: UUID | null;
  setFocusedPin: (boardId: UUID, pinId: UUID) => void;
  blurFocusedPin: (boardId: UUID, pinId: UUID) => void;
}

export const focusedPinRefStore = createStore<FocusedPinRefStore>((set) => ({
  focusedPinId: null,
  focusedBoardId: null,
  setFocusedPin: (boardId, pinId) =>
    set({ focusedBoardId: boardId, focusedPinId: pinId }),
  blurFocusedPin: (boardId, pinId) =>
    set((state) =>
      produce(state, (draft) => {
        if (draft.focusedBoardId === boardId) {
          draft.focusedBoardId = null;
        }
        if (draft.focusedPinId === pinId) {
          draft.focusedPinId = null;
        }
      })
    ),
}));
