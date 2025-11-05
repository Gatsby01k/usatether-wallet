// app/wallet/page.tsx
'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { useAccount, useBalance, useDisconnect, useSwitchChain } from 'wagmi';
import { mainnet, base, arbitrum } from 'wagmi/chains';

export const dynamic = 'force-static';

function truncate(addr?: `0x${string}`) {
  return addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : '';
}

export default function WalletPage() {
  const { address, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();
  const { data: nativeBalance } = useBalance({ address, chainId: chain?.id, watch: true });

  const supportedChains = useMemo(
    () => [mainnet, base, arbitrum].filter(c => chains.some(ch => ch.id === c.id)),
    [chains]
  );

  return (
    <main className="relative z-10 mx-auto max-w-5xl px-4 py-12 md:py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-4">Wallet</h1>
      <p className="text-white/70 mb-8">
        Your account overview. Connect your wallet on the Home page to see balances and actions.
      </p>

      {!isConnected ? (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold mb-2">Not connected</h2>
          <p className="text-sm text-white/70 mb-4">
            Please connect your wallet from the Home screen.
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-medium transition"
          >
            Go to Home & Connect
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Account card */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold mb-3">Account</h2>
            <div className="text-sm text-white/80 mb-1">Address</div>
            <div className="flex items-center gap-3">
              <code className="text-base">{truncate(address)}</code>
              {address && (
                <>
                  <button
                    onClick={() => navigator.clipboard.writeText(address)}
                    className="text-xs rounded-lg px-2 py-1 border border-white/15 hover:border-white/25"
                  >
                    Copy
                  </button>
                  <a
                    href={`https://etherscan.io/address/${address}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs underline underline-offset-4 text-white/80 hover:text-white"
                  >
                    View on explorer
                  </a>
                </>
              )}
            </div>

            <div className="mt-4">
              <button
                onClick={() => disconnect()}
                className="text-sm rounded-xl px-3 py-2 border border-white/15 hover:border-white/25"
              >
                Disconnect
              </button>
            </div>
          </section>

          {/* Network card */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold mb-3">Network</h2>
            <div className="mb-4 text-white/80">
              Current: <span className="font-medium">{chain?.name ?? 'Unknown'}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {supportedChains.map(c => (
                <button
                  key={c.id}
                  onClick={() => switchChain({ chainId: c.id })}
                  disabled={chain?.id === c.id}
                  className={`rounded-xl px-3 py-2 border text-sm transition ${
                    chain?.id === c.id
                      ? 'border-white/30 text-white/80 cursor-default'
                      : 'border-white/15 hover:border-white/25'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </section>

          {/* Balances */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Balances</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-sm text-white/70">Native</div>
                <div className="text-lg font-semibold">
                  {nativeBalance ? `${nativeBalance.formatted.slice(0, 8)} ${nativeBalance.symbol}` : '—'}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-sm text-white/70">USDC</div>
                <div className="text-lg font-semibold">coming soon</div>
              </div>

              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-sm text-white/70">USDT</div>
                <div className="text-lg font-semibold">coming soon</div>
              </div>
            </div>

            <p className="text-xs text-white/60 mt-3">
              Stablecoin balances and portfolio view will be available in the standalone app.
            </p>
          </section>

          {/* Quick actions */}
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Quick actions</h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/swap"
                className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/15 transition"
              >
                Swap
              </Link>
              <Link
                href="/bridge"
                className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/15 transition"
              >
                Bridge
              </Link>
              <Link
                href="/buy"
                className="rounded-xl px-4 py-2 bg-white/10 hover:bg-white/15 transition"
              >
                Buy
              </Link>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
