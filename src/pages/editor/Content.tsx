import { useEffect, useRef } from "react";
import styled from "styled-components";
import type { Board as BoardType, Pin } from "../../types/types";
import { usePinProjectStore } from "../../stores/usePinProjectStore";
import { Board } from "./Board";
import { uuid } from "../../utils/uuid";
import { focusedPinRefStore } from "../../stores/focusedPinRefStore";

const CntStyle = styled.div`
  padding: 70px;
  flex-grow: 1;
`;
const BoardWrpStyle = styled.div`
  width: 100%;
`;
const AddBoardButtonStyle = styled.div`
  border-radius: 18px;
  border: 2px solid #333;
  width: fit-content;
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background: #ffffff0f;
  }
`;

// || -------- 메인 컴포넌트 -------- ||
export default function Content() {
  const pp = usePinProjectStore((state) => state.pinProject);
  const addBoard = usePinProjectStore((state) => state.addBoard);
  const updatePinNote = usePinProjectStore((state) => state.updatePinNote);

  function createBoard() {
    const defaultBoard: BoardType = {
      id: uuid(),
      name: "Default Board",
      pins: {},
    };
    addBoard(defaultBoard);
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const { focusedBoardId, focusedPinId } = focusedPinRefStore.getState();
      if (focusedBoardId && focusedPinId && e.deltaY !== 0) {
        const pin = pp.boards[focusedBoardId].pins[focusedPinId];
        if (pin.note === null) return;
        const newNote =
          e.deltaY > 0 ? Math.max(pin.note - 1, 0) : Math.min(pin.note + 1, 10);

        updatePinNote(focusedBoardId, focusedPinId, newNote);
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [pp]);

  // || --------- DOM ---------- ||
  return (
    <CntStyle>
      <BoardWrpStyle>
        {Object.values(pp.boards).map((board) => (
          <Board boardId={board.id} key={board.id} />
        ))}
      </BoardWrpStyle>
      <AddBoardButtonStyle onClick={createBoard}>
        Create Board
      </AddBoardButtonStyle>
    </CntStyle>
  );
}
