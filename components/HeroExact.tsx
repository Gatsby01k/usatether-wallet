
'use client';
import Image from 'next/image';
import Link from 'next/link';
import ConnectButton from '@/components/ConnectButton';

export default function HeroExact() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(1200px_600px_at_15%_20%,#134a9f_0%,transparent_60%),radial-gradient(1200px_600px_at_85%_70%,#b6203b_0%,transparent_60%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(#0000,#0003)]" />

      <div className="container mx-auto px-5 pt-28 pb-16 text-center">
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
    </section>
  );
}
