import { isFolder } from "@/lib/file-system-helper";
import {
  AtomFolderChildren,
  FileAtom,
  FolderAtom,
} from "@/lib/file-system-types";
import { useAtomValue, useSetAtom } from "jotai";
import { FolderClosedIcon } from "lucide-react";
import { selectedFolderAtomAtom } from "./atoms";
import { ImageFile } from "./components/image-file";
import { TxtFile } from "./components/txt-file";

type Props = {
  children: React.ReactNode;
};

export const FileView: React.FC<Props> = ({ children }) => {
  return <div className="grid grid-cols-4 gap-4 p-4">{children}</div>;
};

type FolderItemProps = {
  folderChildrenAtom: AtomFolderChildren;
};

export function FolderItem({ folderChildrenAtom: itemAtom }: FolderItemProps) {
  const selectFolderAtom = useSetAtom(selectedFolderAtomAtom);
  const item = useAtomValue(itemAtom);

  return isFolder(item) ? (
    <FolderFile
      key={item.name}
      title={item.name}
      onClick={() => selectFolderAtom(itemAtom as FolderAtom)}
    />
  ) : item.name.includes(".png") ? (
    <ImageFile fileAtom={itemAtom as FileAtom} />
  ) : (
    <TxtFile fileAtom={itemAtom as FileAtom} />
  );
}

const FolderFile: React.FC<{ title: string; onClick?(): void }> = ({
  title,
  onClick,
}) => {
  return (
    <button
      onDoubleClick={onClick}
      className="max-w-14 flex flex-col items-center"
    >
      <FolderClosedIcon size={32} />
      <p className="line-clamp-2 h-12 text-ellipsis">{title}</p>
    </button>
  );
};
