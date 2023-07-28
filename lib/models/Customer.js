"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer = /** @class */ (function () {
    function Customer(data) {
        this.email = data.email;
        this.phone = data.phone;
        this.town = data.town;
        this.region = data.region;
        this.country = data.country;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.address = data.address;
    }
    return Customer;
}());
exports.default = Customer;
