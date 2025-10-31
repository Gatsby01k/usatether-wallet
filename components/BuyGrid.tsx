"use client";
import BuyCard from "./BuyCard";

export default function BuyGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <BuyCard title="Transak" href="https://global.transak.com" />
      <BuyCard title="MoonPay" href="https://www.moonpay.com/buy" />
      <BuyCard title="Coinbase Pay" href="https://pay.coinbase.com/" />
      <BuyCard title="Stripe Crypto (planned)" soon />
    </div>
  );
}
