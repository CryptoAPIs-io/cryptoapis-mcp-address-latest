import * as z from "zod";
import { RequestMetadataSchema, CursorPaginationSchema, OffsetPaginationSchema } from "@cryptoapis-io/mcp-shared";
import { UtxoAddressAction, UtxoAddressBaseSchema } from "./base-schema.js";

/**
 * Combined schema for all UTXO address actions.
 * list-transactions uses cursor pagination (limit, startingAfter); list-unconfirmed-transactions uses offset (limit, offset).
 */
export const UtxoAddressToolSchema = z.object({
    action: UtxoAddressAction.describe("Action to perform: get-balance, list-transactions, list-unconfirmed-transactions"),
}).merge(UtxoAddressBaseSchema).merge(RequestMetadataSchema).merge(CursorPaginationSchema).merge(OffsetPaginationSchema);

export type UtxoAddressInput = z.infer<typeof UtxoAddressToolSchema>;

// Re-export base schema
export { UtxoAddressAction, UtxoAddressBaseSchema } from "./base-schema.js";

// Re-export action attribute schemas
export { GetBalanceAttributesSchema, GetBalanceOutputSchema } from "./get-balance/schema.js";
export { ListTransactionsAttributesSchema, ListTransactionsOutputSchema, UtxoTransactionSchema } from "./list-transactions/schema.js";
export { ListUnconfirmedTransactionsAttributesSchema, ListUnconfirmedTransactionsOutputSchema, UnconfirmedTransactionSchema } from "./list-unconfirmed-transactions/schema.js";
