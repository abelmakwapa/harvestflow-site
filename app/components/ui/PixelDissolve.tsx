import { useRef, useCallback, type ReactNode } from "react";

const COLORS = ["#059669", "#6EE7B7", "#EA580C", "#F59E0B", "#1C1917", "#022c22"];

export function PixelDissolve({ children, className = "" }: { children: ReactNode; className?: string }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const busy = useRef(false);

  const handleEnter = useCallback(() => {
    if (busy.current || typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    busy.current = true;
    gridRef.current?.querySelectorAll(".pixel-unit").forEach((u) => u.classList.add("active"));
    setTimeout(() => {
      gridRef.current?.querySelectorAll(".pixel-unit").forEach((u) => u.classList.remove("active"));
      busy.current = false;
    }, 1300);
  }, []);

  return (
    <div className={`pixel-container ${className}`} onMouseEnter={handleEnter}>
      {children}
      <div className="pixel-grid" ref={gridRef} aria-hidden="true">
        {Array.from({ length: 60 }, (_, i) => (
          <div
            key={i}
            className="pixel-unit"
            style={{
              background: COLORS[Math.floor(Math.random() * COLORS.length)],
              animationDelay: `${Math.random() * 0.35}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
