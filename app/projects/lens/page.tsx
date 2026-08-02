"use client";

import { useState } from "react";
import CodeTypewriter from "@/components/ui/CodeTypewriter";

/**
 * Backend endpoint for the Link Parser audit.
 * Set NEXT_PUBLIC_API_BASE_URL in .env.local (e.g. https://api.example.com).
 */
const API_BASE =
  (typeof process !== "undefined" ? process.env["NEXT_PUBLIC_API_BASE_URL"] : "") ?? "";
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

export default function LensPage() {
  // Link Parser form state
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResponse | null>(null);

  async function handleAudit(e: React.FormEvent) {
    e.preventDefault();
    let trimmed = url.trim();
    if (!trimmed) {
      setError("Please enter a URL.");
      return;
    }
    // Strip protocol (and any leading www.) to inspect the bare domain.
    const withoutProtocol = trimmed.replace(/^https?:\/\//i, "").replace(/^www\./i, "");
    // A bare domain must contain a dot (e.g. "google.com") — "google" alone is invalid.
    const hostPart = withoutProtocol.split("/")[0] ?? "";
    if (!hostPart || !hostPart.includes(".") || hostPart.startsWith(".") || hostPart.endsWith(".")) {
      setError("Please enter a valid URL (e.g. example.com).");
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
          <h1 className="mt-6 text-3xl font-bold text-[#7bd0ff] tracking-tight sm:text-4xl lg:text-5xl">
            Link <span className="text-silver">Parser</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#c3cbcd] sm:text-base">
            A Spring Boot service that fetches any URL and returns an instant SEO
            snapshot — HTTP status, response time, page title, meta description,
            H1 count, images missing alt text and approximate word count. Below is
            the core HTML parsing component, written live.
          </p>
          <a
            href="https://github.com/Arpan-V/link-parser-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-6 inline-flex items-center gap-2 rounded-lg border border-white/12 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#c3cbcd] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors hover:border-[#7bd0ff]/45 hover:bg-[#7bd0ff]/10 hover:text-[#7bd0ff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7bd0ff]/60 sm:text-xs"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
            </svg>
            View on GitHub
            <svg
              viewBox="0 0 24 24"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
        </header>

        {/* Transparent fixed-size code panel */}
        <CodeTypewriter code={CODE} fileName="HtmlParser.java" />

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
                type="text"
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
