import type { UUID } from "../utils/uuid";

export interface Pin {
  id: UUID;
  note: number | null;
}

export interface Board {
  id: UUID;
  name: string;
  pins: Record<UUID, Pin>;
}

export interface PinProject {
  id: UUID;
  title: string;
  boards: Record<UUID, Board>;
}
