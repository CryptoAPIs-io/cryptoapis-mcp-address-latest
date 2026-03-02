import type {
    CryptoApisHttpClient,
    RequestMetadata,
    CursorPaginationParams,
} from "@cryptoapis-io/mcp-shared";
import type { ListInternalTransactionsRequest } from "./types.js";

export type ListInternalTransactionsInput = ListInternalTransactionsRequest &
    RequestMetadata &
    CursorPaginationParams;

export async function listInternalTransactions(
    client: CryptoApisHttpClient,
    input: ListInternalTransactionsInput
) {
    const path = `/addresses-latest/evm/${input.blockchain}/${input.network}/${input.address}/internal-transactions`;

    return client.request<unknown>("GET", path, {
        query: {
            context: input.context,
            limit: input.limit,
            startingAfter: input.startingAfter,
            sortingOrder: input.sortingOrder,
        },
    });
}
