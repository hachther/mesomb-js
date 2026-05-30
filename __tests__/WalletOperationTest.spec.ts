import MeSomb from '../src/MeSomb';
import { WalletOperation } from '../src';

const providerKey = 'provider-key';
const accessKey = 'access-key';
const secretKey = 'secret-key';

const walletPayload = {
  id: 228,
  status: 'ACTIVE',
  first_name: 'John',
  last_name: 'Doe',
  email: 'contact@gmail.com',
  phone_number: '+237677550000',
  country: 'CM',
  gender: 'MAN',
  number: '10001',
  last_activity: '2026-05-29T10:00:00.000Z',
  balance: 3000,
};

const walletTxPayload = {
  id: 3061,
  status: 'SUCCESS',
  type: 'ADJUSTMENT',
  amount: 1000,
  direction: 1,
  wallet: '228',
  balance_after: 4000,
  ts: '2026-05-29T10:00:00.000Z',
  country: 'CM',
  fin_trx_id: 'fin-100',
};

const mockResponse = (status: number, data?: any) => ({
  status,
  json: jest.fn(async () => data),
  text: jest.fn(async () => (typeof data === 'string' ? data : JSON.stringify(data ?? {}))),
});

describe('WalletOperation (mocked)', () => {
  beforeEach(() => {
    MeSomb.HOST = 'https://example.com';
    jest.restoreAllMocks();
  });

  it('covers wallet CRUD endpoints', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(mockResponse(201, walletPayload))
      .mockResolvedValueOnce(mockResponse(200, walletPayload))
      .mockResolvedValueOnce(mockResponse(200, { ...walletPayload, last_name: 'Doe 2' }))
      .mockResolvedValueOnce(mockResponse(204));
    global.fetch = fetchMock as any;

    const client = new WalletOperation({ providerKey, accessKey, secretKey });
    const created = await client.createWallet({ lastName: 'Doe', phoneNumber: '+237677550000', gender: 'MAN' });
    const wallet = await client.getWallet(228);
    const updated = await client.updateWallet(228, { lastName: 'Doe 2', phoneNumber: '+237677550000', gender: 'MAN' });
    await expect(client.deleteWallet(228)).resolves.toBeUndefined();

    expect(created.number).toBe('10001');
    expect(wallet.id).toBe(228);
    expect(updated.lastName).toBe('Doe 2');
    expect(fetchMock).toHaveBeenNthCalledWith(1, 'https://example.com/api/v1.1/wallet/wallets/', expect.any(Object));
    expect(fetchMock).toHaveBeenNthCalledWith(2, 'https://example.com/api/v1.1/wallet/wallets/228/', expect.any(Object));
    expect(fetchMock).toHaveBeenNthCalledWith(3, 'https://example.com/api/v1.1/wallet/wallets/228/', expect.any(Object));
    expect(fetchMock).toHaveBeenNthCalledWith(4, 'https://example.com/api/v1.1/wallet/wallets/228/', expect.any(Object));
  });

  it('covers money adjustment and transfer endpoints', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(mockResponse(200, walletTxPayload))
      .mockResolvedValueOnce(mockResponse(200, { ...walletTxPayload, direction: -1, balance_after: 2000 }))
      .mockResolvedValueOnce(mockResponse(200, walletTxPayload));
    global.fetch = fetchMock as any;

    const client = new WalletOperation({ providerKey, accessKey, secretKey });
    const add = await client.addMoney(228, 1000);
    const remove = await client.removeMoney(228, 1000, true);
    const transfer = await client.transferMoney(228, 229, 500, true);

    expect(add.direction).toBe(1);
    expect(remove.direction).toBe(-1);
    expect(transfer.wallet).toBe('228');

    const addBody = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    const removeBody = JSON.parse(fetchMock.mock.calls[1][1].body as string);
    const transferBody = JSON.parse(fetchMock.mock.calls[2][1].body as string);
    expect(addBody.direction).toBe(1);
    expect(removeBody.force).toBe(true);
    expect(transferBody.to).toBe(229);
  });

  it('covers wallet and transaction listing endpoints', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(mockResponse(200, { count: 1, next: null, previous: null, results: [walletPayload] }))
      .mockResolvedValueOnce(mockResponse(200, walletTxPayload))
      .mockResolvedValueOnce(mockResponse(200, { count: 1, next: null, previous: null, results: [walletTxPayload] }))
      .mockResolvedValueOnce(mockResponse(200, { count: 1, next: null, previous: null, results: [walletTxPayload] }))
      .mockResolvedValueOnce(mockResponse(200, [walletTxPayload]));
    global.fetch = fetchMock as any;

    const client = new WalletOperation({ providerKey, accessKey, secretKey });
    const wallets = await client.getWallets(1);
    const tx = await client.getTransaction(3061);
    const page1 = await client.listTransactions(1);
    const pageByWallet = await client.listTransactions(1, 228);
    const search = await client.getTransactions(['620757', '620756'], 'EXTERNAL');

    expect(wallets.count).toBe(1);
    expect(tx.finTrxId).toBe('fin-100');
    expect(page1.results[0].id).toBe(3061);
    expect(pageByWallet.results[0].wallet).toBe('228');
    expect(search[0].status).toBe('SUCCESS');
    expect(fetchMock).toHaveBeenNthCalledWith(4, 'https://example.com/api/v1.1/wallet/transactions/?page=1&wallet=228', expect.any(Object));
    expect(fetchMock).toHaveBeenNthCalledWith(
      5,
      'https://example.com/api/v1.1/wallet/transactions/search/?ids=620757,620756&source=EXTERNAL',
      expect.any(Object),
    );
  });

  it('maps access errors to PermissionDeniedError', async () => {
    global.fetch = jest.fn(async () => mockResponse(403, 'forbidden')) as any;
    const client = new WalletOperation({ providerKey, accessKey, secretKey });
    await expect(client.getWallet(228)).rejects.toHaveProperty('name', 'PermissionDeniedError');
  });
});
