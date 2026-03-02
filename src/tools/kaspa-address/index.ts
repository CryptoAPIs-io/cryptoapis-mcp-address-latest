import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { KaspaAddressToolSchema, type KaspaAddressInput } from "./schema.js";
import { handleGetBalance } from "./get-balance/index.js";
import { credits as getBalanceCredits } from "./get-balance/credits.js";
import { handleListTransactions } from "./list-transactions/index.js";
import { credits as listTransactionsCredits } from "./list-transactions/credits.js";

export const kaspaAddressTool: McpToolDef<typeof KaspaAddressToolSchema> = {
    name: "kaspa_address_latest",
    description: `Query latest Kaspa address data. Cursor pagination: use 'nextStartingAfter' from response as 'startingAfter'.

Actions:
• get-balance: Get address KAS balance
• list-transactions: Get address transactions

Networks: mainnet (only)`,
    credits: {
        "get-balance": getBalanceCredits,
        "list-transactions": listTransactionsCredits,
    },
    inputSchema: KaspaAddressToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: KaspaAddressInput) => {
            let result: RequestResult<unknown>;

            const baseParams = {
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

export { KaspaAddressToolSchema, type KaspaAddressInput } from "./schema.js";
