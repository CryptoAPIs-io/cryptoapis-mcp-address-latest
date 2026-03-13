import type { SupportedChainsResource } from "@cryptoapis-io/mcp-shared";

/**
 * Supported blockchains, networks, and actions for the address-latest package.
 */
export const supportedChains: SupportedChainsResource = {
    evm: {
        blockchains: [
            "ethereum",
            "ethereum-classic",
            "binance-smart-chain",
            "tron",
            "polygon",
            "avalanche",
            "arbitrum",
            "base",
            "optimism",
        ],
        networks: {
            ethereum: ["mainnet", "sepolia"],
            "ethereum-classic": ["mainnet", "mordor"],
            "binance-smart-chain": ["mainnet", "testnet"],
            tron: ["mainnet", "nile"],
            polygon: ["mainnet", "amoy"],
            avalanche: ["mainnet", "fuji"],
            arbitrum: ["mainnet", "sepolia"],
            base: ["mainnet", "sepolia"],
            optimism: ["mainnet", "sepolia"],
        },
        actions: {
            "get-balance": [
                "ethereum", "ethereum-classic", "binance-smart-chain", "tron",
                "polygon", "avalanche", "arbitrum", "base", "optimism",
            ],
            "get-next-nonce": [
                "ethereum", "ethereum-classic", "binance-smart-chain",
            ],
            "list-transactions": [
                "ethereum", "ethereum-classic", "binance-smart-chain", "arbitrum",
                "polygon", "avalanche", "base", "optimism", "tron",
            ],
            "list-token-transfers": [
                "ethereum", "ethereum-classic", "binance-smart-chain", "tron",
                "polygon", "avalanche", "arbitrum", "base", "optimism",
            ],
            "list-internal-transactions": [
                "ethereum", "ethereum-classic", "binance-smart-chain", "polygon",
                "avalanche", "arbitrum", "base", "optimism", "tron",
            ],
        },
    },
    utxo: {
        blockchains: [
            "bitcoin",
            "bitcoin-cash",
            "litecoin",
            "dash",
            "dogecoin",
            "zcash",
        ],
        networks: {
            bitcoin: ["mainnet", "testnet"],
            "bitcoin-cash": ["mainnet", "testnet"],
            litecoin: ["mainnet", "testnet"],
            dash: ["mainnet", "testnet"],
            dogecoin: ["mainnet", "testnet"],
            zcash: ["mainnet", "testnet"],
        },
        actions: {
            "get-balance": ["bitcoin", "bitcoin-cash", "litecoin", "dash", "dogecoin", "zcash"],
            "list-transactions": ["bitcoin", "bitcoin-cash", "dash", "dogecoin", "litecoin", "zcash"],
            "list-unconfirmed-transactions": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
        },
    },
    solana: {
        blockchains: ["solana"],
        networks: {
            solana: ["mainnet", "devnet"],
        },
        actions: {
            "get-balance": ["solana"],
            "list-transactions": ["solana"],
            "list-tokens": ["solana"],
        },
    },
    xrp: {
        blockchains: ["xrp"],
        networks: {
            xrp: ["mainnet", "testnet"],
        },
        actions: {
            "get-balance": ["xrp"],
            "list-transactions": ["xrp"],
            "get-next-sequence": ["xrp"],
        },
    },
    kaspa: {
        blockchains: ["kaspa"],
        networks: {
            kaspa: ["mainnet"],
        },
        actions: {
            "get-balance": ["kaspa"],
            "list-transactions": ["kaspa"],
        },
    },
};
