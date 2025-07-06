import { useEffect, useRef } from "react";
import styled from "styled-components";
import type { Board as BoardType, Pin } from "../../types/types";
import { usePinProjectStore } from "../../stores/usePinProjectStore";
import { Board } from "./Board";
import { uuid } from "../../utils/uuid";

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
  const focusedPinRef = useRef<Pin | null>(null); // 현재 포커스된 핀 참조

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
      if (focusedPinRef.current && e.deltaY !== 0) {
        // pin.note 변경 로직
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

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
