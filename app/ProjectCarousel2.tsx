"use client";
import { useEffect, useRef } from "react";
import { Clock, Star } from "lucide-react";
import Image from "next/image";
import type { StaticImageData } from "next/image";

import project1 from "./project-1.jpg";
import project2 from "./project-2.jpg";
import project3 from "./project-3.jpg";
import project4 from "./project-4.jpg";

type Showcase = {
  id: number;
  title: string;
  duration: string;
  rating: string;
  image: StaticImageData;
};

const items: Showcase[] = [
  { id: 1, title: "Neural Dashboard", duration: "6 weeks", rating: "4.9/5", image: project1 },
  { id: 2, title: "Cloud Orchestrator", duration: "9 weeks", rating: "4.8/5", image: project2 },
  { id: 3, title: "API Gateway", duration: "4 weeks", rating: "4.9/5", image: project3 },
  { id: 4, title: "ML Pipeline", duration: "7 weeks", rating: "4.7/5", image: project4 },
];

/** Fixed card size in px — portrait cards like the reference. */
const CARD_W = 210;
const CARD_H = 290;
/** Constant scroll speed in pixels per second. */
const SPEED_PX_S = 60;

function ShowcaseCard({ item }: { item: Showcase }) {
  return (
    <a
      href="#projects"
      style={{ width: CARD_W, height: CARD_H }}
      className="relative block shrink-0 cursor-pointer overflow-hidden border-1 rounded-[9px] bg-card shadow-[0_24px_50px_-28px_rgba(0,0,0,0.95)]"
    >
      <Image
        src={item.image}
        alt={item.title}
        width={640}
        height={800}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="font-display text-lg font-bold leading-[1.2] tracking-tight text-white">
          {item.title}
        </h3>
        <div className="mt-2 flex items-center gap-4 text-xs font-medium text-white/90">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {item.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-current" />
            {item.rating}
          </span>
        </div>
      </div>
    </a>
  );
}

export default function ProjectCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  // Render enough copies that the track always overflows the container.
  const loop = [...items, ...items, ...items];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const step = (now: number) => {
      const last = lastRef.current;
      lastRef.current = now;

      // Delta-time based movement; clamp large gaps (tab was hidden).
      const dt = last === null ? 0 : Math.min((now - last) / 1000, 0.05);
      offsetRef.current -= SPEED_PX_S * dt;

      // Recycle: once the leading card is fully past the left edge, move that
      // DOM node to the end of the track and add its footprint back to the
      // offset. The visual result is identical, so nothing jumps, and the
      // offset stays bounded (no float drift, no full-track reset).
      let first = track.firstElementChild as HTMLElement | null;
      while (first) {
        const gap = parseFloat(getComputedStyle(track).columnGap || "0") || 0;
        const advance = first.offsetWidth + gap;
        if (-offsetRef.current < advance) break;
        track.appendChild(first);
        offsetRef.current += advance;
        first = track.firstElementChild as HTMLElement | null;
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(step);
    };

    const start = () => {
      if (rafRef.current !== null) return;
      lastRef.current = null;
      rafRef.current = requestAnimationFrame(step);
    };
    const stop = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastRef.current = null;
    };

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stop();
    };
  }, []);

  return (
    <div className="w-full">
      <div className="pl-3 font-display text-sm uppercase tracking-widest text-silver/80">
        <span>Featured Work</span>
      </div>

      {/* Outer transparent box (kept exactly as-is) */}
      <div className="marquee-mask-x relative mt-4 overflow-hidden rounded-3xl border border-border/60 bg-surface/40 p-4">
        <div ref={trackRef} className="flex gap-6 will-change-transform">
          {loop.map((item, i) => (
            <ShowcaseCard key={`${item.id}-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}