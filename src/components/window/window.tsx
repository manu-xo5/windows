import { ContextMenuItem } from "@/components/context-menu";
import {
  closeWindowAtom,
  getWindowAtoms,
} from "@/components/window-manager/atoms";
import { useResizeWindow } from "@/components/window/use-resize-window";
import { cn } from "@/lib/utils";
import { useAtom, useSetAtom } from "jotai";
import { ChevronRightIcon } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { flushSync } from "react-dom";
import type { WindowId } from "./atoms";
import { TitleBar } from "./title-bar";
import { useDragWindow } from "./use-drag-window";
import { openMenuAtom } from "../context-menu/atoms";

type Props = {
  windowId: WindowId;
  title: string;
  children?: React.ReactNode;
};

export function Window({ children, title, windowId }: Props) {
  const titleNodeRef = useRef<HTMLDivElement>(null);
  const windowNodeRef = useRef<HTMLDivElement>(null);
  const openMenu = useSetAtom(openMenuAtom);

  const close = useSetAtom(closeWindowAtom);
  const { winStateAtom } = useMemo(() => getWindowAtoms(windowId), [windowId]);
  const [{ current: currentState }, setState] = useAtom(winStateAtom);

  useDragWindow({
    windowId: windowId,
    anchorRef: titleNodeRef,
    targetRef: windowNodeRef,
  });
  useResizeWindow({ targetRef: windowNodeRef });

  useEffect(() => {
    if (!windowNodeRef.current) return;
    windowNodeRef.current.style.width = "600px";
    windowNodeRef.current.style.height = "400px";
  }, []);

  return (
    <div
      style={{
        viewTransitionName: "window_" + windowId.id,
      }}
      className={cn(
        "absolute z-10 flex flex-col",
        currentState === "minimized" &&
          "!scale-[0.0001%] !top-[unset] !bottom-0 !left-1/2 -translate-x-1/2",
        currentState === "maximized" &&
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
              if (currentState === "normal") {
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

          openMenu(() => menu);
        }}
      >
        {children}
      </div>

      <></>
    </div>
  );
}
