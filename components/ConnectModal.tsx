'use client';

import { useEffect, useMemo, useState } from 'react';
import { useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { walletConnect } from 'wagmi/connectors';

type Props = { open: boolean; onClose: () => void };

export default function ConnectModal({ open, onClose }: Props) {
  const { connectAsync, connectors, status, error } = useConnect();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Находим именно наши нужные коннекторы из wagmi
  const metaMask = useMemo(
    () => connectors.find((c) => c.id === injected({}).id),
    [connectors]
  );
  const wc = useMemo(
    () => connectors.find((c) => c.id === walletConnect({ projectId: 'x' }).id),
    [connectors]
  );

  if (!open || !mounted) return null;

  async function handleInjected() {
    if (!metaMask) return;
    await connectAsync({ connector: metaMask });
    onClose();
  }

  async function handleWalletConnect() {
    if (!wc) return;
    await connectAsync({ connector: wc });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0B1220] p-4 text-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Connect wallet</h3>
          <button onClick={onClose} aria-label="Close" className="opacity-70 hover:opacity-100">
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleInjected}
            disabled={!metaMask}
            className={`w-full rounded-xl px-4 py-3 text-left bg-white/5 hover:bg-white/10 transition
              ${!metaMask ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="font-medium">MetaMask (Browser)</div>
            <div className="text-sm opacity-70">Connect via injected provider</div>
          </button>

          <button
            onClick={handleWalletConnect}
            disabled={!wc}
            className={`w-full rounded-xl px-4 py-3 text-left bg-white/5 hover:bg-white/10 transition
              ${!wc ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <div className="font-medium">WalletConnect</div>
            <div className="text-sm opacity-70">QR / mobile deep link</div>
          </button>
        </div>

        <div className="mt-4 text-center text-xs opacity-60">
          Self-custody only. We never store your keys.
        </div>

        {status === 'pending' && (
          <div className="mt-3 text-center text-sm opacity-80">Waiting for approval…</div>
        )}
        {error && (
          <div className="mt-3 text-center text-sm text-red-300">
            {error.shortMessage || error.message}
          </div>
        )}
      </div>
    </div>
  );
}
