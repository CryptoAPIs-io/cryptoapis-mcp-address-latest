import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";

/**
 * Supported blockchains for List Token Transfers EVM
 * Source: https://developers.cryptoapis.io/download/175
 */
export const ListTokenTransfersBlockchain = z.enum([
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
 * Supported networks for List Token Transfers EVM
 */
export const ListTokenTransfersNetwork = z.enum([
    "mainnet",
    "mordor",
    "testnet",
    "nile",
    "sepolia",
    "amoy",
    "fuji",
]);

/**
 * List Token Transfers - includes blockchain/network specific to this endpoint
 */
export const ListTokenTransfersAttributesSchema = z.object({
    blockchain: ListTokenTransfersBlockchain.describe("Blockchain protocol"),
    network: ListTokenTransfersNetwork.describe("Network name"),
}).merge(RequestMetadataSchema).merge(CursorPaginationSchema);

export type ListTokenTransfersAttributes = z.infer<typeof ListTokenTransfersAttributesSchema>;

/**
 * Token transfer item in response
 */
export const TokenTransferSchema = z.object({
    transactionHash: z.string().describe("Transaction hash"),
    blockHeight: z.number().describe("Block number"),
    blockTimestamp: z.number().describe("Unix timestamp of the block"),
    from: z.string().describe("Sender address"),
    to: z.string().describe("Recipient address"),
    tokenType: z.string().describe("Token type (ERC-20, ERC-721, ERC-1155)"),
    tokenContractAddress: z.string().describe("Token contract address"),
    tokenName: z.string().optional().describe("Token name"),
    tokenSymbol: z.string().optional().describe("Token symbol"),
    tokenDecimals: z.number().optional().describe("Token decimals"),
    value: z.string().describe("Transfer value"),
    tokenId: z.string().optional().describe("Token ID (for NFTs)"),
}).passthrough();

/**
 * List Token Transfers Response
 */
export const ListTokenTransfersOutputSchema = z.object({
    items: z.array(TokenTransferSchema).describe("List of token transfers"),
    limit: z.number().describe("Number of items returned"),
    hasMore: z.boolean().describe("Whether more results are available"),
    nextStartingAfter: z.string().optional().describe("Cursor for next page - pass as startingAfter"),
}).passthrough();

export type ListTokenTransfersOutput = z.infer<typeof ListTokenTransfersOutputSchema>;
