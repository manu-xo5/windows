import { useDrag } from "@/hooks/use-drag";
import { useResize } from "@/hooks/use-resize";
import { useRef } from "react";
import { TitleBar } from "./title-bar";

export function Window() {
  const titleNodeRef = useRef<HTMLDivElement>(null);
  const windowNodeRef = useRef<HTMLDivElement>(null);

  useDrag({
    anchorRef: titleNodeRef,
    targetRef: windowNodeRef,
  });

  useResize({ targetRef: windowNodeRef });

  return (
    <div className="absolute" ref={windowNodeRef}>
      <TitleBar ref={titleNodeRef}>File Explorer</TitleBar>
      <div className="h-96 bg-black border border-t-none border-accenu" />
    </div>
  );
}
