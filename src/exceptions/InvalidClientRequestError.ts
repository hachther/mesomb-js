import RestError from "./RestError.js";

export default class InvalidClientRequestError extends RestError {
  name = 'InvalidClientRequestError';
}
