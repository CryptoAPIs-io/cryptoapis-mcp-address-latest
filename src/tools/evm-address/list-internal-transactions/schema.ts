import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Supported blockchains for List Internal Transactions EVM
 * Source: https://developers.cryptoapis.io/download/175
 */
export const ListInternalTransactionsBlockchain = z.enum([
    "ethereum",
    "ethereum-classic",
    "binance-smart-chain",
    "polygon",
    "avalanche",
    "arbitrum",
    "base",
    "optimism",
    "tron",
]);

/**
 * Supported networks for List Internal Transactions EVM
 */
export const ListInternalTransactionsNetwork = z.enum([
    "mainnet",
    "mordor",
    "testnet",
    "sepolia",
    "amoy",
    "fuji",
    "nile",
]);

/**
 * List Internal Transactions - includes blockchain/network specific to this endpoint
 */
export const ListInternalTransactionsAttributesSchema = z.object({
    blockchain: ListInternalTransactionsBlockchain.describe("Blockchain protocol"),
    network: ListInternalTransactionsNetwork.describe("Network name"),
}).merge(RequestMetadataSchema).merge(CursorPaginationSchema);

export type ListInternalTransactionsAttributes = z.infer<typeof ListInternalTransactionsAttributesSchema>;

/**
 * Internal transaction item in response
 */
export const InternalTransactionSchema = z.object({
    transactionHash: z.string().describe("Parent transaction hash"),
    blockHeight: z.number().describe("Block number"),
    blockTimestamp: z.number().describe("Unix timestamp of the block"),
    from: z.string().describe("Sender address"),
    to: z.string().describe("Recipient address"),
    value: z.object({
        amount: z.string().describe("Transfer value"),
        unit: z.string().describe("Currency unit"),
    }).passthrough().describe("Internal transaction value"),
    operationType: z.string().describe("Operation type (call, create, etc.)"),
}).passthrough();

/**
 * List Internal Transactions Response
 */
export const ListInternalTransactionsOutputSchema = z.object({
    items: z.array(InternalTransactionSchema).describe("List of internal transactions"),
    limit: z.number().describe("Number of items returned"),
    hasMore: z.boolean().describe("Whether more results are available"),
    nextStartingAfter: z.string().optional().describe("Cursor for next page - pass as startingAfter"),
}).passthrough();

export type ListInternalTransactionsOutput = z.infer<typeof ListInternalTransactionsOutputSchema>;
