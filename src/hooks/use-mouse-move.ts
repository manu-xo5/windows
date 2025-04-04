import { useEffect } from "react";

const MouseButton = {
  LEFT: 0,
  RIGHT: 1,
} as const;

export type Coords = {
  x: number;
  y: number;
};

export type Values = { mouse: Coords & { start: Coords }; cancel(): void };

export type OnPressHandler<Ctx> = (value: Values, ctx: Ctx) => void;
export type OnDragHandler<Ctx> = (value: Values, ctx: Ctx) => void;

type UseMouseMoveArg<Ctx, Ref> = {
  clickTargetRef: React.RefObject<Ref | null>;
  onPress?: OnPressHandler<Ctx>;
  onDrag?: OnDragHandler<Ctx>;
};

export function useMouseMove<Ctx, Ref extends HTMLElement>({
  clickTargetRef,
  onPress,
  onDrag,
}: UseMouseMoveArg<Ctx, Ref>) {
  useEffect(() => {
    let leftMouse = false;
    let ignore = false;
    const mouseStart: Coords = {
      x: 0,
      y: 0,
    };
    const ctx = {} as Ctx;

    // start drag only if mouse cursor
    // on specific `nodeRef.current` element
    function handleMouseDown(ev: MouseEvent) {
      if (!clickTargetRef.current) return;
      if (
        clickTargetRef.current !== ev.target &&
        !clickTargetRef.current.contains(ev.target as HTMLElement)
      )
        return;
      if (ev.button !== MouseButton.LEFT) return;

      leftMouse = true;

      mouseStart.x = ev.clientX;
      mouseStart.y = ev.clientY;
      const mouseData = {
        x: ev.clientX,
        y: ev.clientY,
        start: mouseStart,
      };
      const values = {
        mouse: mouseData,
        cancel: () => {
          ignore = true;
        },
      };

      onPress?.(values, ctx);
    }

    // call `onDrag` handler
    function handleMouseMove(ev: MouseEvent) {
      if (!leftMouse || ignore) return;

      const mouseData = {
        x: ev.clientX,
        y: ev.clientY,
        start: mouseStart,
      };
      const values = {
        mouse: mouseData,
        cancel: () => {
          ignore = true;
        },
      };

      onDrag?.(values, ctx);
    }

    // reset state
    function handleMouseUp(ev: MouseEvent) {
      if (ev.button !== MouseButton.LEFT) return;
      leftMouse = false;
      ignore = false;
    }

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [onPress, onDrag, clickTargetRef]);
}
