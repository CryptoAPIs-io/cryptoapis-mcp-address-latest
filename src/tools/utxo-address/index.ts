import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import { UTXO_BLOCKCHAIN_NETWORK_DESCRIPTION } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { UtxoAddressToolSchema, type UtxoAddressInput } from "./schema.js";
import { handleGetBalance } from "./get-balance/index.js";
import { credits as getBalanceCredits } from "./get-balance/credits.js";
import { handleListTransactions } from "./list-transactions/index.js";
import { credits as listTransactionsCredits } from "./list-transactions/credits.js";
import { handleListUnconfirmedTransactions } from "./list-unconfirmed-transactions/index.js";
import { credits as listUnconfirmedTransactionsCredits } from "./list-unconfirmed-transactions/credits.js";

export const utxoAddressTool: McpToolDef<typeof UtxoAddressToolSchema> = {
    name: "utxo_address_latest",
    description: `Query latest UTXO address data (last 14 days).
• get-balance: no pagination
• list-transactions: cursor pagination - use 'nextStartingAfter' from response as 'startingAfter'
• list-unconfirmed-transactions: offset pagination - use 'limit' and 'offset' (lists unconfirmed/mempool transactions)

Actions & supported blockchains:
• get-balance: bitcoin, bitcoin-cash, litecoin, dash, dogecoin, zcash
• list-transactions: bitcoin, bitcoin-cash, dash, dogecoin, litecoin, zcash
• list-unconfirmed-transactions: bitcoin, bitcoin-cash, litecoin, dogecoin, dash, zcash

${UTXO_BLOCKCHAIN_NETWORK_DESCRIPTION}`,
    credits: {
        "get-balance": getBalanceCredits,
        "list-transactions": listTransactionsCredits,
        "list-unconfirmed-transactions": listUnconfirmedTransactionsCredits,
    },
    inputSchema: UtxoAddressToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: UtxoAddressInput) => {
            let result: RequestResult<unknown>;

            const baseParams = {
                blockchain: input.blockchain,
                network: input.network,
                address: input.address,
                context: input.context,
            };

            switch (input.action) {
                case "get-balance":
                    result = await handleGetBalance(client, baseParams);
                    break;
                case "list-transactions":
                    result = await handleListTransactions(client, {
                        ...baseParams,
                        limit: input.limit,
                        startingAfter: input.startingAfter,
                    });
                    break;
                case "list-unconfirmed-transactions":
                    result = await handleListUnconfirmedTransactions(client, {
                        ...baseParams,
                        limit: input.limit,
                        offset: input.offset,
                    });
                    break;
            }

            return {
                content: [{ type: "text", text: JSON.stringify({
                    ...(result.data as object),
                    creditsConsumed: result.creditsConsumed,
                    creditsAvailable: result.creditsAvailable,
                    responseTime: result.responseTime,
                    throughputUsage: result.throughputUsage,
                }) }],
            };
        },
};

export { UtxoAddressToolSchema, type UtxoAddressInput } from "./schema.js";
