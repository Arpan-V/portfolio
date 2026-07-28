'use client';

import { Database, Cloud, Code, Shield } from "lucide-react";
import { useEffect, useRef, useState } from 'react';

import CircuitBeams from "./CircuitBeams";

const skills = [
  {
    icon: "database",
    title: "Data_Architecture",
    desc: "SQL/NoSQL, Postgres, Redis, Vector Databases for AI.",
  },
  {
    icon: "cloud",
    title: "Cloud_Infrastructure",
    desc: "AWS, Terraform, Kubernetes, Docker, CI/CD Pipelines.",
  },
  {
    icon: "code",
    title: "Logic_Engines",
    desc: "Python, Golang, TypeScript, C++, Rust (WIP).",
  },
  {
    icon: "security",
    title: "Security_Ops",
    desc: "OAuth2, JWT, Encryption at rest, Pentesting protocols.",
  },
];

const iconMap = {
  database: Database,
  cloud: Cloud,
  code: Code,
  security: Shield,
};

export default function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative bg-[#131b2e] py-16 sm:py-20 lg:py-24 scroll-mt-10 overflow-hidden">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-12 lg:gap-16 lg:grid-cols-2"
      >

        {/* Bio */}
        <div
          className={`transition-all duration-700 ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="font-['Manrope'] text-sm sm:text-lg font-bold tracking-[0.25em] sm:tracking-[0.3em] text-[#7bd0ff] uppercase mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4">
            <span className="w-6 sm:w-8 h-[1px] bg-[#7bd0ff]" />
            01 // ABOUT ME
          </h2>

          <p className="font-['Manrope'] text-base sm:text-lg text-[#D6E2FF] leading-relaxed mb-5 sm:mb-6">
            I develop apps with the mindset of scalability and maintainability. With over 6 years of experience in backend architecture and cloud-native engineering, I bridge the gap between high-level business logic and low-level performance optimization.
          </p>

          <p className="font-['Manrope'] text-sm sm:text-base text-[#9aa4d4] leading-relaxed">
            My philosophy is simple:{" "}
            <span className="text-[#d6dcff] italic">
              &quot;Develop structures that can withstand storms...&quot;
            </span>{" "}
            I specialize in refactoring architectures into distributed microservices
            that don&apos;t just work, but excel under load.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {skills.map((skill, i) => {
            const Icon = iconMap[skill.icon as keyof typeof iconMap];

            return (
              <div
                key={skill.title}
                className={`group p-4 sm:p-5 bg-[#2d3449]/30 rounded border border-[#45464d]/5
                  transition-all duration-500 ease-out
                  hover:-translate-y-2 hover:scale-[1.02]
                  hover:border-[#7bd0ff]/30
                  hover:shadow-[0_0_25px_rgba(123,208,255,0.15)]
                  ${
                    visible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }
                `}
               
              >
                <Icon className="text-[#7bd0ff] mb-3 sm:mb-4 w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />

                <h4 className="font-['Space_Grotesk'] text-sm sm:text-[15px] font-bold text-[#dae2fd] uppercase tracking-widest mb-1 sm:mb-2">
                  {skill.title}
                </h4>

                <p className="font-['Manrope'] text-sm sm:text-base text-[#9aa4d4] leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}