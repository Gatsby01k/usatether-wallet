"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount, useSendTransaction, useSwitchChain, useWriteContract } from "wagmi";
import { erc20Abi, parseUnits } from "viem";
import ChainSelect from "@/components/ChainSelect";
import TokenSelect from "@/components/TokenSelect";
import { DEFAULT_CHAIN_ID } from "@/lib/chains";
import { clamp, pretty } from "@/lib/format";
import { tokenAddress, tokenDecimals, isSoon } from "@/lib/tokens";

type Quote = {
  price: string;
  guaranteedPrice: string;
  to: `0x${string}`;
  data: `0x${string}`;
  value: string; // decimal or hex string
  buyAmount: string;
  sellAmount: string;
  allowanceTarget?: `0x${string}`;
  spender?: `0x${string}`;
  sources?: Array<{ name: string; proportion: string }>;
  estimatedPriceImpact?: string; // 0..1
};

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export default function SwapForm() {
  const { address, chainId } = useAccount();
  const { switchChainAsync } = useSwitchChain();
  const { sendTransactionAsync } = useSendTransaction();
  const { writeContractAsync } = useWriteContract();

  // UI state
  const [selectedChainId, setSelectedChainId] = useState<number>(chainId ?? DEFAULT_CHAIN_ID);
  const [sellToken, setSellToken] = useState("USAT");
  const [buyToken, setBuyToken] = useState("USDC");
  const [amount, setAmount] = useState<string>("100");
  const [slippage, setSlippage] = useState<number>(1.0); // %
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [sellToken, buyToken, amount, selectedChainId]);

  // Token metadata
  const sellDecimals = tokenDecimals(sellToken);
  const amtWei = useMemo(() => {
    try {
      return parseUnits(amount || "0", sellDecimals);
    } catch {
      return 0n;
    }
  }, [amount, sellDecimals]);

  const sellAddress = useMemo(() => tokenAddress(sellToken, selectedChainId), [sellToken, selectedChainId]);
  const buyAddress = useMemo(() => tokenAddress(buyToken, selectedChainId), [buyToken, selectedChainId]);

  const sellSoon = isSoon(sellToken) || !sellAddress;
  const buySoon = isSoon(buyToken) || !buyAddress;
  const anySoon = sellSoon || buySoon;

  function parseQuoteValue(v?: string) {
    if (!v) return 0n;
    try {
      return v.startsWith("0x") ? BigInt(v) : BigInt(v);
    } catch {
      return 0n;
    }
  }

  async function ensureChain() {
    if (chainId !== selectedChainId && switchChainAsync) {
      await switchChainAsync({ chainId: selectedChainId });
    }
  }

  async function fetchQuote() {
    try {
      setLoading(true);
      setError(null);
      setQuote(null);

      if (!address) throw new Error("Connect wallet first.");
      if (sellToken === buyToken) throw new Error("Choose different tokens.");
      if (anySoon) throw new Error("USAT pairs are not available until token launch.");

      const base = process.env.NEXT_PUBLIC_0X_BASE_URL || "https://api.0x.org";
      const url = new URL(`${base}/swap/v1/quote`);
      url.searchParams.set("chainId", String(selectedChainId));
      url.searchParams.set("sellToken", sellAddress);
      url.searchParams.set("buyToken", buyAddress);
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
    } catch (e: any) {
      setError(e.message || "Failed to fetch quote");
    } finally {
      setLoading(false);
    }
  }

  async function approveIfNeeded() {
    if (!quote) return;
    const spender = (quote.spender ?? quote.allowanceTarget ?? ZERO_ADDRESS) as `0x${string}`;
    if (spender === ZERO_ADDRESS) return;
    await writeContractAsync({
      address: sellAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: "approve",
      args: [spender, amtWei], // MVP: approve exact amount
    });
  }

  async function executeSwap() {
    try {
      setLoading(true);
      setError(null);
      if (!quote) throw new Error("No quote");
      if (anySoon) throw new Error("USAT pairs are not available until token launch.");

      await ensureChain();
      await approveIfNeeded();

      await sendTransactionAsync({
        to: quote.to,
        data: quote.data,
        value: parseQuoteValue(quote.value),
      });

      // Reset on success
      setQuote(null);
      setAmount("");
    } catch (e: any) {
      setError(e.message || "Swap failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-3xl bg-white/5 p-6 backdrop-blur-md ring-1 ring-white/10">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-xl font-semibold">Swap</h2>
        {(sellSoon || buySoon) && <span className="badge-soon">USAT SOON</span>}
      </div>

      <div className="grid gap-4">
        <ChainSelect chainId={selectedChainId} setChainId={setSelectedChainId} label="Network" />

        <div className="grid grid-cols-2 gap-3">
          <TokenSelect value={sellToken} onChange={setSellToken} label="Sell" />
          <TokenSelect value={buyToken} onChange={setBuyToken} label="Buy" />
        </div>

        <label className="block">
          <span className="text-sm text-white/70">Amount ({sellToken})</span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            inputMode="decimal"
            className="mt-1 w-full rounded-2xl bg-white/5 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2"
          />
        </label>

        <label className="block">
          <span className="text-sm text-white/70">Slippage, %</span>
          <input
            type="number"
            step={0.1}
            min={0.1}
            max={5}
            value={slippage}
            onChange={(e) => setSlippage(Number(e.target.value))}
            className="mt-1 w-full rounded-2xl bg-white/5 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-2"
          />
        </label>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchQuote}
            disabled={loading || !amount || anySoon}
            className="btn-secondary"
            title={anySoon ? "USAT swaps will enable after launch" : "Get a market quote"}
          >
            {loading ? "Fetching..." : "Get Quote"}
          </button>

        <button
            onClick={executeSwap}
            disabled={loading || !quote || anySoon}
            className="btn-primary"
            title={anySoon ? "USAT swaps will enable after launch" : "Execute swap"}
          >
            {loading ? "Processing..." : "Swap"}
          </button>
        </div>

        {anySoon && (
          <p className="rounded-xl bg-white/5 p-3 text-amber-200/90 ring-1 ring-white/10">
            USAT trading activates after token deployment. Until then, try USDC/USDT/DAI pairs.
          </p>
        )}

        {error && <p className="rounded-xl bg-rose-500/10 p-3 text-rose-300">{error}</p>}

        {quote && (
          <div className="rounded-2xl bg-white/5 p-3 text-sm ring-1 ring-white/10">
            <div className="flex justify-between">
              <span>Price</span>
              <span>{quote.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Guaranteed</span>
              <span>{quote.guaranteedPrice}</span>
            </div>
            {quote.estimatedPriceImpact && (
              <div className="flex justify-between">
                <span>Price impact</span>
                <span>{pretty(Number(quote.estimatedPriceImpact) * 100, 2)}%</span>
              </div>
            )}
            {quote.sources && (
              <div className="mt-2 text-white/60">
                {quote.sources.filter((s) => Number(s.proportion) > 0).map((s) => s.name).join(", ")}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
