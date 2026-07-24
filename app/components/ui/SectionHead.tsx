import { type ReactNode } from "react";

interface SectionHeadProps {
  title: string;
  serifWord: string;
  num: string;
  children?: ReactNode;
}

export function SectionHead({ title, serifWord, num, children }: SectionHeadProps) {
  return (
    <div className="section-head gs-fade">
      <div className="section-head-main">
        <span className="num">{num}</span>
        <h2>
          {title} <span className="serif">{serifWord}</span>
        </h2>
      </div>
      {children}
    </div>
  );
}
