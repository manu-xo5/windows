import { getDefaultStore } from "jotai";
import {
  addChildrenAtom,
  atomOfFolder,
  rootFolderAtom,
} from "./file-system-folder";
import {
  FileNode,
  FolderAtom,
  FolderChildren,
  FolderNode,
} from "./file-system-types";

const store = getDefaultStore();

export const resolvePath = (path: string) => {
  const segments = path.split("/").filter(Boolean);

  let parentAtom = rootFolderAtom;
  segments.forEach((childName) => {
    const childAtom = store.get(parentAtom).children.get(childName);
    const child = childAtom && store.get<FolderChildren>(childAtom);

    if (child && !isFolder(child)) {
      throw Error("ENOTDIR");
    }

    if (childAtom == null) {
      throw Error("ENOENT");
    }

    parentAtom = childAtom as FolderAtom;
  });

  return parentAtom;
};

export const createPathFolder = (path: string, folderName: string) => {
  const segments = path.split("/").filter(Boolean);

  let parentAtom = rootFolderAtom;
  segments.forEach((childName) => {
    let childAtom = store.get(parentAtom).children.get(childName);
    const child = childAtom && store.get<FolderChildren>(childAtom);

    if (child && !isFolder(child)) {
      throw Error("ENOTDIR");
    }

    if (childAtom == null) {
      childAtom = atomOfFolder({
        name: childName,
        children: [],
        type: "folder",
        parent: parentAtom,
      });

      store.set(addChildrenAtom, parentAtom, childAtom);
    }

    parentAtom = childAtom as FolderAtom;
  });

  const newFolderAtom = atomOfFolder({
    name: folderName,
    type: "folder",
    children: [],
    parent: parentAtom,
  });

  store.set(addChildrenAtom, parentAtom, newFolderAtom);
  return newFolderAtom;
};

export const isFolder = (value: FolderNode | FileNode): value is FolderNode => {
  return value.type === "folder";
};
