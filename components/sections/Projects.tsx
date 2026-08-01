"use client";

import { AppWindowMac } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Image from "next/image";

import GridBackground from "../ui/GridBackground";
import { projects, type Project } from "@/data/projects";

// Apple-style easing shared across every motion in this section.
const EASE = [0.22, 1, 0.36, 1] as const;

// Orchestrates children reveals across the section.
const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

// Slightly tighter stagger for technology chips.
const chipContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

// Generic fade + rise.
const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: EASE,
    },
  },
};

// Card container animation.
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: EASE,
    },
  },
};

// Heading line reveal.
const blurReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

// -----------------------------------------------------------------------------
// Technology chip
// -----------------------------------------------------------------------------

function Chip({ label }: { label: string }) {
  return (
    <motion.span
      variants={fadeUpVariants}
      className="
        cursor-default
        rounded
        border
        border-[#45464d]/20
        bg-[#2d3449]
        px-2
        py-1
        font-['JetBrains_Mono']
        text-[10px]
        text-[#b9c7e0]
      "
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
    <span className="relative shrink-0">
      <AppWindowMac
        className="
          relative
          h-5
          w-5
          text-[#7bd0ff]
          transition-all
          duration-300
          ease-out
          md:text-[#7bd0ff]/40
          md:saturate-50
          md:group-hover:-translate-y-0.5
          md:group-hover:text-[#7bd0ff]
          md:group-hover:saturate-100
        "
      />
    </span>
  );
}

// -----------------------------------------------------------------------------
// Card wrapper
// -----------------------------------------------------------------------------

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
      transition={{
        duration: 0.25,
        ease: EASE,
      }}
      className={`group relative rounded-lg border border-[#45464d]/10 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// Project card
// -----------------------------------------------------------------------------

function ProjectCard({ project }: { project: Project }) {
  const spanClass =
    project.span === 2 ? "lg:col-span-2" : "lg:col-span-1";

  return (
    <Card
      className={`
        ${spanClass}
        flex
        flex-col
        bg-[#171f33]
        p-6
        sm:p-7
        lg:p-8
      `}
    >
      {/* Project heading / description */}
      <motion.div variants={staggerContainer}>
        <motion.div
          className="
            mb-3
            flex
            items-start
            justify-between
            gap-3
          "
          variants={fadeUpVariants}
        >
          <div className="min-w-0">
            {project.category && (
              <span
                className="
                  mb-2
                  block
                  text-[10px]
                  uppercase
                  tracking-widest
                  text-[#7bd0ff]/60
                "
              >
                {project.category}
              </span>
            )}

            <motion.h3
              variants={fadeUpVariants}
              className="
                font-['Manrope']
                text-lg
                font-bold
                text-[#dae2fd]
                sm:text-xl
                lg:text-[22px]
              "
            >
              {project.title}
            </motion.h3>
          </div>

          <WindowIcon />
        </motion.div>

        <motion.p
          variants={fadeUpVariants}
          className="
            mb-6
            max-w-2xl
            text-sm
            leading-relaxed
            text-[#b8c1ec]
            sm:text-[15px]
          "
        >
          {project.description}
        </motion.p>
      </motion.div>

      {/* Technologies */}
      <motion.div
        className="flex flex-wrap gap-2 sm:gap-3"
        variants={chipContainer}
      >
        {project.technologies.map((technology) => (
          <Chip
            key={technology}
            label={technology}
          />
        ))}
      </motion.div>

      {/* Project image */}
      <motion.div
        variants={fadeUpVariants}
        className="
          mt-6
          overflow-hidden
          rounded
          sm:mt-7
        "
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          width={800}
          height={300}
          loading="lazy"
          className="
            h-40
            w-full
            rounded
            object-cover
            opacity-80
            transition-all
            duration-500
            ease-out
            group-hover:scale-[1.015]
            group-hover:opacity-100
            sm:h-44
            lg:h-48
          "
        />
      </motion.div>
    </Card>
  );
}

// -----------------------------------------------------------------------------
// Projects section
// -----------------------------------------------------------------------------

export default function Projects() {
  const viewport = {
    once: true,
    amount: 0.25,
  };

  return (
    <motion.section
      id="projects"
      className="
        relative
        w-full
        scroll-mt-10
        overflow-hidden
      "
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={staggerContainer}
    >
      <GridBackground />

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          py-20
          sm:px-8
          sm:py-24
          lg:px-12
          lg:py-32
        "
      >
        {/* Section heading */}
        <motion.h2
          className="
            mb-10
            flex
            items-center
            gap-3
            font-['Manrope']
            text-sm
            font-bold
            uppercase
            tracking-[0.25em]
            text-[#7bd0ff]
            sm:mb-12
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
        </motion.h2>

        {/* Project grid */}
        <motion.div
          className="
            grid
            grid-cols-1
            gap-5
            sm:gap-6
            lg:grid-cols-3
          "
          variants={staggerContainer}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
