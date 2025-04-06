import { produce } from "immer";
import { atom, PrimitiveAtom, type Atom } from "jotai";
import { filesAtom } from "./file-system";
import { FileNode } from "./file-system-types";

export type Folder = {
  id: string;
  _children: Array<Atom<Folder> | FileNode["id"]>;
  type: "folder";
  size: number;
};
export type FolderWithChildren = Folder & {
  children: Record<string, Folder["_children"][number]>;
};

type FolderAtom = PrimitiveAtom<Folder>;

function createFolderAtom(name: string) {
  const baseFolderAtom = atom<Folder>({
    id: name,
    _children: [],
    type: "folder",
    size: 0,
  });
  const childrenAtom = getChildrenAtom(baseFolderAtom);

  return atom(
    (get) =>
      ({
        ...get(baseFolderAtom),
        children: get(childrenAtom),
      }) as FolderWithChildren,
    (_, set, update: Folder | ((prev: Folder) => Folder)) => {
      set(baseFolderAtom, update);
    },
  );
}

export const rootFolderAtom = createFolderAtom("root");

export const getChildrenAtom = (folderAtom: PrimitiveAtom<Folder>) => {
  return atom((get) => {
    const children = get(folderAtom)._children;

    const entries = children.map((child) => {
      if (typeof child === "string") {
        const file = get(filesAtom).files[child];
        return [file.id, child];
      } else {
        const folderData = get(child);
        return [folderData.id, child];
      }
    });

    return Object.fromEntries(entries);
  });
};

export const addChildrenAtom = atom(
  null,
  (_get, set, parentFolderAtom: FolderAtom, name: string) => {
    const newFolder = atom<Folder>({
      id: name,
      _children: [],
      type: "folder",
      size: 0,
    });

    set(
      parentFolderAtom,
      produce((draft) => {
        draft._children.push(newFolder);
        draft.size++;
      }),
    );

    return newFolder;
  },
);
