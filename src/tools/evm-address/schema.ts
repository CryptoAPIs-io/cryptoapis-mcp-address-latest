import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";
import { EvmAddressAction, EvmAddressBaseSchema } from "./base-schema.js";
import { GetBalanceOutputSchema } from "./get-balance/schema.js";
import { GetNextNonceOutputSchema } from "./get-next-nonce/schema.js";
import { ListTransactionsOutputSchema, TransactionSchema } from "./list-transactions/schema.js";
import { ListTokenTransfersOutputSchema, TokenTransferSchema } from "./list-token-transfers/schema.js";
import { ListInternalTransactionsOutputSchema, InternalTransactionSchema } from "./list-internal-transactions/schema.js";

/**
 * Supported EVM blockchains (union of all endpoints)
 * Source: https://developers.cryptoapis.io/download/175
 */
export const EvmBlockchain = z.enum([
    "ethereum",
    "ethereum-classic",
    "binance-smart-chain",
    "tron",
    "polygon",
    "avalanche",
    "arbitrum",
    "base",
    "optimism",
]);

/**
 * Supported EVM networks (union of all endpoints)
 */
export const EvmNetwork = z.enum([
    "mainnet",
    "mordor",
    "testnet",
    "nile",
    "sepolia",
    "amoy",
    "fuji",
]);

/**
 * Flat schema for all EVM address actions
 * API will validate specific action+blockchain+network combinations
 */
export const EvmAddressToolSchema = z.object({
    action: EvmAddressAction.describe("Action to perform"),
    blockchain: EvmBlockchain.describe("Blockchain protocol"),
    network: EvmNetwork.describe("Network name"),
}).merge(EvmAddressBaseSchema).merge(RequestMetadataSchema).merge(CursorPaginationSchema);

export type EvmAddressInput = z.infer<typeof EvmAddressToolSchema>;

// Re-export base schema
export { EvmAddressAction, EvmAddressBaseSchema } from "./base-schema.js";

// Re-export output schemas
export { GetBalanceOutputSchema } from "./get-balance/schema.js";
export { GetNextNonceOutputSchema } from "./get-next-nonce/schema.js";
export { ListTransactionsOutputSchema, TransactionSchema } from "./list-transactions/schema.js";
export { ListTokenTransfersOutputSchema, TokenTransferSchema } from "./list-token-transfers/schema.js";
export { ListInternalTransactionsOutputSchema, InternalTransactionSchema } from "./list-internal-transactions/schema.js";
