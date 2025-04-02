import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Window } from "@/components/window";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Window />
  </StrictMode>,
);
