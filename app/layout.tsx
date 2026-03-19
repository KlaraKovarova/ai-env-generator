import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://ai-env-generator.vercel.app"
  ),
  title: "EnvGen·AI – AI .env File Generator",
  description:
    "Paste your code or describe your stack. AI generates a complete .env.example with all required variables, sensible defaults, and inline docs. Free, no account needed.",
  keywords: [
    ".env generator",
    "env file generator",
    "ai environment variables",
    "dotenv generator",
    "environment configuration",
    "twelve-factor app",
  ],
  openGraph: {
    title: "EnvGen·AI – AI .env File Generator",
    description:
      "Paste your code or describe your stack and get a complete .env.example in seconds. Powered by Claude AI.",
    type: "website",
    url: "/",
    siteName: "EnvGen·AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "EnvGen·AI – AI .env File Generator",
    description:
      "Paste your code or describe your stack and get a complete .env.example in seconds. Powered by Claude AI.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "EnvGen·AI",
              description:
                "AI .env file generator. Paste your code or describe your stack to get a complete .env.example with sensible defaults.",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                ".env.example generation",
                "Variable documentation",
                "Sensible defaults",
                "Multi-framework support",
                "Security best practices",
              ],
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
