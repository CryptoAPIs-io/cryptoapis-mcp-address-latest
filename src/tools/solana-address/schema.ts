import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";
import { SolanaAddressAction, SolanaNetwork, SolanaAddressBaseSchema } from "./base-schema.js";
import { GetBalanceOutputSchema } from "./get-balance/schema.js";
import { ListTransactionsOutputSchema, SolanaTransactionSchema } from "./list-transactions/schema.js";
import { ListTokensOutputSchema, SolanaTokenSchema } from "./list-tokens/schema.js";

/**
 * Combined schema for all Solana address actions
 */
export const SolanaAddressToolSchema = z.object({
    action: SolanaAddressAction.describe("Action to perform: get-balance, list-transactions, list-tokens"),
    network: SolanaNetwork.describe("Network name: mainnet or devnet"),
}).merge(SolanaAddressBaseSchema).merge(RequestMetadataSchema).merge(CursorPaginationSchema);

export type SolanaAddressInput = z.infer<typeof SolanaAddressToolSchema>;

// Re-export base schema
export { SolanaAddressAction, SolanaNetwork, SolanaAddressBaseSchema } from "./base-schema.js";

// Re-export output schemas
export { GetBalanceOutputSchema } from "./get-balance/schema.js";
export { ListTransactionsOutputSchema, SolanaTransactionSchema } from "./list-transactions/schema.js";
export { ListTokensOutputSchema, SolanaTokenSchema } from "./list-tokens/schema.js";
