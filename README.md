# @cryptoapis-io/mcp-address-latest

MCP server for [Crypto APIs](https://cryptoapis.io/) Address Latest product. Query recent blockchain address data (last 14 days) without requiring address sync.

> **API Version:** Compatible with Crypto APIs version **2024-12-12**

## Features

- Query EVM addresses (Ethereum, Ethereum Classic, BSC, Polygon, Avalanche (C-Chain), Arbitrum, Base, Optimism, Tron)
- Query UTXO addresses (Bitcoin, Bitcoin Cash, Litecoin, Dogecoin, Dash, Zcash)
- Query Solana addresses (SOL balance, transactions, SPL tokens)
- Query XRP/Ripple addresses (balance, transactions, sequence)
- Query Kaspa addresses (balance, transactions)
- Cursor-based pagination for large result sets
- No address sync required (unlike Address History)

## Prerequisites

To use this MCP server, you need:
1. [Register at Crypto APIs](https://app.cryptoapis.io/signup)
2. [Generate an API key](https://app.cryptoapis.io/api-keys) from your dashboard

## Installation

```bash
npm install @cryptoapis-io/mcp-address-latest
```

Or install all Crypto APIs MCP servers: `npm install @cryptoapis-io/mcp`

## Usage

```bash
# Run with API key
npx @cryptoapis-io/mcp-address-latest --api-key YOUR_API_KEY

# Or use environment variable
export CRYPTOAPIS_API_KEY=YOUR_API_KEY
npx @cryptoapis-io/mcp-address-latest
```

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "cryptoapis-address-latest": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-address-latest"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "cryptoapis-address-latest": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-address-latest"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### MCP Inspector

```bash
npx @modelcontextprotocol/inspector npx @cryptoapis-io/mcp-address-latest --api-key YOUR_API_KEY
```

### n8n

1. Start the server in HTTP mode:
   ```bash
   npx @cryptoapis-io/mcp-address-latest --transport http --port 3000 --api-key YOUR_API_KEY
   ```
2. In your n8n workflow, add an **AI Agent** node
3. Under **Tools**, add an **MCP Client Tool** and set the URL to `http://localhost:3000/mcp`

> **n8n in Docker:** `localhost` inside the container is not your machine. Start the server with `--host 0.0.0.0` and `MCP_AUTH_TOKEN` set (see [Exposing the server beyond localhost](#exposing-the-server-beyond-localhost)), use `http://host.docker.internal:3000/mcp` as the URL, and add an `Authorization: Bearer <token>` header to the MCP Client Tool credential.

> All servers default to port 3000. Use `--port` to assign different ports when running multiple servers.

## Available Tools

### `evm_address_latest`

Query latest EVM address data.

**Actions:**

| Action | Description |
|--------|-------------|
| `get-balance` | Get address balance |
| `get-next-nonce` | Get next available nonce. Supported: Ethereum (mainnet, sepolia), Ethereum Classic (mainnet, mordor), BSC (mainnet, testnet) |
| `list-transactions` | List address transactions |
| `list-token-transfers` | List token transfers (ERC-20, ERC-721, ERC-1155) |
| `list-internal-transactions` | List internal transactions |

**Supported Blockchains:** ethereum, ethereum-classic, binance-smart-chain, polygon, avalanche (C-Chain), arbitrum, base, optimism, tron

### `utxo_address_latest`

Query latest UTXO address data.

**Actions:**

| Action | Description |
|--------|-------------|
| `get-balance` | Get address balance |
| `list-transactions` | List address transactions |
| `list-unconfirmed-transactions` | List unconfirmed transactions (mempool); uses offset pagination |

**Supported Blockchains:** bitcoin, bitcoin-cash, litecoin, dogecoin, dash, zcash

### `solana_address_latest`

Query latest Solana address data.

**Actions:**

| Action | Description |
|--------|-------------|
| `get-balance` | Get address SOL balance |
| `list-transactions` | List address transactions |
| `list-tokens` | List SPL tokens held by address |

**Supported Networks:** mainnet, devnet

### `xrp_address_latest`

Query latest XRP (Ripple) address data.

**Actions:**

| Action | Description |
|--------|-------------|
| `get-balance` | Get address XRP balance |
| `list-transactions` | List address transactions |
| `get-next-sequence` | Get next available sequence number |

**Supported Networks:** mainnet, testnet

### `kaspa_address_latest`

Query latest Kaspa address data.

**Actions:**

| Action | Description |
|--------|-------------|
| `get-balance` | Get address KAS balance |
| `list-transactions` | List address transactions |

**Supported Networks:** mainnet

## Pagination

Most list endpoints use **cursor-based pagination**:

```json
// Response
{
  "items": [...],
  "limit": 10,
  "hasMore": true,
  "nextStartingAfter": "abc123"
}
```

Use `nextStartingAfter` value as `startingAfter` parameter in the next request.

**Exception:** `list-unconfirmed-transactions` (UTXO) uses **offset pagination** with `limit`, `offset`, and `total` fields.

## Configuration

For **stdio** transport, provide the API key at startup via CLI argument or environment variable. For **HTTP** transport, it can also be provided per-request via `x-api-key` header (see [HTTP API Key Modes](#http-api-key-modes)).

1. **Command-line argument** (recommended):
   ```bash
   npx @cryptoapis-io/mcp-address-latest --api-key {your_api_key}
   ```

2. **Environment variable**:
   ```bash
   export CRYPTOAPIS_API_KEY={your_api_key}
   ```

### CLI Arguments

| Argument | Description |
|----------|-------------|
| `--api-key` | Crypto APIs API key |
| `--transport` | Transport type: `stdio` (default) or `http` |
| `--host` | HTTP host (default: `127.0.0.1`; use `0.0.0.0` to accept remote connections — requires an auth token with `--api-key`) |
| `--auth-token` | Bearer token callers must send (`Authorization: Bearer <token>`); prefer the `MCP_AUTH_TOKEN` env var |
| `--allowed-hosts` | Comma-separated `Host` header allowlist for non-loopback binds |
| `--port` | HTTP port (default: `3000`) |
| `--path` | HTTP path (default: `/mcp`) |
| `--stateless` | Enable stateless mode for HTTP |

### HTTP API Key Modes

When using HTTP transport, the server supports two API key modes:

- **With `--api-key`:** The key is used for all requests. `x-api-key` request headers are ignored.
- **Without `--api-key`:** Each request must include an `x-api-key` header with a valid Crypto APIs key. This enables hosting a public server where each user provides their own key.

```bash
# Per-request key mode (multi-tenant)
npx @cryptoapis-io/mcp-address-latest --transport http --port 3000
# Clients send x-api-key header with each request
```

### Exposing the server beyond localhost

HTTP mode listens on `127.0.0.1` by default, so only processes on the same machine can reach it.
To accept connections from other machines or containers, bind explicitly and protect the port:

```bash
# Startup-key mode: callers must present the token (the server refuses to start without one)
export MCP_AUTH_TOKEN=$(openssl rand -hex 32)
npx @cryptoapis-io/mcp-address-latest --transport http --host 0.0.0.0 --port 3000 --api-key YOUR_API_KEY \
  --allowed-hosts mcp.internal.example
# Clients send: Authorization: Bearer $MCP_AUTH_TOKEN

# Per-request key mode: no startup key, every request must carry the caller's own x-api-key
npx @cryptoapis-io/mcp-address-latest --transport http --host 0.0.0.0 --port 3000
```

`--allowed-hosts` restricts the `Host` header (DNS rebinding protection) when not bound to loopback. Prefer `MCP_AUTH_TOKEN` over `--auth-token`: command-line arguments are visible in the process list.

> Stdio transport always requires an API key at startup.

## Important: API Key Required

> **Warning:** Making requests without a valid API key — or with an incorrect one — may result in your IP being banned from the Crypto APIs ecosystem. Always ensure a valid API key is configured before starting any server.

## Remote MCP Server

Crypto APIs provides an official remote MCP server with all tools available via HTTP Streamable transport at [https://ai.cryptoapis.io/mcp](https://ai.cryptoapis.io/mcp). Pass your API key via the `x-api-key` header — no installation required.

## License

MIT

