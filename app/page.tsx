import type { Metadata } from "next";
import Generator from "@/components/Generator";

export const metadata: Metadata = {
  title: "EnvGen·AI – AI .env File Generator",
  description:
    "Paste your code or describe your stack. AI generates a complete .env.example with all required variables, sensible defaults, and docs. Free, no account needed.",
  openGraph: {
    title: "EnvGen·AI – AI .env File Generator",
    description: "Paste your code or describe your stack and get a complete .env.example in seconds.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            EnvGen<span className="text-cyan-400">·AI</span>
          </span>
          <span className="text-sm text-gray-500">3 free · BYOK unlimited</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            .env.example in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">
              seconds
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Paste your package.json, docker-compose, config files, or describe your stack.
            AI generates a complete .env.example with all variables, defaults, and inline docs.
          </p>
        </div>

        <Generator />
      </div>

      <footer className="border-t border-gray-800 py-8 mt-16 text-center text-xs text-gray-600">
        <p>
          Powered by{" "}
          <a
            href="https://anthropic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Claude AI
          </a>
          {" · "}
          Your code is never stored
        </p>
        <div className="mt-3 mb-4 flex items-center justify-center gap-3 flex-wrap">
          <a
            href="https://buymeacoffee.com/aiworks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-yellow-500 text-gray-900 text-xs font-medium hover:bg-yellow-400 transition-colors"
          >
            ☕ Support this project
          </a>
          <a
            href="https://www.binance.com/register?ref=12852887"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-yellow-500/30 text-yellow-500 text-xs font-medium hover:bg-yellow-500/10 transition-colors"
          >
            🪙 Try Binance
          </a>
        </div>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-gray-700">
          <span className="text-gray-800">More AI dev tools:</span>
          <a href="https://readme-gen.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 transition-colors">ReadmeGen</a>
          <a href="https://code-review-ai.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-violet-400 transition-colors">CodeReview·AI</a>
          <a href="https://unit-test-gen.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">TestGen·AI</a>
          <a href="https://commit-msg-gen.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">CommitCraft·AI</a>
        </div>
      </footer>
    </main>
  );
}
