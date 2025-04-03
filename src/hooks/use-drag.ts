import { RESIZEABLE_BORDER } from "@/constants";
import { useCallback } from "react";
import {
  OnDragHandler,
  OnPressHandler,
  useMouseMove
} from "./use-mouse-move";

type UseDragArg<T> = {
  anchorRef: React.RefObject<T | null>;
  targetRef: React.RefObject<T | null>;
};
type Ctx = { offsetX: number; offsetY: number };

function isOnDraggableArea<T extends HTMLElement>(
  mouse: { x: number; y: number },
  win: T | null,
) {
  if (!win) return false;

  const winRect = win.getBoundingClientRect();

  return (
    mouse.x > winRect.x + RESIZEABLE_BORDER &&
    mouse.x < winRect.x + winRect.width - RESIZEABLE_BORDER &&
    mouse.y > winRect.y + RESIZEABLE_BORDER &&
    mouse.y < winRect.y + winRect.height - RESIZEABLE_BORDER
  );
}

export function useDrag<T extends HTMLElement>({
  anchorRef,
  targetRef,
}: UseDragArg<T>) {
  const handlePress: OnPressHandler<Ctx> = useCallback(
    (mouse, ctx) => {
      if (!anchorRef.current) return;

      if (!isOnDraggableArea(mouse, anchorRef.current)) {
        ctx.cancel();
      }

      const anchorRect = anchorRef.current.getBoundingClientRect();
      ctx.offsetX = mouse.x - anchorRect.x;
      ctx.offsetY = mouse.y - anchorRect.y;
    },
    [anchorRef],
  );

  const handleDrag: OnDragHandler<Ctx> = useCallback(
    (mouse, ctx) => {
      if (!targetRef.current) return;
      targetRef.current.style.left = mouse.x - ctx.offsetX + "px";
      targetRef.current.style.top = mouse.y - ctx.offsetY + "px";
    },
    [targetRef],
  );

  useMouseMove<Ctx, T>({
    clickTargetRef: anchorRef,
    onPress: handlePress,
    onDrag: handleDrag,
  });
}
