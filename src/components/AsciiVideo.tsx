"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface AsciiVideoProps {
  src: string;
  symbol?: string;
  palette?: string;
  monochrome?: boolean;
  gridWidth?: number;
  glyphScale?: number;
  whiteCutoff?: number;
  className?: string;
  label?: string;
}

const FRAME_INTERVAL = 1000 / 30;
const OUTPUT_ASPECT_RATIO = 16 / 9;

export default function AsciiVideo({
  src,
  symbol = ">",
  palette,
  monochrome = false,
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
  const glyphs = useMemo(() => Array.from(palette || symbol || ">"), [palette, symbol]);

  useEffect(() => {
    const video = videoRef.current;
    const processCanvas = processRef.current;
    const renderCanvas = renderRef.current;
    const wrap = wrapRef.current;
    if (!video || !processCanvas || !renderCanvas || !wrap) return;

    const processContext = processCanvas.getContext("2d", { willReadFrequently: true });
    const renderContext = renderCanvas.getContext("2d");
    if (!processContext || !renderContext) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isNearViewport = false;
    let prefersReducedMotion = reducedMotionQuery.matches;
    let lastFrameTime = 0;

    const stopLoop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const drawFrame = () => {
      if (video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || !video.videoWidth || !video.videoHeight) {
        return false;
      }

      const outputWidth = Math.max(1, gridWidth);
      const outputHeight = Math.max(1, Math.round(outputWidth / OUTPUT_ASPECT_RATIO));
      const sourceWidth = video.videoWidth;
      const sourceHeight = video.videoHeight;
      const sourceAspectRatio = sourceWidth / sourceHeight;
      let sourceX = 0;
      let sourceY = 0;
      let cropWidth = sourceWidth;
      let cropHeight = sourceHeight;

      if (sourceAspectRatio > OUTPUT_ASPECT_RATIO) {
        cropWidth = sourceHeight * OUTPUT_ASPECT_RATIO;
        sourceX = (sourceWidth - cropWidth) / 2;
      } else if (sourceAspectRatio < OUTPUT_ASPECT_RATIO) {
        cropHeight = sourceWidth / OUTPUT_ASPECT_RATIO;
        sourceY = (sourceHeight - cropHeight) / 2;
      }

      processCanvas.width = outputWidth;
      processCanvas.height = outputHeight;
      renderCanvas.width = outputWidth * glyphScale;
      renderCanvas.height = outputHeight * glyphScale;

      processContext.drawImage(
        video,
        sourceX,
        sourceY,
        cropWidth,
        cropHeight,
        0,
        0,
        outputWidth,
        outputHeight,
      );

      let imageData: ImageData;
      try {
        imageData = processContext.getImageData(0, 0, outputWidth, outputHeight);
      } catch {
        return false;
      }

      renderContext.fillStyle = monochrome ? "#ffffff" : "#fcfbf2";
      renderContext.fillRect(0, 0, renderCanvas.width, renderCanvas.height);
      renderContext.font = `${glyphScale}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      renderContext.textBaseline = "top";

      const pixels = imageData.data;
      const paletteLength = glyphs.length;
      for (let y = 0; y < outputHeight; y += 1) {
        for (let x = 0; x < outputWidth; x += 1) {
          const pixelIndex = (y * outputWidth + x) * 4;
          const red = pixels[pixelIndex];
          const green = pixels[pixelIndex + 1];
          const blue = pixels[pixelIndex + 2];
          const luminance = 0.299 * red + 0.587 * green + 0.114 * blue;

          if (luminance < whiteCutoff) {
            const luminanceBand = Math.min(
              paletteLength - 1,
              Math.floor((luminance / Math.max(1, whiteCutoff)) * paletteLength),
            );
            const glyphIndex = (luminanceBand + x + y) % paletteLength;
            renderContext.fillStyle = monochrome ? "#000000" : `rgb(${red}, ${green}, ${blue})`;
            renderContext.fillText(glyphs[glyphIndex], x * glyphScale, y * glyphScale);
          }
        }
      }

      setReady(true);
      return true;
    };

    const renderLoop = (time: number) => {
      rafRef.current = null;
      if (!isNearViewport || prefersReducedMotion || video.paused || video.ended) return;

      if (time - lastFrameTime >= FRAME_INTERVAL) {
        drawFrame();
        lastFrameTime = time;
      }
      rafRef.current = requestAnimationFrame(renderLoop);
    };

    const startLoop = () => {
      if (!isNearViewport || prefersReducedMotion || rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(renderLoop);
    };

    const drawReducedMotionFrame = () => {
      stopLoop();
      video.pause();
      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) drawFrame();
    };

    const onPlay = () => startLoop();
    const onPause = () => stopLoop();
    const onLoadedData = () => {
      setErrored(false);
      if (prefersReducedMotion) drawReducedMotionFrame();
      else if (isNearViewport) video.play().catch(() => {});
    };
    const onError = () => {
      stopLoop();
      setReady(false);
      setErrored(true);
    };
    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      if (prefersReducedMotion) drawReducedMotionFrame();
      else if (isNearViewport) video.play().catch(() => {});
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        if (!isNearViewport) {
          video.pause();
          stopLoop();
        } else if (prefersReducedMotion) {
          drawReducedMotionFrame();
        } else {
          video.play().catch(() => {});
        }
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );

    observer.observe(wrap);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("error", onError);
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);

    return () => {
      observer.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("error", onError);
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
      video.pause();
      stopLoop();
    };
  }, [glyphs, glyphScale, gridWidth, monochrome, src, whiteCutoff]);

  const accessibleLabel = label ? `ASCII video stream: ${label}` : "ASCII video stream";

  return (
    <div ref={wrapRef} className={`ascii-frame ${monochrome ? "ascii-frame--monochrome" : ""} ${className}`}>
      <video
        ref={videoRef}
        className="ascii-source"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        tabIndex={-1}
      />
      <canvas ref={processRef} className="ascii-process" aria-hidden="true" />
      <canvas
        ref={renderRef}
        className={`ascii-render ${ready ? "is-ready" : ""}`}
        role="img"
        aria-label={accessibleLabel}
      />
      {!ready && (
        <div className="ascii-fallback" aria-hidden="true">
          <span className="text-sm font-semibold uppercase tracking-widest">{label ?? "ASCII stream"}</span>
          <span className="ascii-fallback__glyphs">{`${glyphs.join("")} `.repeat(12)}</span>
          <span className="text-xs">{errored ? "Video preview unavailable" : "Preparing ASCII video…"}</span>
        </div>
      )}
    </div>
  );
}
