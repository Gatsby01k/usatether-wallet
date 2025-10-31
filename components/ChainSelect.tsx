"use client";
import { CHAINS } from "@/lib/chains";

export default function ChainSelect({
  chainId, setChainId, label,
}: { chainId: number; setChainId: (id: number) => void; label: string; }) {
  return (
    <label className="block">
      <span className="text-sm text-white/70">{label}</span>
      <select
        className="mt-1 w-full rounded-2xl bg-white/5 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2"
        value={chainId}
        onChange={(e)=> setChainId(Number(e.target.value))}
      >
        {CHAINS.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </label>
  );
}
