import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema } from "@cryptoapis-io/mcp-shared";
import { XrpAddressAction, XrpNetwork, XrpAddressBaseSchema } from "./base-schema.js";
import { GetBalanceOutputSchema } from "./get-balance/schema.js";
import { ListTransactionsOutputSchema, XrpTransactionSchema } from "./list-transactions/schema.js";
import { GetNextSequenceOutputSchema } from "./get-next-sequence/schema.js";

/**
 * Combined schema for all XRP address actions
 */
export const XrpAddressToolSchema = z.object({
    action: XrpAddressAction.describe("Action to perform: get-balance, list-transactions, get-next-sequence"),
    network: XrpNetwork.describe("Network name: mainnet or testnet"),
}).merge(XrpAddressBaseSchema).merge(RequestMetadataSchema).merge(CursorPaginationSchema);

export type XrpAddressInput = z.infer<typeof XrpAddressToolSchema>;

// Re-export base schema
export { XrpAddressAction, XrpNetwork, XrpAddressBaseSchema } from "./base-schema.js";

// Re-export output schemas
export { GetBalanceOutputSchema } from "./get-balance/schema.js";
export { ListTransactionsOutputSchema, XrpTransactionSchema } from "./list-transactions/schema.js";
export { GetNextSequenceOutputSchema } from "./get-next-sequence/schema.js";
