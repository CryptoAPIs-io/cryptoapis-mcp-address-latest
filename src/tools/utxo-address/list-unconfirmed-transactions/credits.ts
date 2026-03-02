import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-cost / x-blockchain-specific-cost). */
export const credits: CreditsPerBlockchain = {
    bitcoin: 110,
    "bitcoin-cash": 132,
    dash: 121,
    dogecoin: 121,
    litecoin: 121,
    zcash: 143,
};
