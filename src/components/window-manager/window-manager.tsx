import { ContextMenuItem } from "@/components/context-menu";
import { FileExplorer } from "@/components/file-explorer";
import { Icons } from "@/components/icons";
import { Window } from "@/components/window";
import { useAtomValue, useSetAtom } from "jotai";
import { FileIcon, FolderClosedIcon } from "lucide-react";
import { Fragment } from "react";
import { openMenuAtom } from "../context-menu/atoms";
import { Taskbar } from "../task-bar";
import { addWindowAtom, renderFnWeakMap, windowIdsAtom } from "./atoms";

const TempIconComp: React.FC<{
  icon: React.ReactNode;
  title: string;
  onClick?(): void;
}> = ({ icon, title, onClick }) => {
  return (
    <div className="max-w-14 inline-flex flex-col items-center">
      <button
        className="size-12 flex items-center justify-center"
        onDoubleClick={onClick}
      >
        {icon}
      </button>
      <p className="text-center">{title}</p>
    </div>
  );
};

export function WindowManager() {
  const ids = useAtomValue(windowIdsAtom);
  const addWindow = useSetAtom(addWindowAtom);
  const openContextMenu = useSetAtom(openMenuAtom);

  return (
    <>
      <div
        style={{
          backgroundImage: `url(/assets/Users/Default/Pictures/wallpaper.png)`,
        }}
        className="bg-black w-screen h-screen"
        onContextMenu={(ev) => {
          ev.preventDefault();

          const menu = (
            <>
              <ContextMenuItem>
                <Icons.refresh /> Refresh
              </ContextMenuItem>
            </>
          );
          openContextMenu(() => menu);
        }}
      >
        <TempIconComp
          icon={<FileIcon size={32} />}
          title="Blank Window"
          onClick={() =>
            addWindow((windowId) => (
              <Window windowId={windowId} title="Untitled Window" />
            ))
          }
        />

        <TempIconComp
          icon={<FolderClosedIcon size={32} />}
          title="Blank Window"
          onClick={() => addWindow((id) => <FileExplorer windowId={id} />)}
        />

        <Taskbar />

        {ids.map((id) => {
          const renderProp = renderFnWeakMap.get(id);
          return <Fragment key={id.id}>{renderProp?.(id)}</Fragment>;
        })}
      </div>
    </>
  );
}
