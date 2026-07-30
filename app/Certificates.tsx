"use client";

import { useEffect, useState } from "react";

import InfiniteCarousel from "./InfiniteCarousel";
import Lightbox, { type LightboxImage } from "./Lightbox";
import Image from "next/image";
import type { StaticImageData } from "next/image";


import cert1 from "../assets/cert-1.jpg";
import cert2 from "../assets/cert-2.jpg";
import cert3 from "../assets/cert-3.jpg";
import cert4 from "../assets/cert-4.jpg";
import cert5 from "../assets/cert-5.jpg";

type Certificate = {
  id: number;
  src: string;
  alt: string;
};

const certificates: Certificate[] = [
  {
    id: 1,
    src: cert1,
    alt: "Oracle Certified Professional, Java SE 17 Developer",
  },
  {
    id: 2,
    src: cert2,
    alt: "AWS Certified Solutions Architect – Associate",
  },
  {
    id: 3,
    src: cert3,
    alt: "Certified Kubernetes Application Developer",
  },
  { id: 4, src: cert4, alt: "Spring Professional Development" },
  { id: 5, src: cert5, alt: "Microsoft Certified: Azure Fundamentals" },
];

const galleryImages: LightboxImage[] = certificates.map(({ src, alt }) => ({
  src,
  alt,
}));

/** Card width per breakpoint (px) — the carousel measures a fixed width. */
function useCardMetrics() {
  const [metrics, setMetrics] = useState({ width: 300, gap: 20 });

  useEffect(() => {
    const read = () => {
      const w = window.innerWidth;

      if (w >= 1024) {
        setMetrics({ width: 420, gap: 28 });
      } else if (w >= 640) {
        setMetrics({ width: 360, gap: 24 });
      } else {
        setMetrics({ width: 280, gap: 16 });
      }
    };

    read();
    window.addEventListener("resize", read);

    return () => window.removeEventListener("resize", read);
  }, []);

  return metrics;
}

function CertificateCard({
  item,
  width,
  onOpen,
}: {
  item: Certificate;
  width: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{ width }}
      aria-label={`Open ${item.alt}`}
      className="block cursor-pointer overflow-hidden rounded-2xl border border-[#45464d] bg-[#0f172a]"
    >
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        width={1024}
        height={736}
        draggable={false}
        className="block h-auto w-full object-cover"
      />
    </button>
  );
}

export default function Certificates() {
  const { width, gap } = useCardMetrics();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="certificates"
      className="w-full bg-[#101415] py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-[#7bd0ff]">
            Credentials
          </span>
          <span className="h-px flex-1 bg-[#45464d]/70" />
        </div>

        <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Certifications &amp; Training
        </h2>

        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-silver/80 sm:text-lg">
          Continuous learning across the JVM ecosystem, cloud platforms and
          distributed systems. Tap a certificate to view it full size.
        </p>
      </div>

      <div className="marquee-mask-x mt-12 sm:mt-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <InfiniteCarousel
            key={`${width}-${gap}`}
            items={certificates}
            gap={gap}
            speed={45}
            renderItem={(item) => (
              <CertificateCard
                item={item}
                width={width}
                onOpen={() =>
                  setOpenIndex(certificates.findIndex((c) => c.id === item.id))
                }
              />
            )}
          />
        </div>
      </div>

      <Lightbox
        images={galleryImages}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  );
}
