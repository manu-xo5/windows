import { useEffect } from "react";

const MouseButton = {
  LEFT: 0,
  RIGHT: 1,
} as const;

export type Coords = {
  x: number;
  y: number;
};

type DefaultCtx = {
  cancel(): void;
};

export type OnPressHandler<Ctx> = (mouse: Coords, ctx: Ctx & DefaultCtx) => void;
export type OnDragHandler<Ctx> = (mouse: Coords, ctx: Ctx & DefaultCtx) => void;
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
    const ctx = {
      cancel: () => {
        ignore = true;
      },
    } as Ctx & DefaultCtx;

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

      const mouse = {
        x: ev.clientX,
        y: ev.clientY,
      };

      leftMouse = true;
      onPress?.(mouse, ctx);
    }

    // call `onDrag` handler
    function handleMouseMove(ev: MouseEvent) {
      if (!leftMouse || ignore) return;
      const mouse = {
        x: ev.clientX,
        y: ev.clientY,
      };
      onDrag?.(mouse, ctx);
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
