import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useWindowStore } from "./context";
import { useWindowManagerStore } from "../window-manager/context";
import { flushSync } from "react-dom";

type Props = {
  children?: React.ReactNode;
};

const Button: React.FC<React.ComponentPropsWithoutRef<"button">> = ({
  className,
  onMouseDown,
  ...props
}) => {
  return (
    <button
      onMouseDown={(ev) => {
        ev.stopPropagation();
        onMouseDown?.(ev);
      }}
      className={cn(
        "hover:bg-white/10 text-muted-foreground hover:text-accent-foreground inline-flex items-center justify-center w-12 h-10",
        className,
      )}
      {...props}
    />
  );
};

export const TitleBar = forwardRef<HTMLDivElement, Props>(function TitleBar(
  { children },
  ref,
) {
  const windowId = useWindowStore((s) => s.id);
  const minimize = useWindowStore((s) => s.minimize);
  const close = useWindowManagerStore((s) => s.closeWindow);

  return (
    <div
      ref={ref}
      className="rounded-t bg-accent text-accent-foreground select-none flex justify-between items-center"
    >
      <p className="pl-4">{children}</p>
      <div className="flex">
        <Button
          onClick={() => {
            document.startViewTransition(() => {
              flushSync(() => {
                minimize();
              });
            });
          }}
        >
          &minus;
        </Button>
        <Button>&#x1F5D6;</Button>
        <Button
          className="text-2xl"
          onClick={() => {
            document.startViewTransition(() => {
              flushSync(() => {
                close(windowId);
              });
            });
          }}
        >
          &times;
        </Button>
      </div>
    </div>
  );
});
