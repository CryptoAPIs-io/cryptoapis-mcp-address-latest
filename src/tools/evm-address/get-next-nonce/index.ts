import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { getNextNonce, type GetNextNonceInput } from "../../../api/evm-address/get-next-nonce/index.js";

export async function handleGetNextNonce(client: CryptoApisHttpClient, input: GetNextNonceInput) {
    return getNextNonce(client, input);
}
