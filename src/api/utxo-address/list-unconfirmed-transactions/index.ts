import type {
    CryptoApisHttpClient,
    RequestMetadata,
    OffsetPaginationParams,
} from "@cryptoapis-io/mcp-shared";
import type { ListUnconfirmedTransactionsRequest } from "./types.js";

export type ListUnconfirmedTransactionsInput = ListUnconfirmedTransactionsRequest &
    RequestMetadata &
    OffsetPaginationParams;

/**
 * List unconfirmed transactions by address (UTXO).
 * OpenAPI: List Unconfirmed Transactions by Address UTXOs - uses offset-based pagination.
 */
export async function listUnconfirmedTransactions(
    client: CryptoApisHttpClient,
    input: ListUnconfirmedTransactionsInput
) {
    const path = `/addresses-latest/utxo/${input.blockchain}/${input.network}/${input.address}/unconfirmed-transactions`;

    return client.request<unknown>("GET", path, {
        query: {
            context: input.context,
            limit: input.limit,
            offset: input.offset,
        },
    });
}
