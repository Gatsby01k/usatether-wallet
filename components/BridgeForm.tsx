"use client";
import { useState } from "react";
import ChainSelect from "./ChainSelect";
import TokenSelect from "./TokenSelect";
import { tokenAddress } from "@/lib/tokens";
import { pretty } from "@/lib/format";
import { useAccount } from "wagmi";

export default function BridgeForm() {
  const { address } = useAccount();
  const [fromChain, setFromChain] = useState(8453);
  const [toChain, setToChain] = useState(1);
  const [token, setToken] = useState("USDC");
  const [amount, setAmount] = useState("100");

  // для MVP — строим deeplink в Jumper (powered by LI.FI)
  const jumper = (() => {
    const fromToken = tokenAddress(token, fromChain);
    const toToken   = tokenAddress(token, toChain);
    const url = new URL("https://jumper.exchange/bridge");
    if (address) url.searchParams.set("receiverAddress", address);
    url.searchParams.set("fromChainId", String(fromChain));
    url.searchParams.set("toChainId", String(toChain));
    if (fromToken) url.searchParams.set("fromTokenAddress", fromToken);
    if (toToken)   url.searchParams.set("toTokenAddress", toToken);
    if (amount)    url.searchParams.set("fromAmount", amount);
    return url.toString();
  })();

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl bg-white/5 p-6 backdrop-blur-md ring-1 ring-white/10">
      <h2 className="mb-4 text-xl font-semibold">Bridge</h2>

      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-3">
          <ChainSelect chainId={fromChain} setChainId={setFromChain} label="From network" />
          <ChainSelect chainId={toChain}   setChainId={setToChain}   label="To network" />
        </div>

        <TokenSelect value={token} onChange={setToken} label="Token" />

        <label className="block">
          <span className="text-sm text-white/70">Amount</span>
          <input
            value={amount}
            onChange={(e)=> setAmount(e.target.value)}
            inputMode="decimal"
            className="mt-1 w-full rounded-2xl bg-white/5 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2"
          />
        </label>

        <a
          target="_blank" rel="noopener noreferrer"
          href={jumper}
          className="inline-flex items-center justify-center rounded-2xl bg-indigo-500/90 px-4 py-2 font-medium text-white hover:bg-indigo-500"
        >
          Continue in bridge widget →
        </a>

        <p className="text-xs text-white/50">
          MVP uses a trusted bridge aggregator (Jumper/LI.FI). Full native in-app bridging planned.
        </p>
      </div>
    </div>
  );
}
