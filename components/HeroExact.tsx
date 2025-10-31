'use client';
import Image from 'next/image';
import Link from 'next/link';
import ConnectButton from '@/components/ConnectButton';

export default function HeroExact() {
  return (
    <section className="relative overflow-hidden">
      {/* градиентный фон секции; звёзды будут СНИЗУ, из layout */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_15%_20%,#134a9f_0%,transparent_60%),radial-gradient(1200px_600px_at_85%_70%,#b6203b_0%,transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(#0000,#0003)]" />

      <div className="container mx-auto px-5 pt-28 pb-10 text-center">
        <div className="mx-auto mb-6 h-14 w-14 relative">
          <Image src="/logo.svg" alt="USATether" fill className="object-contain" />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
          The <span className="text-[#1AA5FF] drop-shadow">American</span><br/> Web Wallet
        </h1>

        <p className="mt-8 text-3xl sm:text-4xl font-extrabold">
          USAT <span className="align-[-1px] opacity-90">↔</span> USDT Bridge
        </p>

        <p className="mt-3 text-base sm:text-lg text-white/80">
          Built for the U.S. market — secure, compliant, and beautifully
        </p>

        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link href="/bridge" className="btn btn-blue shadow-lg px-6 py-3 rounded-2xl">
            <span>Launch Bridge</span> <span aria-hidden>→</span>
          </Link>
          <ConnectButton />
        </div>
      </div>

      {/* 4 плитки */}
      <div className="container mx-auto px-5 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/swap" className="block soft-card hover:border-white/25 transition">
            <div className="text-lg font-semibold mb-1">Swap</div>
            <div className="text-white/70 text-sm">Simple token swaps with clear fees and finality.</div>
          </Link>
          <Link href="/bridge" className="block soft-card hover:border-white/25 transition">
            <div className="text-lg font-semibold mb-1">Bridge</div>
            <div className="text-white/70 text-sm">Move value between USAT and USDT with confidence.</div>
          </Link>
          <Link href="/buy" className="block soft-card hover:border-white/25 transition">
            <div className="text-lg font-semibold mb-1">Buy</div>
            <div className="text-white/70 text-sm">USD → crypto on-ramp (coming soon). Self-custody only.</div>
          </Link>
          <Link href="/faq" className="block soft-card hover:border-white/25 transition">
            <div className="text-lg font-semibold mb-1">FAQ</div>
            <div className="text-white/70 text-sm">Compliance & security answers.</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
