import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Props = {
  children?: React.ReactNode;
  onMinimize?(): void;
  onMaximize?(): void;
  onClose?(): void;
};

const Button: React.FC<React.ComponentPropsWithoutRef<"button">> = ({
  className,
  ...props
}) => {
  return (
    <button
      className={cn(
        "hover:bg-white/10 text-muted-foreground hover:text-accent-foreground inline-flex items-center justify-center w-12 h-10",
        className,
      )}
      {...props}
    />
  );
};

export const TitleBar = forwardRef<HTMLDivElement, Props>(function TitleBar(
  { onClose, onMaximize, onMinimize, children },
  ref,
) {
  return (
    <div className="flex">
      <div
        ref={ref}
        className="pl-4 rounded-tl flex items-center flex-1 bg-accent text-accent-foreground select-none"
      >
        {children}
      </div>
      <div className="flex bg-accent rounded-tr">
        <Button onClick={onMinimize}>&minus;</Button>
        <Button onClick={onMaximize}>&#x1F5D6;</Button>
        <Button className="text-2xl" onClick={onClose}>
          &times;
        </Button>
      </div>
    </div>
  );
});
