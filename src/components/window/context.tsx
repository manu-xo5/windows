import { createContext, useContext } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { Id } from "@/components/window-manager";

// Store
type WindowStoreState = {
  id: Id;
  state: "normal" | "minimized";
};

type WindowStoreAction = {
  minimize(): void;
  restore(): void;
};

export type WindowStore = WindowStoreState & WindowStoreAction;

const initialWindowStore: Omit<WindowStoreState, "id"> = {
  state: "normal",
};

export const createWindowStore = (windowId: Id) => {
  return createStore<WindowStore>()((set) => ({
    ...initialWindowStore,
    id: windowId,
    minimize: () => set({ state: "minimized" }),
    restore: () => set({ state: "normal" }),
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
