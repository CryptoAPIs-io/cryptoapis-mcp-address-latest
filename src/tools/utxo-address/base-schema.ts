import * as z from "zod";

/**
 * Actions available for UTXO Address Latest endpoints
 */
export const UtxoAddressAction = z.enum([
    "get-balance",
    "list-transactions",
    "list-unconfirmed-transactions",
]);

/**
 * Supported UTXO blockchains
 * Source: https://developers.cryptoapis.io/download/175
 */
export const UtxoBlockchain = z.enum([
    "bitcoin",
    "bitcoin-cash",
    "litecoin",
    "dash",
    "dogecoin",
    "zcash",
]);

/**
 * Supported UTXO networks
 */
export const UtxoNetwork = z.enum([
    "mainnet",
    "testnet",
]);

/**
 * Base request for UTXO address endpoints
 */
export const UtxoAddressBaseSchema = z.object({
    blockchain: UtxoBlockchain.describe("Blockchain protocol"),
    network: UtxoNetwork.describe("Network name"),
    address: z.string().describe("Address to query"),
});
