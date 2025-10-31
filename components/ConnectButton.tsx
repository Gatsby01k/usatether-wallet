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
      <button className="px-4 py-2 rounded-lg bg-white/10 opacity-50 cursor-not-allowed">
        Connect
      </button>
    );
  }

  if (isConnected && address) {
    const short = `${address.slice(0, 6)}…${address.slice(-4)}`;
    return (
      <div className="flex items-center gap-2">
        <span className="px-3 py-2 rounded-lg bg-white/10">{short}</span>
        <button
          onClick={() => disconnect()}
          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  const injectedConn = connectors.find((c) => c.id === 'injected');
  const wcConn = connectors.find((c) => c.id === 'walletConnect');

  const metaMaskAvailable = Boolean((injectedConn as any)?.ready);
  const wcAvailable = Boolean(wcConn);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => injectedConn && connect({ connector: injectedConn })}
        disabled={!metaMaskAvailable || status === 'pending'}
        className={`px-4 py-2 rounded-lg transition ${
          !metaMaskAvailable || status === 'pending'
            ? 'opacity-50 cursor-not-allowed bg-white/10'
            : 'bg-white/10 hover:bg-white/20'
        }`}
        title={
          !metaMaskAvailable
            ? 'MetaMask не найден. Установите расширение.'
            : status === 'pending'
            ? 'Подключаемся…'
            : 'Подключиться через MetaMask'
        }
      >
        {status === 'pending' ? 'Connecting…' : 'MetaMask'}
      </button>

      {wcAvailable && (
        <button
          onClick={() => wcConn && connect({ connector: wcConn })}
          disabled={!wcAvailable || status === 'pending'}
          className={`px-4 py-2 rounded-lg transition ${
            !wcAvailable || status === 'pending'
              ? 'opacity-50 cursor-not-allowed bg-white/10'
              : 'bg-white/10 hover:bg-white/20'
          }`}
          title={
            !wcAvailable
              ? 'WalletConnect отключён.'
              : status === 'pending'
              ? 'Подключаемся…'
              : 'Подключиться через WalletConnect'
          }
        >
          {status === 'pending' ? 'Connecting…' : 'WalletConnect'}
        </button>
      )}

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
