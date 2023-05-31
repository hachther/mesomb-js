"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.InvalidClientRequestError = exports.PermissionDeniedError = exports.ServiceNotFoundError = void 0;
class RestError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
class ServiceNotFoundError extends RestError {
    constructor() {
        super(...arguments);
        this.name = 'ServiceNotFoundError';
    }
}
exports.ServiceNotFoundError = ServiceNotFoundError;
class PermissionDeniedError extends RestError {
    constructor() {
        super(...arguments);
        this.name = 'PermissionDeniedError';
    }
}
exports.PermissionDeniedError = PermissionDeniedError;
class InvalidClientRequestError extends RestError {
    constructor() {
        super(...arguments);
        this.name = 'InvalidClientRequestError';
    }
}
exports.InvalidClientRequestError = InvalidClientRequestError;
class ServerError extends RestError {
    constructor() {
        super(...arguments);
        this.name = 'ServerError';
    }
}
exports.ServerError = ServerError;
