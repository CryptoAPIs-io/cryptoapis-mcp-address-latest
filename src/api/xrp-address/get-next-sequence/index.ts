import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";
import type { GetNextSequenceRequest } from "./types.js";

export type GetNextSequenceInput = GetNextSequenceRequest & RequestMetadata;

export async function getNextSequence(
    client: CryptoApisHttpClient,
    input: GetNextSequenceInput
) {
    const path = `/addresses-latest/xrp/${input.network}/${input.address}/next-available-sequence`;

    return client.request<unknown>("GET", path, {
        query: { context: input.context },
    });
}
