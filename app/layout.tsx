import type { Metadata } from "next";
import "./globals.css";


import {
  Manrope,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google";

import Navbar from "./Navbar";
import Footer from "./Footer2";

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
    default: "Arpan Verma",
    template: "%s | Arpan Verma",
  },
  description:
    "Software Engineer building scalable, reliable systems with a focus on architectural integrity.",
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