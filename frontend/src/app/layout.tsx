// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { PROFILE } from "@/data/profile";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ViewCounter from "@/components/ui/ViewCounter";

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PROFILE.name,
  url: PROFILE.url,
  image: new URL(PROFILE.image, PROFILE.url).toString(),
  jobTitle: PROFILE.role,
  description: PROFILE.description,
  email: PROFILE.email,
  affiliation: {
    "@type": "EducationalOrganization",
    name: PROFILE.education,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.url),
  title: `${PROFILE.name} | ${PROFILE.role} | Portfolio`,
  description: PROFILE.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: PROFILE.url,
    siteName: PROFILE.name,
    title: `${PROFILE.name} | ${PROFILE.role}`,
    description: PROFILE.description,
    images: [
      {
        url: PROFILE.image,
        width: 848,
        height: 1272,
        alt: `${PROFILE.name}, ${PROFILE.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} | ${PROFILE.role}`,
    description: PROFILE.description,
    images: [PROFILE.image],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
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
