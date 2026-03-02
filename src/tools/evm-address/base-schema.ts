import * as z from "zod";

/**
 * Actions available for EVM Address Latest endpoints
 */
export const EvmAddressAction = z.enum([
    "get-balance",
    "get-next-nonce",
    "list-transactions",
    "list-token-transfers",
    "list-internal-transactions",
]);

/**
 * Base request for EVM address endpoints - only address field
 * Blockchain/network are defined per-endpoint with specific supported values
 */
export const EvmAddressBaseSchema = z.object({
    address: z.string().describe("Address to query"),
});
