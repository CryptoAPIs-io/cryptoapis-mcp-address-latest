import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { listUnconfirmedTransactions, type ListUnconfirmedTransactionsInput } from "../../../api/utxo-address/list-unconfirmed-transactions/index.js";

export async function handleListUnconfirmedTransactions(
    client: CryptoApisHttpClient,
    input: ListUnconfirmedTransactionsInput
) {
    return listUnconfirmedTransactions(client, {
        ...input,
        offset: input.offset ?? 0,
    });
}
