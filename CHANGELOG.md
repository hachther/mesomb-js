# 3.0.0 (2026-05-30)

## Added
- Add CheckoutSession, Product, and Customer management APIs
- Add pluggable signing engine support via `Signature.setSigner(...)`
- Add `CryptoJsSigner` and `WebCryptoSigner`

## Changed
- Refactor signature canonicalization to static imports with native URL-first parsing
- Update package entrypoints with an explicit `exports` map for `import`/`require`
- Add framework/runtime compatibility and security guidance in `README.md`

# 2.0.2 (2026-05-27)

## Updated
- Update the data structure of an address in customer 

# 2.0.1 (2025-10-30)

## Added
- Add `getTransactions` method to fetch transactions by IDs and source

## Fixed
- Fix `Wallet` model to correctly map `id` field

# 2.0.0 (2025-03-25)

## Added

- Add airtime purchase operation operations
- Rename getTransaction to listTransactions
- Add getTransactions to get transaction by ids and source
- Add fundraising operations
- Add wallet operations
- Add refund transaction operation

# 1.1.1 (2023-09-28)

Fix bug on handling response with redirect not set
