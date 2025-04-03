import { useEffect } from "react";

export function useWindowEvent<Key extends keyof WindowEventMap>(
  event: Key,
  fn: (ev: WindowEventMap[Key]) => void,
) {
  useEffect(() => {
    console.count("useEffect");
    const handle = (ev: WindowEventMap[Key]) => fn(ev);

    window.addEventListener(event, handle);
    return () => window.removeEventListener(event, handle);
  }, [event, fn]);
}
