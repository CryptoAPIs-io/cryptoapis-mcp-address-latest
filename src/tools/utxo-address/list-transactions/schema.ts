import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";

/**
 * List Transactions - adds pagination to base and metadata
 */
export const ListTransactionsAttributesSchema = RequestMetadataSchema.merge(CursorPaginationSchema);

export type ListTransactionsAttributes = z.infer<typeof ListTransactionsAttributesSchema>;

/**
 * UTXO Transaction item in response
 */
export const UtxoTransactionSchema = z.object({
    transactionId: z.string().describe("Transaction ID"),
    blockHeight: z.number().describe("Block number"),
    blockTimestamp: z.number().describe("Unix timestamp of the block"),
    fee: z.object({
        amount: z.string().describe("Transaction fee"),
        unit: z.string().describe("Currency unit"),
    }).passthrough().describe("Transaction fee"),
    inputs: z.array(z.object({
        address: z.string().describe("Input address"),
        value: z.object({
            amount: z.string().describe("Input value"),
            unit: z.string().describe("Currency unit"),
        }).passthrough(),
    }).passthrough()).describe("Transaction inputs"),
    outputs: z.array(z.object({
        address: z.string().describe("Output address"),
        value: z.object({
            amount: z.string().describe("Output value"),
            unit: z.string().describe("Currency unit"),
        }).passthrough(),
    }).passthrough()).describe("Transaction outputs"),
}).passthrough();

/**
 * List Transactions Response
 */
export const ListTransactionsOutputSchema = z.object({
    items: z.array(UtxoTransactionSchema).describe("List of transactions"),
    limit: z.number().describe("Number of items returned"),
    hasMore: z.boolean().describe("Whether more results are available"),
    nextStartingAfter: z.string().optional().describe("Cursor for next page - pass as startingAfter"),
}).passthrough();

export type ListTransactionsOutput = z.infer<typeof ListTransactionsOutputSchema>;
