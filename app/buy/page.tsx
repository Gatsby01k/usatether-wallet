"use client";
import BuyGrid from "@/components/BuyGrid";

export default function BuyPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-semibold">Buy stablecoins</h1>
      <p className="mb-8 text-white/70">
        Choose an on-ramp provider. We’ll integrate a seamless in-app flow later. For help write: <a className="underline" href="mailto:info@usatether.io">info@usatether.io</a>.
      </p>
      <BuyGrid />
    </main>
  );
}
