'use client';

import { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import ConnectModal from './ConnectModal';

export default function ConnectButton() {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      {isConnected ? (
        <button
          onClick={() => disconnect()}
          className="inline-flex items-center rounded-xl bg-white/10 hover:bg-white/15 px-4 py-2"
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center rounded-xl bg-sky-500 hover:bg-sky-600 px-4 py-2 text-white"
        >
          Connect wallet
        </button>
      )}
      <ConnectModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
