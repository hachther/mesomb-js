import MerchantCustomer from './MerchantCustomer.js';
import Location from './Location.js';

export default class CheckoutSession {
  private readonly data: Record<string, any>;

  public id: string;
  public object?: string;
  public status: string;
  public amount: number;
  public currency: string;
  public description?: string | null;
  public url?: string;
  public successUrl: string;
  public cancelUrl: string;
  public allowedPaymentMethods?: any;
  public customer?: MerchantCustomer;
  public attemptCount?: number;
  public failureCode?: string | null;
  public failureMessage?: string | null;
  public lineItems?: any[];
  public metadata?: Record<string, any>;
  public clientReferenceId?: string | null;
  public expiresAt?: string;
  public createdAt?: string;
  public updatedAt?: string;
  public brandingSettings?: Record<string, any> | null;
  public amountTotal?: number | null;
  public securePayMode?: string;
  public location?: Location;

  constructor(data: Record<string, any>) {
    this.data = data;
    this.id = data.id;
    this.object = data.object;
    this.status = data.status;
    this.amount = data.amount;
    this.currency = data.currency;
    this.description = data.description;
    this.url = data.url;
    this.successUrl = data.success_url;
    this.cancelUrl = data.cancel_url;
    this.allowedPaymentMethods = data.allowed_payment_methods;
    this.customer = data.customer ? new MerchantCustomer(data.customer) : undefined;
    this.attemptCount = data.attempt_count;
    this.failureCode = data.failure_code;
    this.failureMessage = data.failure_message;
    this.lineItems = data.line_items;
    this.metadata = data.metadata;
    this.clientReferenceId = data.client_reference_id;
    this.expiresAt = data.expires_at;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.brandingSettings = data.branding_settings;
    this.amountTotal = data.amount_total;
    this.securePayMode = data.secure_pay_mode;
    this.location = data.location ? new Location(data.location) : undefined;
  }

  public getData(): Record<string, any> {
    return this.data;
  }
}


