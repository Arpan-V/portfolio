"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { codeToTokens, type ThemedToken } from "shiki";
import { useIntersectionObserver } from "@/lib/UseIntersectionObserver";

/** Legacy animation constants — reused as reveal timing configuration only. */
const CHARS_PER_TICK = 2;
const TICK_MS = 12;

/**
 * Streaming feel: several ticks are accumulated into one visual update, so the
 * reveal front jumps forward by a small chunk (a word-ish group) instead of
 * single characters.
 */
const TICKS_PER_CHUNK = 4;
const CHUNK_MS = TICK_MS * TICKS_PER_CHUNK; // ~48ms between chunks
const BASE_CHUNK_CHARS = CHARS_PER_TICK * TICKS_PER_CHUNK; // ~8 chars target

/** Precompute chunk end offsets over the raw stream (word/whitespace aware). */
function buildChunks(source: string): number[] {
  const ends: number[] = [];
  let i = 0;
  let n = 0;
  while (i < source.length) {
    // vary chunk size a little so it feels natural, not metronomic
    const target = BASE_CHUNK_CHARS + (n % 3) * 2;
    let j = Math.min(source.length, i + target);
    // extend to the next word/whitespace boundary so words arrive whole
    while (j < source.length && !/\s/.test(source[j]!)) j++;
    // swallow trailing spaces / a single newline with indentation
    while (j < source.length && (source[j] === " " || source[j] === "\t")) j++;
    if (j <= i) j = i + 1;
    ends.push(j);
    i = j;
    n++;
  }
  if (ends.length === 0 || ends[ends.length - 1]! < source.length) ends.push(source.length);
  return ends;
}

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
  const [lines, setLines] = useState<ThemedToken[][] | null>(null);
  const [started, setStarted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const frontRef = useRef<HTMLSpanElement | null>(null);
  const userScrolledRef = useRef(false);

  // Shiki highlights the COMPLETE source once, before any animation.
  useEffect(() => {
    let cancelled = false;
    codeToTokens(code, { lang: language as never, theme: "dark-plus" })
      .then((result) => {
        if (!cancelled) setLines(result.tokens);
      })
      .catch(() => {
        if (!cancelled) {
          setLines(code.split("\n").map((line) => [{ content: line } as ThemedToken]));
        }
      });
    return () => {
      cancelled = true;
    };
  }, [code, language]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Reveal starts when the panel enters the viewport (existing shared hook).
  useIntersectionObserver(
    sectionRef,
    (entry) => {
      if (entry.isIntersecting) {
        setStarted(true);
      }
    },
    { threshold: 0.25 },
  );

  /**
   * Character offsets for the already-tokenized output: each token knows where it
   * starts within the full code stream, so the reveal front can cut *inside* a
   * token without ever re-running Shiki.
   */
  const layout = useMemo(() => {
    if (!lines) return { rows: [], totalChars: 0 };
    let offset = 0;
    const rows = lines.map((line) => {
      const tokens = line.map((token) => {
        const start = offset;
        offset += token.content.length;
        return { token, start };
      });
      offset += 1; // newline
      return tokens;
    });
    return { rows, totalChars: offset };
  }, [lines]);

  const chunks = useMemo(() => buildChunks(code), [code]);

  const animating = started && !reduceMotion && !!lines;
  const revealCount = animating ? revealed : layout.totalChars;

  // Single progressive pass over the tokenized result (no re-highlighting):
  // the front advances chunk by chunk, ChatGPT-stream style.
  useEffect(() => {
    if (!animating || layout.totalChars === 0) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = 0;
    userScrolledRef.current = false;
    setRevealed(0);
    let index = 0;
    const id = window.setInterval(() => {
      const next = chunks[index++];
      if (next === undefined || next >= layout.totalChars) {
        setRevealed(layout.totalChars);
        window.clearInterval(id);
        return;
      }
      setRevealed(next);
    }, CHUNK_MS);
    return () => window.clearInterval(id);
  }, [animating, layout.totalChars, chunks]);

  // Follow the reveal front only once it approaches the bottom of the viewport.
  useEffect(() => {
    if (!animating) return;
    const el = scrollRef.current;
    const front = frontRef.current;
    if (!el || !front || userScrolledRef.current) return;
    const frontBottom = front.offsetTop + front.offsetHeight;
    const viewBottom = el.scrollTop + el.clientHeight;
    const margin = front.offsetHeight * 2;
    if (frontBottom > viewBottom - margin) {
      el.scrollTo({ top: frontBottom - el.clientHeight + margin, behavior: "smooth" });
    }
  }, [revealed, animating]);

  // Respect manual scrolling: stop auto-following once the user takes over.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const stop = () => {
      userScrolledRef.current = true;
    };
    el.addEventListener("wheel", stop, { passive: true });
    el.addEventListener("touchmove", stop, { passive: true });
    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, []);

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
            <code className="!bg-transparent whitespace-pre font-mono text-[11px] leading-relaxed sm:text-[13px] lg:text-sm">
              {layout.rows.map((row, lineIndex) => (
                <span key={lineIndex} style={{ display: "block", minHeight: "1.5em" }}>
                  {row.map(({ token, start }, tokenIndex) => {
                    const shown = Math.max(0, Math.min(token.content.length, revealCount - start));
                    const visible = token.content.slice(0, shown);
                    const pending = token.content.slice(shown);
                    const isFront =
                      revealCount >= start && revealCount <= start + token.content.length;
                    return (
                      <span key={tokenIndex} style={{ color: token.color }}>
                        {visible}
                        {isFront ? (
                          <span ref={frontRef} style={{ display: "inline-block", width: 0 }} aria-hidden />
                        ) : null}
                        {pending ? (
                          <span style={{ opacity: 0 }} aria-hidden>
                            {pending}
                          </span>
                        ) : null}
                      </span>
                    );
                  })}
                </span>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}