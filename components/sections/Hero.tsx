import { Code, FolderGit2 } from "lucide-react";

import ProjectCarousel from "../ui/ProjectCarousel";

import DotGrid from "../ui/DotGrid";

export default function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-20 relative flex w-full items-center overflow-hidden hero-gradient min-h-[calc(100vh-70px)] lg:min-h-[calc(100dvh-70px)]"
    >
      <DotGrid className="z-0 opacity-66" />

      <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-8 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:col-span-7 lg:pt-[60px]">
            <p className="pb-5 pl-2 font-display font-medium text-[#7bd0ff] sm:pb-6 md:pb-7 lg:pb-8">
              Hi, my name is
            </p>

            <h1 className="text-5xl font-display font-bold leading-[0.95] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl">
              <span className="relative z-10 mr-2 text-sky-dim">ARPAN </span>
              <span className="relative z-10">VERMA</span>
            </h1>

            <p className="relative z-10 mt-3 max-w-2xl font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
              <span className="bg-gradient-to-r from-[#f8fafc] via-[#bec6e0] to-[#4b5563] bg-clip-text text-transparent">
                a full-stack developer
              </span>
            </p>

            <p className="relative z-10 mt-6 max-w-2xl font-body text-base font-medium leading-relaxed text-silver/90 sm:mt-7 sm:text-lg md:mt-8 md:text-xl lg:mt-10 lg:text-2xl">
              building scalable and reliable web applications and backend
              systems, with a focus on{" "}
              <span className="font-medium text-accent">
                architectural integrity
              </span>
              .
            </p>

            <div className="mt-10 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4 md:mt-10 lg:mt-11">
              <a
                href="#projects"
                className="relative z-10 inline-flex cursor-pointer items-center justify-center gap-2 bg-silver px-5 py-3 font-code text-xs font-bold uppercase tracking-widest text-surface transition-colors hover:bg-accent hover:text-accent-foreground sm:px-7 sm:py-3.5 sm:text-sm"
              >
                <Code className="h-4 w-4 sm:h-5 sm:w-5" />
                View_Projects
              </a>

              <a
                href="https://github.com/arpan-v"
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex cursor-pointer items-center justify-center gap-2 hero-gradient border border-accent px-5 py-3 font-display text-xs font-bold uppercase tracking-widest text-accent transition-colors hover:border-accent hover:text-accent sm:w-auto sm:px-7 sm:py-3.5 sm:text-sm lg:border-border/60 lg:text-silver"
              >
                <FolderGit2 className="h-4 w-4 sm:h-5 sm:w-5" />
                GitHub
              </a>
            </div>
          </div>

          {/* Right Card */}
          <div className="hidden lg:col-span-5 lg:block lg:pt-20">
            <ProjectCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
