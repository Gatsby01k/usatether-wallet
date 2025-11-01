// app/providers.tsx
'use client';

import { ReactNode, useMemo } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, arbitrum, polygon, base } from 'wagmi/chains';
import { injected, walletConnect } from '@wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const wcProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID as string | undefined;

// Фиксируем сети и транспорты
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

    // Базовый injected (MetaMask / браузерные кошельки)
    const list = [injected({ shimDisconnect: true })];

    // Подключаем WalletConnect ТОЛЬКО если есть projectId и это клиент
    if (isClient && wcProjectId) {
      list.push(
        walletConnect({
          projectId: wcProjectId,
          showQrModal: true, // откроет модалку с QR на десктопе
          metadata: {
            name: 'USATether Wallet',
            description: 'Simple, fast & secure stablecoin wallet',
            url: 'https://usatether.io',
            icons: ['https://usatether.io/logo.png'],
          },
        })
      );
    }

    return createConfig({
      chains,
      transports,
      connectors: list,
      // SSR лучше выключить, чтобы не путать соединения и статус
      ssr: false,
    });
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
