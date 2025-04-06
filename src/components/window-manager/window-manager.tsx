import { FileExplorer } from "@/components/file-explorer";
import { Window } from "@/components/window";
import { useAtomValue, useSetAtom } from "jotai";
import { FileIcon, FolderClosedIcon, HomeIcon } from "lucide-react";
import { Fragment } from "react";
import { Taskbar } from "../task-bar";
import {
  addWindowAtom,
  closeWindowAtom,
  renderFnWeakMap,
  windowIdsAtom,
} from "./atoms";
import { setup } from "./setup";

setup();

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
  const closeWindow = useSetAtom(closeWindowAtom);

  return (
    <>
      {ids.map((id) => {
        const renderProp = renderFnWeakMap.get(id);
        return <Fragment key={id.id}>{renderProp?.(id)}</Fragment>;
      })}
      <Taskbar />

      <TempIconComp
        icon={<HomeIcon size={32} />}
        title="Close"
        onClick={() => ids[0] && closeWindow(ids[0])}
      />

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
    </>
  );
}
