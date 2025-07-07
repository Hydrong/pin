import styled from "styled-components";
import { usePinProjectStore } from "../../stores/usePinProjectStore";
import { uuid, type UUID } from "../../utils/uuid";
import type { Pin as PinType } from "../../types/types";
import { Pin } from "./Pin";

const Cnt = styled.div`
  width: 100%;
  border: 1px solid #333;
  padding: 10px 20px;
  border-radius: 16px;
  background: #ffffff07;
  display: flex;
  position: relative;
`;
const CreatePinBtn = styled.button`
  border-radius: 18px;
  border: 2px solid #333;
  width: fit-content;
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background: #ffffff0f;
  }
`;

export const Board: React.FC<{ boardId: UUID }> = ({ boardId }) => {
  const board = usePinProjectStore(
    (pinProject) => pinProject.pinProject.boards[boardId]
  );
  const addPin = usePinProjectStore((state) => state.addPin);
  const handleCreatePin = () => {
    const pin: PinType = {
      id: uuid(),
      note: null,
    };
    addPin(board.id, pin);
  };
  return (
    <Cnt>
      {Object.keys(board.pins).length !== 0 ? (
        Object.values(board.pins).map((pin) => (
          <Pin boardId={board.id} pinId={pin.id} key={pin.id} />
        ))
      ) : (
        <CreatePinBtn onClick={handleCreatePin}>+</CreatePinBtn>
      )}
    </Cnt>
  );
};
