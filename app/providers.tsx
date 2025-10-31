// app/providers.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, arbitrum, polygon, base } from 'wagmi/chains';
import { injected, walletConnect } from '@wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;

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
    const connectors = [
      injected({ shimDisconnect: true }),
    ];

    if (typeof window !== 'undefined' && wcProjectId) {
      connectors.push(
        // NB: типизацию страхуем as any на случай расхождения минорок в кэше Vercel
        walletConnect({
          projectId: wcProjectId,
          showQrModal: true,
          metadata: {
            name: 'USATether Wallet',
            description: 'Non-custodial stablecoin wallet',
            url: 'https://usatether.io',
            icons: ['https://usatether.io/opengraph-image.png'],
          },
        }) as any
      );
    }

    return createConfig({
      chains,
      transports,
      connectors,
      ssr: false, // проще для WC-хранилища и избегаем конфликтов requestedChains
    });
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
