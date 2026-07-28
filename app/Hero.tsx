import { Code, FolderGit2 } from "lucide-react";
import ProjectCarousel from "./ProjectCarousel2";
import DotGrid from "./DotGrid";

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-20 flex relative overflow-hidden items-center hero-gradient w-full mt-20 lg:min-h-[calc(100dvh-70px)]">
      <DotGrid className="z-0 opacity-66" />
      <div className="mx-auto max-w-7xl px-6 py-39 sm:px-8 sm:py-12 lg:px-12 lg:py-15">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <h1 className="text-7xl font-display font-bold leading-[0.9] tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
              <span className="relative z-10">JAVA</span>
              <br />
              <span className="relative z-10 text-sky-dim">ARCHITECT</span>
            </h1>

            <p className="relative z-10 mt-8 max-w-2xl font-body text-lg font-light leading-relaxed text-silver/90 sm:text-xl md:text-2xl lg:mt-10">
              Software Engineer building scalable, reliable systems with a focus on{" "}
              <span className="font-medium text-accent">architectural integrity</span>.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 lg:mt-10">
              <a href="#projects">
                <button className="relative z-10 cursor-pointer inline-flex items-center gap-2 bg-silver px-6 py-3 font-code text-sm font-bold uppercase tracking-widest text-surface transition-colors hover:bg-accent hover:text-accent-foreground sm:px-8 sm:py-3.5">
                  <Code className="h-5 w-5" />
                  View_Projects
                </button>
              </a>

              <a
                href="https://github.com/arpan-v"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="relative z-10 hero-gradient cursor-pointer inline-flex items-center gap-2 border border-border/60 px-6 py-3 font-display text-sm font-bold uppercase tracking-widest text-silver transition-colors hover:border-accent hover:text-accent sm:px-8 sm:py-3.5">
                  <FolderGit2 className="h-5 w-5" />
                  GitHub
                </button>
              </a>
            </div>
          </div>

          {/* Right Card */}
          <div className="hidden lg:block col-span-12 lg:col-span-5">
  <ProjectCarousel />
</div>
        </div>
      </div>
    </section>
  );
}
