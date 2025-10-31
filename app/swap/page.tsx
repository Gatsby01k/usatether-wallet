"use client";
import SwapForm from "@/components/SwapForm";

export default function SwapPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-semibold">Swap stablecoins</h1>
      <p className="mb-8 text-white/70">Fast swaps via 0x — USDC/USDT/DAI on Ethereum, Base, Arbitrum.</p>
      <SwapForm />
    </main>
  );
}
