import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://oyepriyansh.github.io"),
  title: {
    default: "Priyansh Prajapat - Full Stack Developer",
    template: "%s | Priyansh Prajapat",
  },
  description:
    "I'm Priyansh, a 21-year-old self-taught developer from India. I enjoy programming and exploring technology. Check out my projects and connect with me!",
  keywords: [
    "Priyansh Prajapat",
    "Portfolio",
    "Projects",
    "JavaScript",
    "Next.js",
    "Java",
    "Web Developer",
    "Self-taught",
    "Full Stack Developer",
  ],
  authors: [
    { name: "Priyansh Prajapat", url: "https://oyepriyansh.github.io" },
  ],
  creator: "Priyansh Prajapat",
  publisher: "Priyansh Prajapat",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://oyepriyansh.github.io",
    siteName: "Priyansh Prajapat",
    title: "Priyansh Prajapat - Portfolio & Projects",
    description:
      "I'm Priyansh, a 21-year-old self-taught developer from India. I enjoy programming and exploring technology. Check out my projects and connect with me!",
    images: [
      {
        url: "/oyepriyansh.webp",
        width: 1200,
        height: 630,
        alt: "Priyansh Prajapat Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyansh Prajapat - Portfolio & Projects",
    description:
      "I'm Priyansh, a 21-year-old self-taught developer from India. I enjoy programming and exploring technology.",
    creator: "@oyepriyansh",
    images: ["/oyepriyansh.webp"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/oyepriyansh.webp",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="myj1y-SqmBqLO8AY_NO0FObRz-aw77lYXphehryf0tE"
        />
      </head>
      <body className="antialiased">
        <div id="root">{children}</div>
        <GoogleAnalytics gaId="G-LM2B0KC5LB" />
      </body>
    </html>
  );
}
