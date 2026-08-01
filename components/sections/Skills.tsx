"use client";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  JavaIcon,
  CIcon,
  CppIcon,
  PythonIcon,
  JavaScriptIcon,
  HtmlIcon,
  CssIcon,
  SpringIcon,
  SpringBootIcon,
  SpringSecurityIcon,
  ReactIcon,
  GithubActionsIcon,
  GitIcon,
  GithubIcon,
  LinuxIcon,
  CodespacesIcon,
} from "./skills-icons";
import type { ComponentType, SVGProps } from "react";

// Apple-style easing — matches About2/Projects.
const EASE = [0.22, 1, 0.36, 1] as const;

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const chipContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04, delayChildren: 0.12 } },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
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
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.1, ease: EASE },
  },
};

type Skill = {
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  color: string; // brand color
};

const languages: Skill[] = [
  { label: "Java", Icon: JavaIcon, color: "#E76F00" },
  { label: "C", Icon: CIcon, color: "#A8B9CC" },
  { label: "C++", Icon: CppIcon, color: "#00599C" },
  { label: "Python", Icon: PythonIcon, color: "#3776AB" },
  { label: "JavaScript", Icon: JavaScriptIcon, color: "#F7DF1E" },
  { label: "HTML5", Icon: HtmlIcon, color: "#E34F26" },
  { label: "CSS3", Icon: CssIcon, color: "#1572B6" },
];

const frameworks: Skill[] = [
  { label: "Spring Boot", Icon: SpringBootIcon, color: "#6DB33F" },
  { label: "Spring Data JPA", Icon: SpringIcon, color: "#6DB33F" },
  { label: "Spring Security", Icon: SpringSecurityIcon, color: "#6DB33F" },
  { label: "React", Icon: ReactIcon, color: "#61DAFB" },
];

const environment: Skill[] = [
  { label: "Linux", Icon: LinuxIcon, color: "#FCC624" },
  { label: "GitHub Codespaces", Icon: CodespacesIcon, color: "#FFFFFF" },
];

const devops: Skill[] = [
  { label: "GitHub Actions", Icon: GithubActionsIcon, color: "#2088FF" },
  { label: "Git", Icon: GitIcon, color: "#F05032" },
  { label: "GitHub", Icon: GithubIcon, color: "#FFFFFF" },
];

function Chip({ Icon, label, color }: Skill) {
  return (
    <motion.li
      variants={fadeUpVariants}
      className="group/chip inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[15px] text-neutral-300 transition-colors duration-300 hover:text-white cursor-pointer"
    >
      <Icon
        className="h-3.5 w-3.5 shrink-0"
        style={{ color }}
      />
      <span className="tracking-tight">{label}</span>
    </motion.li>
  );
}

// Big tile — used to fill the Languages hero card so it doesn't feel empty.
function LanguageTile({ Icon, label, color }: Skill) {
  return (
    <motion.li
      variants={fadeUpVariants}
      className="cursor-pointer group/tile relative flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]"
    >
      <Icon
        className="h-8 w-8 shrink-0 transition-transform duration-300 group-hover/tile:scale-110 sm:h-9 sm:w-9"
        style={{ color }}
      />
      <span className="text-center text-[15px] tracking-tight text-neutral-400 transition-colors duration-300 group-hover/tile:text-white sm:text-sm">
        {label}
      </span>
    </motion.li>
  );
}

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
      className={
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/60 p-6 sm:p-7 " +
        className
      }
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-medium tracking-tight text-white sm:text-xl">
            {title}
          </h3>
          {note ? (
            <p className="mt-1 text-sm text-neutral-500">{note}</p>
          ) : null}
        </div>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-500">
          {index}
        </span>
      </div>
      {children}
    </motion.article>
  );
}

export default function Skills() {
  const reduce = useReducedMotion();
  const viewport = { once: true, amount: 0.25 };

  return (
    <section
      id="skills"
      className="relative w-full bg-neutral-950 px-5 py-20 text-neutral-100 sm:px-8 sm:py-28 lg:px-12"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        variants={reduce ? undefined : staggerContainer}
        className="mx-auto w-full max-w-7xl"
      >
        {/* Section label — matches About2 / Projects grammar. */}
        <motion.h2
          variants={fadeUpVariants}
          className="mb-10 flex items-center gap-3 font-['Manrope'] text-sm font-bold uppercase tracking-[0.25em] text-[#7bd0ff] sm:mb-12 sm:gap-4 sm:text-lg sm:tracking-[0.3em]"
        >
          <motion.span
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1, transition: { duration: 0.9, ease: EASE } },
            }}
            style={{ transformOrigin: "left center" }}
            className="block h-px w-8 bg-[#7bd0ff]"
            aria-hidden
          />
          <motion.span variants={blurReveal}>03 // SKILLS</motion.span>
        </motion.h2>

        {/* Main heading — mirrors About2 ("that quietly scale.") treatment. */}
        <h2 className="mb-14 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:mb-20 sm:text-5xl lg:text-6xl">
          <motion.span variants={blurReveal} className="block">
            The tools I reach for
          </motion.span>
          <motion.span
            variants={blurReveal}
            className="block text-sky-dim"
          >
            when the work gets real.
          </motion.span>
        </h2>

        {/* Bento grid. */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6">
          <CardShell
            index="01 · Languages"
            title="Languages I write"
            note="From low-level systems work to the front-end."
            className="lg:col-span-4 lg:row-span-2"
          >
            {/* Icon tile grid — fills the tall hero card. */}
            <motion.ul
              variants={reduce ? undefined : chipContainer}
              className="grid flex-1 grid-cols-3 gap-2.5 pt-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-4"
            >
              {languages.map((s) => (
                <LanguageTile key={s.label} {...s} />
              ))}
            </motion.ul>
          </CardShell>

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
              {frameworks.map((s) => (
                <Chip key={s.label} {...s} />
              ))}
            </motion.ul>
          </CardShell>

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
              {environment.map((s) => (
                <Chip key={s.label} {...s} />
              ))}
            </motion.ul>
          </CardShell>

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
              {devops.map((s) => (
                <Chip key={s.label} {...s} />
              ))}
            </motion.ul>
          </CardShell>
        </div>
      </motion.div>
    </section>
  );
}
