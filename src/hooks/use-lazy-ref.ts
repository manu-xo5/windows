import { useRef } from "react";

export function useLazyRef<T>(initFn: () => T) {
  const storeRef = useRef<T | null>(null);
  if (!storeRef.current) {
    storeRef.current = initFn();
  }

  return storeRef as React.RefObject<T>;
}
