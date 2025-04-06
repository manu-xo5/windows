import { getDefaultStore } from "jotai";
import { addChildrenAtom, rootFolderAtom } from "./file-system-folder";

const store = getDefaultStore();

export const createPathFolder = (path: string) => {
  const segments = path.split("/").filter(Boolean);
  let parentAtom = rootFolderAtom;

  segments.forEach((childName) => {
    const children = store.get(parentAtom).children;

    let subfolder = children.get(childName);
    if (!subfolder) {
      subfolder = store.set(addChildrenAtom, parentAtom, childName);
    }
    parentAtom = subfolder;
  });

  return parentAtom;
};
