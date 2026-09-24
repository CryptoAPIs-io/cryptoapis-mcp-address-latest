import { parseHttpCliOptions } from "@cryptoapis-io/mcp-shared";
import { startAddressLatestServer } from "./server.js";

function getArg(name: string): string | undefined {
    const idx = process.argv.indexOf(`--${name}`);
    return idx === -1 ? undefined : process.argv[idx + 1];
}

async function main() {
    const transport = (getArg("transport") ?? "stdio") as "stdio" | "http";
    const apiKey = getArg("api-key");
    if (transport === "stdio") {
        await startAddressLatestServer({ transport: "stdio", apiKey });
        return;
    }
    // --host (default 127.0.0.1), --port, --path, --stateless, --auth-token / MCP_AUTH_TOKEN, --allowed-hosts
    await startAddressLatestServer({ transport: "http", apiKey, ...parseHttpCliOptions() });
}

main().catch((err) => {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
});
