interface SectionHeadProps {
  title: string;
  serifWord: string;
  num: string;
  children?: React.ReactNode;
}

export function SectionHead({ title, serifWord, num, children }: SectionHeadProps) {
  return (
    <div className="section-head gs-fade">
      <h2>
        //{title} <span className="serif">{serifWord}</span>
      </h2>
      <span className="num">{num}</span>
      {children}
    </div>
  );
}
