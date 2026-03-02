import * as z from "zod";

/**
 * Actions available for Kaspa Address Latest endpoints
 */
export const KaspaAddressAction = z.enum([
    "get-balance",
    "list-transactions",
]);

/**
 * Supported Kaspa networks
 * Source: https://developers.cryptoapis.io/download/175
 */
export const KaspaNetwork = z.enum([
    "mainnet",
]);

/**
 * Base request for Kaspa address endpoints
 */
export const KaspaAddressBaseSchema = z.object({
    address: z.string().describe("Kaspa address to query"),
});
