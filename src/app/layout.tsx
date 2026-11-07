import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "starnight // пентестер & веб-разработчик",
  description:
    "Начинающий пентестер и создатель сайтов. Проекты, ИИ-помощник Capri, контакты. Debian 13 · KDE Plasma 6.",
  keywords: [
    "starnight",
    "пентест",
    "веб-разработчик",
    "портфолио",
    "Capri AI",
    "Debian 13",
    "KDE Plasma 6",
  ],
  authors: [{ name: "starnight" }],
  openGraph: {
    title: "starnight // пентестер & веб-разработчик",
    description:
      "Начинающий пентестер и создатель сайтов. Debian 13 · KDE Plasma 6 · Capri AI.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
