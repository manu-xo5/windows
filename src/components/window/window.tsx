import { ContextMenuItem, useContextMenu } from "@/components/context-menu";
import { useDrag } from "@/hooks/use-drag";
import { useResize } from "@/hooks/use-resize";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef } from "react";
import { useWindowStore } from "./context";
import { TitleBar } from "./title-bar";
import { ChevronRightIcon } from "lucide-react";
import { useWindowManagerStore } from "../window-manager";
import { flushSync } from "react-dom";

type Props = {
  title: string;
  children?: React.ReactNode;
};
export function Window({ children, title }: Props) {
  const titleNodeRef = useRef<HTMLDivElement>(null);
  const windowNodeRef = useRef<HTMLDivElement>(null);
  const windowId = useWindowStore((s) => s.id);
  const state = useWindowStore((s) => s.state);
  const setState = useWindowStore((s) => s.setState);
  const close = useWindowManagerStore((s) => s.closeWindow);

  const dispatchCtxMenu = useContextMenu();
  const handleDrag = useCallback(() => {
    setState("normal");
  }, [setState]);

  useDrag({
    anchorRef: titleNodeRef,
    targetRef: windowNodeRef,
    onDrag: handleDrag,
  });

  useResize({ targetRef: windowNodeRef });

  useEffect(() => {
    if (!windowNodeRef.current) return;
    windowNodeRef.current.style.width = "400px";
    windowNodeRef.current.style.height = "300px";
  }, []);

  return (
    <div
      style={{
        viewTransitionName: "window_" + windowId,
      }}
      className={cn(
        "absolute z-10 flex flex-col",
        state === "minimized" &&
          "!scale-[0.0001%] !top-[unset] !bottom-0 !left-1/2 -translate-x-1/2",
        state === "maximized" &&
          "!top-0 !left-0 !w-screen !h-[calc(100vh-var(--taskbar-height))]",
      )}
      ref={windowNodeRef}
    >
      <TitleBar
        ref={titleNodeRef}
        onMinimize={() => {
          document.startViewTransition(() => {
            flushSync(() => {
              setState("minimized");
            });
          });
        }}
        onMaximize={() => {
          document.startViewTransition(() => {
            flushSync(() => {
              if (state === "normal") {
                setState("maximized");
              } else {
                setState("normal");
              }
            });
          });
        }}
        onClose={() => {
          document.startViewTransition(() => {
            flushSync(() => {
              close(windowId);
            });
          });
        }}
      >
        {title}
      </TitleBar>

      <div
        style={{ viewTransitionName: "none" }}
        className="h-full bg-black border border-t-none border-accent  overflow-auto"
        onContextMenu={(ev) => {
          ev.preventDefault();
          ev.stopPropagation();

          const menu = (
            <>
              <ContextMenuItem>Dummy - Profile</ContextMenuItem>
              <ContextMenuItem>Dummy - Billing</ContextMenuItem>
              <ContextMenuItem>Dummy - Team</ContextMenuItem>
              <ContextMenuItem
                onClick={(ev) => {
                  ev.preventDefault();
                  console.log("not implemented");
                }}
              >
                Dummy - Submenu <ChevronRightIcon />
              </ContextMenuItem>
            </>
          );

          dispatchCtxMenu({
            type: "open",
            renderFn: () => menu,
          });
        }}
      >
        {children}
      </div>

      <></>
    </div>
  );
}
