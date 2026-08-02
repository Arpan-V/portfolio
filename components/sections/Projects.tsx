
"use client";

import { AppWindowMac, ArrowUpRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import GridBackground from "../ui/GridBackground";
import { projects, type Project } from "@/data/projects";

// Apple-style easing shared across every motion in this section.
const EASE = [0.22, 1, 0.36, 1] as const;

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

const chipContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: EASE },
  },
};

const blurReveal: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

// -----------------------------------------------------------------------------
// Technology chip
// -----------------------------------------------------------------------------

function Chip({ label }: { label: string }) {
  return (
    <motion.span
      variants={fadeUpVariants}
      className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9aa3a6] sm:text-[11px]"
    >
      {label}
    </motion.span>
  );
}

// -----------------------------------------------------------------------------
// macOS-style window icon
// -----------------------------------------------------------------------------

function WindowIcon() {
  return (
    <AppWindowMac className="h-6 w-6 text-[#7bd0ff]" aria-hidden />
  );
}

// -----------------------------------------------------------------------------
// Project card
// -----------------------------------------------------------------------------

function ProjectCard({ project }: { project: Project }) {
  const spanClass = project.span === 2 ? "lg:col-span-2" : "lg:col-span-1";
  const isExternal = !!project.href && /^https?:\/\//i.test(project.href);

  const content = (
    <motion.article
      variants={cardVariants}
      className="group relative flex h-full lg:h-[520px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)] backdrop-blur-md sm:p-5"
    >
      {/* Blue gradient on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at 50% 0%, rgba(123,208,255,0.10), transparent 60%)",
        }}
      />

      <div className="relative flex h-full flex-col">
        {/* Header */}
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            {project.category && (
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7bd0ff]">
                {project.category}
              </p>
            )}

            <h3 className="truncate font-mono text-base font-semibold tracking-tight text-[#e6e9ea] sm:text-lg">
              {project.title}
            </h3>
          </div>

          <WindowIcon />
        </header>

        <p className="mt-3 text-sm leading-relaxed text-[#9aa3a6]">
          {project.description}
        </p>

        {/* Technologies */}
        <motion.div
          variants={chipContainer}
          className="mt-4 flex flex-wrap gap-2"
        >
          {project.technologies.map((technology) => (
            <Chip key={technology} label={technology} />
          ))}
        </motion.div>

        {/* Image */}
        <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-black/30 sm:aspect-[16/9] lg:aspect-[16/8.5]">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 45vw"
            className="object-cover"
          />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
          />
        </div>

        {/* Link */}
        {project.href && (
          <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#7bd0ff]">
            {project.linkLabel ?? "View project"}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        )}
      </div>
    </motion.article>
  );

  if (!project.href) {
    return <div className={spanClass}>{content}</div>;
  }

  if (isExternal) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${spanClass} block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#7bd0ff]/60`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={project.href}
      className={`${spanClass} block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#7bd0ff]/60`}
    >
      {content}
    </Link>
  );
}

// -----------------------------------------------------------------------------
// Projects section
// -----------------------------------------------------------------------------

export default function Projects() {
  const viewport = { once: true, amount: 0.15 };

  return (
    <section id="projects" className="relative w-full py-20 sm:py-28">
      <GridBackground />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative mx-auto w-full max-w-6xl px-5 sm:px-8"
      >
        {/* Section label */}
        <motion.p
          className="
            mb-4
            flex
            items-center
            gap-3
            font-['Manrope']
            text-sm
            font-bold
            uppercase
            tracking-[0.25em]
            text-[#7bd0ff]
            sm:mb-5
            sm:gap-4
            sm:text-lg
            sm:tracking-[0.3em]
          "
          variants={fadeUpVariants}
        >
          <motion.span
            className="
              block
              h-[1px]
              w-8
              origin-left
              bg-[#7bd0ff]
            "
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewport}
            transition={{
              duration: 0.8,
              ease: EASE,
            }}
          />

          <motion.span variants={blurReveal}>
            02 // PROJECTS
          </motion.span>
        </motion.p>

        {/* Main section heading */}
        <motion.h2
          className="
            mb-10
            font-['Manrope']
            text-3xl
            font-extrabold
            tracking-tight
            text-[#dae2fd]
            sm:mb-12
            sm:text-4xl
            lg:text-5xl
          "
          variants={blurReveal}
        >
          Featured Projects
        </motion.h2>

        {/* Project grid */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:gap-5 lg:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
