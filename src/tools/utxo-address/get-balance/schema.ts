import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Get Balance - no additional attributes beyond base and metadata
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
    totalReceived: z.object({
        amount: z.string().describe("Total received amount"),
        unit: z.string().describe("Currency unit"),
    }).passthrough().describe("Total amount received"),
    totalSpent: z.object({
        amount: z.string().describe("Total spent amount"),
        unit: z.string().describe("Currency unit"),
    }).passthrough().describe("Total amount spent"),
}).passthrough();

export type GetBalanceOutput = z.infer<typeof GetBalanceOutputSchema>;
