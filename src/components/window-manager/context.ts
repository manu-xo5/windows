import { createWindowStore, WindowStore } from "@/components/window";
import { create, StoreApi } from "zustand";

export type Id = string;
type WindowManagerStore = {
  ids: Id[];
  stores: Map<Id, StoreApi<WindowStore>>;

  addWindow(): void;
  closeWindow(id: Id): void;
};
export const useWindowManagerStore = create<WindowManagerStore>()(
  (set, get) => ({
    ids: [],
    stores: new Map(),

    addWindow() {
      let id = Math.random().toString().substring(2);
      while (get().ids.includes(id)) {
        id = Math.random().toString().substring(2);
      }
      const stores = get().stores;

      stores.set(id, createWindowStore(id));

      set({
        ids: [...get().ids, id],
        stores: new Map(stores),
      });
    },

    closeWindow(id: string) {
      const stores = get().stores;

      stores.delete(id);

      set({
        ids: get().ids.filter((id_) => id_ !== id),
        stores: new Map(stores),
      });
    },
  }),
);
