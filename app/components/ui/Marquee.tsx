import { type ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  className?: string;
  duration?: string;
}

export function Marquee({ children, className = "", duration = "30s" }: MarqueeProps) {
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ animationDuration: duration }}>
        {children}
        {children}
      </div>
    </div>
  );
}
