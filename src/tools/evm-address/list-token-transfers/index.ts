import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { listTokenTransfers, type ListTokenTransfersInput } from "../../../api/evm-address/list-token-transfers/index.js";

export async function handleListTokenTransfers(client: CryptoApisHttpClient, input: ListTokenTransfersInput) {
    return listTokenTransfers(client, input);
}
