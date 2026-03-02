import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-cost / x-blockchain-specific-cost). */
export const credits: CreditsPerBlockchain = {
    arbitrum: 192,
    avalanche: 216,
    base: 144,
    "binance-smart-chain": 300,
    ethereum: 120,
    "ethereum-classic": 156,
    optimism: 168,
    polygon: 240,
    tron: 180,
};
