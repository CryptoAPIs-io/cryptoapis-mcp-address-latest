# @cryptoapis-io/mcp-address-latest

## 0.4.0

### Minor Changes

- 3167621: Security: the HTTP transport no longer serves unauthenticated callers with the operator's API key.

  Before, `--transport http --api-key <key>` listened on `0.0.0.0` and never authenticated the caller, so anyone who could reach the port could call every tool on the operator's key: spend their credits, and create, deactivate or delete their blockchain-event webhooks and HD-wallet syncs.

  - HTTP mode now listens on `127.0.0.1` by default, with DNS rebinding protection (Host header check).
  - Listening on a non-loopback address (`--host 0.0.0.0`) with a startup API key requires an auth token (`MCP_AUTH_TOKEN` or `--auth-token`); callers send `Authorization: Bearer <token>`. Without one the server refuses to start.
  - New `--allowed-hosts` restricts the Host header on non-loopback binds.
  - Per-request key mode (no startup key) now rejects requests without an `x-api-key` header with 401.
  - Stateful HTTP mode keeps one session per client; previously only the first client could ever connect.

  Breaking: clients connecting from another machine or container must now start the server with `--host 0.0.0.0` and an auth token. Reported by Syed Anas Mohiuddin.

### Patch Changes

- Updated dependencies [3167621]
  - @cryptoapis-io/mcp-shared@0.4.0

## 0.3.1

### Patch Changes

- 8397658: Reject `get-next-nonce` calls for blockchains the endpoint doesn't support, instead of only failing at the API (BL-0165 item 5).

  `evm_address_latest`'s `get-next-nonce` action allowed all 9 EVM chains from the tool-wide union, but the underlying endpoint only exists for ethereum, ethereum-classic, and binance-smart-chain per the spec (mainnet/mordor/testnet/sepolia networks only — no amoy/nile/fuji). The other four actions (get-balance, list-transactions, list-token-transfers, list-internal-transactions) were verified against the spec and genuinely support the full 9-chain union, so they're unaffected.

## 0.3.0

### Minor Changes

- Add MCP logging, resources, and prompts across all packages. Add debug-level tool call logging, replace console.error with McpLogger, remove .refine() from schemas for MCP client compatibility, and fix supply-chain vulnerabilities.

### Patch Changes

- Updated dependencies
  - @cryptoapis-io/mcp-shared@0.3.0

## 0.2.4

### Patch Changes

- Fix supply-chain vulnerabilities: update @modelcontextprotocol/sdk to ^1.27.1, express to ^4.22.1, add security warning to signer tool descriptions
- Updated dependencies
  - @cryptoapis-io/mcp-shared@0.2.3

## 0.2.3

### Patch Changes

- Shorten package descriptions to meet MCP Registry 100-char limit

## 0.2.2

### Patch Changes

- Add MCP Registry metadata (mcpName, server.json)
- Updated dependencies
  - @cryptoapis-io/mcp-shared@0.2.2

## 0.2.1

### Patch Changes

- Rename Hosted MCP Server to Remote MCP Server in documentation
- Updated dependencies
  - @cryptoapis-io/mcp-shared@0.2.1

## 0.2.0

### Minor Changes

- Add User-Agent and x-source headers to identify MCP traffic

### Patch Changes

- Updated dependencies
  - @cryptoapis-io/mcp-shared@0.2.0
