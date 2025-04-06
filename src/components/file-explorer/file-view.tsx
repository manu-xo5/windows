import { ContextMenuItem, useContextMenu } from "@/components/context-menu";
import { Window } from "@/components/window";
import { FileIcon, FolderClosedIcon } from "lucide-react";
import { useSetAtom } from "jotai";
import { addWindowAtom } from "../window-manager/atoms";

type Props = {
  itemId: string;
  onOpenFolder(itemId: "string"): void;
};
export const FileView: React.FC<Props> = ({ itemId, onOpenFolder }) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {
        //DISK[itemId]?.listDirectory().map((item) =>
        //  Folder.isFolder(item) ? (
        //    <FolderFile
        //      key={item.id}
        //      title={item.name}
        //      onClick={() => {
        //        onOpenFolder(item.id);
        //      }}
        //    />
        //  ) : (
        //    <TxtFile key={item.id} title={item.name} fileId={item.id} />
        // ))
      }
    </div>
  );
};

const TxtFile: React.FC<{
  title: string;
  onClick?(): void;
  fileId: string;
}> = ({ title, onClick, fileId }) => {
  void fileId;
  const addWindow = useSetAtom(addWindowAtom);
  const dispatch = useContextMenu();

  function handleRightClick() {
    const item = { name: "", content: "" };

    const menu = (
      <>
        <ContextMenuItem
          onClick={() => {
            addWindow((id) => (
              <Window windowId={id} title={item.name} children={item.content} />
            ));
          }}
        >
          Open
        </ContextMenuItem>
      </>
    );

    dispatch({
      type: "open",
      renderFn: () => menu,
    });
  }

  return (
    <div className="max-w-14 flex flex-col items-center">
      <button
        onDoubleClick={onClick}
        onContextMenu={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          handleRightClick();
        }}
      >
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
    <button
      onDoubleClick={onClick}
      className="max-w-14 flex flex-col items-center"
    >
      <FolderClosedIcon size={32} />
      <p className="line-clamp-2 h-12 text-ellipsis">{title}</p>
    </button>
  );
};
