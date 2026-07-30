"use client";

import { useEffect, useRef, useState } from "react";

import {
  ChessKing,
  Menu,
  X,
  House,
  User,
  Send,
  Coffee,
  Terminal,
  FileText,
} from "lucide-react";

const links = [
  { href: "#home", label: "Home", icon: House },
  { href: "#about", label: "About", icon: User },
  { href: "#projects", label: "Projects", icon: Terminal },
  { href: "#skills", label: "Skills", icon: Coffee },
  { href: "#contact", label: "Contact", icon: Send },
];

const RESUME_URL = "#resume";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  const headerRef = useRef<HTMLElement>(null);

  // Active section tracking (unchanged)
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]");
      const navbarHeight = headerRef.current?.offsetHeight ?? 20;
      let currentSection = "#home";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navbarHeight + 1) {
          currentSection = `#${section.id}`;
        }
      });
      setActive(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close when resizing to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Close on outside click/tap
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      const el = headerRef.current;
      if (el && !el.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  const linkBase =
    "flex items-center gap-3 font-display font-semibold text-sm sm:text-sm md:text-base uppercase tracking-widest transition-colors duration-333";

  const linkClass = (href: string) =>
    `${linkBase} ${
      active === href
        ? "text-[#7bd0ff] font-medium"
        : "text-[#bec6e0]/60 hover:text-[#7bd0ff]"
    }`;

  const iconClass = (href: string) =>
    active === href
      ? "text-[#7bd0ff]"
      : "text-[#bec6e0]/60 group-hover:text-[#7bd0ff] transition-colors duration-333";

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-50 h-[70px] w-full border-b border-white/10 bg-[#050b18]/66 backdrop-blur-md"
    >
      <div className="flex justify-between items-center px-6 pt-6 pb-3 md:py-4">
        <a
          href="#home"
          className="flex items-center gap-3 cursor-pointer"
          aria-label="Go to home"
        >
          <ChessKing className="lg:h-6 lg:w-6 w-5 h-5 text-primary" />
          <span className="font-body font-black text-lg sm:text-xl md:text-2xl tracking-tighter text-[#bec6e0]">
            ΛRPΛN
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden md:flex gap-8 items-center">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={linkClass(l.href)}>
              {l.label}
            </a>
          ))}
          <a
            href={RESUME_URL}
            className="font-display font-semibold text-sm md:text-base uppercase tracking-widest rounded-md border-2 border-[#7bd0ff]/30 bg-[#7bd0ff]/10 px-4 py-2 text-[#7bd0ff] transition-colors duration-300 hover:bg-[#7bd0ff]/20 hover:border-[#7bd0ff]/50"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div
  className="md:hidden flex-1 flex justify-end items-center cursor-pointer"
  onClick={() => setOpen((v) => !v)}
>
  <button
    type="button"
    aria-label={open ? "Close menu" : "Open menu"}
    aria-expanded={open}
    aria-controls="mobile-nav"
    className="text-[#bec6e0] pointer-events-none"
  >
    {open ? <X /> : <Menu />}
  </button>
</div>
      </div>

      {/* Mobile Backdrop (behind menu, does not affect desktop) */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`md:hidden fixed left-0 right-0 top-[70px] bottom-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Navigation - always mounted, animated */}
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        aria-hidden={!open}
        className={`md:hidden border-b border-[#bec6e0]/24 absolute top-full left-0 w-full z-50 origin-top bg-[#0b1326]/97 backdrop-blur-xl border-t border-[#bec6e0]/10 flex flex-col px-6 py-3 shadow-2xl shadow-black/40 transition-[opacity,transform] duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto visible"
            : "opacity-0 -translate-y-3 scale-[0.98] pointer-events-none invisible"
        }`}
      >
        {links.map((l) => {
          const Icon = l.icon;
          return (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`${linkClass(l.href)} group py-4 border-b border-[#bec6e0]/10 last:border-b-0`}
            >
              <Icon className={`h-5 w-5 ${iconClass(l.href)}`} />
              <span>{l.label}</span>
            </a>
          );
        })}
        <a
          href={RESUME_URL}
          onClick={() => setOpen(false)}
          className="mt-3 w-42 flex items-center justify-center gap-2 rounded-md border border-[#7bd0ff]/30 bg-[#7bd0ff]/10 px-4 py-3 font-display font-semibold text-sm uppercase tracking-widest text-[#7bd0ff] transition-colors duration-300 hover:bg-[#7bd0ff]/20 hover:border-[#7bd0ff]/50"
        >
          <FileText className="h-4 w-4" />
          Resume
        </a>
      </nav>
    </header>
  );
}
