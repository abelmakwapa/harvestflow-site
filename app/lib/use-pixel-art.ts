import { useEffect, useRef } from "react";
import { scan } from "~/lib/pixel-art";

export function usePixelArt(deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) scan(ref.current);
  }, deps);
  return ref;
}
