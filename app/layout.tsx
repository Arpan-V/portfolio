import "./globals.css";


import {
  Manrope,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";

import type { Metadata, Viewport } from "next";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-manrope",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Arpan Verma | Software Engineer",
    template: "%s | Arpan Verma",
  },

  description:
    "Arpan Verma is a Software Engineer focused on building scalable, reliable backend systems and modern web applications.",

  openGraph: {
    title: "Arpan Verma | Software Engineer",
    description:
      "Software Engineer focused on building scalable, reliable backend systems and modern web applications.",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#050b18",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
  lang="en"
  className={`
    dark
    ${manrope.variable}
    ${spaceGrotesk.variable}
    ${jetbrainsMono.variable}
  `}
>
  <body className="antialiased">
    <Navbar />
    <main>{children}</main>
    <Footer />
  </body>
</html>
  );
}