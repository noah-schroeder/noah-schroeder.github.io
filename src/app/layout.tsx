import type { Metadata } from "next";
import { Inter, DM_Serif_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Noah Lee Schroeder — Educational Technology & AI",
  description:
    "Research Scientist at the University of Florida researching pedagogical agents, multimedia learning, and AI in education.",
  openGraph: {
    title: "Noah Lee Schroeder",
    description: "Educational Technology & AI Researcher — University of Florida",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased font-sans">
        <div className="h-0.5 bg-gradient-to-r from-teal-800 via-teal-400 to-teal-800" />
        <Nav />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
