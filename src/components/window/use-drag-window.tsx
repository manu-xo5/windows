import {
  Coords,
  OnDragHandler,
  OnPressHandler,
  useMouseMove,
} from "@/hooks/use-mouse-move";
import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { useWindowStore } from "./context";

type DragWindowCtx = { winRect: Coords };
export function useDragWindow<T extends HTMLElement, F extends HTMLElement>({
  anchorRef,
  targetRef,
}: {
  anchorRef: React.RefObject<F | null>;
  targetRef: React.RefObject<T | null>;
}) {
  const state = useWindowStore((s) => s.state);
  const stateRef = useRef(state);
  stateRef.current = state;
  const setState = useWindowStore((s) => s.setState);

  const handleDragStart: OnPressHandler<DragWindowCtx> = useCallback(
    (_, ctx) => {
      if (!targetRef.current) return;

      const winRect = targetRef.current.getBoundingClientRect();
      ctx.winRect = { x: winRect.x, y: winRect.y };
    },
    [targetRef],
  );

  const handleDrag: OnDragHandler<DragWindowCtx> = useCallback(
    ({ mouse }, ctx) => {
      if (!targetRef.current) return;
      if (stateRef.current === "maximized") {
        flushSync(() => {
          setState("normal");
        });
        const winRect = targetRef.current.getBoundingClientRect();

        ctx.winRect.x = mouse.x - winRect.width / 2;
        ctx.winRect.y = 0;
        return;
      }

      const dx = mouse.x - mouse.start.x;
      const dy = mouse.y - mouse.start.y;

      targetRef.current.style.left = ctx.winRect.x + dx + "px";
      targetRef.current.style.top = ctx.winRect.y + dy + "px";
    },
    [setState, targetRef],
  );

  useMouseMove({
    clickTargetRef: anchorRef,
    onPress: handleDragStart,
    onDrag: handleDrag,
  });
}
