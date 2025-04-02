import { forwardRef } from "react";

type Props = {
  children?: string;
};

export const TitleBar = forwardRef<HTMLDivElement, Props>(function TitleBar(
  { children },
  ref,
) {
  return (
    <div
      ref={ref}
      className="rounded-t bg-accent text-accent-foreground px-4 py-2 select-none"
    >
      {children}
    </div>
  );
});
