import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { getNextSequence } from "../../../api/xrp-address/index.js";

export async function handleGetNextSequence(
    client: CryptoApisHttpClient,
    input: { network: string; address: string; context?: string }
) {
    return getNextSequence(client, input);
}
