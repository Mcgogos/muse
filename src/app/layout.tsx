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
      <body className="antialiased">
        {/* Grain Layer */}
        <div className="film-grain"></div>
        {children}
      </body>
    </html>
  );
}
