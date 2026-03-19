import type { Metadata } from "next";
import Generator from "@/components/Generator";

export const metadata: Metadata = {
  title: "CommitCraft·AI – AI commit message generator",
  description:
    "Paste a git diff or describe your changes. AI writes a perfect conventional commit message in seconds. Free, no account needed.",
  openGraph: {
    title: "CommitCraft·AI – AI commit message generator",
    description: "Paste a git diff or describe your changes and get a perfect commit message in seconds.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <span className="text-lg font-bold text-white">
            CommitCraft<span className="text-amber-400">·AI</span>
          </span>
          <span className="text-sm text-gray-500">3 free · BYOK unlimited</span>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Commit messages in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              seconds
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Paste a git diff or describe your changes. AI generates a perfect commit message
            following conventional commits, Angular, or simple format.
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
            className="text-amber-400 hover:text-amber-300 transition-colors"
          >
            Claude AI
          </a>
          {" · "}
          Your code is never stored
        </p>
        <div className="mt-3">
          <a
            href="https://buymeacoffee.com/aiworks"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-yellow-500 text-gray-900 text-xs font-medium hover:bg-yellow-400 transition-colors"
          >
            ☕ Support this project
          </a>
        </div>
      </footer>
    </main>
  );
}
