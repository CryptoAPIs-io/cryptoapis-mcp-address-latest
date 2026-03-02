import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Supported blockchains for List Transactions EVM
 * Source: https://developers.cryptoapis.io/download/175
 */
export const ListTransactionsBlockchain = z.enum([
    "ethereum",
    "ethereum-classic",
    "binance-smart-chain",
    "arbitrum",
    "polygon",
    "avalanche",
    "base",
    "optimism",
    "tron",
]);

/**
 * Supported networks for List Transactions EVM
 */
export const ListTransactionsNetwork = z.enum([
    "mainnet",
    "mordor",
    "testnet",
    "sepolia",
    "amoy",
    "fuji",
    "nile",
]);

/**
 * List Transactions - includes blockchain/network specific to this endpoint
 */
export const ListTransactionsAttributesSchema = z.object({
    blockchain: ListTransactionsBlockchain.describe("Blockchain protocol"),
    network: ListTransactionsNetwork.describe("Network name"),
}).merge(RequestMetadataSchema).merge(CursorPaginationSchema);

export type ListTransactionsAttributes = z.infer<typeof ListTransactionsAttributesSchema>;

/**
 * Transaction item in response
 */
export const TransactionSchema = z.object({
    transactionHash: z.string().describe("Transaction hash"),
    blockHeight: z.number().describe("Block number"),
    blockTimestamp: z.number().describe("Unix timestamp of the block"),
    from: z.string().describe("Sender address"),
    to: z.string().describe("Recipient address"),
    value: z.object({
        amount: z.string().describe("Transaction value"),
        unit: z.string().describe("Currency unit"),
    }).passthrough().describe("Transaction value"),
    fee: z.object({
        amount: z.string().describe("Transaction fee"),
        unit: z.string().describe("Currency unit"),
    }).passthrough().describe("Transaction fee"),
    status: z.string().describe("Transaction status"),
}).passthrough();

/**
 * List Transactions Response - cursor paginated
 */
export const ListTransactionsOutputSchema = z.object({
    items: z.array(TransactionSchema).describe("List of transactions"),
    limit: z.number().describe("Number of items returned"),
    hasMore: z.boolean().describe("Whether more results are available"),
    nextStartingAfter: z.string().optional().describe("Cursor for next page - pass as startingAfter"),
}).passthrough();

export type ListTransactionsOutput = z.infer<typeof ListTransactionsOutputSchema>;
