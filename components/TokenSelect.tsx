"use client";
import { TOKENS } from "@/lib/tokens";
export default function TokenSelect({
  value, onChange, label,
}: { value: string; onChange: (s: string) => void; label: string; }) {
  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      <select
        className="mt-1 w-full rounded-2xl bg-white/5 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {TOKENS.map(t => (
          <option key={t.symbol} value={t.symbol}>{t.symbol}</option>
        ))}
      </select>
    </label>
  );
}
