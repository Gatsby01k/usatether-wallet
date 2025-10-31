// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "./providers";
import Starfield from "@/components/Starfield";

export const metadata: Metadata = {
  title: "USATether Wallet — American Web Wallet",
  description: "Swap, Bridge, Buy, FAQ. Built for the U.S. market.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A1B34] text-white">
        {/* Звёзды — глобально, над градиентами секций, но под контентом */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-70">
          <Starfield />
        </div>

        {/* Весь контент выше звёзд */}
        <div className="relative z-10">
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  );
}
