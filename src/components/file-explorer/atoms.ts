import { rootFolderAtom } from "@/lib/file-system-folder";
import { atom } from "jotai";

export const selectedFolderAtomAtom = atom(rootFolderAtom);
