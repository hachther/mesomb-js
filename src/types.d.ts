export interface Location {
  town: string;
  region?: string;
  country?: string;
}

export interface Product {
  name: string;
  category?: string;
  quantity?: number;
  amount?: number;
}

export interface Customer {
  email?: string;
  phone?: string;
  town?: string;
  region?: string;
  country?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
}

export interface MoneyCollectRequest {
  amount: number;
  service: string;
  payer: string;
  date?: Date;
  nonce: string;
  trxID?: string | number | null;
  country?: string;
  currency?: string;
  fees?: boolean;
  mode?: 'synchronous' | 'asynchronous';
  conversion?: boolean;
  location?: Location;
  customer?: Customer;
  products?: Product[] | Product;
  extra?: Record<string, any>;
}

export interface MoneyDepositRequest {
  amount: number;
  service: string;
  receiver: string;
  date?: Date;
  nonce: string;
  trxID?: string | number;
  country?: string;
  currency?: string;
  conversion?: boolean;
  location?: Location;
  customer?: Customer;
  products?: Product[] | Product;
  extra?: Record<string, any>;
}

export interface TransactionData {
  pk: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED' | 'COLLECTED';
  type: 'string';
  amount: number;
  fees: number;
  b_party?: string;
  message?: string;
  service: 'MTN' | 'ORANGE' | 'AIRTEL';
  reference?: string;
  ts: Date;
  direction: -1 | 1;
  country: string;
  currency: string;
  customer?: Customer | null;
  location?: Location | number;
  products?: Products[];
}
