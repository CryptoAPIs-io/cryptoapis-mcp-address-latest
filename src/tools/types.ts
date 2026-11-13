import type { CryptoApisHttpClient, McpLogger, ToolCredits, ToolAnnotations } from "@cryptoapis-io/mcp-shared";
import type * as z from "zod";

export type McpToolDef<TSchema extends z.ZodTypeAny> = {
  name: string;
  /** Human-readable name clients show instead of the tool name. */
  title: string;
  /** Behaviour hints (read-only, destructive, ...); pick a preset from mcp-shared. */
  annotations: ToolAnnotations;
  description: string;
  /** Optional cost in credits (number for single-action, or action -> credits map). Shown in tool description. */
  credits?: ToolCredits;
  inputSchema: TSchema;
  handler: (client: CryptoApisHttpClient, logger: McpLogger) => (input: z.infer<TSchema>) => Promise<{ content: { type: "text"; text: string }[] }>;
};
