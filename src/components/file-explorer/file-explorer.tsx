import { Window } from "@/components/window";
import { USER_NAME } from "@/constants";
import { createFolder, Folder, fs } from "@/lib/file-system";
import { FileIcon, FolderClosedIcon } from "lucide-react";
import { useState } from "react";

const defaultLocation = `/users/${USER_NAME}`;

type Props = {
  location?: string;
};
export const FileExplorer: React.FC<Props> = ({
  location = defaultLocation,
}) => {
  const [count, setCount] = useState(0);
  const [selectedFolder, setSelectedFile] = useState<Folder>(fs.root);

  return (
    <Window title={"File Explorer " + location}>
      <div
        className="h-full"
        onContextMenu={(ev) => {
          ev.preventDefault();
          const name = window.prompt("new folder name");
          createFolder({
            parent: selectedFolder,
            title: name ?? "Untitled Folder",
          });
          setCount((p) => ++p);
        }}
      >
        <div className="grid grid-cols-4 gap-4">
          {selectedFolder.content.map((item) =>
            typeof item.content === "string" ? (
              <TxtFile key={item.id} title={item.title} />
            ) : (
              <FolderFile
                key={item.id}
                title={item.title}
                onClick={() => {
                  setSelectedFile(item as Folder);
                }}
              />
            ),
          )}
        </div>
      </div>
    </Window>
  );
};

const TxtFile: React.FC<{ title: string; onClick?(): void }> = ({
  title,
  onClick,
}) => {
  return (
    <div className="max-w-14 flex flex-col items-center">
      <button onDoubleClick={onClick}>
        <FileIcon size={32} />
        <p>{title}</p>
      </button>
    </div>
  );
};

const FolderFile: React.FC<{ title: string; onClick?(): void }> = ({
  title,
  onClick,
}) => {
  return (
    <div className="max-w-14 flex flex-col items-center">
      <button onDoubleClick={onClick}>
        <FolderClosedIcon size={32} />
        <p>{title}</p>
      </button>
    </div>
  );
};
