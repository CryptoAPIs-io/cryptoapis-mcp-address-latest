import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { listTokens, type ListTokensInput } from "../../../api/solana-address/list-tokens/index.js";

export async function handleListTokens(client: CryptoApisHttpClient, input: ListTokensInput) {
    return listTokens(client, input);
}
