"use client";

import { useState, useCallback } from "react";
import { DEMO_INPUT, DEMO_OUTPUT } from "@/lib/demo";

const STORAGE_KEY = "env_gen_usage";
const FREE_LIMIT = 3;

function getUsage(): number {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(STORAGE_KEY) ?? "0", 10);
}

function incrementUsage(): number {
  const next = getUsage() + 1;
  localStorage.setItem(STORAGE_KEY, String(next));
  return next;
}

function copyText(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

export default function Generator() {
  const [input, setInput] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [showByok, setShowByok] = useState(false);
  const [output, setOutput] = useState("");
  const [isDemo, setIsDemo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [usage, setUsage] = useState<number | null>(null);

  const generate = useCallback(
    async (overrideInput?: string) => {
      const target = (overrideInput ?? input).trim();
      if (!target) return;

      const currentUsage = getUsage();
      if (currentUsage >= FREE_LIMIT && !apiKey.trim()) {
        setShowUpgrade(true);
        return;
      }

      setLoading(true);
      setError("");
      setOutput("");
      setIsDemo(false);
      setCopied(false);

      try {
        const body: { input: string; apiKey?: string } = { input: target };
        if (apiKey.trim()) body.apiKey = apiKey.trim();

        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const data = (await res.json()) as {
          output?: string;
          error?: string;
          demo?: boolean;
        };

        if (!res.ok) throw new Error(data.error ?? "Generation failed");

        setOutput(data.output ?? "");
        setIsDemo(data.demo ?? false);
        const newUsage = incrementUsage();
        setUsage(newUsage);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [input, apiKey]
  );

  function tryDemo() {
    setInput(DEMO_INPUT);
    generate(DEMO_INPUT);
  }

  function handleCopy() {
    copyText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = ".env.example";
    a.click();
    URL.revokeObjectURL(url);
  }

  const usageCount = usage ?? getUsage();
  const remaining = Math.max(0, FREE_LIMIT - usageCount);

  return (
    <>
      {/* Upgrade overlay */}
      {showUpgrade && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-sm w-full shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2">Free limit reached</h2>
            <p className="text-gray-400 text-sm mb-6">
              You&apos;ve used all 3 free generations. Use your own Anthropic API key for unlimited
              generations — it&apos;s free to get one and your key is never stored.
            </p>
            <a
              href="https://console.anthropic.com/account/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-cyan-600 hover:bg-cyan-500 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors mb-3"
            >
              Get a free API key →
            </a>
            <button
              onClick={() => {
                setShowUpgrade(false);
                setShowByok(true);
              }}
              className="w-full bg-gray-800 hover:bg-gray-700 text-gray-300 py-2.5 rounded-xl font-semibold text-sm transition-colors mb-3"
            >
              I have a key — enter it
            </button>
            <button
              onClick={() => setShowUpgrade(false)}
              className="w-full text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Demo showcase */}
      <div className="mb-12">
        <div className="text-center mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400">
            See it in action
          </span>
          <h2 className="text-xl font-semibold text-white mt-1">
            package.json → complete .env.example
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Paste any code snippet or describe your stack — AI detects every service and env var.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl overflow-hidden border border-gray-800">
          {/* Left: input */}
          <div className="bg-gray-900 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-xs text-gray-500 ml-2 font-mono">package.json</span>
            </div>
            <pre className="text-xs text-gray-400 font-mono leading-relaxed overflow-auto max-h-72 whitespace-pre">
              {DEMO_INPUT}
            </pre>
          </div>

          {/* Right: output */}
          <div className="bg-gray-900 border-l border-gray-800 p-5 flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono text-gray-500">.env.example</span>
              <span className="ml-auto text-xs bg-cyan-900/60 text-cyan-300 px-2 py-0.5 rounded-full">
                AI generated
              </span>
            </div>
            <pre className="text-xs text-gray-300 font-mono leading-relaxed overflow-auto max-h-72 whitespace-pre-wrap flex-1">
              {DEMO_OUTPUT.slice(0, 600)}…
            </pre>
            <button
              onClick={tryDemo}
              disabled={loading}
              className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-2.5 rounded-xl font-semibold text-sm transition-colors"
            >
              {loading ? "Generating…" : "Try it — generate full .env.example →"}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Input */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <label className="block text-sm text-gray-400 mb-2" htmlFor="stack-input">
            Paste your code or describe your stack
          </label>
          <textarea
            id="stack-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Paste package.json, docker-compose.yml, config files, or describe your stack:\n\n"Next.js app with Postgres, Stripe payments, NextAuth with Google OAuth, Resend email, and Redis cache"`}
            rows={8}
            className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-600 transition-colors text-sm font-mono resize-y"
            spellCheck={false}
          />

          <div className="flex items-center justify-between mt-3">
            <p className="text-xs text-gray-600">
              {remaining > 0
                ? `${remaining} free generation${remaining !== 1 ? "s" : ""} remaining`
                : "Free limit reached — "}
              {remaining === 0 && !apiKey.trim() && (
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                >
                  use your own API key
                </button>
              )}
            </p>
            <button
              onClick={() => generate()}
              disabled={loading || !input.trim()}
              className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-colors whitespace-nowrap flex items-center gap-2"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating…
                </>
              ) : (
                "Generate .env.example"
              )}
            </button>
          </div>

          {/* BYOK */}
          <div className="mt-4 border-t border-gray-800 pt-4">
            <button
              type="button"
              onClick={() => setShowByok((v) => !v)}
              className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1.5 transition-colors"
            >
              <span className={`transition-transform ${showByok ? "rotate-90" : ""}`}>▶</span>
              Use your own Anthropic API key (unlimited, free)
            </button>

            {showByok && (
              <div className="mt-3 space-y-2">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="sk-ant-…"
                  autoComplete="off"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-cyan-600 transition-colors text-sm font-mono"
                />
                <p className="text-xs text-gray-600 leading-relaxed">
                  Your key is used only for this request — never logged, stored, or shared.
                  Get a free key at{" "}
                  <a
                    href="https://console.anthropic.com/account/keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2"
                  >
                    console.anthropic.com
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-950 border border-red-800 rounded-xl px-4 py-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Output */}
        {output && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-300">.env.example</span>
                {isDemo && (
                  <span className="text-xs bg-amber-900/60 text-amber-300 border border-amber-700/50 px-2 py-0.5 rounded-full">
                    Demo · add API key to generate from your stack
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
                <button
                  onClick={handleDownload}
                  className="text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-1.5 rounded-lg transition-colors"
                >
                  ↓ .env.example
                </button>
              </div>
            </div>
            <textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="w-full bg-transparent text-gray-300 font-mono text-xs leading-relaxed p-6 min-h-[500px] resize-y focus:outline-none"
              spellCheck={false}
            />
          </div>
        )}

        {/* Cross-promote other tools */}
        <div className="border border-gray-800 rounded-2xl p-6 bg-gray-900/50">
          <p className="text-xs text-gray-500 mb-3 font-medium uppercase tracking-wider">
            More AI developer tools
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://readme-gen.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-400 hover:text-indigo-300 bg-indigo-950/50 border border-indigo-800/50 px-3 py-1.5 rounded-lg transition-colors"
            >
              ReadmeGen — AI README generator
            </a>
            <a
              href="https://codereview-ai.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-violet-400 hover:text-violet-300 bg-violet-950/50 border border-violet-800/50 px-3 py-1.5 rounded-lg transition-colors"
            >
              CodeReview·AI — instant code review
            </a>
            <a
              href="https://testgen-ai.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-emerald-400 hover:text-emerald-300 bg-emerald-950/50 border border-emerald-800/50 px-3 py-1.5 rounded-lg transition-colors"
            >
              TestGen·AI — unit test generator
            </a>
            <a
              href="https://commitcraft-ai.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-amber-400 hover:text-amber-300 bg-amber-950/50 border border-amber-800/50 px-3 py-1.5 rounded-lg transition-colors"
            >
              CommitCraft·AI — commit message generator
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
