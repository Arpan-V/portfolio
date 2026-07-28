"use client";

import { useEffect, useId, useState } from "react";

interface CircuitBeamsProps {
  className?: string;
  /** Different paths for different breakpoints */
  paths: {
    mobile: string[];
    tablet?: string[];
    desktop: string[];
  };
  pathColor?: string;
  beamLength?: number;
  duration?: number;
  /** Gradient stops for the traveling beam (cyan → purple → violet by default) */
  gradientStops?: {
    from: string;
    via: string;
    to: string;
  };
}

export default function CircuitBeams({
  className = "",
  paths,
  pathColor = "oklch(0.55 0.10 250 / 0.10)",
  beamLength = 60,
  duration = 9,
  gradientStops = {
    from: "#18CCFC",
    via: "#6344F5",
    to: "#AE48FF",
  },
}: CircuitBeamsProps) {
  const filterId = useId();
  const gradientId = useId();

  const [screen, setScreen] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const updateScreen = () => {
      const width = window.innerWidth;
      if (width < 768) setScreen("mobile");
      else if (width < 1024) setScreen("tablet");
      else setScreen("desktop");
    };
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  const activePaths =
    screen === "mobile"
      ? paths.mobile
      : screen === "tablet"
      ? paths.tablet ?? paths.desktop
      : paths.desktop;

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Beam gradient — mapped per-path via objectBoundingBox so each
            beam segment shows the full cyan → purple → violet blend. */}
        <linearGradient
          id={gradientId}
          gradientUnits="objectBoundingBox"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor={gradientStops.from} stopOpacity="0" />
          <stop offset="15%" stopColor={gradientStops.from} stopOpacity="1" />
          <stop offset="50%" stopColor={gradientStops.via} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStops.to} stopOpacity="0" />
        </linearGradient>
      </defs>

      {activePaths.map((d, i) => {
        const dur = duration + (i % 3) * 1.6;
        const delay = -(i * 1.3);

        return (
          <g key={i}>
            <path
              d={d}
              fill="none"
              stroke={pathColor}
              strokeWidth={0.6}
              vectorEffect="non-scaling-stroke"
            />

            <path
              d={d}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth={1.2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              filter={`url(#${filterId})`}
              style={{
                strokeDasharray: `${beamLength} 2000`,
                animation: `circuit-beam ${dur}s linear ${delay}s infinite`,
              }}
            />
          </g>
        );
      })}

      <style>{`
        @keyframes circuit-beam {
          0% {
            stroke-dashoffset: ${beamLength};
            opacity: 0;
          }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% {
            stroke-dashoffset: -2000;
            opacity: 0;
          }
        }
      `}</style>
    </svg>
  );
}