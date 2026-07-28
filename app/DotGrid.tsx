"use client";

import { useEffect, useRef } from "react";

interface DotGridProps {
  className?: string;
  /** Gap between dots in pixels. */
  gap?: number;
  /** Base size of a dot in pixels. */
  dotSize?: number;
  /** Distance from the cursor in pixels at which dots are fully lit. */
  glowRadius?: number;
  /** Color of the dot at rest. Use any valid CSS color string. */
  restColor?: string;
  /** Color of the dot when the cursor is directly over it. */
  activeColor?: string;
}

export default function DotGrid({
  className = "",
  gap = 30,
  dotSize = 3,
  glowRadius = 100,
  restColor = "oklch(0.60 0.04 260)",
  activeColor = "oklch(0.98 0.005 260)",
}: DotGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canHover = window.matchMedia("(hover: hover)").matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY - rect.top) * dpr,
      };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const drawFrame = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / (gap * dpr));
      const rows = Math.ceil(height / (gap * dpr));
      const stepX = gap * dpr;
      const stepY = gap * dpr;

      const { x: mx, y: my } = mouseRef.current;
      const r = glowRadius * dpr;
      const rSq = r * r;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * stepX + stepX / 2;
          const y = row * stepY + stepY / 2;

          const dx = x - mx;
          const dy = y - my;
          const distSq = dx * dx + dy * dy;

          const intensity = distSq < rSq ? 1 - distSq / rSq : 0;
          const alpha = 0.55 + intensity * 0.45;
          // Manage growth size of the dots
          const size = dotSize * dpr * (1 + intensity * 0.42);

          ctx.beginPath();
          ctx.arc(x, y, size / 2, 0, Math.PI * 2);
          ctx.fillStyle = `color-mix(in oklab, ${restColor} ${(1 - intensity) * 100}%, ${activeColor})`;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
    };

    const animate = () => {
      drawFrame();
      if (canHover) {
        animationId = requestAnimationFrame(animate);
      }
    };

resize();
animate();

const handleResize = () => {
  resize();
  drawFrame();
};

window.addEventListener("resize", handleResize);

const observer = new ResizeObserver(() => {
  resize();
  drawFrame();
});

observer.observe(canvas);

    if (canHover) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [gap, dotSize, glowRadius, restColor, activeColor]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
}
