import styled from "styled-components";
import { Pin } from "./Pin";
import { usePinProjectStore } from "../../stores/usePinProjectStore";
import type { UUID } from "../../utils/uuid";

const Cnt = styled.div`
  width: 100%;
  border: 1px solid #333;
  padding: 10px 20px;
  border-radius: 16px;
  background: #ffffff07;
  display: flex;
  position: relative;
`;

export const Board: React.FC<{ boardId: UUID }> = ({ boardId }) => {
  const board = usePinProjectStore(
    (pinProject) => pinProject.pinProject.boards[boardId]
  );
  return (
    <Cnt>
      {Object.values(board.pins).map((pin) => (
        <Pin boardId={board.id} pinId={pin.id} key={pin.id} />
      ))}
    </Cnt>
  );
};
