import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { buildSupportedChainsContent } from "@cryptoapis-io/mcp-shared";
import { supportedChains } from "./supported-chains.js";

const RESOURCE_URI = "cryptoapis://address-latest/supported-chains";

export function registerResources(server: McpServer): void {
    server.registerResource(
        "supported-chains",
        RESOURCE_URI,
        { description: "Supported blockchains, networks, and actions for address-latest queries" },
        (uri) => ({
            contents: [{
                uri: uri.href,
                mimeType: "application/json",
                text: buildSupportedChainsContent(supportedChains),
            }],
        }),
    );
}
