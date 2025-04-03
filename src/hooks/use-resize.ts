import { RESIZEABLE_BORDER } from "@/constants";
import { useMouseMove } from "./use-mouse-move";
import { useStableCallback } from "./use-stable-callback";
import { noop } from "@/lib/utils";

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

type UseResizeArg<T> = {
  targetRef: React.RefObject<T | null>;
};
export function useResize<T extends HTMLElement>({
  targetRef: nodeRef,
}: UseResizeArg<T>) {
  useMouseMove<
    {
      mouseXInit: number;
      initWidth: number;
      dwParity: number;
    },
    T
  >({
    clickTargetRef: nodeRef,
    onPress: (mouse, ctx) => {
      if (!nodeRef.current) return;

      const winRect = nodeRef.current.getBoundingClientRect();
      ctx.mouseXInit = mouse.x;
      ctx.initWidth = winRect.width;
      ctx.dwParity = mouse.x > winRect.x + winRect.width / 2 ? 1 : -1;

      if (!isOnResizeableArea(mouse, nodeRef.current)) {
        ctx.cancel();
      }
    },
    onDrag: (mouse, ctx) => {
      if (!nodeRef.current) return;
      const dw = (mouse.x - ctx.mouseXInit) * ctx.dwParity;
      nodeRef.current.style.width = ctx.initWidth + dw + "px";
    },
  });
}
