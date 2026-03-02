import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";
import { KaspaAddressAction, KaspaNetwork, KaspaAddressBaseSchema } from "./base-schema.js";
import { GetBalanceOutputSchema } from "./get-balance/schema.js";
import { ListTransactionsOutputSchema, KaspaTransactionSchema } from "./list-transactions/schema.js";

/**
 * Combined schema for all Kaspa address actions
 */
export const KaspaAddressToolSchema = z.object({
    action: KaspaAddressAction.describe("Action to perform: get-balance, list-transactions"),
    network: KaspaNetwork.describe("Network name: mainnet (only mainnet available)"),
}).merge(KaspaAddressBaseSchema).merge(RequestMetadataSchema).merge(CursorPaginationSchema);

export type KaspaAddressInput = z.infer<typeof KaspaAddressToolSchema>;

// Re-export base schema
export { KaspaAddressAction, KaspaNetwork, KaspaAddressBaseSchema } from "./base-schema.js";

// Re-export output schemas
export { GetBalanceOutputSchema } from "./get-balance/schema.js";
export { ListTransactionsOutputSchema, KaspaTransactionSchema } from "./list-transactions/schema.js";
