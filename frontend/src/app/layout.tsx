// // src/app/layout.tsx
// import "./globals.css";
// import type { Metadata, Viewport } from "next";
// import { siteConfig } from "@/lib/site";
// import WebsiteSchema from "@/components/seo/WebsiteSchema";
// import ThemeProvider from "@/components/theme/ThemeProvider";
// import Navbar from "@/components/navbar/Navbar";
// import Footer from "@/components/footer/Footer";
// import ViewCounter from "@/components/ui/ViewCounter";
// import PortfolioPreloader from "@/components/ui/PortfolioPreloader";

// export const metadata: Metadata = {
//   metadataBase: new URL(siteConfig.url),
//   title: {
//     default: siteConfig.title,
//     template: `%s | ${siteConfig.name}`,
//   },
//   description: siteConfig.description,
//   applicationName: `${siteConfig.name} Portfolio`,
//   authors: [{ name: siteConfig.author, url: siteConfig.url }],
//   creator: siteConfig.author,
//   publisher: siteConfig.author,
//   keywords: [...siteConfig.keywords],
//   category: "technology",
//   // No canonical here: it would be inherited by every page. Set it per page.
//   openGraph: {
//     type: "website",
//     locale: "en_US",
//     url: siteConfig.url,
//     siteName: `${siteConfig.name} Portfolio`,
//     title: siteConfig.title,
//     description: siteConfig.description,
//     // image is added automatically from app/opengraph-image.tsx
//   },
//   twitter: {
//     card: "summary_large_image",
//     ...(siteConfig.twitterHandle && {
//       site: siteConfig.twitterHandle,
//       creator: siteConfig.twitterHandle,
//     }),
//     title: siteConfig.title,
//     description: siteConfig.description,
//     // image is added automatically from app/twitter-image.tsx
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//       "max-video-preview": -1,
//     },
//   },
//   verification: {
//     google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
//     other: process.env.NEXT_PUBLIC_BING_VERIFICATION
//       ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
//       : undefined,
//   },
// };

// export const viewport: Viewport = {
//   width: "device-width",
//   initialScale: 1,
//   themeColor: "#09090b",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
//       <body
//         className="bg-(--dark,#09090b) text-(--text,#f3f4f6) antialiased transition-colors duration-300"
//         suppressHydrationWarning
//       >
//         <WebsiteSchema />
//         <ThemeProvider>
//           <PortfolioPreloader />
//           <Navbar />
//           <ViewCounter />
//           <div className="relative flex min-h-screen flex-col">{children}</div>
//           <Footer />
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }




// src/app/layout.tsx
import "./globals.css";
import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/site";
import WebsiteSchema from "@/components/seo/WebsiteSchema";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ViewCounter from "@/components/ui/ViewCounter";
import PortfolioPreloader from "@/components/ui/PortfolioPreloader";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  authors: [{ name: siteConfig.author, url: siteConfig.url }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  keywords: [...siteConfig.keywords],
  category: "technology",
  // No canonical here: it would be inherited by every page. Set it per page.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    // image is added automatically from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    ...(siteConfig.twitterHandle && {
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
    }),
    title: siteConfig.title,
    description: siteConfig.description,
    // image is added automatically from app/twitter-image.tsx
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      // Dark is the default. ThemeProvider applies a saved "light" choice
      // before first paint (useLayoutEffect), so no <script> tag is needed.
      className="dark"
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body
        className="bg-(--dark,#09090b) text-(--text,#f3f4f6) antialiased transition-colors duration-300"
        suppressHydrationWarning
      >
        <WebsiteSchema />
        <ThemeProvider>
          <PortfolioPreloader />
          <Navbar />
          <ViewCounter />
          <div className="relative flex min-h-screen flex-col">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}