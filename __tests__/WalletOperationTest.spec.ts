import { FundraisingOperation, RandomGenerator, MeSomb } from '../src';
import { WalletOperation } from '../src/operations/WalletOperation';

const providerKey = 'a1dc7a7391c538788043';
const accessKey = 'c6c40b76-8119-4e93-81bf-bfb55417b392';
const secretKey = 'fe8c2445-810f-4caa-95c9-778d51580163';

jest.setTimeout(30000);

describe("Wallet Operation", () => {
  beforeEach(() => {
    MeSomb.HOST = 'http://127.0.0.1:8000';
  })

  it('Should create new wallet with success', async () => {
    const client = new WalletOperation({providerKey, accessKey, secretKey});
    const wallet = await client.createWallet({
      firstName: 'John',
      lastName: 'Doe',
      email: 'contact@gmail.com',
      phoneNumber: '+237677550000',
      country: 'CM',
      gender: 'MAN',
    });
    expect(wallet.firstName).toEqual('John');
    expect(wallet.lastName).toEqual('Doe');
    expect(wallet.email).toEqual('contact@gmail.com')
    expect(wallet.phoneNumber).toEqual('+237677550000');
    expect(wallet.country).toEqual('CM');
    expect(wallet.gender).toEqual('MAN');
    expect(wallet.number).not.toBeNull();
  });

  it('Should create new wallet with success and minimal', async () => {
    const client = new WalletOperation({providerKey, accessKey, secretKey});
    const wallet = await client.createWallet({
      lastName: 'Doe',
      phoneNumber: '+237677550000',
      gender: 'MAN',
    });
    expect(wallet.lastName).toEqual('Doe');
    expect(wallet.phoneNumber).toEqual('+237677550000');
    expect(wallet.gender).toEqual('MAN');
    expect(wallet.number).not.toBeNull();
  });

  it('Should create update wallet with success and minimal', async () => {
    const client = new WalletOperation({providerKey, accessKey, secretKey});
    const wallet = await client.updateWallet(229, {
      lastName: 'Doe',
      phoneNumber: '+237677550001',
      gender: 'WOMAN',
    });
    expect(wallet.lastName).toEqual('Doe');
    expect(wallet.phoneNumber).toEqual('+237677550001');
    expect(wallet.gender).toEqual('WOMAN');
    expect(wallet.number).not.toBeNull();
  });

  it('Should create get wallet with success', async () => {
    const client = new WalletOperation({providerKey, accessKey, secretKey});
    const wallet = await client.getWallet(228);
    expect(wallet.id).toEqual(228);
    expect(wallet.firstName).toEqual('John');
    expect(wallet.lastName).toEqual('Doe');
    expect(wallet.email).toEqual('contact@gmail.com')
    expect(wallet.phoneNumber).toEqual('+237677550000');
    expect(wallet.country).toEqual('CM');
    expect(wallet.gender).toEqual('MAN');
    expect(wallet.number).not.toBeNull();
  });

  it('Should create get paginated wallets with success', async () => {
    const client = new WalletOperation({providerKey, accessKey, secretKey});
    const wallets = await client.getWallets(1);
    expect(wallets.count).toBeGreaterThan(0);
    // expect(wallet.next).not.toBeNull();
    expect(wallets.previous).toBeNull();
    expect(wallets.results.length).toBeGreaterThan(0);
  });

  it('Should add money to wallet', async () => {
    const client = new WalletOperation({providerKey, accessKey, secretKey});
    const wallet = await client.getWallet(228);
    const transaction = await client.addMoney(228, 1000);
    expect(transaction.direction).toEqual(1);
    expect(transaction.status).toEqual('SUCCESS');
    expect(transaction.amount).toEqual(1000);
    expect(transaction.balanceAfter).toEqual((wallet.balance ?? 0) + 1000);
    expect(transaction.wallet).toEqual(228);
    expect(transaction.country).toEqual('CM');
    expect(transaction.finTrxId).not.toBeNull();
    expect(transaction.date).not.toBeNull();
  });

  it('Should remove money to wallet', async () => {
    const client = new WalletOperation({providerKey, accessKey, secretKey});
    const wallet = await client.getWallet(228);
    const transaction = await client.removeMoney(228, 1000);
    expect(transaction.direction).toEqual(-1);
    expect(transaction.status).toEqual('SUCCESS');
    expect(transaction.amount).toEqual(1000);
    expect(transaction.balanceAfter).toEqual((wallet.balance ?? 0) - 1000);
    expect(transaction.wallet).toEqual(228);
    expect(transaction.country).toEqual('CM');
    expect(transaction.finTrxId).not.toBeNull();
    expect(transaction.date).not.toBeNull();
  });

  it('Should get transaction details', async () => {
    const client = new WalletOperation({providerKey, accessKey, secretKey});
    const transaction = await client.getTransaction(3061);
    expect(transaction.id).not.toBeNull();
    expect(transaction.direction).toEqual(-1);
    expect(transaction.status).toEqual('SUCCESS');
    expect(transaction.amount).toEqual(1000);
    expect(transaction.balanceAfter).toEqual(1000);
    expect(transaction.wallet).toEqual(228);
    expect(transaction.country).toEqual('CM');
    expect(transaction.finTrxId).not.toBeNull();
    expect(transaction.date).not.toBeNull();
  });

  it('Should create get paginated transactions with success', async () => {
    const client = new WalletOperation({providerKey, accessKey, secretKey});
    const transactions = await client.getTransactions(1);
    expect(transactions.count).toBeGreaterThan(0);
    // expect(wallet.next).not.toBeNull();
    expect(transactions.previous).toBeNull();
    expect(transactions.results.length).toBeGreaterThan(0);
  });

  it('Should create get paginated transactions on a wallet with success', async () => {
    const client = new WalletOperation({providerKey, accessKey, secretKey});
    const transactions = await client.getTransactions(1, 228);
    expect(transactions.count).toBeGreaterThan(0);
    // expect(wallet.next).not.toBeNull();
    expect(transactions.previous).toBeNull();
    expect(transactions.results.length).toBeGreaterThan(0);
  });
});
