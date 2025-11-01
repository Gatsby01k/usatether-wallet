// app/providers.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, arbitrum, polygon, base } from 'wagmi/chains';
// использовать коннекторы из 'wagmi/connectors'
import { injected, walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { CreateConnectorFn } from 'wagmi';

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

    const connectorList: CreateConnectorFn[] = [
      injected({ shimDisconnect: true }),
      ...(isClient && wcProjectId
        ? [
            walletConnect({
              projectId: wcProjectId,
              showQrModal: true,
              metadata: {
                name: 'USATether Wallet',
                description: 'Simple, fast & secure stablecoin wallet',
                url: 'https://usatether.io',
                icons: ['https://usatether.io/logo.png'],
              },
            }),
          ]
        : []),
    ];

    return createConfig({
      chains,
      transports,
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
