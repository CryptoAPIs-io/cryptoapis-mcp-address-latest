import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { getBalance } from "../../../api/kaspa-address/index.js";

export async function handleGetBalance(
    client: CryptoApisHttpClient,
    input: { network: string; address: string; context?: string }
) {
    return getBalance(client, input);
}
