import { create } from "zustand";
import { produce } from "immer";
import type { Pin, Board, PinProject } from "../types/types";
import { uuid, type UUID } from "../utils/uuid";

interface PinProjectStore {
  pinProject: PinProject;
  addBoard: (board: Board) => void;
  addPin: (boardId: UUID, pin: Pin) => void;
  updatePinNote: (boardId: UUID, pinId: UUID, note: number | null) => void;
}

const createInitialPinProject = (): PinProject => ({
  id: uuid(),
  title: "Untitled",
  boards: {},
});

const initialPinProject = createInitialPinProject();

export const usePinProjectStore = create<PinProjectStore>((set) => ({
  pinProject: initialPinProject,

  addBoard: (board) =>
    set((state) =>
      produce(state, (draft) => {
        draft.pinProject.boards[board.id] = board;
      })
    ),

  addPin: (boardId, pin) =>
    set((state) =>
      produce(state, (draft) => {
        if (!draft.pinProject.boards[boardId]) return;
        if (!draft.pinProject.boards[boardId].pins)
          draft.pinProject.boards[boardId].pins = {};
        draft.pinProject.boards[boardId].pins[pin.id] = pin;
      })
    ),

  updatePinNote: (boardId, pinId, note) =>
    set((state) =>
      produce(state, (draft) => {
        if (!draft.pinProject.boards[boardId]) return;
        if (!draft.pinProject.boards[boardId].pins[pinId]) return;
        draft.pinProject.boards[boardId].pins[pinId].note = note;
      })
    ),
}));
