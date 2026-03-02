import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

/**
 * List Tokens - metadata only (API does not support pagination for this endpoint)
 */
export const ListTokensAttributesSchema = RequestMetadataSchema;

export type ListTokensAttributes = z.infer<typeof ListTokensAttributesSchema>;

/**
 * Solana Token item in response
 */
export const SolanaTokenSchema = z.object({
    tokenAddress: z.string().describe("Token mint address"),
    tokenName: z.string().optional().describe("Token name"),
    tokenSymbol: z.string().optional().describe("Token symbol"),
    tokenDecimals: z.number().optional().describe("Token decimals"),
    balance: z.string().describe("Token balance"),
}).passthrough();

/**
 * List Tokens Response
 */
export const ListTokensOutputSchema = z.object({
    items: z.array(SolanaTokenSchema).describe("List of tokens"),
    limit: z.number().optional().describe("Number of items returned"),
    hasMore: z.boolean().optional().describe("Whether more results are available"),
    nextStartingAfter: z.string().optional().describe("Cursor for next page - pass as startingAfter"),
}).passthrough();

export type ListTokensOutput = z.infer<typeof ListTokensOutputSchema>;
