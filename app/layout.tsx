// app/layout.tsx — финальная версия (глобальные звёзды, метаданные, SEO и чистый контент)

import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import Starfield from "@/components/Starfield";

export const metadata: Metadata = {
  metadataBase: new URL("https://usatether.io"),
  title: "USATether Wallet — Simple, fast & secure stablecoin wallet",
  description:
    "USATether Wallet: a clean, professional web wallet for USAT & stablecoins. Connect MetaMask, swap, bridge, and manage assets easily.",
  openGraph: {
    title: "USATether Wallet",
    description:
      "A professional, minimal web wallet for USAT & stablecoins (MVP).",
    url: "https://usatether.io",
    siteName: "USATether Wallet",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "USATether Wallet — Awwwards-Style Interface",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "USATether Wallet",
    description: "Fast, clean, and secure stablecoin wallet for the U.S. market.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A1428] text-white antialiased min-h-screen relative overflow-x-hidden">
        {/* ======= Глобальный фон со звёздами ======= */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-70">
          <Starfield />
        </div>

        {/* ======= Основной контент поверх ======= */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Providers>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
