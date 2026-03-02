import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Get Next Sequence - no additional attributes beyond base
 */
export const GetNextSequenceAttributesSchema = RequestMetadataSchema;

export type GetNextSequenceAttributes = z.infer<typeof GetNextSequenceAttributesSchema>;

/**
 * Get Next Sequence Response
 */
export const GetNextSequenceOutputSchema = z.object({
    nextAvailableSequence: z.number().describe("Next available sequence number for transactions"),
}).passthrough();

export type GetNextSequenceOutput = z.infer<typeof GetNextSequenceOutputSchema>;
