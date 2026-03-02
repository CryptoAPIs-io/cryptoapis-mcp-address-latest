import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { GetBalanceRequest } from "./types.js";

export type GetBalanceInput = GetBalanceRequest & RequestMetadata;

export async function getBalance(
    client: CryptoApisHttpClient,
    input: GetBalanceInput
) {
    const path = `/addresses-latest/xrp/${input.network}/${input.address}/balance`;

    return client.request<unknown>("GET", path, {
        query: { context: input.context },
    });
}
