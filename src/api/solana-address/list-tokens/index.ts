import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { ListTokensRequest } from "./types.js";

export type ListTokensInput = ListTokensRequest & RequestMetadata;

export async function listTokens(
    client: CryptoApisHttpClient,
    input: ListTokensInput
) {
    // Note: Solana tokens endpoint has different path structure; spec only supports context (no pagination)
    const path = `/addresses-latest/solana/${input.network}/addresses/${input.address}/tokens`;

    return client.request<unknown>("GET", path, {
        query: { context: input.context },
    });
}
