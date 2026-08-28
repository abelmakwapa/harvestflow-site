"use client";

import { useEffect, useRef } from "react";

interface VideoPreviewProps {
  src: string;
  label: string;
  className?: string;
}

export default function VideoPreview({ src, label, className = "" }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let isNearViewport = false;

    const updatePlayback = () => {
      if (isNearViewport && !reducedMotion.matches && document.visibilityState === "visible") video.play().catch(() => {});
      else video.pause();
    };
    const onLoadedData = () => updatePlayback();
    const onMotionPreferenceChange = () => updatePlayback();
    const onVisibilityChange = () => updatePlayback();
    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        updatePlayback();
      },
      { rootMargin: "200px 0px", threshold: 0 },
    );

    observer.observe(video);
    video.addEventListener("loadeddata", onLoadedData);
    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      video.removeEventListener("loadeddata", onLoadedData);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      video.pause();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      loop
      playsInline
      preload="none"
      role="img"
      aria-label={`${label} video`}
      className={`block aspect-video w-full bg-black object-cover ${className}`}
    />
  );
}
