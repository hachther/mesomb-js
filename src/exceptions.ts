class RestError extends Error {
  private code: string | number | undefined;

  constructor(message: string, code?: string | number) {
    super(message);
    this.code = code;
  }
}

export class ServiceNotFoundError extends RestError {
  name = 'ServiceNotFoundError';
}

export class PermissionDeniedError extends RestError {
  name = 'PermissionDeniedError';
}
export class InvalidClientRequestError extends RestError {
  name = 'InvalidClientRequestError';
}
export class ServerError extends RestError {
  name = 'ServerError';
}
