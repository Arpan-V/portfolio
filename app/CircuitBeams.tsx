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

  beamColor?: string;
  pathColor?: string;
  beamLength?: number;
  duration?: number;
}

export default function CircuitBeams({
  className = "",
  paths,
  beamColor = "oklch(0.92 0.08 240)",
  pathColor = "oklch(0.55 0.10 250 / 0.10)",
  beamLength = 60,
  duration = 6,
}: CircuitBeamsProps) {
  const filterId = useId();

  // desktop by default (helps avoid hydration mismatch)
  const [screen, setScreen] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const updateScreen = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setScreen("mobile");
      } else if (width < 1024) {
        setScreen("tablet");
      } else {
        setScreen("desktop");
      }
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
        <filter
          id={filterId}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {activePaths.map((d, i) => {
        const dur = duration + (i % 3) * 1.4;
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
              stroke={beamColor}
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

          8% {
            opacity: 1;
          }

          92% {
            opacity: 1;
          }

          100% {
            stroke-dashoffset: -2000;
            opacity: 0;
          }
        }
      `}</style>
    </svg>
  );
}