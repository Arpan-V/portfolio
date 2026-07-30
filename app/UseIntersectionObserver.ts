// hooks/useIntersectionObserver.ts
"use client";

import { useEffect, useRef, type RefObject } from "react";

type Options = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

export function useIntersectionObserver<T extends Element>(
  ref: RefObject<T | null>,
  onChange: (entry: IntersectionObserverEntry) => void,
  { root = null, rootMargin, threshold }: Options = {}
) {
  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => onChangeRef.current(entry),
      { root, rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, root, rootMargin, threshold]);
}