import { createContext, useContext } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { Id } from "@/components/window-manager";

// Store
type WindowStoreState = {
  meta: {
    icon: string;
  };
  id: Id;
  prevState: "normal" | "minimized" | "maximized";
  state: "normal" | "minimized" | "maximized";
};

type WindowStoreAction = {
  setState(state: WindowStoreState["state"]): void;
};

export type WindowStore = WindowStoreState & WindowStoreAction;

const defaultIconLocation =
  "file-system/Program Files/window-manager/assets/common/icon";

const initialWindowStore: Omit<WindowStoreState, "id"> = {
  meta: {
    icon: defaultIconLocation,
  },
  prevState: "normal",
  state: "normal",
};

export const createWindowStore = (windowId: Id) => {
  return createStore<WindowStore>()((set, get) => ({
    ...initialWindowStore,
    id: windowId,
    setState: (state) => set({ prevState: get().state, state: state }),
  }));
};

// Provider
const WindowCtx = createContext<StoreApi<WindowStore> | null>(null);

type WindowProviderProps = {
  store: StoreApi<WindowStore>;
  children: React.ReactNode;
};
export function WindowStoreProvider({ children, store }: WindowProviderProps) {
  return <WindowCtx.Provider value={store}>{children}</WindowCtx.Provider>;
}

export function useWindowStore<T>(selector: (state: WindowStore) => T): T {
  const store = useContext(WindowCtx);
  if (!store) throw new Error("Missing WindowContext.Provider in the tree");
  return useStore(store, selector);
}
