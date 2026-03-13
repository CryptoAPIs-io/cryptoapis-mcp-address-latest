import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { formatSupportedChains } from "@cryptoapis-io/mcp-shared";
import { supportedChains } from "../resources/supported-chains.js";

export function registerPrompts(server: McpServer): void {
    server.registerPrompt(
        "check-balances",
        {
            description: "Check address balances across one or more blockchains",
            argsSchema: {
                blockchain: z.string().optional().describe("Blockchain to query (e.g. ethereum, bitcoin, solana)"),
                network: z.string().optional().describe("Network to query (e.g. mainnet, testnet)"),
                address: z.string().describe("Address to check balance for"),
            },
        },
        (args): GetPromptResult => {
            const { blockchain, network, address } = args;

            let instructions = `Use the appropriate address tool (evm_address_latest, utxo_address_latest, solana_address_latest, xrp_address_latest, or kaspa_address_latest) with action 'get-balance' to check the balance for address ${address}.`;

            if (blockchain && network) {
                instructions += ` Query on ${blockchain}/${network}.`;
            } else if (blockchain) {
                instructions += ` Query on ${blockchain} (default network).`;
            } else {
                instructions += ` If not specified, try to identify the address format and check the most likely chains.`;
            }

            instructions += ` Report the balance in both the smallest unit and the human-readable unit.`;
            instructions += `\n\n${formatSupportedChains(supportedChains)}`;

            return {
                messages: [
                    {
                        role: "user",
                        content: {
                            type: "text",
                            text: instructions,
                        },
                    },
                ],
            };
        },
    );
}
