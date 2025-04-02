import { useDrag } from "@/hooks/use-drag";
import { useResize } from "@/hooks/use-resize";
import { useRef } from "react";
import { useWindowStore } from "./context";
import { TitleBar } from "./title-bar";

export function Window() {
  const titleNodeRef = useRef<HTMLDivElement>(null);
  const windowNodeRef = useRef<HTMLDivElement>(null);
  const state = useWindowStore((s) => s.state);

  useDrag({
    anchorRef: titleNodeRef,
    targetRef: windowNodeRef,
  });

  useResize({ targetRef: windowNodeRef });

  return (
    <div className="absolute" ref={windowNodeRef}>
      <TitleBar ref={titleNodeRef}>File Explorer: [{state}]</TitleBar>
      <div className="h-96 bg-black border border-t-none border-accenu" />
    </div>
  );
}
