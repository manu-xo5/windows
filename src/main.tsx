import { WindowManager } from "@/components/window-manager";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TASKBAR_HEIGHT } from "./constants";
import "@/lib/file-system-file";
import { ContextMenu } from "@/components/context-menu";
import { DevTools } from "jotai-devtools";
import "jotai-devtools/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div
      style={
        {
          "--taskbar-height": TASKBAR_HEIGHT + "px",
        } as React.CSSProperties
      }
    >
      <ContextMenu />
      <WindowManager />
    </div>
    <DevTools />
  </StrictMode>,
);
