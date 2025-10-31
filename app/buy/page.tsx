"use client";
import BuyGrid from "@/components/BuyGrid";

export default function BuyPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-6 text-3xl font-semibold">Buy USAT (Soon)</h1>
      <p className="mb-8 text-white/70">
        We’re preparing a fast, compliant fiat on-ramp to purchase <strong>USAT</strong> in a few clicks.
        Until the token launches, providers are shown as <span className="badge-soon align-middle">SOON</span>.
        Questions? <a className="underline" href="mailto:info@usatether.io">info@usatether.io</a>.
      </p>
      <BuyGrid />
    </main>
  );
}
