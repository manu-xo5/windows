import { generateUniqueId } from "@/lib/utils";
import { atom, getDefaultStore } from "jotai";
import { FileNode } from "./file-system-types";
import { produce } from "immer";

export type FileSystemNode = FileNode;

type FilesAtom = {
  files: Record<string, FileNode>;
};

export const filesAtom = atom<FilesAtom>({
  files: {},
});

export const createFileAtom = atom(
  null,
  (get, set, name: string, content: string) => {
    const existingIds = get(filesAtom);
    const id = generateUniqueId(Object.keys(existingIds));

    const file: FileNode = {
      id,
      name,
      type: "file",
      content,
    };

    set(
      filesAtom,
      produce((draft) => {
        draft.files[id] = file;
      }),
    );

    return file;
  },
);

export const hasFileAtom = (id: string) =>
  atom((get) => id in get(filesAtom).files);

export const getFileAtom = (id: string) =>
  atom((get) => get(filesAtom).files[id]);

const defaultStore = getDefaultStore();
console.log(defaultStore.set(createFileAtom, "file-readme", ""));
