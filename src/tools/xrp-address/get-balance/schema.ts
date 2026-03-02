import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Get Balance - no additional attributes beyond base
 */
export const GetBalanceAttributesSchema = RequestMetadataSchema;

export type GetBalanceAttributes = z.infer<typeof GetBalanceAttributesSchema>;

/**
 * Get Balance Response
 */
export const GetBalanceOutputSchema = z.object({
    confirmedBalance: z.object({
        amount: z.string().describe("Balance amount"),
        unit: z.string().describe("Currency unit"),
    }).passthrough().describe("Confirmed balance of the address"),
}).passthrough();

export type GetBalanceOutput = z.infer<typeof GetBalanceOutputSchema>;
