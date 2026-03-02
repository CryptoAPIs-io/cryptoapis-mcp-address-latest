import type {
    CryptoApisHttpClient,
    RequestMetadata,
    CursorPaginationParams,
} from "@cryptoapis-io/mcp-shared";
import type { ListTokenTransfersRequest } from "./types.js";

export type ListTokenTransfersInput = ListTokenTransfersRequest &
    RequestMetadata &
    CursorPaginationParams;

export async function listTokenTransfers(
    client: CryptoApisHttpClient,
    input: ListTokenTransfersInput
) {
    const path = `/addresses-latest/evm/${input.blockchain}/${input.network}/${input.address}/tokens-transfers`;

    return client.request<unknown>("GET", path, {
        query: {
            context: input.context,
            limit: input.limit,
            startingAfter: input.startingAfter,
            sortingOrder: input.sortingOrder,
        },
    });
}
