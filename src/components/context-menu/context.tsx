import { createContext, use } from "react";
import { Action } from "./context-menu";

export const ContextMenuContext = createContext<
  React.ActionDispatch<[action: Action]>
>(() => <></>);

export const useContextMenu = () => use(ContextMenuContext);
