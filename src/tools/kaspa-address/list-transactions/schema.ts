import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";

/**
 * List Transactions - adds pagination to metadata
 */
export const ListTransactionsAttributesSchema = RequestMetadataSchema.merge(CursorPaginationSchema);

export type ListTransactionsAttributes = z.infer<typeof ListTransactionsAttributesSchema>;

/**
 * Kaspa Transaction item in response
 */
export const KaspaTransactionSchema = z.object({
    transactionId: z.string().describe("Transaction ID"),
    blockHeight: z.number().describe("Block height"),
    blockTimestamp: z.number().describe("Unix timestamp"),
    fee: z.object({
        amount: z.string().describe("Transaction fee"),
        unit: z.string().describe("Currency unit"),
    }).passthrough().describe("Transaction fee"),
}).passthrough();

/**
 * List Transactions Response - cursor paginated
 */
export const ListTransactionsOutputSchema = z.object({
    items: z.array(KaspaTransactionSchema).describe("List of transactions"),
    limit: z.number().describe("Number of items returned"),
    hasMore: z.boolean().describe("Whether more results are available"),
    nextStartingAfter: z.string().optional().describe("Cursor for next page - pass as startingAfter"),
}).passthrough();

export type ListTransactionsOutput = z.infer<typeof ListTransactionsOutputSchema>;
