import type { CryptoApisHttpClient, McpLogger, ToolCredits } from "@cryptoapis-io/mcp-shared";
import type * as z from "zod";

export type McpToolDef<TSchema extends z.ZodTypeAny> = {
  name: string;
  description: string;
  /** Optional cost in credits (number for single-action, or action -> credits map). Shown in tool description. */
  credits?: ToolCredits;
  inputSchema: TSchema;
  handler: (client: CryptoApisHttpClient, logger: McpLogger) => (input: z.infer<TSchema>) => Promise<{ content: { type: "text"; text: string }[] }>;
};
