import { ContextMenuItem, useContextMenu } from "@/components/context-menu";
import { useDrag } from "@/hooks/use-drag";
import { useResize } from "@/hooks/use-resize";
import { cn } from "@/lib/utils";
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
  const windowId = useWindowStore((s) => s.id);
  const state = useWindowStore((s) => s.state);
  const handleOpenContextMenu = useContextMenu();

  useDrag({
    anchorRef: titleNodeRef,
    targetRef: windowNodeRef,
  });

  useResize({ targetRef: windowNodeRef });

  return (
    <div
      style={{
        viewTransitionName: "window_" + windowId,
      }}
      className={cn(
        "absolute",
        state === "minimized" &&
          "!scale-[0.0001%] !top-[unset] !bottom-0 !left-1/2 -translate-x-1/2",
      )}
      ref={windowNodeRef}
      onContextMenu={(ev) => {
        ev.preventDefault();
      }}
    >
      <TitleBar ref={titleNodeRef}>{title}</TitleBar>

      <div
        className="h-96 bg-black border border-t-none border-accenu"
        onContextMenu={(ev) => {
          ev.preventDefault();

          handleOpenContextMenu({
            type: "open",
            renderFn: () => (
              <>
                <ContextMenuItem>Profile</ContextMenuItem>
                <ContextMenuItem>Billing</ContextMenuItem>
                <ContextMenuItem>Team</ContextMenuItem>
                <ContextMenuItem>Subscription</ContextMenuItem>
              </>
            ),
          });
        }}
      >
        {children}
      </div>

      <></>
    </div>
  );
}

//<RightClickMenu open={showMenu} onClose={() => setShowMenu(false)} />
