"use client";

import { useEffect, useRef, useState } from "react";
import hljs from "highlight.js/lib/core";
import java from "highlight.js/lib/languages/java";
import "highlight.js/styles/atom-one-dark.css";

hljs.registerLanguage("java", java);

/**
 * Backend endpoint for the Link Parser audit.
 * Set NEXT_PUBLIC_API_BASE_URL in .env.local (e.g. https://api.example.com).
 */
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const AUDIT_ENDPOINT = `${API_BASE}/api/audit`;

/** Shape returned by the Spring Boot backend (AuditResponse). */
type AuditResponse = {
  httpStatus: number;
  responseTime: number;
  pageTitle: string;
  metaDescription: string;
  h1Count: number;
  imagesMissingAlt: number;
  approximateWordCount: number;
};

const CODE = `package com.arpan.backend.service;

import com.arpan.backend.dto.AuditResponse;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

@Component
public class HtmlParser {

    public AuditResponse parse(Document document, int httpStatus, long responseTime) {

        String pageTitle = document.title();

        Element metaDescriptionElement =
                document.selectFirst("meta[name=description]");

        String metaDescription =
                metaDescriptionElement != null
                        ? metaDescriptionElement.attr("content")
                        : "";

        // Counting the total number of H1 tags
        int h1Count = document.select("h1").size();

        // Selecting all image tags
        Elements images = document.select("img");

        // Counter for images missing alt text
        int imagesMissingAlt = 0;

        // Loop through every image
        for (Element image : images) {

            // Count images with missing or empty alt attribute
            if (!image.hasAttr("alt") || image.attr("alt").isBlank()) {
                imagesMissingAlt++;
            }
        }

        // Extracting text and counting words
        int approximateWordCount = 0;
        String text = document.text().trim();

        if (!text.isEmpty()) {
            approximateWordCount = text.split("\\\\s+").length;
        }

        return new AuditResponse(
                httpStatus,
                responseTime,
                pageTitle,
                metaDescription,
                h1Count,
                imagesMissingAlt,
                approximateWordCount
        );
    }
}`;

/** Characters typed per animation frame tick. */
const CHARS_PER_TICK = 2;
const TICK_MS = 12;

export default function LensPage() {
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Link Parser form state
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResponse | null>(null);

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
      setTyped(CODE);
      setDone(true);
      return;
    }

    let i = 0;
    const id = window.setInterval(() => {
      i = Math.min(i + CHARS_PER_TICK, CODE.length);
      setTyped(CODE.slice(0, i));
      if (i >= CODE.length) {
        window.clearInterval(id);
        setDone(true);
      }
    }, TICK_MS);

    return () => window.clearInterval(id);
  }, [started]);

  // Keep the newest line in view while typing.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || done) return;
    el.scrollTop = el.scrollHeight;
  }, [typed, done]);

  const highlighted = hljs.highlight(typed, { language: "java" }).value;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CODE);
    } catch {
      // Fallback for browsers without the async clipboard API
      const ta = document.createElement("textarea");
      ta.value = CODE;
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

  async function handleAudit(e: React.FormEvent) {
    e.preventDefault();
    let trimmed = url.trim();
    if (!trimmed) {
      setError("Please enter a URL.");
      return;
    }
    if (!/^https?:\/\//i.test(trimmed)) {
      trimmed = `https://${trimmed}`;
      setUrl(trimmed);
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(AUDIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      if (!res.ok) {
        throw new Error(`Request failed (${res.status})`);
      }
      const data: AuditResponse = await res.json();
      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen text-[#e6e9ea]">
      {/* Static background image — fixed layer that never shifts on mobile scroll */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 h-[100lvh] w-full bg-[#0b0e0f] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/projects/lens-bg.jpg')",
          backgroundAttachment: "scroll",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 h-[100lvh] w-full bg-gradient-to-b from-[#0b0e0f]/85 via-[#0b0e0f]/70 to-[#0b0e0f]/90"
      />

      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
        {/* Heading + description */}
        <header className="max-w-2xl">
          <p className="text-[11px] uppercase tracking-[0.22em] text-[#7bd0ff] sm:text-xs">
            Project — Lens
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Link Parser
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#c3cbcd] sm:text-base">
            A Spring Boot service that fetches any URL and returns an instant SEO
            snapshot — HTTP status, response time, page title, meta description,
            H1 count, images missing alt text and approximate word count. Below is
            the core HTML parsing component, written live.
          </p>
        </header>

        {/* Transparent fixed-size code panel */}
        <section
          ref={sectionRef}
          aria-label="Project source code"
          className="mt-10 sm:mt-14"
        >
          <div className="w-full overflow-hidden rounded-xl border border-white/12 bg-white/[0.03] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md">
            {/* Terminal bar */}
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 truncate font-mono text-[11px] text-[#9aa3a6] sm:text-xs">
                HtmlParser.java
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

        {/* Live Link Parser */}
        <section aria-label="Try the Link Parser" className="mt-10 sm:mt-14">
          <div className="w-full rounded-xl border border-white/12 bg-white/[0.03] p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-7">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              Try it live
            </h2>
            <p className="mt-1.5 text-sm text-[#c3cbcd]">
              Paste any public URL and the backend will fetch, parse and score it.
            </p>

            <form
              onSubmit={handleAudit}
              className="mt-5 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="url"
                inputMode="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                required
                className="w-full flex-1 rounded-lg border border-white/12 bg-black/30 px-4 py-2.5 font-mono text-sm text-[#e6e9ea] outline-none transition-colors placeholder:text-[#6b7477] focus:border-[#7bd0ff]/60"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-[#7bd0ff]/40 bg-[#7bd0ff]/15 px-5 py-2.5 text-sm font-medium text-[#7bd0ff] transition-colors hover:bg-[#7bd0ff]/25 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading && (
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                )}
                {loading ? "Auditing…" : "Audit"}
              </button>
            </form>

            {error && (
              <p
                role="alert"
                className="mt-4 rounded-lg border border-[#ff5f57]/35 bg-[#ff5f57]/10 px-4 py-2.5 text-sm text-[#ffb3ae]"
              >
                {error}
              </p>
            )}

            {result && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Stat label="HTTP status" value={String(result.httpStatus)} />
                  <Stat
                    label="Response time"
                    value={`${result.responseTime} ms`}
                  />
                  <Stat label="H1 tags" value={String(result.h1Count)} />
                  <Stat
                    label="Images missing alt"
                    value={String(result.imagesMissingAlt)}
                  />
                  <Stat
                    label="Approx. words"
                    value={String(result.approximateWordCount)}
                  />
                </div>

                <div className="space-y-3 rounded-lg border border-white/10 bg-black/25 p-4">
                  <Field label="Page title" value={result.pageTitle} />
                  <Field
                    label="Meta description"
                    value={result.metaDescription}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/25 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.16em] text-[#6b7477]">
        {label}
      </p>
      <p className="mt-1 font-mono text-lg text-[#e6e9ea]">{value}</p>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.16em] text-[#6b7477]">
        {label}
      </p>
      <p className="mt-1 break-words text-sm text-[#c3cbcd]">
        {value && value.trim() ? value : "—"}
      </p>
    </div>
  );
}
