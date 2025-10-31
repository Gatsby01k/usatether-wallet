// app/providers.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, arbitrum, polygon, base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

// фиксируем кортеж и transports — важно для типов
const chains = [mainnet, base, arbitrum, polygon] as const;
const transports = {
  [mainnet.id]: http(),
  [base.id]: http(),
  [arbitrum.id]: http(),
  [polygon.id]: http(),
} as const;

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => new (require('@tanstack/react-query').QueryClient)(), []);

  const config = useMemo(() => {
    const isClient = typeof window !== 'undefined';

    const conns = [
      // MetaMask / любые инжектированные кошельки
      injected({ shimDisconnect: true }),
    ];

    // WalletConnect подключаем только если есть projectId и уже на клиенте
    if (isClient && wcProjectId) {
      conns.push(
        walletConnect({
          projectId: wcProjectId,
          showQrModal: true,
          metadata: {
            name: 'USATether Wallet',
            description: 'Non-custodial stablecoin wallet',
            url: 'https://usatether.io',
            icons: ['https://usatether.io/opengraph-image.png'],
          },
        })
      );
    }

    return createConfig({
      chains,
      transports,
      connectors: conns,
      ssr: true, // ок для App Router; сами спрячет UI до монтирования
    });
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
