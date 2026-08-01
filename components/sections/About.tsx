"use client";

import { Coffee, Server, GitBranch } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { aboutInfo, aboutStack, aboutStats } from "@/data/about";

// Apple-like smooth easing
const EASE = [0.22, 1, 0.36, 1] as const;

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

// Standard item rise + fade
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 2, ease: EASE },
  },
};

// Heading lines: rise + soft blur removal
const blurReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 2, ease: EASE },
  },
};

// Stats card fades up slightly delayed vs left column
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay: 0.12 },
  },
};

// Icon subtle rotate settle
const iconVariants: Variants = {
  hidden: { opacity: 0, rotate: 4 },
  show: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

export default function About() {
  const reduce = useReducedMotion();

  const viewport = { once: true, amount: 0.45 };

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
          whileInView={reduce ? { opacity: 1 } : { color: "#7bd0ff" }}
          viewport={viewport}
          transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
        >
          <motion.span
            className="block h-[1px] origin-left bg-[#7bd0ff]"
            initial={{ scaleX: 0, width: "1.5rem" }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ transformOrigin: "left center" }}
          />

          <motion.span
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
          >
            01 // ABOUT ME
          </motion.span>
        </motion.p>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + copy */}
          <motion.div
            className="lg:col-span-7"
            variants={staggerContainer}
          >
            {/* Main section heading */}
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <motion.span variants={blurReveal} className="block">
                Engineering systems
              </motion.span>

              <motion.span
                variants={blurReveal}
                className="block text-sky-dim"
              >
                that quietly scale.
              </motion.span>
            </h2>

            {/* About copy */}
            <motion.div
              className="mt-8 space-y-5 font-body text-base leading-relaxed text-silver/80 sm:text-lg"
              variants={staggerContainer}
            >
              <motion.p variants={itemVariants}>
                I&apos;m a software engineer focused on the JVM ecosystem —
                designing backend services, event-driven pipelines, and the
                infrastructure that keeps them honest under real load.
              </motion.p>

              <motion.p variants={itemVariants}>
                My work sits between product intent and system reliability. I
                care about clear boundaries, observable behaviour, and code
                that a teammate can read six months from now without needing a
                call.
              </motion.p>
            </motion.div>

            {/* Technology stack */}
            <div className="mt-10">
              <motion.p
                variants={itemVariants}
                className="font-display text-xs uppercase tracking-[0.25em]"
              >
                Working with
              </motion.p>

              <motion.ul
                className="mt-4 flex flex-wrap gap-2"
                variants={staggerContainer}
              >
                {aboutStack.map((item) => (
                  <motion.li
                    key={item}
                    variants={itemVariants}
                    className="cursor-default border border-[#7bd0ff] px-3 py-1.5 font-body text-sm text-[#7bd0ff]"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>

          {/* Right: stats + notes card */}
          <motion.div
            className="lg:col-span-5"
            variants={cardVariants}
          >
            <motion.div className="border-2 border-border/77 p-8 sm:p-10">
              {/* Stats */}
              <motion.dl
                className="grid grid-cols-3 gap-6"
                variants={staggerContainer}
              >
                {aboutStats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="min-w-0"
                    variants={itemVariants}
                  >
                    <dt className="mt-2 font-body text-xs uppercase tracking-widest text-silver/60">
                      {stat.label}
                    </dt>

                    <dd className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                      {stat.value}
                    </dd>
                  </motion.div>
                ))}
              </motion.dl>

              {/* Info rows */}
              <motion.div
                className="mt-10 space-y-5 border-t border-[#7bd0ff] pt-8"
                variants={staggerContainer}
              >
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
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4"
      variants={itemVariants}
    >
      <motion.span
        variants={iconVariants}
        className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-[#7bd0ff] text-primary"
      >
        {icon}
      </motion.span>

      <motion.div className="min-w-0" variants={itemVariants}>
        <p className="font-display text-[10px] uppercase tracking-[0.25em] text-silver/60">
          {label}
        </p>

        <p className="mt-1 font-body text-sm text-silver/90 sm:text-base">
          {value}
        </p>
      </motion.div>
    </motion.div>
  );
}