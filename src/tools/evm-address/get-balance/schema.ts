import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Supported blockchains for Get Balance EVM
 * Source: https://developers.cryptoapis.io/download/175
 */
export const GetBalanceBlockchain = z.enum([
    "ethereum",
    "ethereum-classic",
    "binance-smart-chain",
    "tron",
    "polygon",
    "avalanche",
    "arbitrum",
    "base",
    "optimism",
]);

/**
 * Supported networks for Get Balance EVM
 */
export const GetBalanceNetwork = z.enum([
    "mainnet",
    "mordor",
    "testnet",
    "nile",
    "sepolia",
    "amoy",
    "fuji",
]);

/**
 * Get Balance - includes blockchain/network specific to this endpoint
 */
export const GetBalanceAttributesSchema = z.object({
    blockchain: GetBalanceBlockchain.describe("Blockchain protocol"),
    network: GetBalanceNetwork.describe("Network name"),
}).merge(RequestMetadataSchema);

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
