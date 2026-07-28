import type { Metadata } from "next";
import "./globals.css";

import { Manrope, Space_Grotesk, JetBrains_Mono, Geist, Geist_Mono } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-manrope",
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
  title: "Arpan Verma",
  description:"Software Engineer building scalable, reliable systems with a focus on architectural integrity."};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark
${manrope.variable}
${spaceGrotesk.variable}
${jetbrainsMono.variable}
${geistSans.variable}
${geistMono.variable}
`}
    >
      <body>{children}</body>
    </html>
  );
}