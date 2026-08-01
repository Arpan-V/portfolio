"use client";

import { useEffect, useRef } from "react";

interface GridBackgroundProps {
  className?: string;
  /** Size of each square cell in CSS pixels. */
  cellSize?: number;
  /** Radius (CSS px) around the cursor within which cells illuminate. */
  glowRadius?: number;
  /** Grid line color (any valid CSS color). */
  lineColor?: string;
  /** Hover glow color. */
  glowColor?: string;
  /** Overall opacity of the whole layer (0–1). */
  opacity?: number;
}

/**
 * Premium interactive grid background.
 *
 * - Desktop (hover-capable pointers): squares softly illuminate around the
 *   cursor with a smooth radial falloff. Static until the mouse moves.
 * - Touch devices: renders a single static frame, no listeners, no RAF.
 */
export default function GridBackground({
  className = "",
  cellSize = 66,
  glowRadius = 166,
  lineColor = "rgba(255,255,255,0.05)",
  glowColor = "#7bd0ff",
  opacity = 0.24,
}: GridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canHover =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let widthCss = 0;
    let heightCss = 0;

    // Permanent glow position (behind the heading)
const focalPoint = {
  x: () => widthCss * 0.14,
  y: () => 200,
};

    const isInteractive =
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

const effectiveLineColor = isInteractive
  ? "rgba(255,255,255,0.05)"   // almost invisible
  : "rgba(123, 208, 255, 0.66)";  // visible on mobile
    // Target and eased mouse position (CSS px, relative to canvas).
    // Using -Infinity as "no cursor" so nothing lights up initially.
    const target = { x: -1e6, y: -1e6 };
    const eased = { x: -1e6, y: -1e6 };
    let hasCursor = false;
    let rafId = 0;
    let needsDraw = true;

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      widthCss = rect.width;
      heightCss = rect.height;
      canvas.width = Math.floor(widthCss * dpr);
      canvas.height = Math.floor(heightCss * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      needsDraw = true;
    };

    const drawGridLines = () => {
      ctx.strokeStyle = effectiveLineColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Vertical lines
      for (let x = 0; x <= widthCss; x += cellSize) {
        const px = Math.floor(x) + 0.5;
        ctx.moveTo(px, 0);
        ctx.lineTo(px, heightCss);
      }
      // Horizontal lines
      for (let y = 0; y <= heightCss; y += cellSize) {
        const py = Math.floor(y) + 0.5;
        ctx.moveTo(0, py);
        ctx.lineTo(widthCss, py);
      }
      ctx.stroke();
    };

    const drawGlow = (mx: number, my: number) => {
      if (mx < -1000) return;
      const r = glowRadius;
      const rSq = r * r;

      ctx.lineWidth = 1;

      // Vertical grid lines near the cursor.
      const startCol = Math.max(0, Math.floor((mx - r) / cellSize));
      const endCol = Math.min(
        Math.ceil(widthCss / cellSize),
        Math.ceil((mx + r) / cellSize),
      );

      for (let col = startCol; col <= endCol; col++) {
        const x = col * cellSize;
        const dx = x - mx;
        const distSq = dx * dx;
        if (distSq >= rSq) continue;

        const t = 1 - distSq / rSq;
        const intensity = t * t * (3 - 2 * t);
        if (intensity <= 0.01) continue;

        ctx.globalAlpha = intensity;
        ctx.strokeStyle = glowColor;
        ctx.beginPath();
        ctx.moveTo(Math.floor(x) + 0.5, Math.max(0, my - r));
        ctx.lineTo(Math.floor(x) + 0.5, Math.min(heightCss, my + r));
        ctx.stroke();
      }

      // Horizontal grid lines near the cursor.
      const startRow = Math.max(0, Math.floor((my - r) / cellSize));
      const endRow = Math.min(
        Math.ceil(heightCss / cellSize),
        Math.ceil((my + r) / cellSize),
      );

      for (let row = startRow; row <= endRow; row++) {
        const y = row * cellSize;
        const dy = y - my;
        const distSq = dy * dy;
        if (distSq >= rSq) continue;

        const t = 1 - distSq / rSq;
        const intensity = t * t * (3 - 2 * t);
        if (intensity <= 0.01) continue;

        ctx.globalAlpha = intensity;
        ctx.strokeStyle = glowColor;
        ctx.beginPath();
        ctx.moveTo(Math.max(0, mx - r), Math.floor(y) + 0.5);
        ctx.lineTo(Math.min(widthCss, mx + r), Math.floor(y) + 0.5);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    const render = () => {
  ctx.clearRect(0, 0, widthCss, heightCss);

  drawGridLines();

  if (canHover) {
    // Permanent glow
    drawGlow(focalPoint.x(), focalPoint.y());

    // Mouse glow
    if (hasCursor) {
      drawGlow(eased.x, eased.y);
    }
  }
};

    const tick = () => {
      // Ease toward target for a fluid, non-jittery glow.
      const dx = target.x - eased.x;
      const dy = target.y - eased.y;
      const moved = Math.abs(dx) + Math.abs(dy) > 0.1;

      if (moved) {
        eased.x += dx * 0.18;
        eased.y += dy * 0.18;
        needsDraw = true;
      }

      if (needsDraw) {
        render();
        needsDraw = false;
      }

      // Keep animating while cursor is present and easing hasn't settled.
      if (canHover && (hasCursor || moved)) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    const ensureRaf = () => {
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Ignore movement outside the canvas area entirely.
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        if (hasCursor) {
          hasCursor = false;
          target.x = -1e6;
          target.y = -1e6;
          eased.x = -1e6;
          eased.y = -1e6;
          needsDraw = true;
          ensureRaf();
        }
        return;
      }
      if (!hasCursor) {
        // Snap eased position on first entry so glow appears where cursor is.
        eased.x = x;
        eased.y = y;
        hasCursor = true;
      }
      target.x = x;
      target.y = y;
      ensureRaf();
    };

    const handleLeave = () => {
      hasCursor = false;
      target.x = -1e6;
      target.y = -1e6;
      // Let ease fade toward off-screen, then stop.
      needsDraw = true;
      ensureRaf();
      // Hard reset shortly after so we don't hold RAF forever.
      window.setTimeout(() => {
        eased.x = -1e6;
        eased.y = -1e6;
        needsDraw = true;
        if (!rafId) {
          render();
        }
      }, 250);
    };

    setSize();
    render();

    const ro = new ResizeObserver(() => {
      setSize();
      render();
    });
    ro.observe(canvas);

    if (canHover) {
      window.addEventListener("mousemove", handleMove, { passive: true });
      window.addEventListener("mouseleave", handleLeave);
      document.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [cellSize, glowRadius, lineColor, glowColor]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        opacity,
      }}
    />
  );
}
