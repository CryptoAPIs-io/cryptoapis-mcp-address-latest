import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { XrpAddressToolSchema, type XrpAddressInput } from "./schema.js";
import { handleGetBalance } from "./get-balance/index.js";
import { credits as getBalanceCredits } from "./get-balance/credits.js";
import { handleListTransactions } from "./list-transactions/index.js";
import { credits as listTransactionsCredits } from "./list-transactions/credits.js";
import { handleGetNextSequence } from "./get-next-sequence/index.js";
import { credits as getNextSequenceCredits } from "./get-next-sequence/credits.js";

export const xrpAddressTool: McpToolDef<typeof XrpAddressToolSchema> = {
    name: "xrp_address_latest",
    description: `Query latest XRP (Ripple) address data. Cursor pagination: use 'nextStartingAfter' from response as 'startingAfter'.

Actions:
• get-balance: Get address XRP balance
• list-transactions: Get address transactions
• get-next-sequence: Get next available sequence number for transactions

Networks: mainnet, testnet`,
    credits: {
        "get-balance": getBalanceCredits,
        "get-next-sequence": getNextSequenceCredits,
        "list-transactions": listTransactionsCredits,
    },
    inputSchema: XrpAddressToolSchema,
    handler:
        (client: CryptoApisHttpClient) =>
        async (input: XrpAddressInput) => {
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
                case "get-next-sequence":
                    result = await handleGetNextSequence(client, baseParams);
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

export { XrpAddressToolSchema, type XrpAddressInput } from "./schema.js";
