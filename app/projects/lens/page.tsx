"use client";

import { useState, type FormEvent } from "react";

type AuditResult = {
  url?: string;
  httpStatus?: number;
  responseTime?: number;
  pageTitle?: string;
  metaDescription?: string;
  metaDescriptionLength?: number;
  h1Count?: number;
  imagesMissingAlt?: string[];
  totalImages?: number;
  totalLinks?: number;
  internalLinks?: number;
  externalLinks?: number;
  brokenLinks?: string[];
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

export default function LensPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AuditResult | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Please enter a URL.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`${BACKEND_URL}/api/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: trimmed }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const data = (await res.json()) as AuditResult;
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
    <main className="min-h-screen bg-[#101415] px-5 py-16 text-[#e6e9ea] sm:px-8 lg:px-12 lg:py-24">
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#7bd0ff]">
          Project
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Lens <span className="text-[#7bd0ff]">Link Parser</span>
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#9aa3a6] sm:text-base">
          Lens fetches any public web page and returns a structured audit of it —
          response health, page metadata, heading structure, image alt coverage
          and link breakdown. Paste a URL below and it runs the audit against the
          backend service in real time.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="text"
            inputMode="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            maxLength={2048}
            className="w-full flex-1 rounded-xl border border-white/10 bg-[#1d2022] px-4 py-3 text-sm text-[#e6e9ea] outline-none transition-colors placeholder:text-[#6b7477] focus:border-[#7bd0ff]/60 sm:text-base"
          />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#7bd0ff] px-6 py-3 text-sm font-semibold text-[#0b0e0f] transition-transform duration-100 hover:bg-[#9adcff] active:translate-y-[2px] disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0b0e0f]/30 border-t-[#0b0e0f]" />
            )}
            {loading ? "Analyzing" : "Analyze"}
          </button>
        </form>

        {error && (
          <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        {/* Results */}
        {result && (
          <section className="mt-12 space-y-6">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              <Stat label="Status" value={result.httpStatus ?? "—"} />
              <Stat
                label="Response"
                value={
                  result.responseTime != null ? `${result.responseTime} ms` : "—"
                }
              />
              <Stat label="H1 tags" value={result.h1Count ?? "—"} />
              <Stat label="Images" value={result.totalImages ?? "—"} />
            </div>

            <Panel title="Page metadata">
              <Row label="URL" value={result.url ?? "—"} />
              <Row label="Title" value={result.pageTitle || "Not found"} />
              <Row
                label="Meta description"
                value={result.metaDescription || "Not found"}
              />
              <Row
                label="Meta length"
                value={
                  result.metaDescriptionLength != null
                    ? `${result.metaDescriptionLength} characters`
                    : "—"
                }
              />
            </Panel>

            <div className="grid gap-6 lg:grid-cols-2">
              <Panel title="Links">
                <Row label="Total" value={result.totalLinks ?? "—"} />
                <Row label="Internal" value={result.internalLinks ?? "—"} />
                <Row label="External" value={result.externalLinks ?? "—"} />
                <Row label="Broken" value={result.brokenLinks?.length ?? 0} />
              </Panel>

              <Panel
                title={`Images missing alt (${result.imagesMissingAlt?.length ?? 0})`}
              >
                {result.imagesMissingAlt?.length ? (
                  <ul className="space-y-2">
                    {result.imagesMissingAlt.map((src) => (
                      <li
                        key={src}
                        className="truncate text-xs text-[#9aa3a6] sm:text-sm"
                      >
                        {src}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[#9aa3a6]">
                    Every image has an alt attribute.
                  </p>
                )}
              </Panel>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0f172a] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[#6b7477]">
        {label}
      </p>
      <p className="mt-2 text-xl font-semibold text-[#7bd0ff] sm:text-2xl">
        {value}
      </p>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-5 sm:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#e6e9ea]">
        {title}
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/5 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:gap-4">
      <span className="w-40 shrink-0 text-xs uppercase tracking-[0.14em] text-[#6b7477]">
        {label}
      </span>
      <span className="break-all text-sm text-[#e6e9ea]">{value}</span>
    </div>
  );
}
