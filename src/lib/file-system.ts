import { generateUniqueId } from "./utils";

interface File<ContentType = string> {
  id: string;
  title: string;
  parent: Folder | null;
  content: ContentType;
}

export interface Folder extends File<(File | Folder)[]> {
  addChildren(child: File | Folder): void;
}

interface RootFolder extends Folder {
  parent: null;
}

const rootFolder: RootFolder = {
  id: "1",
  title: "/",
  parent: null,
  content: [],
  addChildren(child) {
    rootFolder.content.push(child);
  },
};

export const fs = {
  ids: [rootFolder.id] as File["id"][],
  root: rootFolder,
};

export function createTxtFile({
  title = "Untitled File",
  parent,
  content,
}: {
  title?: File["title"];
  parent: File["parent"];
  content: File["content"];
}) {
  const id = generateUniqueId(fs.ids);

  const newFile: File = {
    id: id,
    title: title,
    parent: parent,
    content: content,
  };

  fs.ids.push(id);
  parent?.content.push(newFile);

  return newFile;
}

export function createFolder({
  title,
  parent,
}: {
  title: Folder["title"];
  parent: Folder["parent"];
}) {
  const id = generateUniqueId(fs.ids);

  const newFolder: Folder = {
    id: id,
    title: title,
    parent: parent,
    content: [],
    addChildren: (child) => {
      newFolder.content.push(child);
    },
  };

  fs.ids.push(id);
  parent?.addChildren(newFolder);

  return newFolder;
}

// normalize instead of nesting whole object
// new folder button
// new file button
