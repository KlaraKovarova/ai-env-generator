import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CommitCraft·AI – AI commit message generator",
  description:
    "Paste a git diff or describe your changes. AI writes a perfect conventional commit message in seconds. Free, no account needed.",
  openGraph: {
    title: "CommitCraft·AI – AI commit message generator",
    description:
      "Paste a git diff, get a perfect commit message in seconds. Powered by Claude AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
