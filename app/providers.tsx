'use client';

import { ReactNode, useMemo } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, base, arbitrum } from 'wagmi/chains';
import { metaMask, walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { env, assertEnv } from '@/lib/env';

const chains = [mainnet, base, arbitrum] as const;

const transports = {
  [mainnet.id]: http(),
  [base.id]: http(),
  [arbitrum.id]: http(),
} as const;

export default function Providers({ children }: { children: ReactNode }) {
  // Проверка переменных окружения
  useMemo(() => {
    assertEnv();
  }, []);

  const config = useMemo(() => {
    const connectors = [
      // 🟢 Правильный MetaMask коннектор — ЭТО ОТКРЫВАЕТ POPUP И РАБОТАЕТ ВСЕГДА
      metaMask({ shimDisconnect: true }),

      walletConnect({
        projectId: env.WC_PROJECT_ID || '',
        showQrModal: true,
        metadata: {
          name: 'USATether Wallet',
          description: 'Simple, fast & secure stablecoin wallet',
          url: 'https://usatether.io',
          icons: ['https://usatether.io/icon.png'],
        },
      }),
    ];

    return createConfig({
      chains,
      transports,
      connectors,
      ssr: false,
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
