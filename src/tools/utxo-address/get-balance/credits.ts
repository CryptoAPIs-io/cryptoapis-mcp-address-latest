import type { CreditsPerBlockchain } from "@cryptoapis-io/mcp-shared";

/** Credits per blockchain (source: OpenAPI x-cost / x-blockchain-specific-cost). */
export const credits: CreditsPerBlockchain = {
    bitcoin: 510,
    "bitcoin-cash": 612,
    dash: 561,
    dogecoin: 561,
    litecoin: 561,
    zcash: 663,
};
