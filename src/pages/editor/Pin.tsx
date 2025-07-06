import styled from "styled-components";
import { usePinProjectStore } from "../../stores/usePinProjectStore";
import type { UUID } from "../../utils/uuid";

const Cnt = styled.div`
  position: relative;
  height: 100px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 4px;
  cursor: pointer;
  user-select: none;
  border-radius: 3px;
  &:hover {
    background: #ffee0045;
  }
  &:focus,
  &:active {
    background: #ffee00ae;
    outline: none;
    color: white;
    text-shadow: 1px 1px 1px white;
  }
`;
const Bar = styled.div<{ value: number }>`
  position: absolute;
  width: 100%;
  height: 3px;
  background: #ffff00f0;
  bottom: ${(props) => props.value}px;
`;

export const Pin: React.FC<{ boardId: UUID; pinId: UUID }> = ({
  boardId,
  pinId,
}) => {
  const pin = usePinProjectStore(
    (state) => state.pinProject.boards[boardId].pins[pinId]
  );
  return (
    <Cnt tabIndex={0}>
      {pin.note}
      {pin.note ? <Bar value={pin.note} /> : null}
    </Cnt>
  );
};
