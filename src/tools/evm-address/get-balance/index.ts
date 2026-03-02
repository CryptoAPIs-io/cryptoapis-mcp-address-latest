import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { getBalance, type GetBalanceInput } from "../../../api/evm-address/get-balance/index.js";

export async function handleGetBalance(client: CryptoApisHttpClient, input: GetBalanceInput) {
    return getBalance(client, input);
}
