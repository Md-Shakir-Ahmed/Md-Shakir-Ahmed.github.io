import type { Metadata } from "next";
import "./globals.css";

// ─── Font Configuration ──────────────────────────────────
// Display/Body: Inter (clean, modern readability — Awwwards standard)
// Fallback Body: Space Grotesk (Google Fonts, self-hosted by Next.js)
// Mono: JetBrains Mono (code snippets, metrics, terminal labels ONLY)

// ─── SEO Metadata ────────────────────────────────────────
export const metadata: Metadata = {
  title: "Md. Shakir Ahmed — Distributed Systems & API Infrastructure Engineer",
  description:
    "Portfolio of Md. Shakir Ahmed — Distributed Systems & High-Throughput API Engineer. Architecting fault-tolerant infrastructure, zero-trust microservices, and high-concurrency cloud pipelines.",
  keywords: [
    "Md. Shakir Ahmed",
    "Backend Software Engineer",
    "Distributed Systems Engineer",
    "API Infrastructure",
    "Laravel Developer",
    "PHP Developer",
    "FastAPI Developer",
    "SaaS Developer",
    "Identity SSO",
    "Microservices",
    "Zero-Trust Architecture",
  ],
  authors: [{ name: "Md. Shakir Ahmed" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Md. Shakir Ahmed — Distributed Systems & API Infrastructure Engineer",
    description:
      "Architecting fault-tolerant infrastructure, zero-trust microservices, and high-concurrency cloud pipelines.",
    siteName: "SHUV0 / SYSTEM",
    locale: "en_US",
    images: [
      {
        url: "https://md-shakir-ahmed.github.io/portfolio/shakir-ahmed.png",
        width: 1024,
        height: 1365,
        alt: "Md. Shakir Ahmed — Distributed Systems & API Infrastructure Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Md. Shakir Ahmed — Distributed Systems & API Infrastructure Engineer",
    description:
      "Architecting fault-tolerant infrastructure, zero-trust microservices, and high-concurrency cloud pipelines.",
    images: ["https://md-shakir-ahmed.github.io/portfolio/shakir-ahmed.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Clash Display from Fontshare */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700,800&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `:root { --font-clash-display: 'Clash Display', sans-serif; --font-inter: 'Inter', sans-serif; --font-space-grotesk: 'Space Grotesk', sans-serif; --font-jetbrains-mono: 'JetBrains Mono', monospace; }`,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Person",
                  "@id": "#shakir",
                  name: "Md. Shakir Ahmed",
                  image: "https://md-shakir-ahmed.github.io/portfolio/shakir-ahmed.png",
                  jobTitle: "Distributed Systems & API Infrastructure Engineer",
                  description:
                    "Distributed Systems & High-Throughput API Engineer. Architecting fault-tolerant infrastructure, zero-trust microservices, and high-concurrency cloud pipelines.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Rajshahi",
                    addressCountry: "Bangladesh",
                  },
                  email: "shuvocsevu231@gmail.com",
                  sameAs: [
                    "https://www.linkedin.com/in/md-shakir-ahmed-shuvo-047129218/",
                    "https://github.com/Md-Shakir-Ahmed",
                  ],
                  worksFor: {
                    "@type": "Organization",
                    name: "Varendra University",
                  },
                  alumniOf: [
                    {
                      "@type": "CollegeOrUniversity",
                      name: "Varendra University",
                    },
                    {
                      "@type": "CollegeOrUniversity",
                      name: "Rajshahi University",
                    },
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "#website",
                  name: "SHUV0 / SYSTEM — Md. Shakir Ahmed",
                  description:
                    "The interactive engineering portfolio of Md. Shakir Ahmed.",
                  inLanguage: "en",
                },
                {
                  "@type": "ProfilePage",
                  "@id": "#profile",
                  mainEntity: { "@id": "#shakir" },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased grain-overlay">
        {/* Skip to content — accessibility */}
        <a href="#hero" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
