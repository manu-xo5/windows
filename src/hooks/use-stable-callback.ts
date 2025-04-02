import { useRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fn = (...args: any[]) => any;

export function useStableCallback<T extends Fn>(fn: T) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return fnRef;
}
