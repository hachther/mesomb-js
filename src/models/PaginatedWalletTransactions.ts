import WalletTransaction from './WalletTransaction.js';
import APaginated from './APaginated.js';

/**
 * @class PaginatedWalletTransactions
 *
 * Represents a paginated list of wallet transactions.
 *
 * @extends APaginated<WalletTransaction>
 */
export default class PaginatedWalletTransactions extends APaginated<WalletTransaction> {}
