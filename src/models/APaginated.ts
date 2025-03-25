/**
 * Abstract class for paginated responses.
 *
 * @template T - The type of the results.
 *
 * @property {number} count - The total number of results.
 * @property {string} next - The URL for the next page.
 * @property {string} previous - The URL for the previous page.
 * @property {T[]} results - The list of results.
 */
export default abstract class APaginated<T> {
  private readonly data: Record<string, any>;

  public count: number;
  public next: string;
  public previous: string;
  public results: T[];

  constructor(data: {count: number; next: string; previous: string; results: T[]}) {
    this.data = data;

    this.count = data.count;
    this.next = data.next;
    this.previous = data.previous;
    this.results = data.results;
  }

  /**
   * Get the data received from the server.
   *
   * @return {Record<string, any>} The data received from the server.
   */
  public getData(): Record<string, any> {
    return this.data;
  }
}
