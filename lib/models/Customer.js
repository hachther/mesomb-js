"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Customer model
 *
 * @property {string} [email] - The customer's email
 * @property {string} [phone] - The customer's phone number
 * @property {string} [town] - The customer's town
 * @property {string} [region] - The customer's region
 * @property {string} [country] - The customer's country
 * @property {string} [firstName] - The customer's first name
 * @property {string} lastName - The customer's last name
 * @property {string} [address] - The customer's address
 *
 */
var Customer = /** @class */ (function () {
    function Customer(data) {
        this.data = data;
        this.email = data.email;
        this.phone = data.phone;
        this.town = data.town;
        this.region = data.region;
        this.country = data.country;
        this.firstName = data.first_name;
        this.lastName = data.last_name;
        this.address = data.address;
    }
    /**
     * Get the data receive from the server
     *
     * @returns {Record<string, any>}
     */
    Customer.prototype.getData = function () {
        return this.data;
    };
    return Customer;
}());
exports.default = Customer;
