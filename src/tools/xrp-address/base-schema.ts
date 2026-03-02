import * as z from "zod";

/**
 * Actions available for XRP Address Latest endpoints
 */
export const XrpAddressAction = z.enum([
    "get-balance",
    "list-transactions",
    "get-next-sequence",
]);

/**
 * Supported XRP networks
 * Source: https://developers.cryptoapis.io/download/175
 */
export const XrpNetwork = z.enum([
    "mainnet",
    "testnet",
]);

/**
 * Base request for XRP address endpoints
 */
export const XrpAddressBaseSchema = z.object({
    address: z.string().describe("XRP address to query"),
});
