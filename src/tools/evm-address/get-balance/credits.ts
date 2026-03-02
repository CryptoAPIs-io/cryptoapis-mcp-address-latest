import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-cost / x-blockchain-specific-cost). */
export const credits: CreditsPerBlockchain = {
    arbitrum: 48,
    avalanche: 54,
    base: 36,
    "binance-smart-chain": 75,
    ethereum: 30,
    "ethereum-classic": 39,
    optimism: 42,
    polygon: 60,
    tron: 45,
};
