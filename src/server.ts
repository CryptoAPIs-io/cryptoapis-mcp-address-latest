import { randomUUID } from "node:crypto";
import express from "express";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

import { CryptoApisHttpClient, formatCreditsForDescription, loadSharedConfig, McpLogger, runWithApiKey } from "@cryptoapis-io/mcp-shared";
import { tools } from "./tools/index.js";
import { registerResources } from "./resources/index.js";
import { registerPrompts } from "./prompts/index.js";

const CRYPTOAPIS_SERVER_INFO = {
    name: "cryptoapis-address-latest",
    version: "0.1.0",
    title: "CryptoAPIs Address Latest",
    websiteUrl: "https://developers.cryptoapis.io",
    icons: [
        { src: "https://cryptoapis.io/cryptoapis/images/logo.svg", mimeType: "image/svg+xml", sizes: ["any"], theme: "light" as const },
        { src: "https://cryptoapis.io/cryptoapis/images/logo-black.svg", mimeType: "image/svg+xml", sizes: ["any"], theme: "dark" as const },
    ],
};

// Build an MCP server instance with tools registered
function buildServer(client: CryptoApisHttpClient) {
    const server = new McpServer(CRYPTOAPIS_SERVER_INFO);
    const logger = new McpLogger((params) => server.sendLoggingMessage(params), CRYPTOAPIS_SERVER_INFO.name);

    for (const t of tools) {
        const description =
            t.credits != null ? `${t.description}\n\n${formatCreditsForDescription(t.credits)}` : t.description;
        server.registerTool(t.name, { description, inputSchema: t.inputSchema }, (input: Record<string, unknown>) => {
            logger.logDebug({ tool: t.name, event: "tool_call", input });
            return t.handler(client, logger)(input as never).catch((err: unknown) => {
                logger.logError(err instanceof Error ? err.message : String(err), {
                    tool: t.name,
                    action: input.action,
                    blockchain: input.blockchain,
                    network: input.network,
                });
                throw err;
            });
        });
    }

    registerResources(server);
    registerPrompts(server);

    return { server, logger };
}

export type StartOptions =
    | { transport: "stdio"; apiKey?: string }
    | { transport: "http"; host?: string; port?: number; path?: string; stateless?: boolean; apiKey?: string };

export async function startAddressLatestServer(opts: StartOptions) {
    const isHttp = opts.transport === "http";
    const cfg = loadSharedConfig({ apiKey: opts.apiKey, allowMissingApiKey: isHttp });
    const client = new CryptoApisHttpClient(cfg);
    const { server, logger } = buildServer(client);

    if (opts.transport === "stdio") {
        // IMPORTANT: don't write to stdout for stdio transport (it breaks JSON-RPC stream)
        const transport = new StdioServerTransport();
        await server.connect(transport);
        logger.logInfo("cryptoapis-address-latest MCP running (stdio)");
        return;
    }

    const host = opts.host ?? "0.0.0.0";
    const port = opts.port ?? 3000;
    const path = opts.path ?? "/mcp";
    const stateless = opts.stateless ?? false;

    const transport = new StreamableHTTPServerTransport({
        // If undefined => stateless mode (good for serverless / easy scaling)
        sessionIdGenerator: stateless ? undefined : () => randomUUID(),
    });

    await server.connect(transport);

    const app = express();
    app.use(express.json({ limit: "1mb" }));

    // Streamable HTTP uses POST/GET/DELETE on the same endpoint.
    app.all(path, (req, res) => {
        const headerApiKey = req.headers["x-api-key"] as string | undefined;
        if (headerApiKey && !cfg.apiKey) {
            return runWithApiKey(headerApiKey, () => transport.handleRequest(req, res, req.body));
        }
        return transport.handleRequest(req, res, req.body);
    });

    app.get("/health", (_req, res) => res.status(200).json({ ok: true }));

    app.listen(port, host, () => {
        logger.logInfo(`cryptoapis-address-latest MCP running (http) at http://${host}:${port}${path}`);
        logger.logInfo(`mode: ${stateless ? "stateless" : "stateful"}`);
        if (cfg.apiKey) {
            logger.logInfo("API key: provided at startup — x-api-key request headers will be ignored");
        } else {
            logger.logInfo("API key: not provided — each request must include x-api-key header");
        }
    });
}
