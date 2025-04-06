import { Window } from "@/components/window";
import { USER_NAME } from "@/constants";
import { useState } from "react";
import { FileView } from "./file-view";
import { WindowId } from "../window/atoms";
import { Navbar } from "./components/navbar";

const defaultLocation = `/users/${USER_NAME}`;

type Props = {
  windowId: WindowId;
  location?: string;
};
export const FileExplorer: React.FC<Props> = ({
  windowId,
  location = defaultLocation,
}) => {
  const [selectedFolderId, setSelectedFileId] = useState("");

  return (
    <Window windowId={windowId} title="File Explorer">
      <Navbar />

      <FileView
        itemId={selectedFolderId}
        onOpenFolder={(itemId) => {
          setSelectedFileId(itemId);
        }}
      />
    </Window>
  );
};
