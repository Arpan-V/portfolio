"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import {
  languages,
  frameworks,
  environment,
  devops,
  type Skill,
} from "@/data/skills";

// Apple-style easing shared across the portfolio.
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
      staggerChildren: 0.04,
      delayChildren: 0.12,
    },
  },
};

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

const blurReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease: EASE,
    },
  },
};

/* =========================================================
   SKILL CHIP
========================================================= */

function Chip({ Icon, label, color }: Skill) {
  return (
    <motion.li
      variants={fadeUpVariants}
      className="
        group/chip
        inline-flex
        cursor-pointer
        items-center
        gap-2
        rounded-full
        border
        border-white/10
        bg-white/[0.03]
        px-3
        py-1.5
        text-[15px]
        text-neutral-300
        transition-colors
        duration-300
        hover:text-white
      "
    >
      <Icon
        className="h-3.5 w-3.5 shrink-0"
        style={{ color }}
        aria-hidden="true"
      />

      <span className="tracking-tight">
        {label}
      </span>
    </motion.li>
  );
}

/* =========================================================
   LANGUAGE TILE
========================================================= */

function LanguageTile({ Icon, label, color }: Skill) {
  return (
    <li
      className="
        relative
        flex
        aspect-square
        flex-col
        items-center
        justify-center
        gap-2
        rounded-xl
        border
        border-white/10
        bg-white/[0.02]
        p-3
      "
    >
      <Icon
        className="
          h-8
          w-8
          shrink-0
          sm:h-9
          sm:w-9
        "
        style={{ color }}
        aria-hidden="true"
      />

      <span
        className="
          text-center
          text-[15px]
          tracking-tight
          text-neutral-400
          sm:text-sm
        "
      >
        {label}
      </span>
    </li>
  );
}

<ul
  className="
    grid
    flex-1
    grid-cols-3
    gap-2.5
    pt-2
    sm:grid-cols-4
    sm:gap-3
    lg:grid-cols-4
  "
>
  {languages.map((skill) => (
    <LanguageTile
      key={skill.label}
      {...skill}
    />
  ))}
</ul>


/* =========================================================
   CARD SHELL
========================================================= */

function CardShell({
  index,
  title,
  note,
  children,
  className = "",
}: {
  index: string;
  title: string;
  note?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.article
      variants={cardVariants}
      className={`
        group
        relative
        flex
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-neutral-950/60
        p-6
        sm:p-7
        ${className}
      `}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-medium tracking-tight text-white sm:text-xl">
            {title}
          </h3>

          {note && (
            <p className="mt-1 text-sm text-neutral-500">
              {note}
            </p>
          )}
        </div>

        <span
          className="
            shrink-0
            font-mono
            text-[11px]
            uppercase
            tracking-[0.18em]
            text-neutral-500
          "
        >
          {index}
        </span>
      </div>

      {children}
    </motion.article>
  );
}

/* =========================================================
   SKILLS SECTION
========================================================= */

export default function Skills() {
  const reduce = useReducedMotion();

  const viewport = {
    once: true,
    amount: 0.25,
  };

  return (
    <section
      id="skills"
      className="
        relative
        w-full
        bg-neutral-950
        px-5
        py-20
        text-neutral-100
        sm:px-8
        sm:py-28
        lg:px-12
      "
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={reduce ? undefined : staggerContainer}
        className="mx-auto w-full max-w-7xl"
      >
        {/* =====================================================
            SECTION LABEL
        ===================================================== */}

        <motion.h2
          variants={fadeUpVariants}
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
        >
          <motion.span
            variants={{
              hidden: {
                scaleX: 0,
              },
              show: {
                scaleX: 1,
                transition: {
                  duration: 0.9,
                  ease: EASE,
                },
              },
            }}
            style={{
              transformOrigin: "left center",
            }}
            className="
              block
              h-px
              w-8
              bg-[#7bd0ff]
            "
            aria-hidden="true"
          />

          <motion.span variants={blurReveal}>
            03 // SKILLS
          </motion.span>
        </motion.h2>

        {/* =====================================================
            MAIN HEADING
        ===================================================== */}

        <h2
          className="
            mb-14
            max-w-3xl
            text-4xl
            font-extrabold
            leading-[1.05]
            tracking-tight
            text-white
            sm:mb-20
            sm:text-5xl
            lg:text-6xl
          "
        >
          <motion.span
            variants={blurReveal}
            className="block"
          >
            The tools I reach for
          </motion.span>

          <motion.span
            variants={blurReveal}
            className="block text-sky-dim"
          >
            when the work gets real.
          </motion.span>
        </h2>

        {/* =====================================================
            BENTO GRID
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            sm:gap-5
            lg:grid-cols-6
          "
        >
          {/* ===================================================
              01 — LANGUAGES
          =================================================== */}

          <CardShell
            index="01 · Languages"
            title="Languages I write"
            note="From low-level systems work to the front-end."
            className="lg:col-span-4 lg:row-span-2"
          >
            <motion.ul
              variants={reduce ? undefined : chipContainer}
              className="
                grid
                flex-1
                grid-cols-3
                gap-2.5
                pt-2
                sm:grid-cols-4
                sm:gap-3
                lg:grid-cols-4
              "
            >
              {languages.map((skill) => (
                <LanguageTile
                  key={skill.label}
                  {...skill}
                />
              ))}
            </motion.ul>
          </CardShell>

          {/* ===================================================
              02 — FRAMEWORKS
          =================================================== */}

          <CardShell
            index="02 · Frameworks"
            title="Frameworks & libraries"
            note="What I build applications on top of."
            className="lg:col-span-2"
          >
            <motion.ul
              variants={reduce ? undefined : chipContainer}
              className="flex flex-col gap-2"
            >
              {frameworks.map((skill) => (
                <Chip
                  key={skill.label}
                  {...skill}
                />
              ))}
            </motion.ul>
          </CardShell>

          {/* ===================================================
              03 — ENVIRONMENT
          =================================================== */}

          <CardShell
            index="03 · Environment"
            title="Where I work"
            note="The bench I sit at."
            className="lg:col-span-2"
          >
            <motion.ul
              variants={reduce ? undefined : chipContainer}
              className="flex flex-wrap gap-2"
            >
              {environment.map((skill) => (
                <Chip
                  key={skill.label}
                  {...skill}
                />
              ))}
            </motion.ul>
          </CardShell>

          {/* ===================================================
              04 — DEVOPS
          =================================================== */}

          <CardShell
            index="04 · DevOps & Workflow"
            title="How I ship"
            note="Version control and CI/CD pipelines I lean on daily."
            className="lg:col-span-6"
          >
            <motion.ul
              variants={reduce ? undefined : chipContainer}
              className="flex flex-wrap gap-2"
            >
              {devops.map((skill) => (
                <Chip
                  key={skill.label}
                  {...skill}
                />
              ))}
            </motion.ul>
          </CardShell>
        </div>
      </motion.div>
    </section>
  );
}
