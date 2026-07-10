import RestError from "./RestError.js";

export default class PermissionDeniedError extends RestError {
  name = 'PermissionDeniedError';
}
