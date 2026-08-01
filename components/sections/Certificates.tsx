"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trophy } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import InfiniteCarousel from "@/lib/InfiniteCarousel";
import Lightbox from "../ui/Lightbox";
import { certificates, type Certificate } from "@/data/certs";

const EASE = [0.22, 1, 0.36, 1] as const;

const headingContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const headingWord: Variants = {
  hidden: {
    opacity: 0,
    y: "0.45em",
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: EASE,
    },
  },
};

/**
 * Certificate card dimensions per breakpoint.
 *
 * The original certificate images are 1024 × 736,
 * giving us an aspect ratio of approximately 1.39:1.
 *
 * Mobile:  280 × 201
 * Tablet:  360 × 259
 * Desktop: 420 × 302
 */
function useCardMetrics() {
  const [metrics, setMetrics] = useState({
    width: 280,
    height: 201,
    gap: 16,
  });

  useEffect(() => {
    const read = () => {
      const w = window.innerWidth;

      if (w >= 1024) {
        setMetrics({
          width: 420,
          height: 302,
          gap: 28,
        });
      } else if (w >= 640) {
        setMetrics({
          width: 360,
          height: 259,
          gap: 24,
        });
      } else {
        setMetrics({
          width: 280,
          height: 201,
          gap: 16,
        });
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
  height,
  onOpen,
}: {
  item: Certificate;
  width: number;
  height: number;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      style={{
        width,
        height,
      }}
      aria-label={`Open ${item.alt}`}
      className="block cursor-pointer overflow-hidden rounded-2xl border border-[#45464d] bg-[#0f172a]"
    >
      <Image
        src={item.src}
        alt={item.alt}
        loading="lazy"
        width={1024}
        height={736}
        draggable={false}
        className="block h-full w-full object-contain"
      />
    </button>
  );
}

export default function Certificates() {
  const { width, height, gap } = useCardMetrics();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const galleryImages = certificates.map(({ src, alt }) => ({
    src,
    alt,
  }));

  return (
    <section
      id="certs"
      className="scroll-mt-10 w-full bg-[#101415] py-20 pb-42 sm:py-24 lg:py-27"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4">
          <span className="h-px flex-1 bg-[#45464d]/70" />
        </div>

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          variants={headingContainer}
          className="mt-6 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-6xl"
        >
          <motion.span
            variants={headingWord}
            className="mr-[0.28em] inline-block text-sky-dim"
          >
            Certificates
          </motion.span>

          <motion.span
            variants={headingWord}
            className="mr-[0.28em] inline-block text-foreground"
          >
            &amp;
          </motion.span>

          <motion.span
            variants={headingWord}
            className="mr-[0.28em] inline-block text-foreground"
          >
            Achievements
          </motion.span>

          <motion.span variants={headingWord} className="inline-block">
            <Trophy className="inline-block h-[0.8em] w-[0.8em] align-[-0.08em] text-[#EFBF04]" />
          </motion.span>
        </motion.h2>

        <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-silver/80 sm:text-lg">
          Continuous learning across the JVM ecosystem, cloud platforms and
          distributed systems. Tap a certificate to view it full size.
        </p>
      </div>

      <div className="marquee-mask-x mt-12 sm:mt-14">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <InfiniteCarousel
            key={`${width}-${height}-${gap}`}
            items={certificates}
            gap={gap}
            speed={66}
            renderItem={(item) => (
              <CertificateCard
                item={item}
                width={width}
                height={height}
                onOpen={() =>
                  setOpenIndex(
                    certificates.findIndex((c) => c.id === item.id)
                  )
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
