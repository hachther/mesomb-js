import {
  CheckoutSessionOperation,
  CustomerOperation,
  MeSomb,
  PaymentOperation,
  ProductOperation,
} from '../src';

const applicationKey = '2bb525516ff374bb52545bf22ae4da7d655ba9fd';
const accessKey = 'c6c40b76-8119-4e93-81bf-bfb55417b392';
const secretKey = 'fe8c2445-810f-4caa-95c9-778d51580163';

const mockResponse = (status: number, data?: any) => ({
  status,
  json: jest.fn(async () => data),
  text: jest.fn(async () => (typeof data === 'string' ? data : JSON.stringify(data ?? {}))),
});

describe('OpenAPI schema aligned operations', () => {
  beforeEach(() => {
    MeSomb.HOST = 'https://example.com';
    jest.restoreAllMocks();
  });

  it('uses the v1.1 payment pricing endpoint', async () => {
    const fetchMock = jest.fn(async () => mockResponse(200, { key: 'app-key', name: 'My App' }));
    global.fetch = fetchMock as any;

    const payment = new PaymentOperation({ applicationKey, accessKey, secretKey });
    const pricing = await payment.getPricing();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenNthCalledWith(1, 'https://example.com/api/v1.1/payment/pricing/', expect.any(Object));
    expect(pricing.key).toBe('app-key');
    expect(pricing.name).toBe('My App');
  });

  it('creates and retrieves checkout sessions from mocked API responses', async () => {
    const sessionPayload = {
      id: 'cs_test_1',
      object: 'checkout.session',
      status: 'active',
      amount: 2500,
      currency: 'XAF',
      description: 'Test checkout',
      url: 'https://pay.example.com/session/cs_test_1',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      customer: {
        identifier: 'cus_1',
        email: 'buyer@example.com',
        phone: '+237677550000',
        town: 'Douala',
        region: 'Littoral',
        country: 'CM',
        first_name: 'Jane',
        last_name: 'Doe',
      },
      attempt_count: 0,
      line_items: [],
      metadata: { order_id: 'order-1' },
      expires_at: '2026-05-29T12:00:00.000Z',
      created_at: '2026-05-29T11:30:00.000Z',
      updated_at: '2026-05-29T11:30:00.000Z',
      secure_pay_mode: 'disabled',
    };
    const fetchMock = jest.fn(async () => mockResponse(201, sessionPayload));
    global.fetch = fetchMock as any;

    const checkout = new CheckoutSessionOperation({ applicationKey, accessKey, secretKey });
    const session = await checkout.createSession({
      amount: 2500,
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      description: 'Test checkout',
    });

    expect(fetchMock).toHaveBeenNthCalledWith(1, 'https://example.com/api/v1.1/checkout/sessions/', expect.any(Object));
    expect(session.id).toBe('cs_test_1');
    expect(session.successUrl).toBe('https://example.com/success');
    expect(session.cancelUrl).toBe('https://example.com/cancel');
    expect(session.customer?.identifier).toBe('cus_1');
    expect(session.customer?.firstName).toBe('Jane');

    fetchMock.mockResolvedValueOnce(mockResponse(201, sessionPayload));
    const retrieved = await checkout.getSession('cs_test_1');
    expect(fetchMock).toHaveBeenNthCalledWith(2, 'https://example.com/api/v1.1/checkout/sessions/cs_test_1/', expect.any(Object));
    expect(retrieved.id).toBe('cs_test_1');

    fetchMock.mockResolvedValueOnce(mockResponse(200, { ...sessionPayload, status: 'expired' }));
    const expired = await checkout.expireSession('cs_test_1');
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      'https://example.com/api/v1.1/checkout/sessions/cs_test_1/expire/',
      expect.any(Object),
    );
    expect(expired.status).toBe('expired');
  });

  it('supports customer and product CRUD endpoints with mocked fetch', async () => {
    const customerPayload = {
      identifier: 'cus_1',
      email: 'buyer@example.com',
      phone: '+237677550000',
      town: 'Douala',
      region: 'Littoral',
      country: 'CM',
      first_name: 'Jane',
      last_name: 'Doe',
      metadata: { tier: 'gold' },
      description: 'Important customer',
    };
    const productPayload = {
      id: 'prd_1',
      name: 'T-Shirt',
      category: 'Apparel',
      description: 'Cotton t-shirt',
      images: [1, 2],
      image_url: 'https://cdn.example.com/p.png',
      image_urls: 'https://cdn.example.com/p.png',
      default_price: '1000',
      price_type: 'OneTime',
      currency: 'XAF',
    };
    const updatedCustomerPayload = {
      ...customerPayload,
      first_name: 'Janet',
    };
    const updatedProductPayload = {
      ...productPayload,
      name: 'T-Shirt v2',
    };
    const fetchMock = jest
      .fn()
      .mockResolvedValueOnce(mockResponse(200, { count: 1, next: null, previous: null, results: [customerPayload] }))
      .mockResolvedValueOnce(mockResponse(201, customerPayload))
      .mockResolvedValueOnce(mockResponse(200, customerPayload))
      .mockResolvedValueOnce(mockResponse(200, updatedCustomerPayload))
      .mockResolvedValueOnce(mockResponse(200, updatedCustomerPayload))
      .mockResolvedValueOnce(mockResponse(204))
      .mockResolvedValueOnce(mockResponse(200, { count: 1, next: null, previous: null, results: [productPayload] }))
      .mockResolvedValueOnce(mockResponse(201, productPayload))
      .mockResolvedValueOnce(mockResponse(200, productPayload))
      .mockResolvedValueOnce(mockResponse(200, updatedProductPayload))
      .mockResolvedValueOnce(mockResponse(200, updatedProductPayload))
      .mockResolvedValueOnce(mockResponse(204));
    global.fetch = fetchMock as any;

    const customers = new CustomerOperation({ accessKey, secretKey });
    const customerList = await customers.listCustomers(1);
    expect(fetchMock).toHaveBeenNthCalledWith(1, 'https://example.com/api/v1.1/customers/?page=1', expect.any(Object));
    expect(customerList.count).toBe(1);
    expect(customerList.results[0].identifier).toBe('cus_1');

    const createdCustomer = await customers.createCustomer(customerPayload);
    expect(fetchMock).toHaveBeenNthCalledWith(2, 'https://example.com/api/v1.1/customers/', expect.any(Object));
    expect(createdCustomer.identifier).toBe('cus_1');
    expect(createdCustomer.email).toBe('buyer@example.com');

    const customer = await customers.getCustomer(1);
    expect(fetchMock).toHaveBeenNthCalledWith(3, 'https://example.com/api/v1.1/customers/1/', expect.any(Object));
    expect(customer.firstName).toBe('Jane');

    const updatedCustomer = await customers.updateCustomer(1, { ...customerPayload, first_name: 'Janet' });
    expect(fetchMock).toHaveBeenNthCalledWith(4, 'https://example.com/api/v1.1/customers/1/', expect.any(Object));
    expect(updatedCustomer.firstName).toBe('Janet');

    const patchedCustomer = await customers.patchCustomer(1, { first_name: 'Janet' });
    expect(fetchMock).toHaveBeenNthCalledWith(5, 'https://example.com/api/v1.1/customers/1/', expect.any(Object));
    expect(patchedCustomer.firstName).toBe('Janet');

    await expect(customers.deleteCustomer(1)).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenNthCalledWith(6, 'https://example.com/api/v1.1/customers/1/', expect.any(Object));

    const products = new ProductOperation({ accessKey, secretKey });
    const productList = await products.listProducts(1);
    expect(fetchMock).toHaveBeenNthCalledWith(7, 'https://example.com/api/v1.1/products/?page=1', expect.any(Object));
    expect(productList.results[0].id).toBe('prd_1');

    const createdProduct = await products.createProduct({ name: 'T-Shirt', category: 'Apparel' });
    expect(fetchMock).toHaveBeenNthCalledWith(8, 'https://example.com/api/v1.1/products/', expect.any(Object));
    expect(createdProduct.id).toBe('prd_1');
    expect(createdProduct.name).toBe('T-Shirt');

    const product = await products.getProduct('prd_1');
    expect(fetchMock).toHaveBeenNthCalledWith(9, 'https://example.com/api/v1.1/products/prd_1/', expect.any(Object));
    expect(product.id).toBe('prd_1');

    const updatedProduct = await products.updateProduct('prd_1', { name: 'T-Shirt v2' });
    expect(fetchMock).toHaveBeenNthCalledWith(10, 'https://example.com/api/v1.1/products/prd_1/', expect.any(Object));
    expect(updatedProduct.name).toBe('T-Shirt v2');

    const patchedProduct = await products.patchProduct('prd_1', { name: 'T-Shirt v2' });
    expect(fetchMock).toHaveBeenNthCalledWith(11, 'https://example.com/api/v1.1/products/prd_1/', expect.any(Object));
    expect(patchedProduct.name).toBe('T-Shirt v2');

    await expect(products.deleteProduct('prd_1')).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenNthCalledWith(12, 'https://example.com/api/v1.1/products/prd_1/', expect.any(Object));
  });

  it('aborts requests when the configured timeout elapses', async () => {
    global.fetch = jest.fn((_, init?: RequestInit) => {
      return new Promise((_, reject) => {
        init?.signal?.addEventListener('abort', () => {
          const error = new Error('Aborted');
          error.name = 'AbortError';
          reject(error);
        });
      });
    }) as any;

    const payment = new PaymentOperation({ applicationKey, accessKey, secretKey, timeout: 1 });
    await expect(payment.getStatus()).rejects.toThrow('Request timeout');
  });

  it('treats 204 responses as empty delete results', async () => {
    const fetchMock = jest.fn(async () => mockResponse(204));
    global.fetch = fetchMock as any;

    const checkout = new CheckoutSessionOperation({ applicationKey, accessKey, secretKey });
    await expect(checkout.deleteSession('cs_test_1')).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenNthCalledWith(1, 'https://example.com/api/v1.1/checkout/sessions/cs_test_1/', expect.any(Object));
  });
});



