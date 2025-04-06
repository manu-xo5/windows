import { atom, PrimitiveAtom } from "jotai";
import {
  AtomFolderChildren,
  FileNode,
  FolderAtom,
  FolderBase,
  FolderNode,
} from "./file-system-types";

export function atomOfFolder(folder: FolderBase) {
  const baseAtom: PrimitiveAtom<FolderBase> = atom(folder);

  const folderAtom: FolderAtom = atom(
    (get) => {
      const entries = get(baseAtom).children.map((childAtom) => {
        const child = get<FolderNode | FileNode>(childAtom);
        if (child.type === "folder") {
          return [child.name, childAtom] as const;
        } else {
          return [(child as FileNode).id, childAtom] as const;
        }
      });

      return {
        ...get(baseAtom),
        children: new Map(entries),
      };
    },
    (_get, set, update) => {
      set(baseAtom, update);
    },
  );

  return folderAtom;
}

export function atomOfPath(folder: FolderAtom) {
  return atom((get) => {
    const path: string[] = [];
    let i = 0;

    let currentAtom: FolderAtom | null = folder;
    while (++i < 100) {
      const parent: FolderAtom | null = currentAtom && get(currentAtom).parent;
      if (currentAtom == null || parent == null) break;

      const name = get(currentAtom).name;
      path.unshift(name);

      currentAtom = parent;
    }

    return path.join("/");
  });
}

// action atoms
export const addChildrenAtom = atom(
  null,
  (get, set, parentAtom: FolderAtom, childAtom: AtomFolderChildren) => {
    const childName = get<FolderNode | FileNode>(childAtom).name;
    const exists = get(parentAtom).children.has(childName);

    if (exists) {
      throw Error("EEXIST");
    }

    set(parentAtom, (prev) => ({
      ...prev,
      children: [...prev.children, childAtom],
    }));
  },
);

// global atom instances
export const rootFolderAtom = atomOfFolder({
  name: "root",
  type: "folder",
  parent: null,
  children: [],
});
