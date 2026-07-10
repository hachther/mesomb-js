import MeSomb from '../src/MeSomb.js';
import PaymentOperation from '../src/operations/PaymentOperation.js';

const applicationKey = 'app-key';
const accessKey = 'access-key';
const secretKey = 'secret-key';

const baseTransaction = {
  pk: 'trx-1',
  status: 'SUCCESS',
  type: 'COLLECT',
  amount: 100,
  fees: 2,
  b_party: '237670000000',
  message: 'ok',
  service: 'MTN',
  reference: 'ref-1',
  ts: '2026-05-29T10:00:00.000Z',
  country: 'CM',
  currency: 'XAF',
  fin_trx_id: 'fin-1',
};

const mockResponse = (status: number, data?: any) => ({
  status,
  json: jest.fn(async () => data),
  text: jest.fn(async () => (typeof data === 'string' ? data : JSON.stringify(data ?? {}))),
});

describe('PaymentOperation (mocked)', () => {
  beforeEach(() => {
    MeSomb.HOST = 'https://example.com';
    jest.restoreAllMocks();
  });

  it('builds collect request with trx header and maps response model', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(mockResponse(200, {
        success: true,
        message: 'ok',
        redirect: '',
        status: 'SUCCESS',
        reference: 'ref-1',
        transaction: {
          ...baseTransaction,
          customer: { email: 'buyer@example.com', phone: '+237677550000', first_name: 'Jane', last_name: 'Doe' },
          products: [{ id: 'p1', name: 'Bag', category: 'Fashion', quantity: 1, amount: 100 }],
        },
      }));
    global.fetch = fetchMock as any;

    const payment = new PaymentOperation({ applicationKey, accessKey, secretKey });
    const response = await payment.makeCollect({
      amount: 100,
      service: 'MTN',
      payer: '670000000',
      trxID: 'external-1',
      customer: { email: 'buyer@example.com' },
      products: { name: 'Bag', category: 'Fashion' } as any,
      extra: { note: 'hello' },
      nonce: 'nonce-1',
    });

    expect(response.isOperationSuccess()).toBe(true);
    expect(response.isTransactionSuccess()).toBe(true);
    expect(response.transaction.customer?.firstName).toBe('Jane');
    expect(response.transaction.products?.[0].name).toBe('Bag');
    expect(fetchMock).toHaveBeenCalledWith('https://example.com/api/v1.1/payment/collect/', expect.any(Object));

    const init = fetchMock.mock.calls[0][1];
    expect(init.method).toBe('POST');
    expect(init.headers['X-MeSomb-Application']).toBe(applicationKey);
    expect(init.headers['X-MeSomb-TrxID']).toBe('external-1');
    const body = JSON.parse(init.body as string);
    expect(body.trxID).toBeUndefined();
    expect(body.products).toHaveLength(1);
    expect(body.note).toBe('hello');
  });

  it('builds deposit and airtime request payloads', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(mockResponse(200, { success: true, message: 'ok', redirect: '', status: 'SUCCESS', reference: 'ref', transaction: baseTransaction }))
      .mockResolvedValueOnce(mockResponse(200, { success: true, message: 'ok', redirect: '', status: 'SUCCESS', reference: 'ref', transaction: baseTransaction }));
    global.fetch = fetchMock as any;

    const payment = new PaymentOperation({ applicationKey, accessKey, secretKey });
    await payment.makeDeposit({ amount: 100, service: 'MTN', receiver: '670000000', nonce: 'n1', trxID: 12 });
    await payment.purchaseAirtime({ amount: 100, service: 'MTN', receiver: '670000000', merchant: 'MTN', nonce: 'n2' });

    expect(fetchMock).toHaveBeenNthCalledWith(1, 'https://example.com/api/v1.1/payment/deposit/', expect.any(Object));
    expect(fetchMock).toHaveBeenNthCalledWith(2, 'https://example.com/api/v1.1/payment/airtime/', expect.any(Object));
  });

  it('handles refund, status, pricing and yango refill endpoints', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(mockResponse(200, { success: true, message: 'ok', redirect: '', status: 'SUCCESS', reference: 'ref', transaction: baseTransaction }))
      .mockResolvedValueOnce(mockResponse(200, {
        key: 'app-key',
        logo: '',
        balances: [{ country: 'CM', service: 'MTN', value: 1000 }],
        countries: ['CM'],
        description: 'desc',
        name: 'My app',
        security: {},
        url: 'https://app.example.com',
      }))
      .mockResolvedValueOnce(mockResponse(200, { key: 'app-key', name: 'My App' }))
      .mockResolvedValueOnce(mockResponse(200, { success: true, message: 'ok', redirect: '', status: 'SUCCESS', reference: 'ref', transaction: baseTransaction }));
    global.fetch = fetchMock as any;

    const payment = new PaymentOperation({ applicationKey, accessKey, secretKey });
    const refund = await payment.refundTransaction('trx-1', { amount: 50 });
    const status = await payment.getStatus();
    const pricing = await payment.getPricing();
    const yango = await payment.yangoRefill({ amount: 100, service: 'MTN', payer: '670000000', driver_id: 'driver-1', mode: 'asynchronous' } as any);

    expect(refund.transaction.pk).toBe('trx-1');
    expect(status.getBalance('CM', 'MTN')).toBe(1000);
    expect(pricing.name).toBe('My App');
    expect(yango.status).toBe('SUCCESS');
    expect(fetchMock).toHaveBeenNthCalledWith(1, 'https://example.com/api/v1.1/payment/refund/', expect.any(Object));
    expect(fetchMock).toHaveBeenNthCalledWith(2, 'https://example.com/api/v1.1/payment/status/', expect.any(Object));
    expect(fetchMock).toHaveBeenNthCalledWith(3, 'https://example.com/api/v1.1/payment/pricing/', expect.any(Object));
    expect(fetchMock).toHaveBeenNthCalledWith(4, 'https://example.com/api/v1.1/payment/yango/refill/', expect.any(Object));
    expect(fetchMock.mock.calls[3][1].headers['X-MeSomb-OperationMode']).toBe('asynchronous');
  });

  it('maps getTransactions and checkTransactions results to Transaction models', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(mockResponse(200, [baseTransaction]))
      .mockResolvedValueOnce(mockResponse(200, [baseTransaction]));
    global.fetch = fetchMock as any;

    const payment = new PaymentOperation({ applicationKey, accessKey, secretKey });
    const transactions = await payment.getTransactions(['trx-1'], 'EXTERNAL');
    const checks = await payment.checkTransactions(['trx-1']);

    expect(transactions[0].pk).toBe('trx-1');
    expect(checks[0].finTrxId).toBe('fin-1');
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'https://example.com/api/v1.1/payment/transactions/?ids=trx-1&source=EXTERNAL',
      expect.any(Object),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'https://example.com/api/v1.1/payment/transactions/check/?ids=trx-1&source=MESOMB',
      expect.any(Object),
    );
  });

  it('maps HTTP client errors to typed exceptions', async () => {
    const payment = new PaymentOperation({ applicationKey, accessKey, secretKey });

    global.fetch = jest.fn(async () => mockResponse(404, 'missing')) as any;
    await expect(payment.getStatus()).rejects.toHaveProperty('name', 'ServiceNotFoundError');

    global.fetch = jest.fn(async () => mockResponse(401, 'denied')) as any;
    await expect(payment.getStatus()).rejects.toHaveProperty('name', 'PermissionDeniedError');

    global.fetch = jest.fn(async () => mockResponse(400, { detail: 'bad request', code: 'invalid' })) as any;
    await expect(payment.getStatus()).rejects.toHaveProperty('name', 'InvalidClientRequestError');

    global.fetch = jest.fn(async () => mockResponse(500, { detail: 'boom', code: 'ERR' })) as any;
    await expect(payment.getStatus()).rejects.toHaveProperty('name', 'ServerError');
  });

  it('maps AbortError to Request timeout and rethrows unknown fetch errors', async () => {
    global.fetch = jest.fn((_, init?: RequestInit) => {
      return new Promise((_, reject) => {
        init?.signal?.addEventListener('abort', () => {
          const abortError = new Error('aborted');
          abortError.name = 'AbortError';
          reject(abortError);
        });
      });
    }) as any;

    const payment = new PaymentOperation({ applicationKey, accessKey, secretKey, timeout: 1 });
    await expect(payment.getStatus()).rejects.toThrow('Request timeout');

    const unknownError = new Error('network down');
    global.fetch = jest.fn(async () => Promise.reject(unknownError)) as any;
    await expect(payment.getStatus()).rejects.toThrow('network down');
  });
});
