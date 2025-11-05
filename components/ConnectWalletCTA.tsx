// components/ConnectWalletCTA.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { Loader2 } from 'lucide-react';
import { env } from '@/lib/env';

type Props = { onOpenModal?: () => void };

export default function ConnectWalletCTA({ onOpenModal }: Props) {
  const { isConnected } = useAccount();
  const { connectors, status } = useConnect();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hasWalletConnectKey = !!env.WC_PROJECT_ID;

  const { injectedConnector } = useMemo(() => {
    let injected = connectors.find((c) => c.id === 'injected');
    if (!injected) injected = connectors.find((c) => /inject/i.test(c.name));
    return { injectedConnector: injected };
  }, [connectors]);

  if (!mounted) {
    return (
      <button className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-white/80" disabled>
        <Loader2 className="h-4 w-4 animate-spin" /> Loading…
      </button>
    );
  }

  if (isConnected) {
    return (
      <button className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 px-5 py-3 text-emerald-300" disabled>
        Connected
      </button>
    );
  }

  const disabled = status === 'pending' || !hasWalletConnectKey;

  return (
    <button
      onClick={() => onOpenModal?.()}
      disabled={disabled}
      title={!hasWalletConnectKey ? 'WalletConnect key is not configured' : undefined}
      className={`inline-flex items-center gap-2 rounded-2xl px-5 py-3 transition
        ${disabled ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-white text-black hover:bg-white/90'}`}
    >
      {status === 'pending' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      Connect Wallet
    </button>
  );
}
