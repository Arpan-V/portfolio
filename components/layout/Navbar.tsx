"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ChessKing,
  Menu,
  X,
  User,
  Send,
  Coffee,
  Terminal,
  FileText,
  Trophy,
  House,
} from "lucide-react";

import { useIntersectionObserver } from "@/lib/UseIntersectionObserver";

const links = [
  { href: "#home", label: "Home", icon: House },
  { href: "#about", label: "About", icon: User },
  { href: "#projects", label: "Projects", icon: Terminal },
  { href: "#skills", label: "Skills", icon: Coffee },
  { href: "#certs", label: "Certs", icon: Trophy },
  { href: "#contact", label: "Contact", icon: Send },
  
];

const RESUME_URL = "#resume";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  /* ---------------- Active section: ONE IntersectionObserver ------------- */

  const [active, setActive] = useState("#home");
  const [headerH, setHeaderH] = useState(70);

  // One stable ref per known section (fixed count -> Rules of Hooks safe).
  const sectionRefs = useMemo(
    () => links.map(() => ({ current: null as HTMLElement | null })),
    []
  );
  const [mounted, setMounted] = useState(0);

  // Sections are rendered by the page, not by the navbar, so resolve them by id.
  useLayoutEffect(() => {
    let changed = false;
    links.forEach((l, i) => {
      const el = document.getElementById(l.href.slice(1));
      if (sectionRefs[i].current !== el) {
        sectionRefs[i].current = el;
        changed = true;
      }
    });
    if (changed) setMounted((n) => n + 1);
  }, [sectionRefs]);

  // Measure the header once, and again only when it actually resizes.
  useLayoutEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const measure = () => setHeaderH(el.getBoundingClientRect().height || 70);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // New array identity whenever the resolved nodes change -> observer re-subscribes.
  const observedRefs = useMemo(
    () => sectionRefs.slice(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sectionRefs, mounted]
  );

  const visibleRef = useRef<Record<string, boolean>>({});

  useIntersectionObserver(
    observedRefs,
    (entry) => {
      visibleRef.current[`#${entry.target.id}`] = entry.isIntersecting;
      // Topmost section currently inside the detection band wins.
      const next = links.find((l) => visibleRef.current[l.href]);
      if (next) setActive((prev) => (prev === next.href ? prev : next.href));
    },
    {
      // Band starts just under the header and ends ~40% down the viewport.
      rootMargin: `-${headerH}px 0px -60% 0px`,
      threshold: 0,
    }
  );

  /* ----------------------------- Menu behaviour -------------------------- */

  const close = useCallback(() => setOpen(false), []);

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
          aria-label="Arpan Verma — Home"
        >
          <ChessKing className="lg:h-6 lg:w-6 w-5 h-5 text-primary" />
          <span className="font-body font-black text-lg sm:text-xl md:text-2xl tracking-tighter text-[#bec6e0]">
            ΛRPΛN
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Primary" className="hidden md:flex gap-8 items-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "location" : undefined}
              className={linkClass(l.href)}
            >
              {l.label}
            </a>
          ))}
          <a
            href={RESUME_URL}
            className="font-display font-semibold text-sm md:text-base uppercase tracking-widest rounded-md border-2 border-[#d9f6ff]/79 px-4 py-2 text-[#d9f6ff]/79 transition-colors duration-300 hover:text-[#7bd0ff]/77 hover:border-[#7bd0ff]/77"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden flex-1 flex justify-end items-center text-[#bec6e0] cursor-pointer"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Backdrop (behind menu, does not affect desktop) */}
      <div
        aria-hidden="true"
        onClick={close}
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
              onClick={close}
              aria-current={active === l.href ? "location" : undefined}
              className={`${linkClass(l.href)} group py-4 border-b border-[#bec6e0]/24 last:border-b-0`}
            >
              <Icon className={`h-5 w-5 ${iconClass(l.href)}`} />
              <span>{l.label}</span>
            </a>
          );
        })}

        <a
          href={RESUME_URL}
          onClick={close}
          className="mt-3 w-42 flex items-center justify-center gap-2 rounded-md border-2 border-[#7bd0ff]/51  px-4 py-3 font-display font-semibold text-sm uppercase tracking-widest text-[#7bd0ff]"
        >
          <FileText className="h-4 w-4" />
          Resume
        </a>
      </nav>
    </header>
  );
}
