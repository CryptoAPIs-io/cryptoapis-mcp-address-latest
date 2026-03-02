import type { CryptoApisHttpClient } from "@cryptoapis-io/mcp-shared";
import { listTransactions, type ListTransactionsInput } from "../../../api/utxo-address/list-transactions/index.js";

export async function handleListTransactions(client: CryptoApisHttpClient, input: ListTransactionsInput) {
    return listTransactions(client, input);
}
