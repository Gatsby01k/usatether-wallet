// components/ConnectButton.tsx
"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useMemo } from "react";
import { Wallet as WalletIcon, PlugZap, LogOut } from "lucide-react";

function truncate(addr?: string, n = 4) {
  if (!addr) return "";
  return `${addr.slice(0, 2 + n)}…${addr.slice(-n)}`;
}

export default function ConnectButton() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  const metaMask = useMemo(
    () => connectors.find((c) => c.name.toLowerCase().includes("metamask")),
    [connectors]
  );
  const wc = useMemo(
    () => connectors.find((c) => c.id === "walletConnect"),
    [connectors]
  );

  if (isConnected) {
    return (
      <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md">
        <WalletIcon className="size-4 opacity-80" />
        <span className="text-sm font-medium">{truncate(address)}</span>
        {chain?.name && (
          <span className="text-xs text-white/60">• {chain.name}</span>
        )}
        <button
          onClick={() => disconnect()}
          className="ml-2 inline-flex items-center gap-1 rounded-xl bg-white/10 px-2 py-1 text-xs hover:bg-white/15"
          title="Disconnect"
        >
          <LogOut className="size-3" />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => metaMask && connect({ connector: metaMask })}
        disabled={!metaMask || status === "pending"}
        className="btn-primary inline-flex items-center gap-2"
      >
        <PlugZap className="size-4" />
        Connect MetaMask
      </button>

      <button
        onClick={() => wc && connect({ connector: wc })}
        disabled={!wc || status === "pending"}
        className="btn-ghost inline-flex items-center gap-2"
      >
        <WalletIcon className="size-4" />
        WalletConnect
      </button>

      {error && (
        <div className="basis-full text-xs text-red-400/90">
          {error.message}
        </div>
      )}
    </div>
  );
}
