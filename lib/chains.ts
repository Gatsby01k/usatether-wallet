export type ChainInfo = {
  id: number;
  name: string;
  rpcUrl?: string;
  nativeSymbol: string;
  0xSupported?: boolean;
};

export const CHAINS: ChainInfo[] = [
  { id: 1, name: "Ethereum", nativeSymbol: "ETH", 0xSupported: true },
  { id: 8453, name: "Base", nativeSymbol: "ETH", 0xSupported: true },
  { id: 42161, name: "Arbitrum", nativeSymbol: "ETH", 0xSupported: true },
];

export const DEFAULT_CHAIN_ID = 8453; // Base как быстрый и дешёвый
