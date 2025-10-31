"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useSendTransaction, useSwitchChain, useWriteContract } from "wagmi";
import { erc20Abi, parseUnits } from "viem";
import { DEFAULT_CHAIN_ID } from "@/lib/chains";
import { pretty, clamp } from "@/lib/format";
import { tokenAddress, tokenDecimals } from "@/lib/tokens";
import TokenSelect from "./TokenSelect";
import ChainSelect from "./ChainSelect";

type Quote = {
  price: string;
  guaranteedPrice: string;
  to: `0x${string}`;
  data: `0x${string}`;
  value: string;                 // hex or decimal string
  buyAmount: string;             // out
  sellAmount: string;            // in
  allowanceTarget?: `0x${string}`;
  spender?: `0x${string}`;
  sources?: Array<{ name: string; proportion: string }>;
  estimatedPriceImpact?: string;
};

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export default function SwapForm() {
  const { address, chainId } = useAccount();
  const [selectedChainId, setSelectedChainId] = useState<number>(chainId ?? DEFAULT_CHAIN_ID);

  const [sellToken, setSellToken] = useState("USDC");
  const [buyToken, setBuyToken] = useState("USDT");
  const [amount, setAmount] = useState<string>("100");
  const [slippage, setSlippage] = useState<number>(1.0); // %
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { switchChainAsync } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  useEffect(() => {
    setError(null);
  }, [sellToken, buyToken, amount, selectedChainId]);

  const sellAddress = useMemo(() => tokenAddress(sellToken, selectedChainId), [sellToken, selectedChainId]);
  const buyAddress  = useMemo(() => tokenAddress(buyToken,  selectedChainId), [buyToken, selectedChainId]);
  const sellDec = tokenDecimals(sellToken);
  const amtWei = useMemo(() => {
    try { return parseUnits(amount || "0", sellDec); } catch { return 0n; }
  }, [amount, sellDec]);

  async function fetchQuote() {
    try {
      setLoading(true);
      setError(null);
      setQuote(null);

      if (!address) throw new Error("Connect wallet first.");
      if (!sellAddress || !buyAddress) throw new Error("Token address not found for selected chain.");
      if (sellAddress.toLowerCase() === buyAddress.toLowerCase()) throw new Error("Choose different tokens.");

      const base = process.env.NEXT_PUBLIC_0X_BASE_URL || "https://api.0x.org";
      const url = new URL(`${base}/swap/v1/quote`);
      url.searchParams.set("chainId", String(selectedChainId));
      url.searchParams.set("sellToken", sellAddress);
      url.searchParams.set("buyToken",  buyAddress);
      url.searchParams.set("sellAmount", amtWei.toString());
      url.searchParams.set("takerAddress", address);
      url.searchParams.set("slippagePercentage", String(clamp(slippage, 0.1, 5) / 100));

      const res = await fetch(url.toString(), { cache: "no-cache" });
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`0x quote error: ${res.status} ${body}`);
      }
      const q: Quote = await res.json();
      setQuote(q);
    } catch (e:any) {
      setError(e.message || "Failed to fetch quote");
    } finally {
      setLoading(false);
    }
  }

  async function ensureChain() {
    if (chainId !== selectedChainId && switchChainAsync) {
      await switchChainAsync({ chainId: selectedChainId });
    }
  }

  async function approveIfNeeded() {
    if (!quote) return;
    const spender = (quote.spender ?? quote.allowanceTarget ?? ZERO_ADDRESS) as `0x${string}`;
    if (spender === ZERO_ADDRESS) return;

    // simple "max approve" for MVP
    await writeContractAsync({
      address: sellAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, amtWei],
    });
  }

  async function executeSwap() {
    try {
      setLoading(true);
      setError(null);
      if (!quote) throw new Error("No quote");
      await ensureChain();
      // (1) Approve
      await approveIfNeeded();
      // (2) Send raw tx to 0x Exchange Proxy
      await sendTransactionAsync({
        to: quote.to,
        data: quote.data,
        value: quote.value ? BigInt(quote.value) : 0n,
      });
      // success UX
      setQuote(null);
      setAmount("");
    } catch (e:any) {
      setError(e.message || "Swap failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl bg-white/5 p-6 backdrop-blur-md ring-1 ring-white/10">
      <h2 className="mb-4 text-xl font-semibold">Swap</h2>

      <div className="grid gap-4">
        <ChainSelect chainId={selectedChainId} setChainId={setSelectedChainId} label="Network" />

        <div className="grid grid-cols-2 gap-3">
          <TokenSelect value={sellToken} onChange={setSellToken} label="Sell" />
          <TokenSelect value={buyToken}  onChange={setBuyToken}  label="Buy" />
        </div>

        <label className="block">
          <span className="text-sm text-white/70">Amount ({sellToken})</span>
          <input
            value={amount}
            onChange={(e)=> setAmount(e.target.value)}
            placeholder="0.00"
            inputMode="decimal"
            className="mt-1 w-full rounded-2xl bg-white/5 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2"
          />
        </label>

        <label className="block">
          <span className="text-sm text-white/70">Slippage, %</span>
          <input
            type="number" step="0.1" min={0.1} max={5}
            value={slippage}
            onChange={(e)=> setSlippage(Number(e.target.value))}
            className="mt-1 w-full rounded-2xl bg-white/5 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2"
          />
        </label>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchQuote}
            disabled={loading || !amount}
            className="rounded-2xl bg-sky-500/90 px-4 py-2 font-medium text-white hover:bg-sky-500 disabled:opacity-50"
          >
            {loading ? "Fetching..." : "Get Quote"}
          </button>

          <button
            onClick={executeSwap}
            disabled={loading || !quote}
            className="rounded-2xl bg-emerald-500/90 px-4 py-2 font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Swap"}
          </button>
        </div>

        {error && <p className="rounded-xl bg-rose-500/10 p-3 text-rose-300">{error}</p>}

        {quote && (
          <div className="rounded-2xl bg-white/5 p-3 text-sm ring-1 ring-white/10">
            <div className="flex justify-between"><span>Price</span><span>{quote.price}</span></div>
            <div className="flex justify-between"><span>Guaranteed</span><span>{quote.guaranteedPrice}</span></div>
            {quote.estimatedPriceImpact && (
              <div className="flex justify-between">
                <span>Price impact</span><span>{pretty(Number(quote.estimatedPriceImpact) * 100, 2)}%</span>
              </div>
            )}
            <div className="mt-2 text-white/60">
              {quote.sources?.filter(s=>Number(s.proportion)>0).map(s=>s.name).join(", ")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
