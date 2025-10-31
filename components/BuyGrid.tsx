"use client";
import BuyCard from "./BuyCard";

export default function BuyGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <BuyCard title="Transak" note="USAT instant purchase planned via on-ramp integrations." />
      <BuyCard title="MoonPay" note="One-click USAT purchase planned after token launch." />
      <BuyCard title="Coinbase Pay" note="USAT listing & direct purchase targeted post-launch." />
      <BuyCard title="Stripe (planned)" note="Planned fast card purchase flow for USAT." />
    </div>
  );
}
