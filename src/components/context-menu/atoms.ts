import { atom } from "jotai";

type RenderFn = {
  render: () => React.ReactNode;
};
const openAtom = atom(false);

export const renderMenuFnAtom = atom<RenderFn>({ render: () => null });
export const isMenuOpenAtom = atom((get) => get(openAtom));

export const openMenuAtom = atom(null, (_, set, render: RenderFn["render"]) => {
  set(renderMenuFnAtom, { render });
  set(openAtom, true);
});

export const closeMenuAtom = atom(null, (_, set) => {
  set(renderMenuFnAtom, { render: () => null });
  set(openAtom, false);
});
