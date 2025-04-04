import { Window } from "@/components/window";
import { USER_NAME } from "@/constants";
import { BaseFolderId, Root } from "@/lib/file-system";
import { useState } from "react";
import { FileView } from "./file-view";

const defaultLocation = `/users/${USER_NAME}`;

type Props = {
  location?: string;
};
export const FileExplorer: React.FC<Props> = ({
  location = defaultLocation,
}) => {
  const [selectedFolderId, setSelectedFileId] = useState<BaseFolderId>(
    Root.getInstance().id,
  );

  return (
    <Window title={"File Explorer " + location}>
      <div className="h-full">
        <FileView
          itemId={selectedFolderId}
          onOpenFolder={(itemId) => {
            setSelectedFileId(itemId);
          }}
        />
      </div>
    </Window>
  );
};
