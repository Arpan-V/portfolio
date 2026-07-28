'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    label: 'Project 01',
    title: 'Neural Dashboard',
    description: 'Real-time analytics platform with AI-driven insights and adaptive UI components.',
    tag: 'AI · Automation',
    color: '#7bd0ff',
  },
  {
    id: 2,
    label: 'Project 02',
    title: 'Orbit CMS',
    description: 'Headless content system built for speed — 100ms TTFB across all regions.',
    tag: 'Backend · Go',
    color: '#a78bfa',
  },
  {
    id: 3,
    label: 'Project 03',
    title: 'Flux Commerce',
    description: 'Edge-native storefront with sub-second checkout and real-time inventory sync.',
    tag: 'E-Commerce · AWS',
    color: '#34d399',
  },
  {
    id: 4,
    label: 'Project 04',
    title: 'Prism Auth',
    description: 'Zero-trust authentication layer with biometric passkey support.',
    tag: 'Security · Python',
    color: '#fb923c',
  },
];

export default function ProjectCarousel() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % projects.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = projects[active];

  return (
    <div
      className="relative h-full flex flex-col justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header row */}
      <div className="flex items-end justify-between mb-5">
        <div className="flex items-center gap-3">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: current.color, boxShadow: `0 0 12px ${current.color}` }}
          />
          <p className="font-['Space_Grotesk'] text-[11px] text-[#c6c6cd]/60 uppercase tracking-[0.25em]">
            Featured Work
          </p>
        </div>
        <span className="font-['JetBrains_Mono'] text-[11px] text-[#c6c6cd]/50 tabular-nums">
          {String(active + 1).padStart(2, '0')}
          <span className="text-[#c6c6cd]/25"> / {String(projects.length).padStart(2, '0')}</span>
        </span>
      </div>

      {/* Stage */}
      <div className="relative" style={{ height: '340px' }}>
        {projects.map((project, index) => {
          const isActive = index === active;
          return (
            <div
              key={project.id}
              onClick={() => {
                setActive(index);
                if (isActive) {
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="absolute inset-0 cursor-pointer"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.98)',
                pointerEvents: isActive ? 'auto' : 'none',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              <div
                className="group relative h-full rounded-2xl overflow-hidden"
                style={{
                  background:
                    'linear-gradient(155deg, rgba(23,31,51,0.9) 0%, rgba(15,20,35,0.95) 100%)',
                  border: `1px solid ${project.color}22`,
                  boxShadow: `0 20px 60px -20px ${project.color}25, inset 0 1px 0 rgba(255,255,255,0.04)`,
                }}
              >
                {/* Ambient glow */}
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-40 blur-3xl pointer-events-none"
                  style={{ background: project.color }}
                />
                {/* Corner grid accent */}
                <div
                  className="absolute top-0 left-0 w-full h-px"
                  style={{
                    background: `linear-gradient(to right, ${project.color}, transparent 60%)`,
                  }}
                />

                <div className="relative h-full p-7 flex flex-col justify-between">
                  {/* Top */}
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className="font-['JetBrains_Mono'] text-[11px] uppercase tracking-[0.2em]"
                      style={{ color: project.color }}
                    >
                      {project.label}
                    </span>
                    <span
                      className="font-['JetBrains_Mono'] text-[10px] px-2.5 py-1 rounded-full backdrop-blur-sm whitespace-nowrap"
                      style={{
                        background: `${project.color}12`,
                        color: project.color,
                        border: `1px solid ${project.color}30`,
                      }}
                    >
                      {project.tag}
                    </span>
                  </div>

                  {/* Middle */}
                  <div>
                    <h3 className="font-['Space_Grotesk'] text-white font-semibold text-[26px] leading-[1.15] tracking-tight mb-3">
                      {project.title}
                    </h3>
                    <p className="font-['Space_Grotesk'] text-[#c6c6cd]/70 text-[13.5px] leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#c6c6cd]/50">
                      View case study
                    </span>
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{
                        background: `${project.color}15`,
                        border: `1px solid ${project.color}35`,
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4" style={{ color: project.color }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress bars */}
      <div className="flex items-center gap-2 mt-6">
        {projects.map((p, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="group relative flex-1 h-[2px] rounded-full overflow-hidden bg-white/8 hover:bg-white/15 transition-colors"
            aria-label={`Go to ${p.title}`}
          >
            <span
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
              style={{
                width: i === active ? '100%' : i < active ? '100%' : '0%',
                background: i === active ? p.color : '#c6c6cd40',
                boxShadow: i === active ? `0 0 8px ${p.color}80` : 'none',
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
