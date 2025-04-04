import { generateUniqueId } from "./utils";

export type BaseFolderId = string & { __type: "BaseFolder" };

const generateId = () => generateUniqueId(Object.keys(DISK));

export function createNestedFolders(
  path: string,
  currentParentId: BaseFolderId = Root.getInstance().id,
): BaseFolderId {
  const parts = path.split("/").filter(Boolean);
  let currentParent: BaseFolderId = currentParentId;

  for (const part of parts) {
    const existingFolder = Array.from(DISK[currentParent].children)
      .map((childId) => DISK[childId])
      .filter((item) => Folder.isFolder(item))
      .find((item) => item.name === part);

    if (existingFolder) {
      currentParent = existingFolder.id;
    } else {
      currentParent = FileSystemItem.create(Folder, {
        name: part,
        parent: currentParent,
      }).id;
    }
  }

  return currentParent;
}
export const splitDirectoryFilePath = (path: string) => {
  const segments = path.split("/");
  const fileName = segments.at(segments.length - 1) ?? "";
  const folderPath = segments.slice(0, segments.length - 1).join("/");
  return { fileName, folderPath } as const;
};

export class FileSystemItem {
  id: string;
  name: string;
  parent: BaseFolderId;

  constructor({
    id,
    name,
    parent,
  }: {
    id: string;
    name: string;
    parent: BaseFolderId;
  }) {
    this.id = id;
    this.name = name;
    this.parent = parent;
  }

  move(newParentId: BaseFolderId): void {
    if (!Folder.isFolder(DISK[newParentId])) {
      throw new Error(`Destination '${newParentId}' is not a valid folder`);
    }

    DISK[this.parent].children.delete(this.id);
    this.parent = newParentId;
    DISK[newParentId].append(this.id);
  }

  getPath(): string {
    const path: string[] = [];
    let current = this.id;
    do {
      const item = DISK[current];
      path.unshift(item.name);
      current = item.parent;
    } while (current && current !== Root.getInstance().id);

    return "/" + path.join("/");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static create<T extends new ({ id, name, parent }: any) => any>(
    type: T,
    args: Omit<ConstructorParameters<T>[0], "id">,
  ): InstanceType<T> {
    if (!Folder.isFolder(DISK[args.parent])) {
      throw new Error(`Parent '${args.parent}' is not a valid folder`);
    }
    const generatedId = generateId();
    const item = new type({ ...args, id: generatedId });
    DISK[generatedId] = item;
    DISK[args.parent].append(generatedId);
    return item as InstanceType<T>;
  }
}

export class FSFile extends FileSystemItem {
  type: string;
  content: string;

  constructor({
    id,
    name,
    parent,
    content = "",
  }: {
    id: string;
    name: string;
    parent: BaseFolderId;
    content?: string;
  }) {
    super({ id, name, parent });
    this.type = "file";
    this.content = content;
  }

  readContent(): string {
    return this.content;
  }
}

abstract class BaseFolder extends FileSystemItem {
  override id: BaseFolderId;
  children: Set<string>;

  constructor({
    id,
    name,
    parent,
  }: {
    id: string;
    name: string;
    parent: BaseFolderId;
  }) {
    super({ id: id, name, parent });
    this.id = id as BaseFolderId;
    this.children = new Set();
  }

  append(itemId: string): void {
    this.children.add(itemId);
  }

  listDirectory() {
    return Array.from(this.children).map((childId) => DISK[childId]);
  }
}

export class Folder extends BaseFolder {
  type: string;

  constructor({
    id,
    name,
    parent,
  }: {
    id: string;
    name: string;
    parent: BaseFolderId;
  }) {
    super({ id, name, parent });
    this.type = "folder";
  }

  static isFolder(item: unknown): item is Folder | Root {
    return item instanceof BaseFolder;
  }
}

export class Root extends BaseFolder {
  private static instance: Root;

  private constructor() {
    super({ id: "root", name: "/", parent: "root" as BaseFolderId });
  }

  static getInstance(): Root {
    if (!Root.instance) {
      Root.instance = new Root();
    }
    return Root.instance;
  }
}

export const DISK: Record<BaseFolderId, BaseFolder> &
  Record<string, FileSystemItem | Root> = {
  root: Root.getInstance(),
}; // Stores all files and folders globally
