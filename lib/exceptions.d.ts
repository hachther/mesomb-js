declare class RestError extends Error {
    private code;
    constructor(message: string, code?: string | number);
}
export declare class ServiceNotFoundError extends RestError {
    name: string;
}
export declare class PermissionDeniedError extends RestError {
    name: string;
}
export declare class InvalidClientRequestError extends RestError {
    name: string;
}
export declare class ServerError extends RestError {
    name: string;
}
export {};
