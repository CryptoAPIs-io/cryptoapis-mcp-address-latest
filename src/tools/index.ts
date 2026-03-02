import { systemInfoTool } from "@cryptoapis-io/mcp-shared";
import { evmAddressTool } from "./evm-address/index.js";
import { utxoAddressTool } from "./utxo-address/index.js";
import { solanaAddressTool } from "./solana-address/index.js";
import { xrpAddressTool } from "./xrp-address/index.js";
import { kaspaAddressTool } from "./kaspa-address/index.js";

export const tools = [
    evmAddressTool,
    utxoAddressTool,
    solanaAddressTool,
    xrpAddressTool,
    kaspaAddressTool,
    systemInfoTool,
] as const;
