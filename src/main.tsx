import { ContextMenuProvider } from "@/components/context-menu";
import { WindowManager } from "@/components/window-manager";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TASKBAR_HEIGHT } from "./constants";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContextMenuProvider>
      <div
        style={
          {
            "--taskbar-height": TASKBAR_HEIGHT + "px",
          } as React.CSSProperties
        }
      >
        <WindowManager />
      </div>
    </ContextMenuProvider>
  </StrictMode>,
);
