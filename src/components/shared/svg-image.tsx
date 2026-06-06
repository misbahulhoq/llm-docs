"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// Cache to prevent re-fetching the exact same logo within the session
const svgCache = new Map<string, string>();

export function SVGImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const [rawSvg, setRawSvg] = useState<string | null>(
    () => svgCache.get(src) || null,
  );
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    if (rawSvg) return; // Already cached locally

    let isCurrent = true;

    fetch(src)
      .then((res) => (res.ok ? res.text() : ""))
      .then((text) => {
        if (isCurrent && text) {
          svgCache.set(src, text);
          setRawSvg(text);
        }
      })
      .catch((err) => console.error("Failed to load SVG logo:", err));

    return () => {
      isCurrent = false;
    };
  }, [src, rawSvg]);

  // Server rendering & initial hydration state (perfect match)
  if (!isMounted || !rawSvg) {
    return (
      <span
        className="bg-muted block h-5 w-5 animate-pulse rounded-full"
        aria-label={`Loading ${alt}`}
      />
    );
  }

  return (
    <span
      className={cn(
        `text-foreground block h-5 w-5 [&>svg]:h-full [&>svg]:w-full`,
        className,
      )}
      aria-label={alt}
      dangerouslySetInnerHTML={{ __html: rawSvg }}
    />
  );
}
