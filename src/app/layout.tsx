// src/app/layout.tsx
import "./globals.css";
import ThemeProvider from "@/components/theme/ThemeProvider";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Bewket Mengie | Portfolio",
  description: "Full Stack Developer Portfolio",
  icons: {
    icon: "/log2.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body 
        className="bg-(--dark,#09090b) text-(--text,#f3f4f6) antialiased transition-colors duration-300"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Navbar />
          <div className="relative flex min-h-screen flex-col">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}