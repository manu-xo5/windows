import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WindowManager } from "@/components/window-manager";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WindowManager />
  </StrictMode>,
);
