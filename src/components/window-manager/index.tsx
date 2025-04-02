import { Window } from "@/components/window";
import { WindowStoreProvider } from "../window/context";
import { useWindowManagerStore } from "./context";

export function WindowManager() {
  const ids = useWindowManagerStore((s) => s.ids);
  const stores = useWindowManagerStore((s) => s.stores);
  const addWindow = useWindowManagerStore((s) => s.addWindow);

  return (
    <>
      {ids.map((id) => (
        <WindowStoreProvider key={id} store={stores.get(id)!}>
          <Window />
        </WindowStoreProvider>
      ))}

      <button onClick={() => addWindow()}>Open Window</button>
    </>
  );
}

export * from "./context";
