import * as z from "zod";
import { RequestMetadataSchema, OffsetPaginationSchema } from "@cryptoapis-io/mcp-shared";

/**
 * List unconfirmed transactions - offset-based pagination (per OpenAPI).
 */
export const ListUnconfirmedTransactionsAttributesSchema = RequestMetadataSchema.merge(OffsetPaginationSchema);

export type ListUnconfirmedTransactionsAttributes = z.infer<typeof ListUnconfirmedTransactionsAttributesSchema>;

/**
 * Unconfirmed transaction item (per API: hash, id, timestamp, inputs, outputs, etc.)
 */
export const UnconfirmedTransactionSchema = z.object({
    hash: z.string().optional().describe("Transaction hash"),
    id: z.string().optional().describe("Transaction id"),
    timestamp: z.number().optional().describe("Unix timestamp when first seen in mempool"),
    inputs: z.array(z.unknown()).optional(),
    outputs: z.array(z.unknown()).optional(),
}).passthrough();

/**
 * List unconfirmed transactions response - offset-based (limit, offset, total, items).
 */
export const ListUnconfirmedTransactionsOutputSchema = z.object({
    items: z.array(UnconfirmedTransactionSchema).describe("List of unconfirmed transactions"),
    limit: z.number().describe("Number of items returned"),
    offset: z.number().describe("Starting index of response items"),
    total: z.number().describe("Total number of items"),
}).passthrough();

export type ListUnconfirmedTransactionsOutput = z.infer<typeof ListUnconfirmedTransactionsOutputSchema>;
