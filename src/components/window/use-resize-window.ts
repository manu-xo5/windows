import { RESIZEABLE_BORDER } from "@/constants";
import {
  OnDragHandler,
  OnPressHandler,
  useMouseMove,
} from "@/hooks/use-mouse-move";
import { useCallback } from "react";

type UseResizeArg<T> = {
  targetRef: React.RefObject<T | null>;
};
type Ctx = {
  mouseXInit: number;
  initWidth: number;
  dwParity: number;
};

function isOnResizeableArea<T extends HTMLElement>(
  mouse: { x: number; y: number },
  win: T | null,
) {
  if (!win) return false;

  const winRect = win.getBoundingClientRect();

  const isOnLeftBorder =
    mouse.x >= winRect.x && mouse.x <= winRect.x + RESIZEABLE_BORDER;

  const isOnRightBorder =
    mouse.x >= winRect.x + winRect.width - RESIZEABLE_BORDER &&
    mouse.x <= winRect.x + winRect.width;

  const isOnTopBorder =
    mouse.y >= winRect.y && mouse.y <= winRect.y + RESIZEABLE_BORDER;

  const isOnBottomBorder =
    mouse.y >= winRect.y + winRect.height - RESIZEABLE_BORDER &&
    mouse.y <= winRect.y + winRect.height;

  return isOnLeftBorder || isOnRightBorder || isOnTopBorder || isOnBottomBorder;
}

export function useResizeWindow<T extends HTMLElement>({
  targetRef: nodeRef,
}: UseResizeArg<T>) {
  const handlePress: OnPressHandler<Ctx> = useCallback(
    ({ mouse, cancel }, ctx) => {
      if (!nodeRef.current) return;

      const winRect = nodeRef.current.getBoundingClientRect();
      ctx.mouseXInit = mouse.x;
      ctx.initWidth = winRect.width;
      ctx.dwParity = mouse.x > winRect.x + winRect.width / 2 ? 1 : -1;

      if (!isOnResizeableArea(mouse, nodeRef.current)) {
        cancel();
      }
    },
    [nodeRef],
  );

  const handleDrag: OnDragHandler<Ctx> = useCallback(
    ({ mouse }, ctx) => {
      if (!nodeRef.current) return;
      const dw = (mouse.x - ctx.mouseXInit) * ctx.dwParity;
      nodeRef.current.style.width = ctx.initWidth + dw + "px";
    },
    [nodeRef],
  );

  useMouseMove<Ctx, T>({
    clickTargetRef: nodeRef,
    onPress: handlePress,
    onDrag: handleDrag,
  });
}
