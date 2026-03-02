import { startAddressLatestServer } from "./server.js";

function getArg(name: string): string | undefined {
    const idx = process.argv.indexOf(`--${name}`);
    if (idx === -1) return undefined;
    return process.argv[idx + 1];
}

function hasFlag(name: string): boolean {
    return process.argv.includes(`--${name}`);
}

async function main() {
    const transport = (getArg("transport") ?? "stdio") as "stdio" | "http";
    const apiKey = getArg("api-key");

    if (transport === "stdio") {
        await startAddressLatestServer({ transport: "stdio", apiKey });
        return;
    }

    const host = getArg("host") ?? "0.0.0.0";
    const port = Number(getArg("port") ?? "3000");
    const path = getArg("path") ?? "/mcp";
    const stateless = hasFlag("stateless");

    await startAddressLatestServer({ transport: "http", host, port, path, stateless, apiKey });
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
