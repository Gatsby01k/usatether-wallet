// components/ConnectWalletCTA.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { WalletMinimal, Loader2, X } from 'lucide-react';

export default function ConnectWalletCTA() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => setMounted(true), []);

  const { isConnected } = useAccount();
  const { connectors, connect, status } = useConnect();

  // Находим нужные коннекторы
  const { injectedConnector, wcConnector } = useMemo(() => {
    let injected = connectors.find((c) => c.id === 'injected');
    if (!injected) injected = connectors.find((c) => /inject/i.test(c.name));
    let wc = connectors.find((c) => c.id === 'walletConnect');
    if (!wc) wc = connectors.find((c) => /wallet\s*connect/i.test(c.name));
    return { injectedConnector: injected, wcConnector: wc };
  }, [connectors]);

  // Если уже подключены — кнопку заменяем на “Connected”
  if (!mounted) {
    return (
      <button className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-white/80" disabled>
        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
      </button>
    );
  }
  if (isConnected) {
    return (
      <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-emerald-200">
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        Connected
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-2xl bg-sky-500/90 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-500"
      >
        <WalletMinimal className="h-4 w-4" />
        Connect Wallet
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="relative z-[210] w-[92vw] max-w-md rounded-2xl border border-white/10 bg-[#0B1430]/95 p-5 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-base font-semibold text-white/90">Connect wallet</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg p-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              {/* MetaMask / Injected */}
              <button
                onClick={() => {
                  if (injectedConnector) {
                    connect({ connector: injectedConnector });
                  }
                }}
                disabled={!injectedConnector || status === 'pending'}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/90 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">MetaMask (Browser)</div>
                    <div className="text-xs text-white/50">Connect via injected provider</div>
                  </div>
                  {status === 'pending' ? (
                    <Loader2 className="h-4 w-4 animate-spin text-white/80" />
                  ) : (
                    <img src="/metamask.svg" alt="" className="h-5 w-5 opacity-90" />
                  )}
                </div>
              </button>

              {/* WalletConnect */}
              <button
                onClick={() => {
                  if (wcConnector) {
                    connect({ connector: wcConnector });
                  }
                }}
                disabled={!wcConnector || status === 'pending'}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-white/90 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">WalletConnect</div>
                    <div className="text-xs text-white/50">QR / mobile deep link</div>
                  </div>
                  {status === 'pending' ? (
                    <Loader2 className="h-4 w-4 animate-spin text-white/80" />
                  ) : (
                    <img src="/walletconnect.svg" alt="" className="h-5 w-5 opacity-90" />
                  )}
                </div>
              </button>
            </div>

            {/* Hint */}
            <p className="mt-3 text-center text-[11px] text-white/45">
              Self-custody only. We never store your keys.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
