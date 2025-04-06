import { Atom, atom } from "jotai";

export type WindowId = {
  id: string;
};
export type WindowData = {
  prevState: WinState;
  state: WinState;
};

export type WinState = "normal" | "minimized" | "maximized";

const winCurrentStateAtom = atom<WindowData["state"]>("normal");
export const winPrevStateAtom = atom<WindowData["state"]>("normal");

export const winStateAtom = atom(
  (get) => ({
    prev: get(winPrevStateAtom),
    current: get(winCurrentStateAtom),
  }),
  (get, set, state: WindowData["state"]) => {
    set(winPrevStateAtom, get(winCurrentStateAtom));
    set(winCurrentStateAtom, state);
  },
);

export type WindowDataAtom = Atom<WindowData>;
