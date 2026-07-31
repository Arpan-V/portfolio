"use client";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import neuralStreamImg from "./project-1.jpg";
import sentinelAuthImg from "./project-2.jpg";
import pyFlowImg from "./project-3.jpg";
import graphVizImg from "./project-4.jpg";

/* ------------------------------------------------------------------ */
/* Motion primitives                                                   */
/* ------------------------------------------------------------------ */

const EASE = [0.22, 1, 0.36, 1] as const;
const VIEWPORT = { once: true, amount: 0.2 } as const;

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.04 } },
};

const metaContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.14 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const blurReveal: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

const surfaceReveal: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.06, clipPath: "inset(0 0 100% 0)" },
  show: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 1.1, ease: EASE },
  },
};

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const REPO_URL = "https://github.com/Arpan-V/portfolio/";

type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  status: string;
  description: React.ReactNode;
  tech: string[];
  image: string;
  alt: string;
  href: string;
};

const PROJECTS: Project[] = [
  {
    id: "neural-stream",
    index: "01",
    title: "NEURAL_STREAM V4",
    category: "Infrastructure",
    status: "Featured",
    description: (
      <>
        Real-time processing engine for high-frequency trading data, utilizing
        Kafka and specialized Go routines for{" "}
        <span className="font-mono text-[#7bd0ff]">2ms latency</span>.
      </>
    ),
    tech: ["GO_1.21", "APACHE_KAFKA", "KUBERNETES", "PROMETHEUS"],
    image: neuralStreamImg,
    alt: "Real-time streaming dashboard showing latency waveforms and throughput charts",
    href: REPO_URL,
  },
  {
    id: "sentinel-auth",
    index: "02",
    title: "SENTINEL_AUTH",
    category: "SaaS Product",
    status: "Live",
    description:
      "Zero-trust authentication provider built as a sidecar proxy for microservices. Integrated with AWS KMS.",
    tech: ["RUST", "AWS_SDK"],
    image: sentinelAuthImg,
    alt: "Layered security diagram with a shield and encrypted key lattice",
    href: REPO_URL,
  },
  {
    id: "py-flow-gen",
    index: "03",
    title: "PY_FLOW_GEN",
    category: "Open Source",
    status: "Published",
    description:
      "A minimalist Python library for generating DAG-based workflows with native typing and async support.",
    tech: ["PYTHON_3.11", "PYPI"],
    image: pyFlowImg,
    alt: "Directed acyclic graph of connected workflow nodes",
    href: REPO_URL,
  },
  {
    id: "graph-schema-viz",
    index: "04",
    title: "GRAPH_SCHEMA_VIZ",
    category: "Developer Tool",
    status: "Live",
    description:
      "Interactive schema visualizer for GraphQL and Neo4j. Handles schemas with 500+ nodes without UI lag.",
    tech: ["REACT", "D3.JS", "NEO4J"],
    image: graphVizImg,
    alt: "Dense force-directed graph of schema nodes and relationships",
    href: REPO_URL,
  },
];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */

function TechBadge({ label }: { label: string }) {
  return (
    <motion.li
      variants={fadeUp}
      className="rounded-[4px] border border-white/[0.06] bg-white/[0.035] px-2 py-1 font-mono text-[10px] tracking-wide text-[#9fb0cc] transition-colors duration-300 group-hover:border-[#7bd0ff]/20 group-hover:text-[#c3d4ea]"
    >
      {label}
    </motion.li>
  );
}

function TechList({ tech }: { tech: string[] }) {
  return (
    <motion.ul variants={metaContainer} className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <TechBadge key={t} label={t} />
      ))}
    </motion.ul>
  );
}

function ProjectMeta({
  index,
  category,
  status,
}: {
  index: string;
  category: string;
  status: string;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#6b7c99]"
    >
      <span className="text-[#7bd0ff]/70">{index}</span>
      <span aria-hidden className="h-px w-5 bg-white/10" />
      <span className="truncate">{category}</span>
      <span aria-hidden className="h-1 w-1 rounded-full bg-[#7bd0ff]/40" />
      <span className="truncate text-[#8ea3c2]">{status}</span>
    </motion.div>
  );
}

function ProjectArrow({ label = "View project" }: { label?: string }) {
  return (
    <span className="mt-6 inline-flex items-center gap-2 text-[13px] text-[#93a7c6] transition-colors duration-300 group-hover:text-[#dae2fd] group-focus-visible:text-[#dae2fd]">
      <span className="relative">
        {label}
        <span
          aria-hidden
          className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-[#7bd0ff]/60 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:origin-left group-hover:scale-x-100"
        />
      </span>
      <ArrowUpRight
        aria-hidden
        className="h-4 w-4 text-[#7bd0ff] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </span>
  );
}

function ProjectImage({
  src,
  alt,
  className = "",
  style,
  width,
  height,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width: number;
  height: number;
}) {
  return (
    <motion.div
      variants={imageReveal}
      className={`relative overflow-hidden rounded-lg bg-[#0a1020] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        style={style}
        className="h-full w-full scale-[1.01] object-cover opacity-85 transition-[transform,opacity] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform motion-safe:group-hover:scale-[1.05] motion-safe:group-hover:opacity-100"
      />
      {/* Depth overlay — lightens on hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070b16] via-[#070b16]/25 to-transparent opacity-90 transition-opacity duration-700 group-hover:opacity-60"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-white/[0.06]"
      />
    </motion.div>
  );
}

/** Shared card chrome: hairline surface, hover lift, focus ring, link semantics. */
function ProjectSurface({
  href,
  className = "",
  children,
  title,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <motion.article variants={surfaceReveal} className={className}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={`${title} — view project on GitHub`}
        className="group relative block h-full overflow-hidden rounded-xl border border-white/[0.06] bg-[#0e1526] transition-[border-color,background-color,box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#7bd0ff]/20 hover:bg-[#111a2e] hover:shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] focus-visible:border-[#7bd0ff]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7bd0ff]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070b16]"
      >
        {/* Accent hairline that draws in on hover. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#7bd0ff]/70 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        />
        {children}
      </a>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Layout variants                                                     */
/* ------------------------------------------------------------------ */

function FeaturedProject({ project }: { project: Project }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <div ref={ref} className="relative">
      {/* Single restrained ambient glow, anchored to the hero. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -top-16 h-64 opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(45% 60% at 30% 40%, rgba(123,208,255,0.10), transparent 70%)",
        }}
      />
      <ProjectSurface
        href={project.href}
        title={project.title}
        className="relative"
      >
        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.05fr_1fr]">
          <div className="order-2 flex flex-col justify-center p-6 sm:p-9 lg:order-1 lg:p-12">
            <ProjectMeta
              index={project.index}
              category={project.category}
              status={project.status}
            />
            <motion.h3
              variants={blurReveal}
              className="mt-5 text-[28px] font-bold leading-[1.05] tracking-tight text-[#e6ecff] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:translate-x-1 sm:text-[38px] lg:text-[44px]"
            >
              {project.title}
            </motion.h3>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-md text-[15px] leading-relaxed text-[#a9b7d4]"
            >
              {project.description}
            </motion.p>
            <div className="mt-7">
              <TechList tech={project.tech} />
            </div>
            <motion.div variants={fadeUp}>
              <ProjectArrow />
            </motion.div>
          </div>

          <div className="order-1 p-3 sm:p-4 lg:order-2 lg:p-5">
            <motion.div style={reduce ? undefined : { y }} className="h-full">
              <ProjectImage
                src={project.image}
                alt={project.alt}
                width={1600}
                height={1008}
                className="aspect-[16/10] h-full w-full lg:aspect-auto lg:min-h-[380px]"
              />
            </motion.div>
          </div>
        </div>
      </ProjectSurface>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <ProjectSurface href={project.href} title={project.title}>
      <div className="flex h-full flex-col">
        <div className="p-3 sm:p-4">
          <ProjectImage
            src={project.image}
            alt={project.alt}
            width={1408}
            height={1056}
            className="aspect-[4/3]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6 pt-3 sm:p-7 sm:pt-4">
          <ProjectMeta
            index={project.index}
            category={project.category}
            status={project.status}
          />
          <motion.h3
            variants={fadeUp}
            className="mt-4 text-xl font-bold tracking-tight text-[#e6ecff] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:translate-x-1 sm:text-2xl"
          >
            {project.title}
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-3 text-sm leading-relaxed text-[#a0aecb]"
          >
            {project.description}
          </motion.p>
          <div className="mt-auto pt-6">
            <TechList tech={project.tech} />
            <motion.div variants={fadeUp}>
              <ProjectArrow />
            </motion.div>
          </div>
        </div>
      </div>
    </ProjectSurface>
  );
}

function WideProject({ project }: { project: Project }) {
  return (
    <ProjectSurface href={project.href} title={project.title}>
      <div className="grid grid-cols-1 items-center gap-0 sm:grid-cols-[1fr_0.75fr]">
        <div className="order-2 p-6 sm:order-1 sm:p-9 lg:p-11">
          <ProjectMeta
            index={project.index}
            category={project.category}
            status={project.status}
          />
          <motion.h3
            variants={fadeUp}
            className="mt-4 text-xl font-bold tracking-tight text-[#e6ecff] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:translate-x-1 sm:text-2xl lg:text-[30px]"
          >
            {project.title}
          </motion.h3>
          <motion.p
            variants={fadeUp}
            className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#a9b7d4]"
          >
            {project.description}
          </motion.p>
          <div className="mt-6">
            <TechList tech={project.tech} />
          </div>
          <motion.div variants={fadeUp}>
            <ProjectArrow />
          </motion.div>
        </div>

        <div className="order-1 p-3 sm:order-2 sm:p-4 lg:p-5">
          <ProjectImage
            src={project.image}
            alt={project.alt}
            width={1408}
            height={1056}
            className="aspect-[16/10] sm:aspect-[4/3]"
          />
        </div>
      </div>
    </ProjectSurface>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function Projects() {
  const reduce = useReducedMotion();
  const [featured, second, third, wide] = PROJECTS;

  return (
    <section
      id="projects"
      className="relative w-full scroll-mt-16 overflow-hidden bg-[#070b16]"
    >
      {/* Ambient background: soft wash + a fine grid masked away from content edges. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(123,208,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(123,208,255,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage:
              "radial-gradient(70% 50% at 50% 0%, rgba(0,0,0,0.9), transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(70% 50% at 50% 0%, rgba(0,0,0,0.9), transparent 75%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[520px]"
          style={{
            background:
              "radial-gradient(60% 70% at 20% 0%, rgba(123,208,255,0.07), transparent 70%)",
          }}
        />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={reduce ? undefined : staggerContainer}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32"
      >
        {/* Eyebrow — matches About2 / Skills grammar. */}
        <motion.h2
          variants={fadeUp}
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
          <motion.span variants={blurReveal}>02 // PROJECTS</motion.span>
        </motion.h2>

        <p className="sr-only">Selected engineering work.</p>
        <div className="mb-14 max-w-3xl sm:mb-20">
          <motion.span
            variants={blurReveal}
            className="block text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Selected work,
          </motion.span>
          <motion.span
            variants={blurReveal}
            className="block text-4xl font-extrabold leading-[1.05] tracking-tight text-[#7bd0ff]/80 sm:text-5xl lg:text-6xl"
          >
            built to hold up.
          </motion.span>
        </div>

        {/* Editorial rhythm: hero → 2-up → wide band. */}
        <div className="flex flex-col gap-4 sm:gap-6">
          <FeaturedProject project={featured} />

          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
            <ProjectCard project={second} />
            <ProjectCard project={third} />
          </div>

          <WideProject project={wide} />
        </div>
      </motion.div>
    </section>
  );
}
