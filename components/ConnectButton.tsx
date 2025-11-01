// components/ConnectButton.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

export default function ConnectButton() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { address, isConnected } = useAccount();
  const { connectors, connect, status, error, reset } = useConnect();
  const { disconnect } = useDisconnect();

  if (!mounted) {
    return (
      <button
        className="inline-flex h-10 items-center justify-center rounded-xl bg-white/10 px-4 text-sm text-white/80"
        disabled
      >
        Loading…
      </button>
    );
  }

  if (isConnected && address) {
    const short = `${address.slice(0, 6)}…${address.slice(-4)}`;
    return (
      <div className="flex items-center gap-2">
        <span className="rounded-xl bg-emerald-500/15 px-3 py-2 text-emerald-200 text-sm">
          {short}
        </span>
        <button
          onClick={() => disconnect()}
          className="inline-flex h-10 items-center justify-center rounded-xl bg-white/10 px-4 text-sm hover:bg-white/20"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {connectors.map((c) => {
        const ready = (c as any).ready ?? true;
        return (
          <button
            key={c.id}
            onClick={() => connect({ connector: c })}
            disabled={!ready || status === 'pending'}
            className="inline-flex h-11 items-center justify-center rounded-xl bg-sky-500 px-4 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === 'pending' ? 'Connecting…' : `Connect ${c.name}`}
            {!ready && ' (not ready)'}
          </button>
        );
      })}

      {error && (
        <div className="w-full text-sm text-red-300">
          {error.message}
          <button onClick={() => reset()} className="underline ml-2">
            reset
          </button>
        </div>
      )}
    </div>
  );
}
