import { useMemo } from "react";
import { getWindowAtoms } from "@/components/window-manager/atoms";
import { WindowId } from "./atoms";

export const useWindowAtoms = (windowId: WindowId) => {
  return useMemo(() => getWindowAtoms(windowId), [windowId]);
};
