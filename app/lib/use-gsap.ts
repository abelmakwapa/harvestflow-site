import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function useGsapReveal(selector: string, deps: unknown[] = []) {
  useEffect(() => {
    const els = gsap.utils.toArray<HTMLElement>(selector);
    const anims = els.map((el) =>
      gsap.from(el, {
        y: 44, opacity: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
        clearProps: "transform",
      })
    );
    return () => { anims.forEach((a) => a.kill()); };
  }, deps);
}
