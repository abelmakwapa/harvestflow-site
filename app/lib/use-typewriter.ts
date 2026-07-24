import { useEffect, useRef, useState } from "react";

const PHRASES = ["Pilot-ready.", "Buyer-ready.", "Finance-ready.", "Signal-resilient."];

export function useTypewriter() {
  const [text, setText] = useState("");
  const idx = useRef({ pi: 0, ci: 0, deleting: false });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function tick() {
      const { pi, ci, deleting } = idx.current;
      const w = PHRASES[pi];
      if (!deleting) {
        idx.current.ci++;
        setText(w.slice(0, idx.current.ci));
        if (idx.current.ci === w.length) {
          idx.current.deleting = true;
          timeout = setTimeout(tick, 2100);
          return;
        }
      } else {
        idx.current.ci--;
        setText(w.slice(0, idx.current.ci));
        if (idx.current.ci === 0) {
          idx.current.deleting = false;
          idx.current.pi = (pi + 1) % PHRASES.length;
        }
      }
      timeout = setTimeout(tick, idx.current.deleting ? 34 : 68);
    }
    timeout = setTimeout(tick, 2200);
    return () => clearTimeout(timeout);
  }, []);

  return text;
}
