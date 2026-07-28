"use client";
import { AppWindowMac } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

import GridBackground from "./GridBackground";
import project1 from "./project-1.jpg";
import project2 from "./project-2.jpg";
import Image from "next/image";

// Apple-style easing shared across every motion in this section.
const EASE = [0.22, 1, 0.36, 1] as const;

// Orchestrates children reveals across the section.
const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.05 },
  },
};

// Slightly tighter stagger for tech chips inside a card.
const chipContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
};

// Generic fade + rise (paragraphs, labels, small text).
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

// Card container: fade + rise + soft blur removal. GPU-friendly (opacity/transform + filter).
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE },
  },
};

// Heading line reveal — same feel as About section for continuity.
const blurReveal: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

// Tech chip pill — no hover state, stays muted at all times.
function Chip({ label }: { label: string }) {
  return (
    <motion.span
      variants={fadeUpVariants}
      className="font-['JetBrains_Mono'] text-[10px] bg-[#2d3449] px-2 py-1 rounded text-[#b9c7e0] border border-[#45464d]/20 cursor-default"
    >
      {label}
    </motion.span>
  );
}

// macOS-style window icon top-right of each card.
// Desktop: dim at rest, glows accent-blue on card hover.
// Mobile: permanently in glowing state (media-query utility classes below).
function WindowIcon() {
  return (
    <span className="relative shrink-0">
      {/* Soft glow — hidden on desktop until hover, always on mobile. */}
      {/* <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -m-2 rounded-full bg-[#7bd0ff]/25 blur-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
      /> */}
      <AppWindowMac
        className="relative h-5 w-5 text-[#7bd0ff] md:text-[#7bd0ff]/40 md:saturate-50
                   md:group-hover:text-[#7bd0ff] md:group-hover:saturate-100
                   md:group-hover:-translate-y-0.5
                   transition-all duration-300 ease-out"
      />
    </span>
  );
}

// Card wrapper — hover behavior kept intentionally restrained (no scale/rotate/glow border).
function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={cardVariants}
      whileHover={
        reduce
          ? undefined
          : {
              y: -4,
              backgroundColor: "rgba(27,35,54,1)",
              borderColor: "rgba(123,208,255,0.22)",
              boxShadow: "0 18px 40px -22px rgba(0,0,0,0.55)",
            }
      }
      transition={{ duration: 0.25, ease: EASE }}
      className={`group relative rounded-lg border border-[#45464d]/10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Projects() {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.25 };

  return (
    <motion.section
      id="projects"
      className="relative overflow-hidden scroll-mt-10 w-full"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <GridBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        {/* Section label — line grows, then label fades up (matches About). */}
        <motion.h2
          className="font-['Manrope'] text-sm sm:text-base font-bold tracking-[0.25em] sm:tracking-[0.3em] text-[#7bd0ff] uppercase mb-10 sm:mb-12 flex items-center gap-3 sm:gap-4"
          variants={fadeUpVariants}
        >
          <motion.span
            className="h-[1px] w-8 bg-[#7bd0ff] origin-left block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 0.8, ease: EASE }}
          />
          <motion.span variants={blurReveal}>02 // PROJECTS</motion.span>
        </motion.h2>

        {/* Grid — reveals its children (cards) in DOM order with stagger. */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6"
          variants={staggerContainer}
        >
          {/* Large Card */}
          <Card className="md:col-span-2 p-6 sm:p-7 lg:p-8 bg-[#171f33]">
            <motion.div
              className="flex justify-between items-start gap-4 mb-6 sm:mb-7"
              variants={staggerContainer}
            >
              <motion.div variants={fadeUpVariants} className="min-w-0">
                <h3 className="font-['Manrope'] text-xl sm:text-2xl lg:text-[26px] font-bold text-[#dae2fd] mb-2">
                  NEURAL_STREAM V4
                </h3>
                <motion.p
                  variants={fadeUpVariants}
                  className="text-sm sm:text-[15px] text-[#b8c1ec] max-w-md leading-relaxed"
                >
                  Real-time processing engine for high-frequency trading data,
                  utilizing Kafka and specialized Go routines for{" "}
                  <span className="font-mono text-[#7bd0ff]">2ms latency</span>.
                </motion.p>
              </motion.div>
              <WindowIcon />
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-2 sm:gap-3"
              variants={chipContainer}
            >
              {["GO_1.21", "APACHE_KAFKA", "KUBERNETES", "PROMETHEUS"].map((t) => (
                <Chip key={t} label={t} />
              ))}
            </motion.div>

            {/* Image fades with card, brightens + de-saturates on hover. */}
            <motion.div
              variants={fadeUpVariants}
              className="mt-6 sm:mt-7 overflow-hidden rounded"
            >
              <Image
                src={project1}
                alt=""
                width={800}
                height={192}
                loading="lazy"
                className="w-full h-40 sm:h-44 lg:h-48 object-cover rounded
                           opacity-90 md:grayscale
                           transition-all duration-500 ease-out
                           group-hover:opacity-100 group-hover:grayscale-0
                           group-hover:scale-[1.015]"
              />
            </motion.div>
          </Card>

          {/* Small Card 1 */}
          <Card className="p-6 sm:p-7 lg:p-8 bg-[#131b2e] flex flex-col justify-between">
            <motion.div variants={staggerContainer}>
              <motion.div
                className="flex items-start justify-between gap-3 mb-3"
                variants={fadeUpVariants}
              >
                <span className="text-[10px] text-[#7bd0ff]/60 tracking-widest uppercase block">
                  SaaS_Product
                </span>
                <WindowIcon />
              </motion.div>
              <motion.h3
                variants={fadeUpVariants}
                className="text-lg sm:text-xl font-bold text-[#dae2fd] mb-3"
              >
                SENTINEL_AUTH
              </motion.h3>
              <motion.p
                variants={fadeUpVariants}
                className="text-sm text-[#9aa4d4] mb-6 leading-relaxed"
              >
                Zero-trust authentication provider built as a sidecar proxy for
                microservices. Integrated with AWS KMS.
              </motion.p>
            </motion.div>

            <motion.div className="flex flex-wrap gap-2" variants={chipContainer}>
              {["RUST", "AWS_SDK"].map((t) => (
                <Chip key={t} label={t} />
              ))}
            </motion.div>
          </Card>

          {/* Small Card 2 */}
          <Card className="p-6 sm:p-7 lg:p-8 bg-[#131b2e] flex flex-col justify-between">
            <motion.div variants={staggerContainer}>
              <motion.div
                className="flex items-start justify-between gap-3 mb-3"
                variants={fadeUpVariants}
              >
                <span className="text-[10px] text-[#7bd0ff]/60 tracking-widest uppercase block">
                  Open_Source
                </span>
                <WindowIcon />
              </motion.div>
              <motion.h3
                variants={fadeUpVariants}
                className="text-lg sm:text-xl font-bold text-[#dae2fd] mb-3"
              >
                PY_FLOW_GEN
              </motion.h3>
              <motion.p
                variants={fadeUpVariants}
                className="text-sm text-[#9aa4d4] mb-6 leading-relaxed"
              >
                A minimalist Python library for generating DAG-based workflows
                with native typing and async support.
              </motion.p>
            </motion.div>

            <motion.div className="flex flex-wrap gap-2" variants={chipContainer}>
              {["PYTHON_3.11", "PYPI"].map((t) => (
                <Chip key={t} label={t} />
              ))}
            </motion.div>
          </Card>

          {/* Medium Card */}
          <Card className="md:col-span-2 p-6 sm:p-7 lg:p-8 bg-[#171f33] flex gap-6 lg:gap-8 items-center overflow-hidden">
            <motion.div variants={staggerContainer} className="flex-1 min-w-0">
              <motion.div
                className="flex items-start justify-between gap-3 mb-3"
                variants={fadeUpVariants}
              >
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#dae2fd]">
                  GRAPH_SCHEMA_VIZ
                </h3>
                <WindowIcon />
              </motion.div>
              <motion.p
                variants={fadeUpVariants}
                className="text-sm sm:text-[15px] text-[#b8c1ec] mb-5 leading-relaxed"
              >
                Interactive schema visualizer for GraphQL and Neo4j. Handles
                schemas with 500+ nodes without UI lag.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-2 sm:gap-3"
                variants={chipContainer}
              >
                {["REACT", "D3.JS", "NEO4J"].map((t) => (
                  <Chip key={t} label={t} />
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="w-1/3 hidden lg:block"
            >
              <Image
                src={project2}
                alt=""
                width={400}
                height={160}
                loading="lazy"
                className="w-full h-36 object-cover rounded
                           opacity-90 md:grayscale
                           transition-all duration-500 ease-out
                           group-hover:opacity-90 group-hover:grayscale-0
                           group-hover:scale-[1.015]"
              />
            </motion.div>
          </Card>
        </motion.div>
      </div>
      {/* Reduced-motion is respected via useReducedMotion; keeps this a no-op if user prefers. */}
      {reduce ? null : null}
    </motion.section>
  );
}
