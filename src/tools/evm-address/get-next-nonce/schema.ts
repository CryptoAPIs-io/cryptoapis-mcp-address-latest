import * as z from "zod";

/**
 * Supported blockchains for Get Next Available Nonce.
 * Narrower than the tool-wide EvmBlockchain union — the endpoint only exists
 * for ethereum, ethereum-classic, and binance-smart-chain per the spec.
 */
export const GetNextNonceBlockchain = z.enum([
    "ethereum",
    "ethereum-classic",
    "binance-smart-chain",
]);

/**
 * Supported networks for Get Next Available Nonce.
 */
export const GetNextNonceNetwork = z.enum([
    "mainnet",
    "mordor",
    "testnet",
    "sepolia",
]);

/**
 * Get Next Available Nonce response
 */
export const GetNextNonceOutputSchema = z.object({
    nextNonce: z.number().int().min(0).describe("Next available nonce for the address"),
}).passthrough();

export type GetNextNonceOutput = z.infer<typeof GetNextNonceOutputSchema>;
