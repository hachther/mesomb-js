"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerError = exports.InvalidClientRequestError = exports.PermissionDeniedError = exports.ServiceNotFoundError = void 0;
var RestError = /** @class */ (function (_super) {
    __extends(RestError, _super);
    function RestError(message, code) {
        var _this = _super.call(this, message) || this;
        _this.code = code;
        return _this;
    }
    return RestError;
}(Error));
var ServiceNotFoundError = /** @class */ (function (_super) {
    __extends(ServiceNotFoundError, _super);
    function ServiceNotFoundError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'ServiceNotFoundError';
        return _this;
    }
    return ServiceNotFoundError;
}(RestError));
exports.ServiceNotFoundError = ServiceNotFoundError;
var PermissionDeniedError = /** @class */ (function (_super) {
    __extends(PermissionDeniedError, _super);
    function PermissionDeniedError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'PermissionDeniedError';
        return _this;
    }
    return PermissionDeniedError;
}(RestError));
exports.PermissionDeniedError = PermissionDeniedError;
var InvalidClientRequestError = /** @class */ (function (_super) {
    __extends(InvalidClientRequestError, _super);
    function InvalidClientRequestError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'InvalidClientRequestError';
        return _this;
    }
    return InvalidClientRequestError;
}(RestError));
exports.InvalidClientRequestError = InvalidClientRequestError;
var ServerError = /** @class */ (function (_super) {
    __extends(ServerError, _super);
    function ServerError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'ServerError';
        return _this;
    }
    return ServerError;
}(RestError));
exports.ServerError = ServerError;
