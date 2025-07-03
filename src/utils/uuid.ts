import { v4 } from "uuid";

export type UUID = string & { __brand: "UUID" };

export function uuid(): UUID {
  return v4() as UUID;
}
