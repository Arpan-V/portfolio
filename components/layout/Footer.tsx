"use client";

import { usePathname } from "next/navigation";
import { ChevronUp, ChevronLeft } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const href = isHome ? "#home" : "/#projects";
  const Icon = isHome ? ChevronUp : ChevronLeft;
  const ariaLabel = isHome ? "Go to projects section" : "Back to top";

  return (
    <footer className="w-full border-t border-[#45464d] bg-[#101415]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-4 px-6 py-8 sm:grid-cols-[1fr_auto] sm:px-8 lg:px-12">
        <div className="text-center sm:text-left">
          <p className="font-display text-sm font-medium">ARPAN</p>
          <p className="mt-1 font-body text-xs text-silver/77">
            Software Engineer building scalable systems.
          </p>
        </div>

        <div className="flex items-center justify-center gap-6 sm:justify-end">
          <p className="font-body text-xs text-silver/77">
            © {new Date().getFullYear()} Arpan. All rights reserved.
          </p>
          <a
            href={href}
            aria-label={ariaLabel}
            className="grid h-9 w-9 shrink-0 place-items-center rounded border border-[#7bd0ff] lg:border-[#45464d] bg-[#131b2e] text-[#7bd0ff] lg:text-silver/70 transition-colors hover:border-[#7bd0ff] hover:text-[#7bd0ff]"
          >
            <Icon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
