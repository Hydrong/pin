import styled from "styled-components";
import { usePinProjectStore } from "../../stores/usePinProjectStore";
import { uuid, type UUID } from "../../utils/uuid";
import { focusedPinRefStore } from "../../stores/focusedPinRefStore";
import type { Pin as PinType } from "../../types/types";

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
  const setFocusedPin = focusedPinRefStore.getState().setFocusedPin;
  const blurFocusedPin = focusedPinRefStore.getState().blurFocusedPin;
  const updatePinNote = usePinProjectStore((state) => state.updatePinNote);
  const handleFocus = () => setFocusedPin(boardId, pin.id);
  const handleBlur = () => blurFocusedPin(boardId, pin.id);
  const handleLClick = () => {
    if (!pin.note) updatePinNote(boardId, pin.id, 3);
  };
  const handleRClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    updatePinNote(boardId, pin.id, null);
  };

  return (
    <Cnt
      tabIndex={0}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleLClick}
      onContextMenu={handleRClick}
    >
      {pin.note ?? "X"}
      {pin.note ? <Bar value={pin.note} /> : null}
    </Cnt>
  );
};
