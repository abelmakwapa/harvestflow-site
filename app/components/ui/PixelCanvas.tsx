import { useEffect, useRef } from "react";
import { mount } from "~/lib/pixel-art";

interface PixelCanvasProps {
  scene: string;
  scale?: number;
  width?: number;
  height?: number;
}

export function PixelCanvas({ scene, scale = 2, width, height }: PixelCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) mount(ref.current);
  }, [scene]);

  return (
    <canvas
      ref={ref}
      data-pixel={scene}
      data-scale={String(scale)}
      style={{ width: width ?? scale * 64, height: height ?? scale * 64 }}
    />
  );
}
