import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MUSE CREATIVE HOUSE — Sanat · Medya · Teknoloji",
  description: "MUSE Creative House: Ses, görsel ve dijital deneyimlerin kesiştiği yaratıcı üretim alanı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400;500;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased font-sans">
        {/* Grain Layer */}
        <div className="film-grain"></div>
        {children}
      </body>
    </html>
  );
}
