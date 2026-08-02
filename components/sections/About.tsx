"use client";

import { Coffee, Server, GitBranch } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { aboutInfo, aboutStack, aboutStats } from "@/data/about";

// Apple-like smooth easing
const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.9;

// Reveal entire section container — orchestrates children via stagger
const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

// Single shared reveal animation
const reveal: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: DURATION,
      ease: EASE,
    },
  },
};

// Reduced-motion fallback
const fadeOnly: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
};

export default function About() {
  const reduce = useReducedMotion();
  const variants = reduce ? fadeOnly : reveal;

  const viewport = {
    once: true,
    amount: 0.45,
  };

  return (
    <motion.section
      id="about"
      className="relative w-full scroll-mt-10 overflow-hidden border-t border-border/40 bg-surface"
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        {/* Section label */}
        <motion.p
          className="mb-6 flex items-center gap-3 font-['Manrope'] text-sm font-bold uppercase tracking-[0.25em] sm:mb-8 sm:gap-4 sm:text-lg sm:tracking-[0.3em]"
          initial={reduce ? { opacity: 0 } : { color: "#3a6b85" }}
          whileInView={
            reduce
              ? { opacity: 1 }
              : { color: "#7bd0ff" }
          }
          viewport={viewport}
          transition={{
            duration: 1.1,
            ease: EASE,
            delay: 0.15,
          }}
        >
          {/* Animated line */}
          <motion.span
            className="block h-[1px] origin-left bg-[#7bd0ff]"
            initial={{
              scaleX: 0,
              width: "1.5rem",
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={viewport}
            transition={{
              duration: 0.9,
              ease: EASE,
            }}
            style={{
              transformOrigin: "left center",
            }}
          />

          {/* Animated ABOUT ME text */}
          <motion.span
            initial={{
              opacity: 0,
              y: 6,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={viewport}
            transition={{
              duration: 0.6,
              ease: EASE,
              delay: 0.35,
            }}
          >
            01 // ABOUT ME
          </motion.span>
        </motion.p>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + copy */}
          <div className="lg:col-span-7">
            {/* Main section heading */}
            <motion.h2
              variants={variants}
              className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              <span className="block">Engineering systems</span>

              <span className="block text-[#9aa3a6]">
                that quietly scale.
              </span>
            </motion.h2>

            {/* About copy */}
            <motion.div
              variants={variants}
              className="mt-8 space-y-5 font-body text-base leading-relaxed text-silver/80 sm:text-lg"
            >
              <p>
                I&apos;m a software engineer focused on the JVM ecosystem —
                designing backend services, event-driven pipelines, and the
                infrastructure that keeps them honest under real load.
              </p>

              <p>
                My work sits between product intent and system reliability. I
                care about clear boundaries, observable behaviour, and code
                that a teammate can read six months from now without needing a
                call.
              </p>
            </motion.div>

            {/* Technology stack */}
            <motion.div
              variants={variants}
              className="mt-10"
            >
              <p className="font-display text-xs uppercase tracking-[0.25em]">
                Working with
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {aboutStack.map((item) => (
                  <span
                    key={item}
                    className="cursor-default border border-[#D9DADB]/30 px-3 py-1.5 font-body text-sm text-[#D9DADB]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: stats + notes card */}
          <motion.div
            variants={variants}
            className="lg:col-span-5"
          >
            <div className="border-2 border-[#D9DADB]/45 p-8 sm:p-10">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                {aboutStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="min-w-0 text-center"
                  >
                    <dd className="font-display text-3xl font-bold leading-none text-foreground sm:text-4xl">
                      {stat.value}
                    </dd>

                    <dt className="mt-3 font-body text-[10px] uppercase tracking-[0.15em] text-silver/60 sm:text-xs sm:tracking-widest">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </div>

              {/* Info rows */}
              <div className="mt-10 space-y-5 border-t border-[#D9DADB]/45 pt-8">
                {aboutInfo.map((info) => (
                  <Row
                    key={info.label}
                    icon={
                      info.label === "Focus" ? (
                        <Server className="h-4 w-4" />
                      ) : info.label === "Approach" ? (
                        <GitBranch className="h-4 w-4" />
                      ) : (
                        <Coffee className="h-4 w-4" />
                      )
                    }
                    label={info.label}
                    value={info.value}
                    variants={variants}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function Row({
  // icon,
  label,
  value,
  variants,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  variants: Variants;
}) {
  return (
    <motion.div
      className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4"
      variants={variants}
    >
      {/* <span
        className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-silver text-silver"
      >
        {icon}
      </span> */}

      <div className="min-w-0">
        <p className="font-display text-[10px] uppercase tracking-[0.25em] text-silver/60">
          {label}
        </p>

        <p className="mt-1 font-body text-sm text-silver/90 sm:text-base">
          {value}
        </p>
      </div>
    </motion.div>
  );
}