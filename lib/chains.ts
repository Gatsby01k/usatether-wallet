export type ChainInfo = {
  id: number;
  name: string;
  rpcUrl?: string;
  nativeSymbol: string;
};

export const CHAINS: ChainInfo[] = [
  { id: 1, name: "Ethereum", nativeSymbol: "ETH" },
  { id: 8453, name: "Base", nativeSymbol: "ETH" },
  { id: 42161, name: "Arbitrum", nativeSymbol: "ETH" },
];

export const DEFAULT_CHAIN_ID = 8453; // Base
