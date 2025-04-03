import { createWindowStore, WindowStore } from "@/components/window";
import { generateUniqueId } from "@/lib/utils";
import React from "react";
import { create, StoreApi } from "zustand";

export type Id = string;
type WindowManagerStore = {
  ids: Id[];
  storeMap: Map<Id, StoreApi<WindowStore>>;
  renderPropMap: Map<Id, () => React.ReactNode>;

  addWindow(renderProp: () => React.ReactNode): void;
  closeWindow(id: Id): void;
};
export const useWindowManagerStore = create<WindowManagerStore>()(
  (set, get) => ({
    ids: [],
    storeMap: new Map(),
    renderPropMap: new Map(),

    addWindow(renderProp: () => React.ReactNode) {
      const { renderPropMap, storeMap: stores, ids } = get();

      const newId: Id = generateUniqueId(ids);

      stores.set(newId, createWindowStore(newId));
      renderPropMap.set(newId, renderProp);

      document.startViewTransition(() => {
        set({
          ids: [...get().ids, newId],
          storeMap: new Map(stores),
        });
      });
    },

    closeWindow(id: string) {
      const stores = get().storeMap;

      stores.delete(id);

      set({
        ids: get().ids.filter((id_) => id_ !== id),
        storeMap: new Map(stores),
      });
    },
  }),
);
