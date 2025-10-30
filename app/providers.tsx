"use client";

import { ReactNode, useState } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { mainnet, polygon, base, arbitrum } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { walletConnect } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Важно: этот файл выполняется на клиенте, поэтому NEXT_PUBLIC_* попадут в билд
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "";

const config = createConfig({
  chains: [mainnet, base, polygon, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
  connectors: [
    injected({ shimDisconnect: true }),
    walletConnect({
      projectId,
      showQrModal: true,
    }),
  ],
});

export default function Providers({ children }: { children: ReactNode }) {
  // QueryClient должен быть стабильным (один инстанс)
  const [queryClient] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
