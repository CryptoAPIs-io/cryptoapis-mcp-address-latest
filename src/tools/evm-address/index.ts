import type { CryptoApisHttpClient, McpLogger, RequestResult } from "@cryptoapis-io/mcp-shared";
import { EVM_BLOCKCHAIN_NETWORK_DESCRIPTION } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { EvmAddressToolSchema, type EvmAddressInput } from "./schema.js";
import { handleGetBalance } from "./get-balance/index.js";
import { credits as getBalanceCredits } from "./get-balance/credits.js";
import { handleGetNextNonce } from "./get-next-nonce/index.js";
import { credits as getNextNonceCredits } from "./get-next-nonce/credits.js";
import { handleListTransactions } from "./list-transactions/index.js";
import { credits as listTransactionsCredits } from "./list-transactions/credits.js";
import { handleListTokenTransfers } from "./list-token-transfers/index.js";
import { credits as listTokenTransfersCredits } from "./list-token-transfers/credits.js";
import { handleListInternalTransactions } from "./list-internal-transactions/index.js";
import { credits as listInternalTransactionsCredits } from "./list-internal-transactions/credits.js";

export const evmAddressTool: McpToolDef<typeof EvmAddressToolSchema> = {
    name: "evm_address_latest",
    description: `Query latest EVM address data (last 14 days). Cursor pagination: use 'nextStartingAfter' from response as 'startingAfter'.

Actions & supported blockchains:
• get-balance: ethereum, ethereum-classic, binance-smart-chain, tron, polygon, avalanche (C-Chain), arbitrum, base, optimism
• get-next-nonce: ethereum, ethereum-classic, binance-smart-chain (mainnet, mordor, testnet, sepolia)
• list-transactions: ethereum, ethereum-classic, binance-smart-chain, arbitrum, polygon, avalanche (C-Chain), base, optimism, tron
• list-token-transfers: ethereum, ethereum-classic, binance-smart-chain, tron, polygon, avalanche (C-Chain), arbitrum, base, optimism
• list-internal-transactions: ethereum, ethereum-classic, binance-smart-chain, polygon, avalanche (C-Chain), arbitrum, base, optimism, tron

${EVM_BLOCKCHAIN_NETWORK_DESCRIPTION}`,
    credits: {
        "get-balance": getBalanceCredits,
        "get-next-nonce": getNextNonceCredits,
        "list-internal-transactions": listInternalTransactionsCredits,
        "list-token-transfers": listTokenTransfersCredits,
        "list-transactions": listTransactionsCredits,
    },
    inputSchema: EvmAddressToolSchema,
    handler:
        (client: CryptoApisHttpClient, logger: McpLogger) =>
        async (input: EvmAddressInput) => {
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
                case "get-next-nonce":
                    result = await handleGetNextNonce(client, baseParams);
                    break;
                case "list-transactions":
                    result = await handleListTransactions(client, {
                        ...baseParams,
                        limit: input.limit,
                        startingAfter: input.startingAfter,
                        sortingOrder: input.sortingOrder,
                    });
                    break;
                case "list-token-transfers":
                    result = await handleListTokenTransfers(client, {
                        ...baseParams,
                        limit: input.limit,
                        startingAfter: input.startingAfter,
                        sortingOrder: input.sortingOrder,
                    });
                    break;
                case "list-internal-transactions":
                    result = await handleListInternalTransactions(client, {
                        ...baseParams,
                        limit: input.limit,
                        startingAfter: input.startingAfter,
                        sortingOrder: input.sortingOrder,
                    });
                    break;
                default:
                    throw new Error(`Unknown action: ${(input as any).action}`);
            }

            logger.logInfo({
                tool: "evm_address_latest",
                action: input.action,
                blockchain: input.blockchain,
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

export { EvmAddressToolSchema, type EvmAddressInput } from "./schema.js";
