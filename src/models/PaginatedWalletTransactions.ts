import WalletTransaction from './WalletTransaction';
import APaginated from './APaginated';

/**
 * @class PaginatedWalletTransactions
 *
 * Represents a paginated list of wallet transactions.
 *
 * @extends APaginated<WalletTransaction>
 */
export default class PaginatedWalletTransactions extends APaginated<WalletTransaction> {}
