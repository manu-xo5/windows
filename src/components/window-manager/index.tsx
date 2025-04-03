import { FileExplorer } from "@/components/file-explorer";
import { Window, WindowStoreProvider } from "@/components/window";
import { useWindowManagerStore } from "./context";

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

      <button
        className="block"
        onClick={() => addWindow(() => <Window title="Untitled Window" />)}
      >
        Open Window
      </button>
      <button onClick={() => addWindow(() => <FileExplorer />)}>
        Open File Explorer
      </button>
    </>
  );
}

export * from "./context";
