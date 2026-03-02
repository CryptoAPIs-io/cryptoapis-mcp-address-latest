import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { GetNextNonceRequest } from "./types.js";

export type GetNextNonceInput = GetNextNonceRequest & RequestMetadata;

export async function getNextNonce(
    client: CryptoApisHttpClient,
    input: GetNextNonceInput
) {
    const path = `/addresses-latest/evm/${input.blockchain}/${input.network}/${input.address}/next-available-nonce`;

    return client.request<unknown>("GET", path, {
        query: { context: input.context },
    });
}
