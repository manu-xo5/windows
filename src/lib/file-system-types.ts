import { PrimitiveAtom, SetStateAction, WritableAtom } from "jotai";

export type FolderChildren = FileNode | FolderNode;
export type AtomFolderChildren = FolderAtom | FileAtom;

export type FileNode = {
  id: string;
  name: string;
  type: string;
  content: Blob;
};
export type FileAtom = PrimitiveAtom<FileNode>;

export type FolderBase = {
  name: string;
  type: "folder";
  parent: FolderAtom | null;
  children: (FolderAtom | FileAtom)[];
};

export type FolderNode = Omit<FolderBase, "children"> & {
  children: Map<string, AtomFolderChildren>;
};
export type FolderAtom = WritableAtom<
  FolderNode,
  [SetStateAction<FolderBase>],
  void
>;
