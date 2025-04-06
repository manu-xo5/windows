import { ContextMenuProvider } from "@/components/context-menu";
import { WindowManager } from "@/components/window-manager";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { TASKBAR_HEIGHT } from "./constants";
import { Provider } from "jotai";
import "@/lib/file-system";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
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
    </Provider>
  </StrictMode>,
);
