"use client";

import { useCallback, useEffect, useState } from "react";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

import project1 from "./project-1.jpg";
import project2 from "./project-2.jpg";
import project3 from "./project-3.jpg";
import project4 from "./project-4.jpg";

const projects = [
  {
    id: 1,
    number: "01",
    tag: "AI · Automation",
    title: "Neural Dashboard",
    description:
      "Real-time analytics platform with AI-driven insights and adaptive UI components.",
    image: project1,
    href: "#projects",
  },
  {
    id: 2,
    number: "02",
    tag: "Cloud · Infrastructure",
    title: "Cloud Orchestrator",
    description:
      "Distributed system for provisioning, scaling, and monitoring cloud-native workloads.",
    image: project2,
    href: "#projects",
  },
  {
    id: 3,
    number: "03",
    tag: "API · Integration",
    title: "API Gateway",
    description:
      "High-performance API gateway with rate limiting, auth, and observability built in.",
    image: project3,
    href: "#projects",
  },
  {
    id: 4,
    number: "04",
    tag: "ML · Data",
    title: "ML Pipeline",
    description:
      "End-to-end data pipeline for training, validating, and deploying ML models.",
    image: project4,
    href: "#projects",
  },
];

const AUTO_ADVANCE_MS = 4000;

export default function ProjectCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const project = projects[active];

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % projects.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [isPaused, next]);

  return (
    <div
      className="w-full max-w-md flex flex-col gap-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="flex items-center justify-between text-sm font-display uppercase tracking-widest text-silver/80">
        <span className="flex items-center gap-1">Featured Work</span>
        <span className="tabular-nums">{project.number} / 04</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm">
        <div
          className="flex will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {projects.map((project) => (
            <a
              key={project.id}
              href={project.href}
              className="group relative block w-full flex-shrink-0 overflow-hidden"
            >
              <div className="relative aspect-[4/2] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="carousel-image h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-surface/40 to-transparent" />
              </div>

              <div className="relative p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mt-4 text-2xl font-display font-semibold text-foreground sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-5">
                  <span className="text-xs font-display uppercase tracking-widest text-silver/80">
                    View Case Study
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-border/60 text-silver transition-colors group-hover:border-primary group-hover:text-primary">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === active
                ? "w-15 bg-primary"
                : "w-6 bg-border/80 hover:bg-border"
            }`}
            aria-label={`Show project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
