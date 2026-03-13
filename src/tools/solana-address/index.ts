import type { CryptoApisHttpClient, McpLogger, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { SolanaAddressToolSchema, type SolanaAddressInput } from "./schema.js";
import { handleGetBalance } from "./get-balance/index.js";
import { credits as getBalanceCredits } from "./get-balance/credits.js";
import { handleListTransactions } from "./list-transactions/index.js";
import { credits as listTransactionsCredits } from "./list-transactions/credits.js";
import { handleListTokens } from "./list-tokens/index.js";
import { credits as listTokensCredits } from "./list-tokens/credits.js";

export const solanaAddressTool: McpToolDef<typeof SolanaAddressToolSchema> = {
    name: "solana_address_latest",
    description: `Query latest Solana address data (last 14 days). Cursor pagination: use 'nextStartingAfter' from response as 'startingAfter'.

Actions:
• get-balance: Get address SOL balance
• list-transactions: Get address transactions
• list-tokens: Get SPL tokens held by address

Networks: mainnet, devnet`,
    credits: {
        "get-balance": getBalanceCredits,
        "list-tokens": listTokensCredits,
        "list-transactions": listTransactionsCredits,
    },
    inputSchema: SolanaAddressToolSchema,
    handler:
        (client: CryptoApisHttpClient, logger: McpLogger) =>
        async (input: SolanaAddressInput) => {
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
                case "list-tokens":
                    result = await handleListTokens(client, baseParams);
                    break;
                default:
                    throw new Error(`Unknown action: ${(input as any).action}`);
            }

            logger.logInfo({
                tool: "solana_address_latest",
                action: input.action,
                blockchain: "solana",
                network: input.network,
                creditsConsumed: result.creditsConsumed,
                creditsAvailable: result.creditsAvailable,
                responseTime: result.responseTime,
                throughputUsage: result.throughputUsage,
            });

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

export { SolanaAddressToolSchema, type SolanaAddressInput } from "./schema.js";
