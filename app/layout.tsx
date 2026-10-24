import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { CoordinateCursor } from "@/components/ui/CoordinateCursor";

const dmSerif = DM_Serif_Display({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tausif Raza | Architect & Interior Designer",
  description:
    "Personal portfolio of Tausif Raza — Architect & Interior Designer. Selected architectural works, residential designs, spatial planning, and interior details.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#111210",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${manrope.variable} h-full antialiased scroll-smooth dark`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-text-primary font-sans overflow-x-clip selection:bg-accent/25 selection:text-text-primary">
        <CoordinateCursor />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
