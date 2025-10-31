"use client";
import BridgeForm from "@/components/BridgeForm";

export default function BridgePage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-semibold">Bridge USAT & stablecoins</h1>
      <p className="mb-8 text-white/70">
        Seamless cross-chain transfers. <strong>USAT</strong> bridging will activate post-launch.
      </p>
      <BridgeForm />
    </main>
  );
}
