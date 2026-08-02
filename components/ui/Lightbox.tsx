"use client";

import { useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";

export type LightboxImage = {
  src: string;
  alt: string;
};

type LightboxProps = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const isOpen = index !== null && index >= 0 && index < images.length;

  const goPrev = useCallback(() => {
    if (index === null || images.length === 0) return;

    onIndexChange((index - 1 + images.length) % images.length);
  }, [index, images.length, onIndexChange]);

  const goNext = useCallback(() => {
    if (index === null || images.length === 0) return;

    onIndexChange((index + 1) % images.length);
  }, [index, images.length, onIndexChange]);

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        goPrev();
      } else if (event.key === "ArrowRight") {
        goNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, goPrev, goNext]);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const previous = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const current = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Certificate preview"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#45464d] bg-[#0f172a] text-silver transition-colors hover:text-[#7bd0ff] sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Previous / Next buttons */}
      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous certificate"
            onClick={(event) => {
              event.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#45464d] bg-[#0f172a] text-silver transition-colors hover:text-[#7bd0ff] sm:left-6 sm:h-12 sm:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Next certificate"
            onClick={(event) => {
              event.stopPropagation();
              goNext();
            }}
            className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#45464d] bg-[#0f172a] text-silver transition-colors hover:text-[#7bd0ff] sm:right-6 sm:h-12 sm:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      ) : null}

      {/* Certificate */}
      <figure
        className="flex h-[80vh] w-full max-w-5xl flex-col items-center gap-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative min-h-0 w-full flex-1">
          <Image
            src={current.src}
            alt={current.alt}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 85vw, 80vw"
            className="rounded-xl border border-[#45464d] object-contain"
          />
        </div>

        {/* Caption */}
        <figcaption className="shrink-0 font-body text-sm text-silver/80">
          {current.alt}

          {images.length > 1 ? (
            <span className="ml-2 text-silver/50">
              {index + 1} / {images.length}
            </span>
          ) : null}
        </figcaption>
      </figure>
    </div>
  );
}