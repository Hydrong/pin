import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { uuid, type UUID } from "../utils/uuid";

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

interface Board {
  id: UUID;
  pins: Pin[];
}

interface Pin {
  id: UUID;
  noteName: string;
  pitch: number;
  duration: number;
  startTime: number;
}

function noteNameToPitch(noteName: string) {
  const values: string[] = [];
  const pitches: number[] = [];
  return pitches[values.indexOf(noteName)];
}

function pitchToNoteName(pitch: number) {
  const values: string[] = [];
  const pitches: number[] = [1, 2, 3, 4, 5];
  return values[pitches.indexOf(pitch)];
}

function getNextPitch(pitch: number) {
  const pitches: number[] = [1, 2, 3, 4, 5];
  return pitches[pitches.indexOf(pitch) + 1];
}
function getPreviousPitch(pitch: number) {
  const pitches: number[] = [1, 2, 3, 4, 5];
  return pitches[pitches.indexOf(pitch) + 1];
}

// || --------- 핀 컴포넌트 --------- ||
const PinComp: React.FC<{ pin: Pin; onFocus: (pin: Pin) => void }> = ({
  pin,
  onFocus,
}) => {
  return (
    <PinWrpStyle onFocus={() => onFocus(pin)}>
      <PinStyle tabIndex={0}>{pin.noteName}</PinStyle>
      <PinBarStyle value={pin.pitch} />
    </PinWrpStyle>
  );
};

// || -------- 메인 컴포넌트 -------- ||
export default function Content() {
  const [pinCount, setPinCount] = useState<number>(10);
  const [boards, setBoards] = useState<Board[]>([
    {
      id: uuid(),
      pins: [
        { ...p1, id: uuid() },
        { ...p1, id: uuid() },
        { ...p1, id: uuid() },
        { ...p1, id: uuid() },
      ],
    },
  ]);
  const [focusedPin, setFocusedPin] = useState<Pin | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (focusedPin && e.deltaY !== 0) {
        console.log("wheel");
        focusedPin.pitch =
          e.deltaY > 0
            ? getNextPitch(focusedPin.pitch)
            : getPreviousPitch(focusedPin.pitch);
      }
    };
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const boardElements = boards.map((board) => (
    <BoardStyle key={board.id}>
      {board.pins.map((pin) => (
        <PinComp
          onFocus={(pin) => {
            setFocusedPin(pin);
          }}
          pin={pin}
          key={pin.id}
        />
      ))}
    </BoardStyle>
  ));

  // || --------- DOM ---------- ||
  return (
    <CntStyle>
      <BoardWrpStyle>{boardElements}</BoardWrpStyle>
    </CntStyle>
  );
}

const p1 = { noteName: "C4", pitch: 1, startTime: 1, duration: 1 };
