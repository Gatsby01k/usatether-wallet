'use client';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero(){
  return (
    <section className="pt-20 md:pt-28 pb-16 md:pb-24">
      <div className="container-page text-center relative">
        <div className="mx-auto mb-6 md:mb-8 flex justify-center">
          <Image src="/logo.svg" alt="USATether" width={92} height={92} priority />
        </div>
        <h1 className="h1">
          The <span className="gradient-america">American</span> <br className="hidden sm:block" /> Web Wallet
        </h1>
        <p className="mt-5 text-lg md:text-xl text-white/80">USAT ↔ USDT Bridge</p>
        <p className="mt-3 text-sm md:text-base text-white/60">
          Built for the U.S. market — secure, compliant, and beautifully crafted
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link href="/bridge" className="btn btn-blue">
            <span>Launch Bridge</span><ArrowRight size={18} />
          </Link>
          <Link href="/wallet" className="btn btn-red"><span>Connect Wallet</span></Link>
        </div>
      </div>
    </section>
  );
}