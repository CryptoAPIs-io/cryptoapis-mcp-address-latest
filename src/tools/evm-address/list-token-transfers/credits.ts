import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-cost / x-blockchain-specific-cost). */
export const credits: CreditsPerBlockchain = {
    arbitrum: 352,
    avalanche: 396,
    base: 264,
    "binance-smart-chain": 550,
    ethereum: 220,
    "ethereum-classic": 286,
    optimism: 308,
    polygon: 440,
    tron: 330,
};
