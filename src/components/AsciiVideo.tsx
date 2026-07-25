"use client";

import { useEffect, useRef, useState } from "react";

interface AsciiVideoProps {
  src: string;
  symbol?: string;
  gridWidth?: number;
  glyphScale?: number;
  whiteCutoff?: number;
  className?: string;
  label?: string;
}

export default function AsciiVideo({
  src,
  symbol = ">",
  gridWidth = 149,
  glyphScale = 8,
  whiteCutoff = 230,
  className = "",
  label,
}: AsciiVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const processRef = useRef<HTMLCanvasElement>(null);
  const renderRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const processCanvas = processRef.current;
    const renderCanvas = renderRef.current;
    const wrap = wrapRef.current;
    if (!video || !processCanvas || !renderCanvas || !wrap) return;

    const pCtx = processCanvas.getContext("2d", { willReadFrequently: true });
    const rCtx = renderCanvas.getContext("2d");
    if (!pCtx || !rCtx) return;

    const render = () => {
      if (video.paused || video.ended || video.readyState < 2) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      const ratio = video.videoHeight / video.videoWidth || 9 / 16;
      const gw = gridWidth;
      const gh = Math.max(1, Math.floor(gw * ratio));
      processCanvas.width = gw;
      processCanvas.height = gh;
      renderCanvas.width = gw * glyphScale;
      renderCanvas.height = gh * glyphScale;
      pCtx.drawImage(video, 0, 0, gw, gh);
      let img: ImageData;
      try {
        img = pCtx.getImageData(0, 0, gw, gh);
      } catch {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      const px = img.data;
      rCtx.fillStyle = "#fcfbf2";
      rCtx.fillRect(0, 0, renderCanvas.width, renderCanvas.height);
      rCtx.font = `${glyphScale}px monospace`;
      rCtx.textBaseline = "top";
      for (let y = 0; y < gh; y++) {
        for (let x = 0; x < gw; x++) {
          const i = (y * gw + x) * 4;
          const r = px[i];
          const g = px[i + 1];
          const b = px[i + 2];
          const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          if (luminance < whiteCutoff) {
            rCtx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            rCtx.fillText(symbol, x * glyphScale, y * glyphScale);
          }
        }
      }
      rafRef.current = requestAnimationFrame(render);
    };

    const startLoop = () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); rafRef.current = requestAnimationFrame(render); };
    const stopLoop = () => { if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; } };
    const onLoaded = () => setReady(true);
    const onError = () => setErrored(true);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(wrap);

    video.addEventListener("play", startLoop);
    video.addEventListener("pause", stopLoop);
    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("error", onError);
    video.play().catch(() => {});

    return () => {
      io.disconnect();
      video.removeEventListener("play", startLoop);
      video.removeEventListener("pause", stopLoop);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("error", onError);
      stopLoop();
    };
  }, [src, symbol, gridWidth, glyphScale, whiteCutoff]);

  return (
    <div ref={wrapRef} className={`ascii-frame ${className}`}>
      <video ref={videoRef} className="ascii-source" src={src} muted loop playsInline preload="metadata" />
      <canvas ref={processRef} className="ascii-process" />
      <canvas ref={renderRef} className={`ascii-render ${ready ? "is-ready" : ""}`} role="img" aria-label={label ? `ASCII video stream: ${label}` : "ASCII video stream"} />
      {errored && (
        <div className="ascii-fallback" aria-hidden="true">
          <span className="text-sm font-semibold uppercase tracking-widest">{label ?? "ASCII stream"}</span>
          <span className="ascii-fallback__glyphs">{">>>>>>>>>> ".repeat(6)}</span>
          <span className="text-xs">add {src.replace(/^\//, "public/")} to render</span>
        </div>
      )}
    </div>
  );
}
