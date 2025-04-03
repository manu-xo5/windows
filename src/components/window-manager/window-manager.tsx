import { FileExplorer } from "@/components/file-explorer";
import { Window, WindowStoreProvider } from "@/components/window";
import { useWindowManagerStore } from "./context";
import { FileIcon, FolderClosedIcon } from "lucide-react";
import { Taskbar } from "../task-bar";

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
  const ids = useWindowManagerStore((s) => s.ids);
  const storeMap = useWindowManagerStore((s) => s.storeMap);
  const renderPropMap = useWindowManagerStore((s) => s.renderPropMap);
  const addWindow = useWindowManagerStore((s) => s.addWindow);

  return (
    <>
      {ids.map((id) => (
        <WindowStoreProvider key={id} store={storeMap.get(id)!}>
          {renderPropMap.get(id)?.()}
        </WindowStoreProvider>
      ))}
      <Taskbar />

      <TempIconComp
        icon={<FileIcon size={32} />}
        title="Blank Window"
        onClick={() => addWindow(() => <Window title="Untitled Window" />)}
      />
      {/*<TempIconComp
        icon={<FolderClosedIcon size={32} />}
        title="Blank Window"
        onClick={() => addWindow(() => <FileExplorer />)}
      />*/}
    </>
  );
}
