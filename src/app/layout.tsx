import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Marvel Rivals | Guides, Agents, Maps, Leaderboards",
    template: "%s | Marvel Rivals HQ",
  },
  description: "The ultimate Marvel Rivals hub: tier lists, builds, map strategies, patch summaries, and live leaderboards. Updated every season.",
  keywords: [
    "Marvel Rivals tier list",
    "best duelist build",
    "map strategies",
    "ranked guide",
    "team-up combos",
    "Marvel Rivals guides",
    "agent builds",
    "competitive gaming"
  ],
  authors: [{ name: "Marvel Rivals HQ" }],
  creator: "Marvel Rivals HQ",
  metadataBase: new URL("https://marvelrivalshq.com"),
  icons: {
    icon: [
      { url: "/logo.png", sizes: "any" },
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/logo.png"],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marvelrivalshq.com",
    siteName: "Marvel Rivals HQ",
    title: "Marvel Rivals | Guides, Agents, Maps, Leaderboards",
    description: "The ultimate Marvel Rivals hub: tier lists, builds, map strategies, patch summaries, and live leaderboards. Updated every season.",
    images: [
      {
        url: "/og-logo.png",
        width: 1200,
        height: 630,
        alt: "Marvel Rivals HQ"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Marvel Rivals | Guides, Agents, Maps, Leaderboards",
    description: "The ultimate Marvel Rivals hub: tier lists, builds, map strategies, patch summaries, and live leaderboards. Updated every season.",
    creator: "@marvelrivalshq",
    images: ["/og-logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Marvel Rivals HQ",
    "url": "https://marvelrivalshq.com",
    "logo": "https://marvelrivalshq.com/og-logo.png",
    "sameAs": [
      "https://x.com/marvelrivalshq",
      "https://www.youtube.com/@marvelrivalshq"
    ],
    "description": "The ultimate Marvel Rivals hub for guides, tier lists, and competitive insights"
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
