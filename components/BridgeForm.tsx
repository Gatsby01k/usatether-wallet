"use client";
import { useState, useMemo } from "react";
import ChainSelect from "./ChainSelect";
import TokenSelect from "./TokenSelect";
import { tokenAddress, isSoon } from "@/lib/tokens";
import { useAccount } from "wagmi";

export default function BridgeForm() {
  const { address } = useAccount();
  const [fromChain, setFromChain] = useState(8453);
  const [toChain, setToChain] = useState(1);
  const [token, setToken] = useState("USAT");
  const [amount, setAmount] = useState("100");

  const fromAddr = useMemo(() => tokenAddress(token, fromChain), [token, fromChain]);
  const toAddr   = useMemo(() => tokenAddress(token, toChain),   [token, toChain]);
  const soon     = isSoon(token) || !fromAddr || !toAddr;

  const jumper = useMemo(() => {
    const url = new URL("https://jumper.exchange/bridge");
    if (address) url.searchParams.set("receiverAddress", address);
    url.searchParams.set("fromChainId", String(fromChain));
    url.searchParams.set("toChainId", String(toChain));
    if (fromAddr) url.searchParams.set("fromTokenAddress", fromAddr);
    if (toAddr)   url.searchParams.set("toTokenAddress", toAddr);
    if (amount)   url.searchParams.set("fromAmount", amount);
    return url.toString();
  }, [address, fromChain, toChain, fromAddr, toAddr, amount]);

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl bg-white/5 p-6 backdrop-blur-md ring-1 ring-white/10">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-xl font-semibold">Bridge</h2>
        {soon && <span className="badge-soon">USAT SOON</span>}
      </div>

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

        <button
          className="btn-secondary"
          disabled={soon}
          onClick={() => { if (!soon) window.open(jumper, "_blank", "noopener,noreferrer"); }}
        >
          Continue in bridge →
        </button>

        <p className="text-xs text-white/60">
          USAT bridging will be enabled after token deployment. Until then, the flow is marked as <strong>SOON</strong>.
        </p>
      </div>
    </div>
  );
}
