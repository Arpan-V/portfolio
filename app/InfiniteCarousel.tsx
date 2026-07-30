"use client";

import { ReactNode, useEffect, useMemo, useRef } from "react";

import { useIntersectionObserver } from "./UseIntersectionObserver";

type InfiniteCarouselProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  speed?: number;
  gap?: number;
};

export default function InfiniteCarousel<T>({
  items,
  renderItem,
  speed = 60,
  gap = 24,
}: InfiniteCarouselProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  // Combined "should this be playing" flag — driven by both
  // tab visibility and viewport intersection.
  const isInViewRef = useRef(true);
  const syncRef = useRef<() => void>(() => {});

  const loop = useMemo(() => [...items, ...items, ...items], [items]);

  useEffect(() => {
    const track = trackRef.current;

    if (!track || items.length === 0) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) {
      return;
    }

    const firstChild = track.firstElementChild as HTMLElement | null;

    if (!firstChild) {
      return;
    }

    const cardWidth = firstChild.getBoundingClientRect().width;
    const advance = cardWidth + gap;

    const step = (now: number) => {
      const last = lastRef.current;

      lastRef.current = now;

      const dt = last === null ? 0 : Math.min((now - last) / 1000, 0.05);

      offsetRef.current -= speed * dt;

      while (-offsetRef.current >= advance) {
        const first = track.firstElementChild as HTMLElement | null;

        if (!first) {
          break;
        }

        track.appendChild(first);

        offsetRef.current += advance;
      }

      track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;

      rafRef.current = requestAnimationFrame(step);
    };

    const start = () => {
      if (rafRef.current !== null) {
        return;
      }

      track.style.willChange = "transform";
      lastRef.current = null;
      rafRef.current = requestAnimationFrame(step);
    };

    const stop = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = null;
      lastRef.current = null;
      track.style.willChange = "auto";
    };

    const sync = () => {
      if (isInViewRef.current && !document.hidden) {
        start();
      } else {
        stop();
      }
    };

    syncRef.current = sync;

    document.addEventListener("visibilitychange", sync);

    sync();

    return () => {
      document.removeEventListener("visibilitychange", sync);
      syncRef.current = () => {};
      stop();
    };
  }, [items.length, speed, gap]);

  useIntersectionObserver(containerRef, (entry) => {
    isInViewRef.current = entry.isIntersecting;
    syncRef.current();
  });

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div ref={trackRef} className="flex" style={{ gap: `${gap}px` }}>
        {loop.map((item, index) => (
          <div key={index} className="shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}