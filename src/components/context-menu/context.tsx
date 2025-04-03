import { createContext, use } from "react";

export const ContextMenuContext = createContext<(fn: () => React.ReactNode) => void>(
  () => <></>,
);

export const useContextMenu = () => use(ContextMenuContext);
