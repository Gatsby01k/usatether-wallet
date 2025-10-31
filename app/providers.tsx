'use client';

import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, arbitrum, polygon } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

export default function Providers({ children }: { children: React.ReactNode }) {
  // Создаём конфиг ТОЛЬКО на клиенте, а на сервере — без WalletConnect
  const config = useMemo(() => {
    const isClient = typeof window !== 'undefined';

    const base = {
      chains: [mainnet, arbitrum, polygon],
      transports: {
        [mainnet.id]: http(),
        [arbitrum.id]: http(),
        [polygon.id]: http(),
      } as const,
    };

    const connectors = [
      injected({ shimDisconnect: true }),
      // WalletConnect только если есть ключ и мы на клиенте
      ...(isClient && wcProjectId
        ? [walletConnect({ projectId: wcProjectId, showQrModal: true })]
        : []),
    ];

    return createConfig({
      ...base,
      connectors,
      ssr: false, // важный флаг — не пытаться гидратиться на сервере
    });
  }, []);

  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
