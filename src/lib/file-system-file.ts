import { generateUniqueId } from "@/lib/utils";
import { produce } from "immer";
import { atom } from "jotai";
import { FileAtom, FileNode } from "./file-system-types";

type FilesAtom = {
  files: Record<string, FileAtom>;
};

export const filesAtom = atom<FilesAtom>({
  files: {},
});

export const createFileAtom = atom(
  null,
  (get, set, name: string, content: Blob) => {
    const existingIds = Object.keys(get(filesAtom));
    const id = generateUniqueId(existingIds);

    const newFile: FileNode = {
      id,
      name,
      type: "txt",
      content,
    };
    const newFileAtom = atom(newFile);

    set(
      filesAtom,
      produce((draft) => {
        draft.files[id] = newFileAtom;
      }),
    );

    return newFileAtom;
  },
);

export const hasFileAtom = (id: string) =>
  atom((get) => id in get(filesAtom).files);

export const getFileAtom = (id: string) =>
  atom((get) => get(filesAtom).files[id]);
