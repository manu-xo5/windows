import { useEffect } from "react";
import { useStableCallback } from "./use-stable-callback";

export function useWindowEvent<Key extends keyof WindowEventMap>(
  event: Key,
  fn: (ev: WindowEventMap[Key]) => void,
) {
  const fnRef = useStableCallback(fn);

  useEffect(() => {
    const handle = (ev: WindowEventMap[Key]) => fnRef.current(ev);

    window.addEventListener(event, handle);
  }, [event, fnRef]);
}
