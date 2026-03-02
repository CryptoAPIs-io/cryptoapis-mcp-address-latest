import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { getBalance } from "../../../api/solana-address/index.js";

export async function handleGetBalance(
    client: CryptoApisHttpClient,
    input: { network: string; address: string; context?: string }
) {
    return getBalance(client, input);
}
