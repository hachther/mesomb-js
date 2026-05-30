export default class MerchantProduct {
  private readonly data: Record<string, any>;

  public id: string;
  public name: string;
  public category?: string | null;
  public description?: string | null;
  public images?: number[];
  public imageUrlsInput?: string[];
  public imageUrl?: string;
  public imageUrls?: string;
  public defaultPrice?: string | null;
  public priceType?: string;
  public currency?: string;

  constructor(data: Record<string, any>) {
    this.data = data;
    this.id = data.id;
    this.name = data.name;
    this.category = data.category;
    this.description = data.description;
    this.images = data.images;
    this.imageUrlsInput = data.image_urls_input;
    this.imageUrl = data.image_url;
    this.imageUrls = data.image_urls;
    this.defaultPrice = data.default_price;
    this.priceType = data.price_type;
    this.currency = data.currency;
  }

  public getData(): Record<string, any> {
    return this.data;
  }
}

