import { PrimitiveAtom } from "jotai";
import { atom, SetStateAction, WritableAtom } from "jotai";

export type FolderBase = {
  name: string;
  getParent(): FolderAtom;
  children: FolderAtom[];
};

export type Folder = {
  name: string;
  getParent(): FolderAtom;
  children: Map<string, FolderAtom>;
};
export type FolderAtom = WritableAtom<
  Folder,
  [SetStateAction<FolderBase>],
  void
>;

function createFolderAtom(name: string, parentAtom: FolderAtom) {
  const baseAtom: PrimitiveAtom<FolderBase> = atom({
    name,
    getParent: () => parentAtom,
    children: [] as FolderBase["children"],
  });

  const folderAtom: FolderAtom = atom(
    (get) => ({
      ...get(baseAtom),
      children: new Map(),
    }),
    (_get, set, update) => {
      set(baseAtom, update);
    },
  );

  return folderAtom;
}

export const addChildrenAtom = atom(
  null,
  (_, set, parentAtom: FolderAtom, name: string) => {
    const newFolderAtom = createFolderAtom(name, parentAtom);

    set(parentAtom, (prev) => ({
      ...prev,
      children: [...prev.children, newFolderAtom],
    }));

    return newFolderAtom;
  },
);

export const createPathAtom = (folder: FolderAtom) => {
  return atom((get) => {
    const path: string[] = [];
    let i = 0;
    let currentAtom = folder;

    while (++i < 100) {
      const current = get(currentAtom);
      if (current.getParent() === currentAtom) break;

      path.unshift(current.name);
      currentAtom = current.getParent();
    }

    return path.join("/");
  });
};

// global atom instances
const rootBaseFolderAtom = atom<FolderBase>({
  name: "root",
  getParent: () => rootFolderAtom,
  children: [],
});
export const rootFolderAtom: FolderAtom = atom(
  (get) => ({
    ...get(rootBaseFolderAtom),
    children: new Map(),
  }),
  (_, set, update) => {
    set(rootBaseFolderAtom, update);
  },
);

export const selectedFolderAtomAtom = atom<FolderAtom>(rootFolderAtom);
