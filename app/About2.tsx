import { Coffee, Server, GitBranch } from "lucide-react";
import CircuitBeams from "./CircuitBeams";

const stats = [
  { value: "5+", label: "Years building" },
  { value: "40+", label: "Systems shipped" },
  { value: "12", label: "Teams collaborated" },
];

const stack = [
  "Java",
  "Spring Boot",
  "Kafka",
  "PostgreSQL",
  "AWS",
  "Kubernetes",
  "Redis",
  "GraphQL",
];

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-10 w-full border-t border-border/40 bg-surface relative overflow-hidden"
    >
    
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32">
        {/* Section label */}
        {/* <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-silver/40" />
          <span className="font-display text-xs uppercase tracking-[0.3em] text-silver/70">
            About
          </span>
        </div> */}
        <h2 className="font-['Manrope'] text-sm sm:text-lg font-bold tracking-[0.25em] sm:tracking-[0.3em] text-[#7bd0ff] uppercase mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
            <span className="w-6 sm:w-8 h-[1px] bg-[#7bd0ff]" />
            01 // ABOUT ME
          </h2>

        <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          {/* Left: heading + copy */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Engineering systems
              <br />
              <span className="text-sky-dim">that quietly scale.</span>
            </h2>
            <CircuitBeams
  paths={{
    desktop: [
      "M1 48L180 47",
      "M180 47.3601L269.12 2",
      "M269 2L448 1"
    ],

    mobile: [
      "M0 80 L120 80 L120 40 L250 40",
      "M300 500 L300 350 L180 350",
    ],
  }}
/>

            <div className="mt-8 space-y-5 font-body text-base leading-relaxed text-silver/80 sm:text-lg">
              <p>
                I&apos;m a software engineer focused on the JVM ecosystem —
                designing backend services, event-driven pipelines, and the
                infrastructure that keeps them honest under real load.
              </p>
              <p>
                My work sits between product intent and system reliability.
                I care about clear boundaries, observable behaviour, and code
                that a teammate can read six months from now without
                needing a call.
              </p>
            </div>

            {/* Stack */}
            <div className="mt-10">
              <p className="font-display text-xs uppercase tracking-[0.25em] text-silver/60">
                Working with
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {stack.map((item) => (
                  <li
                    key={item}
                    className="border border-border/60 px-3 py-1.5 font-body text-sm text-silver/90"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: stats + notes */}
          <div className="lg:col-span-5">
            <div className="border border-border/60 p-8 sm:p-10">
              <dl className="grid grid-cols-3 gap-6">
                {stats.map((s) => (
                  <div key={s.label} className="min-w-0">
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                      {s.value}
                    </dd>
                    <p className="mt-2 font-body text-xs uppercase tracking-widest text-silver/60">
                      {s.label}
                    </p>
                  </div>
                ))}
              </dl>

              <div className="mt-10 space-y-5 border-t border-border/50 pt-8">
                <Row
                  icon={<Server className="h-4 w-4" />}
                  label="Focus"
                  value="Distributed backends & platform work"
                />
                <Row
                  icon={<GitBranch className="h-4 w-4" />}
                  label="Approach"
                  value="Small commits, clear contracts, few surprises"
                />
                <Row
                  icon={<Coffee className="h-4 w-4" />}
                  label="Based in"
                  value="Bengaluru, India"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4">
      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center border border-border/60 text-primary">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-display text-[10px] uppercase tracking-[0.25em] text-silver/60">
          {label}
        </p>
        <p className="mt-1 font-body text-sm text-silver/90 sm:text-base">
          {value}
        </p>
      </div>
    </div>
  );
}
