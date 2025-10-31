// app/wallet/page.tsx
'use client';

import ConnectButton from '@/components/ConnectButton';
import { WalletHints } from '@/components/WalletHints';
import ConnectDebug from '@/components/ConnectDebug';
// ...
<ConnectDebug />

export default function WalletPage() {
  return (
    <main className="relative z-10 mx-auto max-w-3xl px-4 py-12 space-y-6">
      <h1 className="text-3xl font-semibold">Wallet</h1>

      <div className="rounded-2xl bg-white/5 p-6 backdrop-blur">
        <p className="mb-4 text-white/80">Connect your wallet to start.</p>
        <ConnectButton />
      </div>

      <WalletHints />
    </main>
  );
}
