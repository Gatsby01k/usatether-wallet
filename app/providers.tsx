'use client';

import { ReactNode, useMemo } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, arbitrum, base } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID; // must be set
const chains = [mainnet, base, arbitrum] as const;

const transports = {
  [mainnet.id]: http(),
  [base.id]: http(),
  [arbitrum.id]: http(),
} as const;

export default function Providers({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), []);

  const config = useMemo(() => {
    const isClient = typeof window !== 'undefined';

    const list = [
      injected({ shimDisconnect: true }),
      ...(isClient && wcProjectId
        ? [
            walletConnect({
              projectId: wcProjectId,
              showQrModal: true,
              // Важно: metadata помогает Cloud корректно верифицировать origin
              metadata: {
                name: 'USATether Wallet',
                description: 'The American Web Wallet',
                url: 'https://usatether.io', // добавь этот домен и vercel-preview в Allowed origins
                icons: ['https://usatether.io/favicon.ico'],
              },
            }),
          ]
        : []),
    ];

    return createConfig({
      chains,
      transports,
      connectors: list,
      ssr: false,
    });
    // ВАЖНО: зависимость от wcProjectId, чтобы при наличии ключа на клиенте коннектор реально добавился
  }, [wcProjectId]);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
