"use client";

import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import java from "highlight.js/lib/languages/java";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("java", java);

/** Characters typed per animation frame tick. */
const CHARS_PER_TICK = 2;
const TICK_MS = 12;

type CodeTypewriterProps = {
  code: string;
  fileName?: string;
  language?: string;
  className?: string;
  ariaLabel?: string;
};

export default function CodeTypewriter({
  code,
  fileName = "HtmlParser.java",
  language = "java",
  className = "mt-10 sm:mt-14",
  ariaLabel = "Project source code",
}: CodeTypewriterProps) {
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Start typing only when the code panel scrolls into view.
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Typewriter loop.
  useEffect(() => {
    if (!started) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setTyped(code);
      setDone(true);
      return;
    }

    let i = 0;
    const id = window.setInterval(() => {
      i = Math.min(i + CHARS_PER_TICK, code.length);
      setTyped(code.slice(0, i));
      if (i >= code.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [started, code]);

  // Keep the newest line in view while typing.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || done) return;
    el.scrollTop = el.scrollHeight;
  }, [typed, done]);

  const highlighted = hljs.highlight(typed, { language }).value;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // Fallback for browsers without the async clipboard API
      const ta = document.createElement("textarea");
      ta.value = code;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <section ref={sectionRef} aria-label={ariaLabel} className={className}>
      <div className="w-full overflow-hidden rounded-xl border border-white/12 bg-white/[0.03] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md">
        {/* Terminal bar */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 truncate font-mono text-[11px] tracking-[0.14em] text-[#9aa3a6] sm:text-xs">
            {fileName}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy code to clipboard"
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-md border border-white/12 bg-white/[0.05] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9aa3a6] transition-colors hover:border-white/25 hover:bg-white/[0.1] hover:text-[#e6e9ea] sm:text-[11px]"
          >
            {copied ? (
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15V5a2 2 0 0 1 2-2h10" />
              </svg>
            )}
            {copied ? "copied" : "copy"}
          </button>
        </div>

        {/* Fixed height, scrolls internally */}
        <div
          ref={scrollRef}
          className="h-[320px] overflow-auto px-4 py-4 sm:h-[440px] sm:px-6 lg:h-[560px]"
        >
          <pre className="!m-0 !bg-transparent !p-0">
            <code
              className="hljs !bg-transparent whitespace-pre font-mono text-[11px] leading-relaxed sm:text-[13px] lg:text-sm"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </pre>
        </div>
      </div>
    </section>
  );
}
