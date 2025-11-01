// app/providers.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, arbitrum, polygon, base } from 'wagmi/chains';
// 🔧 КЛЮЧЕВОЕ: берем коннекторы из 'wagmi/connectors' (реэкспорт), а не из '@wagmi/connectors'
import { injected, walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string | undefined;

const chains = [mainnet, base, arbitrum, polygon] as const;
const transports = {
  [mainnet.id]: http(),
  [base.id]: http(),
  [arbitrum.id]: http(),
  [polygon.id]: http(),
} as const;

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  const config = useMemo(() => {
    const isClient = typeof window !== 'undefined';

    // Собираем один раз "иммутабельным" массивом (без push), чтобы типы не поплыли.
    const connectorList = [
      injected({ shimDisconnect: true }),
      ...(isClient && wcProjectId
        ? [walletConnect({
            projectId: wcProjectId,
            showQrModal: true,
            metadata: {
              name: 'USATether Wallet',
              description: 'Simple, fast & secure stablecoin wallet',
              url: 'https://usatether.io',
              icons: ['https://usatether.io/logo.png'],
            },
          })]
        : []),
    ] as const;

    return createConfig({
      chains,
      transports,
      // Можно передать как массив или функцию — оставим массив, уже ок.
      connectors: connectorList,
      ssr: false,
    });
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
