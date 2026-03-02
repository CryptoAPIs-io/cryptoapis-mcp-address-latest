import * as z from "zod";

/**
 * Get Next Available Nonce response
 */
export const GetNextNonceOutputSchema = z.object({
    nextNonce: z.number().int().min(0).describe("Next available nonce for the address"),
}).passthrough();

export type GetNextNonceOutput = z.infer<typeof GetNextNonceOutputSchema>;
