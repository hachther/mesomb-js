import RestError from "./RestError.js";

export default class ServiceNotFoundError extends RestError {
  name = 'ServiceNotFoundError';
}
