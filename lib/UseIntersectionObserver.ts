"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";

type Options = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

type Target<T extends Element> = RefObject<T | null>;

/**
 * Observes one element or many elements with a SINGLE IntersectionObserver.
 *
 * - Single ref:  useIntersectionObserver(ref, (entry) => {...})
 * - Many refs:   useIntersectionObserver(refs, (entry) => {...})  // refs must be a stable array
 *
 * `onChange` is called once per changed entry. It is stored in a ref, so passing
 * an inline arrow function never re-subscribes the observer.
 */
export function useIntersectionObserver<T extends Element>(
  target: Target<T> | Target<T>[],
  onChange: (entry: IntersectionObserverEntry) => void,
  { root = null, rootMargin, threshold }: Options = {}
) {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  // Normalise to an array without changing identity on every render.
  const targets = useMemo(
    () => (Array.isArray(target) ? target : [target]),
    [target]
  );

  // Serialise threshold so an inline array literal doesn't re-subscribe.
  const thresholdKey = Array.isArray(threshold)
    ? threshold.join(",")
    : String(threshold);

  useEffect(() => {
    const nodes = targets
      .map((t) => t.current)
      .filter((n): n is T => n != null);

    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) onChangeRef.current(entry);
      },
      { root, rootMargin, threshold }
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targets, root, rootMargin, thresholdKey]);
}
