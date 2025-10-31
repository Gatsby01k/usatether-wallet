// components/HeroExact.tsx — awwwards-стиль, чистый и концентрированный
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, WalletMinimal, Link2 } from "lucide-react";

export default function HeroExact() {
  return (
    <header className="relative z-10">
      <div className="container mx-auto px-6 pt-24 pb-14">
        {/* Лого-значок сверху по центру */}
        <div className="flex justify-center">
          <Image
            src="/logo.svg"
            alt="USATether"
            width={44}
            height={44}
            className="opacity-90"
            priority
          />
        </div>

        {/* Заголовок */}
        <h1 className="mx-auto mt-6 max-w-4xl text-center text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
          The <span className="text-sky-300">American</span> Web Wallet
        </h1>

        <p className="mx-auto mt-4 max-w-3xl text-center text-white/70 text-lg md:text-xl">
          USAT ↔ USDT Bridge. Built for the U.S. market — secure, compliant, and beautifully simple.
        </p>

        {/* CTA */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/bridge"
            className="inline-flex items-center gap-2 rounded-2xl bg-sky-500/90 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-500"
          >
            Launch Bridge <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
            <WalletMinimal className="h-4 w-4 opacity-80" />
            <span className="text-sm">Connect MetaMask</span>
            <span className="text-white/30">•</span>
            <Link2 className="h-4 w-4 opacity-80" />
            <span className="text-sm">WalletConnect</span>
          </div>
        </div>

        {/* Мелкая подпись под CTA */}
        <p className="mt-3 text-center text-xs text-white/50">
          Self-custody only. This site never stores keys.
        </p>
      </div>
    </header>
  );
}
