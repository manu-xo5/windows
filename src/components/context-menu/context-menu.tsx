import { useWindowEvent } from "@/hooks/use-window-event";
import { cn } from "@/lib/utils";
import { useCallback, useReducer, useRef } from "react";
import { createPortal } from "react-dom";
import { ContextMenuContext, useContextMenu } from "./context";

export type State = { open: boolean; renderFn: () => React.ReactNode };
export type Action =
  | { type: "open"; renderFn: () => React.ReactNode }
  | { type: "close" };
function reducer(state: State, action: Action): State {
  if (action.type === "open") {
    return {
      open: true,
      renderFn: action.renderFn,
    };
  } else if (action.type === "close") {
    return {
      open: false,
      renderFn: () => <></>,
    };
  }
  return state;
}

export const ContextMenuProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ open, renderFn }, dispatch] = useReducer(reducer, {
    open: false,
    renderFn: () => <></>,
  });

  return (
    <ContextMenuContext.Provider value={dispatch}>
      {children}
      {createPortal(
        <ContextMenu dispatch={dispatch} open={open}>
          {renderFn()}
        </ContextMenu>,
        document.getElementById("context-menu")!,
      )}
    </ContextMenuContext.Provider>
  );
};

export const ContextMenu: React.FC<{
  open: boolean;
  dispatch: React.ActionDispatch<[action: Action]>;
  children: React.ReactNode;
}> = ({ open, children, dispatch }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const mouseCoords = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback(
    (ev: MouseEvent) => {
      mouseCoords.current = {
        x: ev.clientX,
        y: ev.clientY,
      };

      if (ev.target === nodeRef.current) return;
      if (nodeRef.current?.contains(ev.target as HTMLElement)) return;

      dispatch({ type: "close" });
    },
    [dispatch],
  );

  useWindowEvent("mousedown", handleMouseDown);

  return (
    open && (
      <div
        ref={nodeRef}
        style={{
          left: mouseCoords.current.x + "px",
          top: mouseCoords.current.y + "px",
        }}
        className="absolute flex flex-col w-fit bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md"
      >
        {children}
      </div>
    )
  );
};

export const ContextMenuItem: React.FC<
  React.ComponentPropsWithoutRef<"button">
> = ({ className, onClick, ...props }) => {
  const dispatchCtxMenu = useContextMenu();

  return (
    <button
      className={cn(
        "hover:bg-accent hover:text-accent-foreground",
        "[&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      onClick={(ev) => {
        onClick?.(ev);
        if (ev.isDefaultPrevented()) return;

        dispatchCtxMenu({ type: "close" });
      }}
      {...props}
    />
  );
};
