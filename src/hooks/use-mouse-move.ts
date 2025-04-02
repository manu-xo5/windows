import { useEffect } from "react";
import { useStableCallback } from "./use-stable-callback";
import { noop } from "@/lib/utils";

const MouseButton = {
  LEFT: 0,
  RIGHT: 1,
} as const;

type DefaultCtx = {
  cancel(): void;
};

type UseMouseMoveArg<Ctx, Ref> = {
  clickTargetRef: React.RefObject<Ref | null>;
  onPress?(mouse: { x: number; y: number }, ctx: Ctx & DefaultCtx): void;
  onDrag?(mouse: { x: number; y: number }, ctx: Ctx & DefaultCtx): void;
};

export function useMouseMove<Ctx, Ref extends HTMLElement>({
  clickTargetRef,
  onPress,
  onDrag,
}: UseMouseMoveArg<Ctx, Ref>) {
  const onPressRef = useStableCallback(onPress ?? noop);
  const onDragRef = useStableCallback(onDrag ?? noop);

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
      onPressRef.current(mouse, ctx);
    }

    // call `onDrag` handler
    function handleMouseMove(ev: MouseEvent) {
      if (!leftMouse || ignore) return;
      const mouse = {
        x: ev.clientX,
        y: ev.clientY,
      };
      onDragRef.current(mouse, ctx);
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
  }, [onPressRef, onDragRef, clickTargetRef]);
}
