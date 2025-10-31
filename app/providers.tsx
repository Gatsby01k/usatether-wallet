'use client';

import { ReactNode, useMemo } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, arbitrum, polygon } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

// ВАЖНО: зафиксировать кортеж и transports как const — иначе падает типизация
const chains = [mainnet, arbitrum, polygon] as const;
const transports = {
  [mainnet.id]: http(),
  [arbitrum.id]: http(),
  [polygon.id]: http(),
} as const;

export default function Providers({ children }: { children: ReactNode }) {
  const config = useMemo(() => {
    const isClient = typeof window !== 'undefined';

    const connectors = [
      injected({ shimDisconnect: true }),
      // WalletConnect подключаем только на клиенте и только если есть ProjectId
      ...(isClient && wcProjectId
        ? [walletConnect({ projectId: wcProjectId, showQrModal: true })]
        : []),
    ];

    return createConfig({
      chains,
      transports,
      connectors,
      ssr: false, // не пытаться SSR-гидратиться
    });
  }, []);

  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
