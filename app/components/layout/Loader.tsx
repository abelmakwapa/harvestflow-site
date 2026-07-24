import { useEffect, useRef, useState } from "react";
import { PixelCanvas } from "~/components/ui/PixelCanvas";

const WORD = "harvestflow";
const LOGS = [
  "mounting sqlite ledger … [ ok ]",
  "syncing price feed … [ ok ]",
  "waking the fields … [ ok ]",
];

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [typed, setTyped] = useState("");
  const [pct, setPct] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [visible, setVisible] = useState(true);
  const closed = useRef(false);

  useEffect(() => {
    const DUR = 1700;
    const t0 = performance.now();
    let raf: number;

    function tick(now: number) {
      if (closed.current) return;
      const k = Math.min(1, (now - t0) / DUR);
      setTyped(WORD.slice(0, Math.round(WORD.length * Math.min(1, k * 2.2))));
      setPct(Math.round(100 * (1 - Math.pow(1 - k, 2))));
      const logCount = Math.min(LOGS.length, Math.floor(Math.max(0, (k - 0.25) / 0.22)) + 1);
      setLogs(LOGS.slice(0, logCount));
      if (k >= 1) return finish();
      raf = requestAnimationFrame(tick);
    }

    function finish() {
      if (closed.current) return;
      closed.current = true;
      setTyped(WORD);
      setPct(100);
      setLogs(LOGS);
      setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 400);
    }

    raf = requestAnimationFrame(tick);
    const safety = setTimeout(finish, 4200);
    return () => { cancelAnimationFrame(raf); clearTimeout(safety); };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="loader-overlay" aria-hidden="true">
      <PixelCanvas scene="loader" scale={2} width={96} height={96} />
      <div className="loader-line">
        initialize://{typed}<span className="cur" />
      </div>
      <div className="loader-log">
        {logs.map((l, i) => (
          <div key={i} dangerouslySetInnerHTML={{ __html: l.replace("[ ok ]", '<span class="ok">[ ok ]</span>') }} />
        ))}
      </div>
      <div className="loader-pct">{String(pct).padStart(3, "0")}%</div>
    </div>
  );
}
