import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-cost / x-blockchain-specific-cost). */
export const credits: CreditsPerBlockchain = {
    arbitrum: 512,
    avalanche: 576,
    base: 384,
    "binance-smart-chain": 800,
    ethereum: 320,
    "ethereum-classic": 416,
    optimism: 448,
    polygon: 640,
    tron: 480,
};
