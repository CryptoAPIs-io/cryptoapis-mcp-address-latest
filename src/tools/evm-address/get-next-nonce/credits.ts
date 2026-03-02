import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-cost / x-blockchain-specific-cost). */
export const credits: CreditsPerBlockchain = {
    arbitrum: 32,
    avalanche: 36,
    base: 24,
    "binance-smart-chain": 50,
    ethereum: 20,
    "ethereum-classic": 26,
    optimism: 28,
    polygon: 40,
    tron: 30,
};
