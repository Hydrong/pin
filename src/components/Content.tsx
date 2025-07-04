import React, { useEffect, useRef, useState, forwardRef } from "react";
import styled from "styled-components";
import { uuid, type UUID } from "../utils/uuid";
import { noteNames } from "../constants/noteNames";
import { pitches } from "../constants/pitches";

const CntStyle = styled.div`
  padding: 70px;
  flex-grow: 1;
`;
const BoardWrpStyle = styled.div`
  width: 100%;
`;
const BoardStyle = styled.div`
  width: 100%;
  border: 1px solid #333;
  padding: 10px 20px;
  border-radius: 16px;
  background: #ffffff07;
  display: flex;
`;
const PinWrpStyle = styled.div`
  position: relative;
`;
const PinStyle = styled.div`
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
const PinBarStyle = styled.div<{ value: number }>`
  position: absolute;
  width: 100%;
  height: 3px;
  background: #ffff00f0;
  bottom: ${(props) => props.value}px;
`;

// 보드 타입
interface Board {
  id: UUID;
  pins: Pin[];
}
// 핀 타입
interface Pin {
  id: UUID;
  boardId: UUID;
  exist: boolean;
  noteName: string;
  pitch: number;
  duration: number;
  startTime: number;
}

function noteNameToPitch(noteName: string) {
  return pitches[noteNames.indexOf(noteName)];
}

function pitchToNoteName(pitch: number) {
  return noteNames[pitches.indexOf(pitch)];
}

function getNextPitch(pitch: number) {
  return pitches[pitches.indexOf(pitch) + 1] ?? pitches[pitches.length - 1];
}
function getPreviousPitch(pitch: number) {
  return pitches[pitches.indexOf(pitch) - 1] ?? pitches[0];
}

// || --------- 핀 컴포넌트 --------- ||
const PinComp: React.FC<{
  noteName: string;
  pitch: number;
  onFocus: () => void;
}> = ({ noteName, pitch, onFocus }) => {
  return (
    <PinWrpStyle onFocus={onFocus}>
      <PinStyle tabIndex={0}>{noteName}</PinStyle>
      <PinBarStyle value={pitch} />
    </PinWrpStyle>
  );
};
// || -------- 빈 핀 컴포넌트 -------- ||
const EmptyPinComp: React.FC<{
  onFocus: () => void;
}> = ({ onFocus }) => {
  return (
    <PinWrpStyle onFocus={onFocus}>
      <PinStyle tabIndex={0}></PinStyle>
    </PinWrpStyle>
  );
};

// || -------- 메인 컴포넌트 -------- ||
export default function Content() {
  const [pinCount, setPinCount] = useState<number>(10);
  // 전체 Board 상태 ( 속성으로 Pin 포함 )
  const [boards, setBoards] = useState<Board[]>([]);
  const pinRefs = useRef<Record<UUID, HTMLDivElement | null>>({}); // 핀 참조 배열
  const focusedPinRef = useRef<Pin | null>(null); // 현재 포커스된 핀 참조

  // 새 빈 보드 생성
  function createBoard() {
    const boardId = uuid()
    const board: Board = {
      id: boardId,
      pins: [{id:uuid(),boardId,duration:1,exist:true,noteName:"C4",pitch:1,startTime:0},{id:uuid(),boardId,duration:1,exist:true,noteName:"C4",pitch:1,startTime:0}],
    };
    setBoards([...boards, board]);
    return board;
  }
  // 보드 길이 수정
  function setBoardSize(board: Board, size: number) {
    const copy = [...boards];
    const idx = copy.indexOf(board);
    const newPins = board.pins;
    while (newPins.length < size) {
      newPins.push({
        id: uuid(),
        boardId: board.id,
        duration: 1,
        exist: true,
        noteName: "C4",
        pitch: 0,
        startTime: 1,
      });
    }
    const newBoard: Board = { id: board.id, pins: newPins };
    copy[idx] = board;
    setBoards(copy);
  }
  // 핀 변경
  function setPin(pin: Pin) {
    const targetBoard = boards.filter((board) => board.pins.includes(pin))[0];
    const boardIdx = boards.indexOf(targetBoard);
    const idx = targetBoard.pins.indexOf(pin);
    targetBoard.pins[idx] = pin;
    boards[boardIdx] = targetBoard;
  }

  useEffect(() => {
    const board = createBoard();
    // setTimeout(()=>{setBoardSize(board, 5)},100)
    ;
    const handleWheel = (e: WheelEvent) => {
      if (focusedPinRef.current && e.deltaY !== 0) {
        const now = { ...focusedPinRef.current };
        now.pitch =
          e.deltaY > 0 ? getNextPitch(now.pitch) : getPreviousPitch(now.pitch);
        const copy = [...boards];
        copy[0];
        setBoards((prev) => [...prev]);
        console.log(now.pitch);
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
        {boards.map((board) => (
          <BoardStyle key={board.id}>
            {board.pins.map((pin) =>
              pin.exist ? (
                <PinComp
                  onFocus={() => {
                    console.log(pin);
                    focusedPinRef.current = pin;
                  }}
                  noteName={pin.noteName}
                  pitch={pin.pitch}
                  key={pin.id}
                />
              ) : (
                <EmptyPinComp
                  onFocus={() => {
                    setPin({
                      id: pin.id,
                      boardId: pin.boardId,
                      duration: 1,
                      exist: true,
                      noteName: "C4",
                      pitch: 1,
                      startTime: 1,
                    });
                  }}
                />
              )
            )}
          </BoardStyle>
        ))}
      </BoardWrpStyle>
    </CntStyle>
  );
}

const p1 = { noteName: "C4", pitch: 1, startTime: 1, duration: 1 };
