export type Token = {
  symbol: string;
  address: Record<number, string>; // по chainId
  decimals: number;
  soon?: boolean;                  // для будущих токенов без контракта
};

export const TOKENS: Token[] = [
  {
    symbol: "USAT",
    decimals: 6,                   // предположительно 6; поправим, когда будет контракт
    soon: true,                    // помечаем как скоро
    address: {
      // адреса появятся позже — пока пусто
      1: "",
      8453: "",
      42161: "",
    },
  },
  {
    symbol: "USDC",
    decimals: 6,
    address: {
      1: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      8453: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      42161: "0xFF970A61A04b1cA14834A43f5de4533eBDDB5CC8",
    },
  },
  {
    symbol: "USDT",
    decimals: 6,
    address: {
      1: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      8453: "", // уточним позже
      42161: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    },
  },
  {
    symbol: "DAI",
    decimals: 18,
    address: {
      1: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      8453: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
      42161: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    },
  },
];

export const findToken = (symbol: string) => TOKENS.find(t => t.symbol === symbol);
export const tokenAddress = (symbol: string, chainId: number) => findToken(symbol)?.address[chainId] ?? "";
export const tokenDecimals = (symbol: string) => findToken(symbol)?.decimals ?? 18;
export const isSoon = (symbol: string) => !!findToken(symbol)?.soon;
