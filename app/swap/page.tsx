"use client";
import SwapForm from "@/components/SwapForm";

export default function SwapPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-semibold">Swap USAT & stablecoins</h1>
      <p className="mb-8 text-white/70">
        Core swapping experience for <strong>USAT</strong> and major stablecoins. USAT pairs will activate post-launch.
        Meanwhile, you can swap between USDC, USDT, and DAI on supported networks.
      </p>
      <SwapForm />
    </main>
  );
}
