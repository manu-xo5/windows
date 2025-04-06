import { WindowId } from "@/components/window/atoms";
import { atom } from "jotai";

type RenderFn = (id: WindowId) => React.ReactNode;

export const renderFnWeakMap = new WeakMap<WindowId, RenderFn>();
export const atomMap = new WeakMap<
  WindowId,
  ReturnType<typeof createWindowAtom>
>();
export const windowIdsAtom = atom<WindowId[]>([]);

export const addWindowAtom = atom(null, (_, set, renderFn: RenderFn) => {
  const id: WindowId = { id: crypto.randomUUID() };

  renderFnWeakMap.set(id, renderFn);
  atomMap.set(id, createWindowAtom(id));

  set(windowIdsAtom, (prev) => [...prev, id]);
});

export const closeWindowAtom = atom(null, (_, set, id: WindowId) => {
  set(windowIdsAtom, (prev) => prev.filter((id_) => id_ !== id));
});

export type WinState = "normal" | "minimized" | "maximized";
type WindowData = {
  id: WindowId;
};

export const createWindowAtom = (id: WindowId) => {
  const baseWinAtom = atom<WindowData>({
    id: id,
  });
  const winCurrentStateAtom = atom<WinState>("normal");
  const winPrevStateAtom = atom<WinState>("normal");

  const winStateAtom = atom(
    (get) => ({
      prev: get(winPrevStateAtom),
      current: get(winCurrentStateAtom),
    }),
    (get, set, state: WinState) => {
      set(winPrevStateAtom, get(winCurrentStateAtom));
      set(winCurrentStateAtom, state);
    },
  );
  const restoreWinStateAtom = atom(null, (get, set) => {
    set(winStateAtom, get(winPrevStateAtom));
  });

  return {
    baseWinAtom,
    winStateAtom,
    restoreWinStateAtom,
  };
};

export const getWindowAtoms = (id: WindowId) => {
  if (!atomMap.has(id)) {
    throw Error(`accessing a window with id: ${id} doesn't have the store`);
  }
  return atomMap.get(id)!;
};
