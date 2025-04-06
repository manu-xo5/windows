import { WindowManager } from "@/components/window-manager";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TASKBAR_HEIGHT } from "./constants";
import { Provider } from "jotai";
import "@/lib/file-system";
import { ContextMenu } from "@/components/context-menu"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
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
    </Provider>
  </StrictMode>,
);
