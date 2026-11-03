// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import PersonSchema from "@/components/seo/PersonSchema";
import WebsiteSchema from "@/components/seo/WebsiteSchema";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ViewCounter from "@/components/ui/ViewCounter";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s | Bewket Mengie",
  },
  description: siteConfig.description,
  applicationName: "Bewket Mengie Portfolio",
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  keywords: [...siteConfig.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.jobTitle}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/log2.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className="bg-(--dark,#09090b) text-(--text,#f3f4f6) antialiased transition-colors duration-300"
        suppressHydrationWarning
      >
        <PersonSchema />
        <WebsiteSchema />
        <ThemeProvider>
          <Navbar />
          <ViewCounter />
          <div className="relative flex min-h-screen flex-col">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
