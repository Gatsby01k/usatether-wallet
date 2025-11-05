// components/ConnectModal.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useConnect } from 'wagmi';
import { Loader2 } from 'lucide-react';
import { env } from '@/lib/env';

type Props = { open: boolean; onClose: () => void };

export default function ConnectModal({ open, onClose }: Props) {
  const { connect, connectors, status, error } = useConnect();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hasWalletConnectKey = !!env.WC_PROJECT_ID;

  const { metaMask, wcConnector } = useMemo(() => {
    let injected = connectors.find((c) => c.id === 'injected');
    if (!injected) injected = connectors.find((c) => /inject/i.test(c.name));
    let wc = connectors.find((c) => c.id === 'walletConnect');
    if (!wc) wc = connectors.find((c) => /wallet\s*connect/i.test(c.name));
    return { metaMask: injected, wcConnector: wc };
  }, [connectors]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-zinc-900/90 p-6 text-white backdrop-blur">
        <div className="mb-4 text-xl font-semibold">Connect your wallet</div>

        {!hasWalletConnectKey && (
          <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-red-300">
            WalletConnect key is not configured. Ask admin to set <code>NEXT_PUBLIC_WC_PROJECT_ID</code> in production.
          </div>
        )}

        <div className="space-y-3">
          {/* MetaMask / Injected */}
          <button
            onClick={() => metaMask && connect({ connector: metaMask })}
            disabled={!metaMask || status === 'pending'}
            className="flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-3 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div>
              <div className="text-sm font-medium">MetaMask (Injected)</div>
              <div className="text-xs text-white/50">Connect via injected provider</div>
            </div>
            {status === 'pending' ? (
              <Loader2 className="h-4 w-4 animate-spin text-white/80" />
            ) : (
              <img src="/metamask.svg" alt="" className="h-5 w-5 opacity-90" />
            )}
          </button>

          {/* WalletConnect */}
          <button
            onClick={() => wcConnector && connect({ connector: wcConnector })}
            disabled={!wcConnector || status === 'pending' || !hasWalletConnectKey}
            className="flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-3 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            title={!hasWalletConnectKey ? 'WalletConnect key is not configured' : undefined}
          >
            <div>
              <div className="text-sm font-medium">WalletConnect</div>
              <div className="text-xs text-white/50">Connect any mobile wallet</div>
            </div>
            {status === 'pending' ? (
              <Loader2 className="h-4 w-4 animate-spin text-white/80" />
            ) : (
              <img src="/walletconnect.svg" alt="" className="h-5 w-5 opacity-90" />
            )}
          </button>
        </div>

        {status === 'pending' && (
          <div className="mt-3 text-center text-sm opacity-80">Waiting for approval…</div>
        )}
        {error && (
          <div className="mt-3 text-center text-sm text-red-300">
            {(error as any)?.shortMessage ?? (error as Error)?.message ?? 'Connection failed'}
          </div>
        )}

        <div className="mt-6 text-center">
          <button onClick={onClose} className="rounded-xl bg-white/10 px-4 py-2 hover:bg-white/15">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
