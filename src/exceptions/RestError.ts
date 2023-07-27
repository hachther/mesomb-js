export default class RestError extends Error {
  private code: string | number | undefined;

  constructor(message: string, code?: string | number) {
    super(message);
    this.code = code;
  }
}
