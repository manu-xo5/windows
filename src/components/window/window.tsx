import { useDrag } from "@/hooks/use-drag";
import { useResize } from "@/hooks/use-resize";
import { useRef } from "react";
import { useWindowStore } from "./context";
import { TitleBar } from "./title-bar";

type Props = {
  title: string;
  children?: React.ReactNode;
};
export function Window({ children, title }: Props) {
  const titleNodeRef = useRef<HTMLDivElement>(null);
  const windowNodeRef = useRef<HTMLDivElement>(null);
  const state = useWindowStore((s) => s.state);
  void state;

  useDrag({
    anchorRef: titleNodeRef,
    targetRef: windowNodeRef,
  });

  useResize({ targetRef: windowNodeRef });

  return (
    <div className="absolute" ref={windowNodeRef}>
      <TitleBar ref={titleNodeRef}>{title}</TitleBar>
      <div className="h-96 bg-black border border-t-none border-accenu">
        {children}
      </div>
    </div>
  );
}
