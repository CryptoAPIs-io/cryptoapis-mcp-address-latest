import type { CryptoApisHttpClient, RequestMetadata, CursorPaginationParams } from "@cryptoapis-io/mcp-shared";
import type { ListTransactionsRequest } from "./types.js";

export type ListTransactionsInput = ListTransactionsRequest &
    RequestMetadata &
    CursorPaginationParams;

export async function listTransactions(
    client: CryptoApisHttpClient,
    input: ListTransactionsInput
) {
    const path = `/addresses-latest/solana/${input.network}/${input.address}/transactions`;

    return client.request<unknown>("GET", path, {
        query: {
            context: input.context,
            limit: input.limit,
            startingAfter: input.startingAfter,
        },
    });
}
