'use client';

import { ReactNode, useMemo } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, base, arbitrum } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID; // убедись, что в Vercel задано!

const chains = [mainnet, base, arbitrum] as const;
const transports = {
  [mainnet.id]: http(),
  [base.id]: http(),
  [arbitrum.id]: http(),
} as const;

export default function Providers({ children }: { children: ReactNode }) {
  const config = useMemo(() => {
    const isClient = typeof window !== 'undefined';

    const connectors = [
      injected({ shimDisconnect: true }),
      // ВАЖНО: без встроенной QR-модалки. Её рисуем сами.
      ...(isClient && wcProjectId
        ? [walletConnect({ projectId: wcProjectId, showQrModal: false })]
        : []),
    ];

    return createConfig({
      chains,
      transports,
      connectors,
      ssr: false, // wagmi v2
    });
  }, []);

  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
