import * as z from "zod";

/**
 * Actions available for Solana Address Latest endpoints
 */
export const SolanaAddressAction = z.enum([
    "get-balance",
    "list-transactions",
    "list-tokens",
]);

/**
 * Supported Solana networks
 * Source: https://developers.cryptoapis.io/download/175
 */
export const SolanaNetwork = z.enum([
    "mainnet",
    "devnet",
]);

/**
 * Base request for Solana address endpoints
 */
export const SolanaAddressBaseSchema = z.object({
    address: z.string().describe("Solana address to query"),
});
