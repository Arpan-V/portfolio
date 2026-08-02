import "./globals.css";
import PersonSchema from "@/components/ui/PersonSchema";

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

    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Arpan Verma - Software Engineer",
      },
    ],
  },

  twitter: {
  card: "summary_large_image",
  title: "Arpan Verma | Software Engineer",
  description:
    "Software Engineer focused on building scalable, reliable backend systems and modern web applications.",
  images: ["/images/og-image.png"],
},

  // Add this when you have your final domain.
  alternates: {
    canonical: "https://arpanverma.vercel.app/",
  },

  // Add this when you have your final domain.
  metadataBase: new URL("https://arpanverma.vercel.app/"),
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
    <PersonSchema />
    <Navbar />
    <main>{children}</main>
    <Footer />
  </body>
</html>
  );
}