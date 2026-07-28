"use client";

import { useEffect, useRef, useState } from "react";
import { ChessKing, Menu, X } from "lucide-react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll<HTMLElement>("section[id]");

      // Automatically measure navbar height
      const navbarHeight = headerRef.current?.offsetHeight ?? 20;

      let currentSection = "#home";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();

        // When the section reaches the navbar, make it active
        if (rect.top <= navbarHeight + 1) {
          currentSection = `#${section.id}`;
        }
      });

      setActive(currentSection);
    };

    // Run once on page load
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const linkBase =
    "font-display font-semibold text-xs sm:text-sm md:text-base uppercase tracking-widest transition-colors duration-300";

  const linkClass = (href: string) =>
    `${linkBase} ${
      active === href
        ? "text-[#7bd0ff] font-medium"
        : "text-[#bec6e0]/60 hover:text-[#7bd0ff]"
    }`;

  return (
    <header
  ref={headerRef}
  className="fixed top-0 z-50 h-[70px] w-full border-b border-white/10 bg-[#050b18]/66 backdrop-blur-md"
>
      <div className="flex justify-between items-center px-6 pt-6 pb-3 md:py-4">
        <div className="flex items-center gap-3 cursor-pointer">
          <a href="#"></a>
          <ChessKing className="w-7 h-7 text-[#bec6e0]" />

          <span className="font-body font-black text-lg sm:text-xl md:text-3xl tracking-tighter text-[#bec6e0]">
            ΛRPΛN
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={linkClass(l.href)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-[#bec6e0]"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
  <nav
    className="
      absolute
      top-full
      left-0
      w-full
      bg-[#0b1326]
      backdrop-blur-xl
      border-t border-[#bec6e0]/10
      md:hidden
      flex
      flex-col
      gap-4
      px-6
      py-6
    "
  >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={linkClass(l.href)}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}