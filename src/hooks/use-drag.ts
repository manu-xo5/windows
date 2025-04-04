import { RESIZEABLE_BORDER } from "@/constants";
import { useCallback } from "react";
import { OnDragHandler, OnPressHandler, useMouseMove } from "./use-mouse-move";

type UseDragArg<T> = {
  anchorRef: React.RefObject<T | null>;
  targetRef: React.RefObject<T | null>;
  onDrag?(): void;
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
    mouse.y < winRect.y + winRect.height
  );
}

export function useDrag<T extends HTMLElement>({
  anchorRef,
  targetRef,
  onDrag,
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
      if (!targetRef.current || !anchorRef.current) return;
      const targetRect = targetRef.current.getBoundingClientRect();
      // realign when offset is greater that anchor width
      // prevents glitch when mouse isn't over anchorRef,
      // still draggable
      if (ctx.offsetX > targetRect.width - 48 * 3) {
        const screenOverflow = Math.max(
          0,
          mouse.x + targetRect.width / 2 - window.innerWidth,
        );
        console.log({
          screenOverflow,
          x: targetRect.x,
          w: targetRect.width,
          sw: innerWidth,
        });
        ctx.offsetX = targetRect.width / 2 + screenOverflow;
      }

      targetRef.current.style.left = mouse.x - ctx.offsetX + "px";
      targetRef.current.style.top = mouse.y - ctx.offsetY + "px";
      onDrag?.();
    },
    [onDrag, targetRef, anchorRef],
  );

  useMouseMove<Ctx, T>({
    clickTargetRef: anchorRef,
    onPress: handlePress,
    onDrag: handleDrag,
  });
}
