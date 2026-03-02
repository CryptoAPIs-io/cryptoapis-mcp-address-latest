import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";

/**
 * List Transactions - adds pagination to metadata
 */
export const ListTransactionsAttributesSchema = RequestMetadataSchema.merge(CursorPaginationSchema);

export type ListTransactionsAttributes = z.infer<typeof ListTransactionsAttributesSchema>;

/**
 * XRP Transaction item in response
 */
export const XrpTransactionSchema = z.object({
    transactionHash: z.string().describe("Transaction hash"),
    index: z.number().describe("Transaction index in ledger"),
    blockHeight: z.number().describe("Ledger index"),
    blockTimestamp: z.number().describe("Unix timestamp"),
    transactionType: z.string().describe("XRP transaction type"),
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
    items: z.array(XrpTransactionSchema).describe("List of transactions"),
    limit: z.number().describe("Number of items returned"),
    hasMore: z.boolean().describe("Whether more results are available"),
    nextStartingAfter: z.string().optional().describe("Cursor for next page - pass as startingAfter"),
}).passthrough();

export type ListTransactionsOutput = z.infer<typeof ListTransactionsOutputSchema>;
