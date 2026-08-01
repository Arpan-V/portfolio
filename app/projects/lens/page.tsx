"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type AuditResult = {
  httpStatus: number;
  responseTime: number;
  pageTitle: string;
  metaDescription: string;
  h1Count: number;
  imagesMissingAlt: number;
  approximateWordCount: number;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

/**
 * Validates and normalizes a user-entered link.
 * Rejects: empty, whitespace-only, missing/invalid host, non-http(s)
 * protocols, hosts without a dot (e.g. "localhost" typos like "https://foo"),
 * and anything the URL parser cannot understand.
 */
function normalizeUrl(raw: string): { url: string } | { error: string } {
  const input = raw.trim();
  if (!input) return { error: "Enter a URL to audit." };
  if (/\s/.test(input)) return { error: "URL cannot contain spaces." };

  // Allow bare domains by defaulting to https://
  const withProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(input)
    ? input
    : `https://${input}`;

  let parsed: URL;
  try {
    parsed = new URL(withProtocol);
  } catch {
    return { error: "That doesn't look like a valid URL." };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { error: "Only http:// and https:// URLs are supported." };
  }

  const host = parsed.hostname;
  if (!host) return { error: "URL is missing a domain." };

  // Must be a real domain: label.tld, with a valid TLD of 2+ letters.
  const isDomain = /^(?!-)[a-z\d-]{1,63}(?<!-)(\.(?!-)[a-z\d-]{1,63}(?<!-))*\.[a-z]{2,}$/i.test(host);
  const isIPv4 = /^(\d{1,3}\.){3}\d{1,3}$/.test(host);
  if (!isDomain && !isIPv4) {
    return { error: "Enter a complete domain, e.g. https://example.com" };
  }
  if (isIPv4 && host.split(".").some((o) => Number(o) > 255)) {
    return { error: "That IP address isn't valid." };
  }

  return { url: parsed.toString() };
}

export default function LensPage() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const checked = normalizeUrl(url);
    if ("error" in checked) {
      setError(checked.error);
      return;
    }
    if (!BACKEND_URL) {
      setError("Backend URL is not configured. Set NEXT_PUBLIC_BACKEND_URL.");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${BACKEND_URL.replace(/\/$/, "")}/api/audit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: checked.url }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.message || `Request failed (${res.status})`);
        return;
      }
      setResult(data as AuditResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
    } finally {
      setLoading(false);
    }
  }

  const statusOk = result ? result.httpStatus >= 200 && result.httpStatus < 400 : false;
  const metaLen = result?.metaDescription?.length ?? 0;
  const metaOk = metaLen >= 50 && metaLen <= 160;

  return (
    <main className="min-h-screen bg-[#0b0e0f] px-5 py-16 text-[#e6e9ea] sm:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <header className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[#7bd0ff]">Project — Lens</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Link Parser
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-[#9aa3a6] sm:text-base">
            Paste any URL and get an instant SEO snapshot — HTTP status, response time, page
            title, meta description, heading count, images missing alt text, and approximate
            word count.
          </p>
        </header>

        {/* Input */}
        <form
          onSubmit={onSubmit}
          noValidate
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-stretch"
        >
          <div className="flex-1">
            <input
              type="text"
              inputMode="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              disabled={loading}
              placeholder="https://example.com"
              aria-invalid={!!error}
              aria-describedby={error ? "url-error" : undefined}
              className={`w-full rounded-lg border bg-[#1d2022] px-4 py-3 text-sm font-medium text-[#e6e9ea] outline-none transition-colors placeholder:text-[#6b7477] focus:border-[#7bd0ff] disabled:opacity-60 ${
                error ? "border-[#ff6b6b]" : "border-white/10"
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#7bd0ff] px-6 py-3 text-sm font-semibold text-[#0b0e0f] transition-transform active:translate-y-[2px] disabled:opacity-60"
          >
            {loading ? "Analyzing…" : "Audit"}
          </button>
        </form>

        {error && (
          <p id="url-error" className="mt-3 text-sm text-[#ff6b6b]">
            {error}
          </p>
        )}

        {/* Results */}
        {result && (
          <section className="mt-12 space-y-6">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 lg:grid-cols-4">
              <StatCell label="HTTP Status">
                <span className={statusOk ? "text-[#7bd0ff]" : "text-[#ff6b6b]"}>
                  {result.httpStatus}
                </span>
              </StatCell>
              <StatCell label="Response Time">
                {result.responseTime}
                <span className="ml-1 text-sm text-[#6b7477]">ms</span>
              </StatCell>
              <StatCell label="Word Count">
                {result.approximateWordCount.toLocaleString()}
              </StatCell>
              <StatCell label="H1 Count">{result.h1Count}</StatCell>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-[#0f172a] p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.14em] text-[#6b7477]">
                    Missing Alt Text
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      result.imagesMissingAlt === 0 ? "text-[#7bd0ff]" : "text-[#f5b544]"
                    }`}
                  >
                    {result.imagesMissingAlt === 0 ? "Clean" : "Warning"}
                  </span>
                </div>
                <p className="mt-3 text-2xl font-semibold">
                  {result.imagesMissingAlt}
                  <span className="ml-1 text-sm text-[#6b7477]">images</span>
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-[#0f172a] p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs uppercase tracking-[0.14em] text-[#6b7477]">
                    Meta Length
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      metaOk ? "text-[#7bd0ff]" : "text-[#f5b544]"
                    }`}
                  >
                    {metaOk ? "Optimal" : metaLen === 0 ? "Missing" : "Off-range"}
                  </span>
                </div>
                <p className="mt-3 text-2xl font-semibold">
                  {metaLen}
                  <span className="ml-1 text-sm text-[#6b7477]">chars</span>
                </p>
              </div>
            </div>

            <div className="space-y-4 rounded-xl border border-white/10 bg-[#0f172a] p-5">
              <Row label="Page Title" value={result.pageTitle || "—"} />
              <Row label="Meta Description" value={result.metaDescription || "—"} />
            </div>
          </section>
        )}

        {/* Footer status pill */}
        <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0f172a] px-4 py-2">
          <span
            className={`h-2 w-2 rounded-full ${
              loading ? "bg-[#f5b544]" : result ? "bg-[#7bd0ff]" : "bg-[#6b7477]"
            }`}
          />
          <span className="text-xs text-[#9aa3a6]">
            {loading ? "Analyzing" : result ? "Analysis complete" : "System ready"}
          </span>
        </div>
      </div>
    </main>
  );
}

function StatCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="bg-[#0f172a] p-5">
      <p className="text-xs uppercase tracking-[0.14em] text-[#6b7477]">{label}</p>
      <p className="mt-2 text-2xl font-semibold sm:text-3xl">{children}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/5 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:gap-4">
      <span className="w-40 shrink-0 text-xs uppercase tracking-[0.14em] text-[#6b7477]">
        {label}
      </span>
      <span className="break-all text-sm text-[#e6e9ea]">{value}</span>
    </div>
  );
}
