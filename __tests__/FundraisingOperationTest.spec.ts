import MeSomb from '../src/MeSomb.js';
import { FundraisingOperation } from '../src/operations/FundraisingOperation.js';

const fundKey = 'fund-key';
const accessKey = 'access-key';
const secretKey = 'secret-key';

const baseContribution = {
  pk: 'contrib-1',
  status: 'SUCCESS',
  type: 'CONTRIBUTION',
  amount: 98,
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

describe('FundraisingOperation (mocked)', () => {
  beforeEach(() => {
    MeSomb.HOST = 'https://example.com';
    jest.restoreAllMocks();
  });

  it('builds contribution payload and maps contributor model', async () => {
    const fetchMock = jest.fn(async () =>
      mockResponse(200, {
        success: true,
        message: 'ok',
        status: 'SUCCESS',
        contribution: {
          ...baseContribution,
          contributor: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'contact@gmail.com',
            phone: '+237677550203',
          },
        },
      }),
    );
    global.fetch = fetchMock as any;

    const client = new FundraisingOperation({ fundKey, accessKey, secretKey });
    const response = await client.makeContribution({
      amount: 100,
      service: 'MTN',
      payer: '670000000',
      trxID: 'ext-1',
      fullName: { firstName: 'John', lastName: 'Doe' },
      contact: { email: 'contact@gmail.com', phoneNumber: '+237677550203' },
      nonce: 'nonce-1',
      mode: 'asynchronous',
    });

    expect(response.isOperationSuccess()).toBe(true);
    expect(response.isContributionSuccess()).toBe(true);
    expect(response.contribution.contributor?.firstName).toBe('John');
    expect(fetchMock).toHaveBeenCalledWith('https://example.com/api/v1.1/fundraising/contribute/', expect.any(Object));

    const init: any = (fetchMock.mock.calls as any[][])[0][1];
    expect(init.headers['X-MeSomb-Fund']).toBe(fundKey);
    expect(init.headers['X-MeSomb-TrxID']).toBe('ext-1');
    expect(init.headers['X-MeSomb-OperationMode']).toBe('asynchronous');
    const body = JSON.parse(init.body as string);
    expect(body.full_name.first_name).toBe('John');
    expect(body.contact.phone_number).toBe('+237677550203');
    expect(body.trxID).toBeUndefined();
  });

  it('maps get and check contribution results', async () => {
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(mockResponse(200, [baseContribution]))
      .mockResolvedValueOnce(mockResponse(200, [baseContribution]));
    global.fetch = fetchMock as any;

    const client = new FundraisingOperation({ fundKey, accessKey, secretKey });
    const listed = await client.getContributions(['contrib-1'], 'EXTERNAL');
    const checked = await client.checkContributions(['contrib-1']);

    expect(listed[0].pk).toBe('contrib-1');
    expect(checked[0].isSuccess()).toBe(true);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'https://example.com/api/v1.1/fundraising/contributions/?ids=contrib-1&source=EXTERNAL',
      expect.any(Object),
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'https://example.com/api/v1.1/fundraising/contributions/check/?ids=contrib-1&source=MESOMB',
      expect.any(Object),
    );
  });

  it('maps 400 and 404 responses to typed exceptions', async () => {
    const client = new FundraisingOperation({ fundKey, accessKey, secretKey });

    global.fetch = jest.fn(async () => mockResponse(400, { detail: 'bad', code: 'invalid' })) as any;
    await expect(client.makeContribution({ amount: 5, service: 'MTN', payer: '670000000' } as any)).rejects.toHaveProperty(
      'name',
      'InvalidClientRequestError',
    );

    global.fetch = jest.fn(async () => mockResponse(404, 'missing')) as any;
    await expect(client.getContributions(['contrib-1'])).rejects.toHaveProperty('name', 'ServiceNotFoundError');
  });
});
