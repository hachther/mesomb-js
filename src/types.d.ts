/**
 * @interface LocationRequest
 *
 * @property {string} town - Town of the location
 * @property {string} [region] - Region of the location
 * @property {string} [country] - Country of the location
 */
export interface LocationRequest {
  town: string;
  region?: string;
  country?: string;
  ip?: string;
}

/**
 * @interface ProductRequest
 *
 * @property {string} name - Name of the product
 * @property {string} [category] - Category of the product
 * @property {number} [quantity] - Quantity of the product (default: 1)
 * @property {number} [amount] - Amount of the product
 */
export interface ProductRequest {
  name: string;
  category?: string;
  quantity?: number;
  amount?: number;
}


/**
 * @interface AddressData
 *
 * @property {string} line1 - First line of the address
 * @property {string} town - Town of the address
 * @property {string} region - Region of the address
 */
export interface AddressData {
  line1: string;
  town: string;
  region: string;
  country: string;
  line2?: string;
  zip?: string;
}

/**
 * @interface CustomerRequest
 *
 * @property {string} [email] - Email of the customer
 * @property {string} [phone] - Phone number of the customer
 * @property {string} [town] - Town of the customer
 * @property {string} [region] - Region of the customer
 * @property {string} [country] - Country of the customer
 * @property {string} [first_name] - First name of the customer
 * @property {string} [last_name] - Last name of the customer
 * @property {AddressData} [address] - Address of the customer
 */
export interface CustomerRequest {
  email?: string;
  phone?: string;
  town?: string;
  region?: string;
  country?: string;
  first_name?: string;
  last_name?: string;
  address?: AddressData;
  metadata?: Record<string, any>;
  description?: string;
}

/**
 * @interface OnlinePaymentRequest
 *
 * @property {number} amount - Amount of the transaction
 * @property {'MTN' | 'ORANGE' | 'AIRTEL'} service - payment service with the possible values
 * @property {string} [nonce] - unique string on each request
 * @property {string | number | null} [trxID] - if you want to include your transaction ID in the request
 * @property {string} [country] - 2 letters country code of the service (configured during your service registration in MeSomb)
 * @property {string} [currency] - currency of your service depending on your country
 * @property {'synchronous' | 'asynchronous'} [mode] - asynchronous or synchronous
 * @property {boolean} [conversion] - true in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
 * @property {LocationRequest} [location] - Map containing the location of the customer with the following attributes: town, region and location all string.
 * @property {Record<string, any>} [extra] - if you want to include your contribution ID in the request
 */
interface OnlinePaymentRequest {
  amount: number;

  service: 'MTN' | 'ORANGE' | 'AIRTEL';

  nonce?: string;

  trxID?: string | number | null;

  country?: string;

  currency?: string;

  mode?: 'synchronous' | 'asynchronous';

  conversion?: boolean;

  location?: LocationRequest;

  extra?: Record<string, any>;
}

/**
 * @interface MoneyCollectRequest
 * @extends OnlinePaymentRequest
 *
 * @property {string} payer - account number to collect from
 * @property {boolean} [fees] - false if your want MeSomb fees to be computed and included in the amount to collect
 * @property {CustomerRequest} [customer] - Map to add some extra attribute depending on the API documentation
 * @property {ProductRequest[] | ProductRequest} [products] - It is ArrayList of products. Each product are Map with the following attributes: name string, category string, quantity int and amount float
 */
export interface MoneyCollectRequest extends OnlinePaymentRequest {
  payer: string;

  fees?: boolean;

  customer?: CustomerRequest;

  products?: ProductRequest[] | ProductRequest;
}

/**
 * @interface MoneyDepositRequest
 * @extends OnlinePaymentRequest
 *
 * @property {string} receiver - account number to depose in
 * @property {CustomerRequest} [customer] - Map to add some extra attribute depending on the API documentation
 * @property {ProductRequest[] | ProductRequest} [products] - It is ArrayList of products. Each product are Map with the following attributes: name string, category string, quantity int and amount float
 */

export interface MoneyDepositRequest extends OnlinePaymentRequest {
  receiver: string;

  customer?: CustomerRequest;

  products?: ProductRequest[] | ProductRequest;
}

export interface AirtimePurchaseRequest extends OnlinePaymentRequest {
  receiver: string;
  merchant: 'MTN' | 'ORANGE' | 'CAMTEL' | 'NEXTTEL' | 'YOOMEE';

  customer?: CustomerRequest;

  products?: ProductRequest[] | ProductRequest;
}

/**
 * @interface PaymentRefundRequest
 *
 * @property {string} [nonce] - unique string on each request
 * @property {number} [amount] - amount to refund
 * @property {boolean} [conversion] - true in case of foreign currently defined if you want to rely on MeSomb to convert the amount in the local currency
 * @property {string} [currency] - currency of your service depending on your country (default: 'XAF')
 */
export interface PaymentRefundRequest {
  nonce?: string;

  amount?: number;

  conversion?: boolean;

  currency?: string;
}

/**
 * @interface FullName
 *
 * @property {string} [firstName] - First name of the payer
 * @property {string} lastName - Last name of the payer
 */
export interface FullName {
  firstName?: string;
  lastName: string;
}

/**
 * @interface Contact
 *
 * @property {string} [email] - Email of the contact
 * @property {string} phoneNumber - Phone number of the contact
 */
export interface Contact {
  email?: string;
  phoneNumber: string;
}

/**
 * @interface MoneyContributeRequest
 * @extends OnlinePaymentRequest
 *
 * @property {Object} [contact] - Map to add some extra attribute depending on the API documentation
 * @property {string} [contact.email] - Email of the contact
 * @property {string} contact.phoneNumber - Phone number of the contact
 * @property {string} payer - Account number to collect from
 * @property {Object} [fullName] - Map to add some extra attribute depending on the API documentation
 * @property {string} [fullName.firstName] - First name of the payer
 * @property {string} fullName.lastName - Last name of the payer
 * @property {boolean} [anonymous] - True if the contribution is anonymous
 * @property {boolean} [acceptTerms] - True if the terms are accepted
 */
export interface MoneyContributeRequest extends OnlinePaymentRequest {
  contact?: Contact;
  payer: string;
  fullName?: FullName;
  anonymous?: boolean;
  acceptTerms?: boolean;
}

export interface CheckoutLineItemProductData {
  name: string;
  description?: string;
  metadata?: Record<string, any>;
  images?: string[];
  unit_label?: string;
}

export interface CheckoutLineItemRequest {
  currency?: string;
  quantity?: number;
  unit_amount?: number;
  product?: string;
  product_data?: CheckoutLineItemProductData;
  limit_min?: number;
  limit_max?: number;
  adjustable?: boolean;
}

export interface CreateCheckoutSessionRequest {
  amount: number | string;
  success_url: string;
  cancel_url: string;
  branding_settings?: Record<string, any>;
  consent_collection?: Record<string, any>;
  custom_fields?: Record<string, any>[];
  required_contact_info?: boolean;
  conversion?: boolean;
  line_items?: CheckoutLineItemRequest[];
  custom_text?: Record<string, any>;
  discounts?: Record<string, any>;
  call_to_action?: string;
  mode?: string;
  currency?: string;
  description?: string;
  client_reference_id?: string;
  expires_in?: number;
  customer_id?: string;
  customer?: CustomerRequest;
  location?: LocationRequest;
  fees_included?: boolean;
  secure_pay?: Record<string, any>;
  metadata?: Record<string, any>;
}

export interface MerchantCustomerRequest {
  email?: string | null;
  phone?: string | null;
  town?: string | null;
  region?: string | null;
  country?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  address?: AddressData;
  metadata?: Record<string, any>;
  description?: string | null;
}

export interface PatchedMerchantCustomerRequest extends Partial<MerchantCustomerRequest> {}

export interface MerchantProductRequest {
  name: string;
  category?: string | null;
  description?: string | null;
  images?: number[];
  image_urls_input?: string[];
  default_price?: string | number | null;
  price_type?: 'OneTime' | 'Recurring';
  currency?: string;
}

export interface PatchedMerchantProductRequest extends Partial<MerchantProductRequest> {}

export interface YangoRefillRequest extends OnlinePaymentRequest {
  payer: string;
  driver_id: string;
  reference?: string;
  redirect?: string | null;
  customer?: CustomerRequest;
  location?: LocationRequest;
  line_items?: CheckoutLineItemRequest[];
  channel?: 'API' | 'SMS' | 'USSD' | 'WEB' | 'APP' | 'SMS_API' | 'SANDBOX' | 'SYSTEM' | 'MANUAL' | 'MESOMB';
}

/**
 * @interface WalletCreationRequest
 *
 * @property {string} [firstName] - First name of the wallet owner
 * @property {string} lastName - LastName name of the wallet owner
 * @property {string} [email] - Contact email of the wallet owner
 * @property {string} phoneNumber - Phone number of the wallet owner
 * @property {'MAN' | 'WOMAN'} gender - Gender of the wallet owner
 * @property {string} [number] - The unique numeric wallet identifier, if not set we will generate one for you
 * @property {string} [country] - 2 letters country code (default: 'CM')
 * @property {string} [nonce] - unique string on each request
 */
export interface WalletCreationRequest {
  firstName?: string;
  lastName: string;
  email?: string;
  phoneNumber: string;
  gender: 'MAN' | 'WOMAN';
  number?: string;
  country?: string;
  nonce?: string;
}

export interface TransactionData {
  pk: string;
  status: string;
  type: string;
  amount: number;
  fees: number;
  b_party: string;
  message: string;
  service: string;
  reference?: string;
  ts: string;
  country: string;
  currency: string;
  fin_trx_id: string;
  trxamount?: number;
  location?: LocationData;
  customer: CustomerData;
  products: ProductData[];
}

export interface CustomerData {
  email: string;
  phone: string;
  town: string;
  region: string;
  country: string;
  first_name: string;
  last_name: string;
  address?: AddressData;
}

export interface ProductData {id: string; name: string; category?: string; quantity: number; amount: number}

export interface LocationData {town: string; region: string; country: string}

// export interface PaymentOperation {
//   service: string;
//
//   constructor(configs: Record<string, any>);
//
//   makeCollect(params: MoneyCollectRequest): Promise<TransactionResponse>;
//
//   makeDeposit(params: MoneyDepositRequest): Promise<TransactionResponse>;
//
//   refundTransaction(id: string, params: PaymentRefundRequest): Promise<TransactionResponse>;
//
//   getStatus(): Promise<Application>;
//
//   getTransactions(ids: string[], source?: 'MESOMB' | 'EXTERNAL'): Promise<Record<string, any>[]>;
//
//   checkTransactions(ids: string[], source?: 'MESOMB' | 'EXTERNAL'): Promise<Record<string, any>[]>;
// }
