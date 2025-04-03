import { ContextMenuProvider } from "@/components/context-menu";
import { WindowManager } from "@/components/window-manager";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextMenuProvider>
      <WindowManager />
    </ContextMenuProvider>
  </StrictMode>,
);
